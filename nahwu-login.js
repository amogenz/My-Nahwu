// ======================================================================
// nahwu-login.js — Integrasi My Nahwu → Aksara, Fase 1
// Login via Akun AMOGENZ (OAuth2 PKCE + state, pola Aksara community.js
// baris 2732-2750 yang LIVE — JANGAN tiru amogenz-login.js yang stale
// karena file itu tidak mengirim `state` dan authorize menolaknya).
//
// Alur: Pengaturan My Nahwu → baris Aksara → "Masuk dengan AMOGENZ"
//   → portal account.amogenz.xyz (izin, tanpa sandi masuk ke My Nahwu)
//   → /oauth/callback (tukar kode + userinfo, simpan identitas lokal)
//   → kembali ke Pengaturan, tampil "Masuk sebagai … · tertaut ke @…"
// Identitas = amgz_id (sub dari userinfo), BUKAN email.
// Skor tetap lokal (localStorage mynahwu_sec_sc); yang dikirim ke Aksara
// hanya pencapaian minimal (lihat syncAchievements).
// ======================================================================

const ACC = 'https://account.amogenz.xyz';
const CLIENT_ID = 'my-nahwu';
const REDIRECT = 'https://nahwu.amogenz.my.id/oauth/callback';

// Firebase proyek amogenz-inc (dipakai HANYA untuk jembatan tulis ke
// users/<username>/myNahwu — data My Nahwu sendiri tetap di proyek amogenz).
// Web API key publik by design (sama seperti di callback Aksara yang live).
const FB_API_KEY = '<redacted>';
const RTDB_INC = 'https://amogenz-inc-default-rtdb.asia-southeast1.firebasedatabase.app';

// --- Util -----------------------------------------------------------------
const $ = (id) => document.getElementById(id);
const rand = (n) => crypto.getRandomValues(new Uint8Array(n))
  .reduce((a, b) => a + b.toString(16).padStart(2, '0'), '');

// --- State identitas (localStorage origin My Nahwu saja) -------------------
function getIdentity() {
  const amgzId = localStorage.getItem('mynahwu_amgz_id');
  if (!amgzId) return null;
  return {
    amgzId,
    username: localStorage.getItem('mynahwu_amgz_username') || '',
    name: localStorage.getItem('mynahwu_amgz_name') || '',
    email: localStorage.getItem('mynahwu_amgz_email') || '',
    picture: localStorage.getItem('mynahwu_amgz_picture') || '',
    linkedAt: Number(localStorage.getItem('mynahwu_amgz_linked_at') || 0),
  };
}

function getShowInProfile() {
  return localStorage.getItem('mynahwu_amgz_show') !== '0'; // default tampil (MATI = belum login)
}

function clearIdentity() {
  [
    'mynahwu_amgz_access', 'mynahwu_amgz_refresh', 'mynahwu_amgz_expires_at',
    'mynahwu_amgz_id', 'mynahwu_amgz_username', 'mynahwu_amgz_name',
    'mynahwu_amgz_email', 'mynahwu_amgz_picture', 'mynahwu_amgz_linked_at',
    'mynahwu_amgz_show', 'mynahwu_amgz_last_sync',
    'mynahwu_fb_id_token', 'mynahwu_fb_refresh', 'mynahwu_fb_expires_at', 'mynahwu_fb_uid',
  ].forEach((k) => localStorage.removeItem(k));
}

// --- Token: refresh bila kedaluwarsa ---------------------------------------
async function getAccessToken() {
  const exp = Number(localStorage.getItem('mynahwu_amgz_expires_at') || 0);
  const at = localStorage.getItem('mynahwu_amgz_access');
  if (at && Date.now() < exp - 60 * 1000) return at; // masih berlaku (margin 1 mnt)
  const rt = localStorage.getItem('mynahwu_amgz_refresh');
  if (!rt) return null;
  try {
    const r = await fetch(ACC + '/api/oauth/token', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'refresh_token', refresh_token: rt, client_id: CLIENT_ID,
      }),
    });
    const t = await r.json();
    if (!r.ok || !t.access_token) return null;
    localStorage.setItem('mynahwu_amgz_access', t.access_token);
    if (t.refresh_token) localStorage.setItem('mynahwu_amgz_refresh', t.refresh_token); // dirotasi
    localStorage.setItem('mynahwu_amgz_expires_at',
      String(Date.now() + (t.expires_in || 3600) * 1000));
    return t.access_token;
  } catch (e) {
    console.warn('[aksara] refresh token gagal:', e);
    return null;
  }
}

