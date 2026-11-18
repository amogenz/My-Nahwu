#!/usr/bin/env python3
"""Deploy My Nahwu Fase 1 (repo amogenz/My-Nahwu main) ke Vercel project
my-nahwu (non-git). Pola sama dengan my-nahwu-restore/deploy.py: upload
per-file via MCP, lalu create_deployment production.
script.js di-deploy dalam bentuk minifikasi (terser -c -m, pipeline yang
terbukti mereproduksi persis file live lama md5 5aca0c18...) agar < 96KB.
File baru Fase 1: nahwu-login.js, oauth/callback.html, vercel.json, version.json.
"""
import hashlib, base64, json, subprocess, os

ROOT = os.path.expanduser('~/workspace/my-nahwu/deploy')
SRC = os.path.expanduser('~/workspace/my-nahwu')
LOG = os.path.expanduser('~/workspace/my-nahwu/deploy.log')
PROJECT = 'my-nahwu'
FILES = [
    'index.html',
    'script.js',
    'style.css',
    'nahwu-login.js',
    'oauth/callback.html',
    'vercel.json',
    'version.json',
]

logf = open(LOG, 'a')
def log(*a):
    msg = ' '.join(str(x) for x in a)
    print(msg, flush=True)
    logf.write(msg + '\n'); logf.flush()

def call_tool(name, args):
    out = subprocess.run(['/opt/hatch/bin/vercel', 'call-tool', '--name', name,
                          '--arguments-json', json.dumps(args)],
                         capture_output=True, text=True, timeout=300)
    if out.returncode != 0:
        raise RuntimeError(f'{name} failed rc={out.returncode}: {out.stderr[:400]}')
    return json.loads(out.stdout)

def main():
    # 1) Minifikasi ulang script.js dari sumber (pipeline terverifikasi)
    r = subprocess.run(['/tmp/node_modules/.bin/terser', os.path.join(SRC, 'script.js'),
                        '-c', '-m', '-o', os.path.join(ROOT, 'script.js')],
                       capture_output=True, text=True, timeout=120)
    if r.returncode != 0:
        raise RuntimeError(f'terser gagal: {r.stderr[:400]}')
    log('minify script.js -> deploy/script.js (%dB)' % os.path.getsize(os.path.join(ROOT, 'script.js')))
    entries = []
    for i, rel in enumerate(FILES, 1):
        p = os.path.join(ROOT, rel)
        if not os.path.exists(p):
            raise RuntimeError(f'file hilang: {rel}')
        data = open(p, 'rb').read()
        if len(data) > 96 * 1024:
            raise RuntimeError(f'file kebesaran (>96KB): {rel}')
        sha = hashlib.sha1(data).hexdigest()
        log(f'[{i}/{len(FILES)}] upload {rel} ({len(data)}B)')
        r = call_tool('upload_file', {
            'contentLength': len(data),
            'requestBody': base64.b64encode(data).decode(),
            'xVercelDigest': sha,
            'slug': 'amogenz',
        })
        inner = json.loads(r['result']['content'][0]['text'])['result']
        if 'urls' in inner and sha not in inner['urls'][0]:
            raise RuntimeError(f'sha mismatch for {rel}')
        entries.append({'file': rel, 'sha': sha, 'size': len(data)})
        log('   OK')
    log('--- create_deployment (production) ---')
    r = call_tool('create_deployment', {
        'slug': 'amogenz',
        'requestBody': {
            'name': PROJECT,
            'project': PROJECT,
            'target': 'production',
            'files': entries,
            'projectSettings': {
                'framework': None,
                'buildCommand': None,
                'devCommand': None,
                'installCommand': None,
                'outputDirectory': None,
                'rootDirectory': None,
            },
        },
    })
    txt = r['result']['content'][0]['text']
    log(txt[:2000])
    log('DEPLOY_DONE')

main()