// --- Mulai login (PKCE + state, fail-closed di portal) ----------------------
async function startAmogenzLogin() {
  const btn = $('btn-amogenz-login');
  if (btn) btn.disabled = true;
  try {
    const verifier = rand(32);
    const state = rand(16);
    const chBuf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
    const challenge = btoa(String.fromCharCode(...new Uint8Array(chBuf)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    localStorage.setItem('amgz_pkce_v', verifier);
    localStorage.setItem('amgz_oauth_state', state);
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT,
      response_type: 'code',
      code_challenge: challenge,
      code_challenge_method: 'S256',
      scope: 'openid profile email',
      state,
    });
    location.href = ACC + '/api/oauth/authorize?' + params;
  } catch (e) {
    if (btn) btn.disabled = false;
    alert('Gagal memulai login. Coba lagi.');
  }
}

// --- Pencapaian lokal → payload minimal untuk Aksara -------------------------
function buildAchievementPayload() {
  const b = window.MyNahwuBridge;
  if (!b) return null;
  const totalBenar = b.getScore();
  const rank = b.getRank(totalBenar);
  const medals = b.getMedals();
  return {
    rank: rank.rankText,            // PRAJURIT / JENDRAL / PANGLIMA BESAR / KAISAR
    rankPosition: rank.rankPosition,
    totalBenar,
    totalPoin: totalBenar,          // di My Nahwu poin = jawaban benar
    medaliTerbuka: medals,          // array id, mis. ["prasasti_yupa", ...]
    medaliJumlah: medals.length,    // dari 17
    kitabTerakhir: b.getLevel(),    // mis. "Imrithi · Lv 2"
    dbKey: b.getDbKey(),
    tampil: getShowInProfile(),
    updatedAt: Date.now(),
  };
}

// --- Firebase amogenz-inc: tukar access token → ID token (pola Nuqtoh) --------
// Langkah: POST /api/oauth/firebase-token (Bearer access token) → custom token
//   → Identity Toolkit REST signInWithCustomToken → idToken + refreshToken.
// ID token disimpan lokal (1 jam); refresh via securetoken bila <60 detik.
// Gagal 404 dari firebase-token = akun AMOGENZ belum tertaut ke Firebase
// (belum pernah buka/buat akun Aksara) → 'needs-aksara-account', bukan error diam.
async function getFirebaseIdToken() {
  const exp = Number(localStorage.getItem('mynahwu_fb_expires_at') || 0);
  const cached = localStorage.getItem('mynahwu_fb_id_token');
  if (cached && Date.now() < exp - 60 * 1000) return { ok: true, idToken: cached };
  const fbRefresh = localStorage.getItem('mynahwu_fb_refresh');
  if (fbRefresh) {
    try {
      const r = await fetch('https://securetoken.googleapis.com/v1/token?key=' + FB_API_KEY, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grant_type: 'refresh_token', refresh_token: fbRefresh }),
      });
      const t = await r.json();
      if (r.ok && t.id_token) {
        localStorage.setItem('mynahwu_fb_id_token', t.id_token);
        if (t.refresh_token) localStorage.setItem('mynahwu_fb_refresh', t.refresh_token);
        localStorage.setItem('mynahwu_fb_expires_at',
          String(Date.now() + (Number(t.expires_in) || 3600) * 1000));
        return { ok: true, idToken: t.id_token };
      }
    } catch (e) { console.warn('[aksara] refresh ID token gagal:', e); }
    localStorage.removeItem('mynahwu_fb_id_token');
    localStorage.removeItem('mynahwu_fb_refresh');
    localStorage.removeItem('mynahwu_fb_expires_at');
  }
  const access = await getAccessToken();
  if (!access) return { ok: false, reason: 'belum-terhubung' };
  const fr = await fetch(ACC + '/api/oauth/firebase-token', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + access },
    body: JSON.stringify({}),
  });
  const fd = await fr.json().catch(() => ({}));
  if (!fr.ok) {
    if (fr.status === 404) return { ok: false, reason: 'needs-aksara-account' };
    return { ok: false, reason: 'firebase-token-gagal' };
  }
  const customToken = fd.firebase_token || fd.customToken;
  if (!customToken) return { ok: false, reason: 'firebase-token-kosong' };
  const sr = await fetch(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=' + FB_API_KEY,
    {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: customToken, returnSecureToken: true }),
    });
  const st = await sr.json().catch(() => ({}));
  if (!sr.ok || !st.idToken) return { ok: false, reason: 'firebase-signin-gagal' };
  localStorage.setItem('mynahwu_fb_id_token', st.idToken);
  if (st.refreshToken) localStorage.setItem('mynahwu_fb_refresh', st.refreshToken);
  localStorage.setItem('mynahwu_fb_expires_at',
    String(Date.now() + (Number(st.expiresIn) || 3600) * 1000));
  if (st.localId) localStorage.setItem('mynahwu_fb_uid', st.localId);
  return { ok: true, idToken: st.idToken };
}

// --- Cari userKey Aksara: users/<username> lalu usersByUid/<uid> (pola Nuqtoh) ---
async function rtdbGet(path, idToken) {
  try {
    const r = await fetch(RTDB_INC + '/' + path + '.json?auth=' + encodeURIComponent(idToken));
    if (!r.ok) return null;
    return await r.json();
  } catch (e) { return null; }
}

async function resolveUsernameKey(idToken) {
  const me = getIdentity();
  const portalKey = (me?.username || '').toLowerCase();
  if (portalKey) {
    const u = await rtdbGet('users/' + portalKey, idToken);
    if (u && u !== null) return portalKey;
  }
  const uid = localStorage.getItem('mynahwu_fb_uid');
  if (uid) {
    const byUid = await rtdbGet('usersByUid/' + uid, idToken);
    if (typeof byUid === 'string' && byUid) return byUid.toLowerCase();
  }
  return null;
}

// --- Payload → record RTDB users/<username>/myNahwu (amogenz-inc) --------------
function toRecord(me, payload) {
  return {
    amgzId: me.amgzId,
    rank: payload.rank,
    correctAnswers: payload.totalBenar,
    medals: payload.medaliTerbuka,
    showInProfile: payload.tampil,
    kitab: payload.kitabTerakhir,   // kitab aktif saat sinkron (bukan riwayat)
    dbKey: payload.dbKey,
    linkedAt: me.linkedAt || Date.now(),
    updatedAt: payload.updatedAt,
  };
}

// --- Sinkronisasi pencapaian ke RTDB (dipanggil sesudah login & tiap berubah) ---
// Tulis HANYA record di atas, ke SATU path. Kegagalan TIDAK diam-diam:
// status ditulis ke #aksara-sync-note agar pengguna tahu apa yang terjadi.
async function syncAchievements() {
  const me = getIdentity();
  if (!me) return { ok: false, reason: 'belum-terhubung' };
  const payload = buildAchievementPayload();
  if (!payload) return { ok: false, reason: 'bridge-skor-belum-siap' };
  const fb = await getFirebaseIdToken();
  if (!fb.ok) {
    setSyncNote(fb.reason);
    return { ok: false, reason: fb.reason };
  }
  const userKey = await resolveUsernameKey(fb.idToken);
  if (!userKey) {
    setSyncNote('needs-aksara-account');
    return { ok: false, reason: 'needs-aksara-account' };
  }
  const record = toRecord(me, payload);
  const put = async (token) => fetch(
    RTDB_INC + '/users/' + encodeURIComponent(userKey) + '/myNahwu.json?auth=' + encodeURIComponent(token),
    { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(record) });
  let r = await put(fb.idToken);
  if (r.status === 401) { // ID token basi — paksa refresh lalu coba sekali lagi
    localStorage.removeItem('mynahwu_fb_id_token');
    const fb2 = await getFirebaseIdToken();
    if (fb2.ok) r = await put(fb2.idToken);
  }
  if (!r.ok) {
    const t = await r.text().catch(() => '');
    console.warn('[aksara] tulis myNahwu gagal:', r.status, t.slice(0, 120));
    setSyncNote('sync-gagal');
    return { ok: false, reason: 'tulis-gagal', status: r.status };
  }
  localStorage.setItem('mynahwu_amgz_last_sync', String(Date.now()));
  setSyncNote('ok');
  return { ok: true, userKey, record };
}

// --- Status sinkronisasi di UI (jujur, tidak diam-diam) -------------------------
function setSyncNote(state) {
  const el = $('aksara-sync-note');
  if (!el) return;
  const last = Number(localStorage.getItem('mynahwu_amgz_last_sync') || 0);
  const jam = last ? new Date(last).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '';
  if (state === 'ok') {
    el.textContent = 'Pencapaian disinkronkan ke profil Aksara' + (jam ? ' · ' + jam : '') + '.';
  } else if (state === 'needs-aksara-account') {
    el.textContent = 'Akun Aksara belum ada — buka app Aksara dulu untuk membuat profil, lalu kembali ke sini untuk sinkron.';
  } else if (state === 'sync-gagal') {
    el.textContent = 'Sinkronisasi gagal — periksa koneksi lalu buka kembali Pengaturan.';
  } else if (state === 'firebase-token-gagal' || state === 'firebase-signin-gagal') {
    el.textContent = 'Gagal menghubungkan ke Firebase Aksara — coba lagi nanti.';
  } else {
    el.textContent = 'Pencapaian belum disinkronkan ke profil Aksara.';
  }
}

// --- UI Pengaturan -----------------------------------------------------------
function renderAksaraRow() {
  const loginBox = $('aksara-login-box');
  const linkedBox = $('aksara-linked-box');
  const statusText = $('aksara-status-text');
  const nameEl = $('aksara-linked-name');
  const subEl = $('aksara-linked-sub');
  const rankEl = $('aksara-linked-rank');
  const toggle = $('aksara-show-toggle');
  const syncNote = $('aksara-sync-note');
  if (!loginBox || !linkedBox) return; // halaman Pengaturan belum dirender
  const me = getIdentity();
  if (!me) {
    loginBox.hidden = false;
    linkedBox.hidden = true;
    if (statusText) statusText.textContent = 'Tampilkan rank, poin & medali di profil Aksara';
    return;
  }
  loginBox.hidden = true;
  linkedBox.hidden = false;
  if (nameEl) nameEl.textContent = 'Masuk sebagai ' + (me.name || me.username || 'Pengguna AMOGENZ');
  if (subEl) subEl.textContent = 'Tertaut ke @' + (me.username || '—');
  if (toggle) toggle.checked = getShowInProfile();
  const p = buildAchievementPayload();
  if (rankEl) {
    rankEl.textContent = p
      ? p.rank + ' · ' + p.totalBenar + ' jawaban benar · My Nahwu'
      : 'My Nahwu';
  }
  if (syncNote) {
    if (!getShowInProfile()) {
      syncNote.textContent = 'Pencapaian disembunyikan dari profil Aksara (saklar mati).';
    } else if (localStorage.getItem('mynahwu_amgz_last_sync')) {
      setSyncNote('ok');
    } else {
      setSyncNote('belum');
    }
  }
  if (statusText) {
    statusText.textContent = getShowInProfile()
      ? 'Terhubung — tampil di profil Aksara'
      : 'Terhubung — disembunyikan dari profil Aksara';
  }
}

// --- Putuskan koneksi ---------------------------------------------------------
async function disconnectAksara() {
  if (!confirm('Putuskan koneksi Aksara? Rank dan medali tidak akan tampil lagi di profil Aksara.')) return;
  // Kirim dulu showInProfile=false supaya pil di profil Aksara ikut hilang,
  // baru hapus semua jejak lokal. Gagal kirim pun tetap putus lokal.
  try {
    localStorage.setItem('mynahwu_amgz_show', '0');
    await syncAchievements();
  } catch (e) { console.warn('[aksara] sync putus gagal (tetap putus lokal):', e); }
  clearIdentity();
  renderAksaraRow();
  if (window.MyNahwuBridge) window.MyNahwuBridge.showToast('Koneksi Aksara diputuskan');
}

// --- Init --------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  $('btn-amogenz-login')?.addEventListener('click', startAmogenzLogin);
  $('btn-aksara-disconnect')?.addEventListener('click', disconnectAksara);
  $('aksara-show-toggle')?.addEventListener('change', async (e) => {
    localStorage.setItem('mynahwu_amgz_show', e.target.checked ? '1' : '0');
    renderAksaraRow();
    await syncAchievements(); // kirim ulang flag tampil
  });
  renderAksaraRow();
  // Sesudah login: sinkronkan sekali (bila bridge sudah dikonfigurasi).
  if (getIdentity()) syncAchievements().catch((e) => console.warn('[aksara] sync gagal:', e));
});
