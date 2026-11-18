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
// amgz_users/<amgz_id>/myNahwu — keputusan Bos 16:16 WIB: pencapaian
// disimpan di Akun AMOGENZ, BUKAN di database Aksara (users/).
// Data My Nahwu sendiri tetap di proyek amogenz.
// Web API key publik by design (sama seperti di callback Aksara yang live).
// CATATAN: aturan tulis scoped myNahwu sudah TERBIT 18 Nov 2026 ~16:34 WIB
// (Opsi A, titah Bos): .write hanya pemilik/admin, .read myNahwu hanya
// bila showInProfile==true. Bila PUT tetap 403, itu bug yang harus
// dilaporkan jujur — JANGAN dialihkan ke node lain.
// syncAchievements() TIDAK BOLEH gagal diam-diam: setiap kegagalan
// dicatat alasannya (lastSyncError) dan ditampilkan di UI.
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

// --- Payload → record RTDB amgz_users/<amgz_id>/myNahwu (amogenz-inc) -------
// Path diputuskan Bos 16:16 WIB. Field hanya yang dibutuhkan Aksara untuk
// pil profil; amgz_id tidak disimpan di dalam record (sudah ada di path).
function toRecord(me, payload) {
  return {
    rank: payload.rank,
    rankPosition: payload.rankPosition,
    correctAnswers: payload.totalBenar,
    totalPoin: payload.totalPoin,
    medals: payload.medaliTerbuka,
    medalsCount: payload.medaliJumlah,
    showInProfile: payload.tampil,
    kitab: payload.kitabTerakhir,   // kitab aktif saat sinkron (bukan riwayat)
    dbKey: payload.dbKey,
    linkedAt: me.linkedAt || Date.now(),
    updatedAt: payload.updatedAt,
  };
}

// --- Sinkronisasi pencapaian ke amgz_users (dipanggil sesudah login & tiap berubah) ---
// Tulis HANYA record di atas, ke SATU path amgz_users/<amgz_id>/myNahwu.
// Auth: Firebase ID token (amogenz-inc) dari /api/oauth/firebase-token —
// token ini membuktikan pemilik lewat rantai usersByUid → users/<username>/amgz_id.
// TIDAK BOLEH gagal diam-diam: setiap jalan keluar (return) mencatat
// alasannya di lastSyncError dan me-render ulang status — pelajaran dari
// 18 Nov 16:37 WIB, saat sync Bos gagal tanpa jejak (catatan hanya bilang
// "belum disinkronkan") padahal loginnya berhasil.
let lastSyncError = null; // alasan sync terakhir gagal; null = belum pernah gagal / sudah berhasil

async function syncAchievements() {
  const me = getIdentity();
  if (!me) {
    lastSyncError = 'belum-terhubung';
    renderAksaraRow();
    return { ok: false, reason: 'belum-terhubung' };
  }
  let payload = null;
  try {
    payload = buildAchievementPayload();
  } catch (e) {
    console.warn('[aksara] build payload gagal:', e);
  }
  if (!payload) {
    lastSyncError = 'bridge-skor-belum-siap';
    renderAksaraRow();
    return { ok: false, reason: 'bridge-skor-belum-siap' };
  }
  let fb;
  try {
    fb = await getFirebaseIdToken();
  } catch (e) {
    console.warn('[aksara] getFirebaseIdToken gagal:', e);
    lastSyncError = 'firebase-token-gagal';
    renderAksaraRow();
    return { ok: false, reason: 'firebase-token-gagal' };
  }
  if (!fb.ok) {
    lastSyncError = fb.reason || 'firebase-token-gagal';
    renderAksaraRow();
    return { ok: false, reason: fb.reason };
  }
  const record = toRecord(me, payload);
  const put = async (token) => fetch(
    RTDB_INC + '/amgz_users/' + encodeURIComponent(me.amgzId) + '/myNahwu.json?auth=' + encodeURIComponent(token),
    { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(record) });
  let r;
  try {
    r = await put(fb.idToken);
    if (r.status === 401) { // ID token basi — paksa refresh lalu coba sekali lagi
      localStorage.removeItem('mynahwu_fb_id_token');
      const fb2 = await getFirebaseIdToken();
      if (fb2.ok) r = await put(fb2.idToken);
    }
  } catch (e) {
    console.warn('[aksara] tulis myNahwu gagal (jaringan):', e);
    lastSyncError = 'tulis-gagal';
    renderAksaraRow();
    return { ok: false, reason: 'tulis-gagal' };
  }
  if (!r.ok) {
    const t = await r.text().catch(() => '');
    console.warn('[aksara] tulis myNahwu gagal:', r.status, t.slice(0, 120));
    lastSyncError = r.status === 403 ? 'tulis-ditolak-rules' : 'tulis-gagal';
    renderAksaraRow();
    return { ok: false, reason: lastSyncError, status: r.status };
  }
  lastSyncError = null;
  localStorage.setItem('mynahwu_amgz_last_sync', String(Date.now()));
  renderAksaraRow();
  return { ok: true, record };
}

// Coba sinkron beberapa kali (aturan server / token kadang butuh waktu).
// Alasan yang tidak akan membaik dengan retry langsung dikembalikan.
async function syncWithRetry(maxAttempts = 3) {
  for (let i = 1; i <= maxAttempts; i++) {
    const res = await syncAchievements();
    if (res.ok) return res;
    if (res.reason === 'belum-terhubung' || res.reason === 'needs-aksara-account') return res;
    if (i < maxAttempts) await new Promise((r) => setTimeout(r, 1500 * i));
  }
  return { ok: false, reason: lastSyncError };
}

// --- Status sinkronisasi di UI: SATU sumber kebenaran -----------------------
// Teks atas (#aksara-status-text) dan catatan bawah (#aksara-sync-note)
// SELALU berasal dari keadaan yang sama — tidak boleh bertentangan lagi
// (sebelumnya: atas bilang "tampil di profil" padahal bawah bilang
// "belum disinkronkan" — itu yang membingungkan Bos).
const SYNC_REASON_TEXT = {
  'bridge-skor-belum-siap': 'Skor My Nahwu belum siap — tutup lalu buka lagi Pengaturan.',
  'belum-terhubung': 'Belum terhubung — masuk dulu dengan Akun AMOGENZ.',
  'needs-aksara-account': 'Akun Aksara belum ada — buka app Aksara dulu untuk membuat profil, lalu kembali ke sini.',
  'firebase-token-gagal': 'Gagal menghubungkan ke Firebase Aksara — coba lagi nanti.',
  'firebase-signin-gagal': 'Gagal menghubungkan ke Firebase Aksara — coba lagi nanti.',
  'firebase-token-kosong': 'Gagal menghubungkan ke Firebase Aksara — coba lagi nanti.',
  'tulis-ditolak-rules': 'Sinkronisasi ditolak server (izin tulis). Login tetap tersimpan; coba lagi nanti.',
  'tulis-gagal': 'Sinkronisasi gagal — periksa koneksi lalu ketuk “Sinkronkan sekarang”.',
};

function syncState() {
  const me = getIdentity();
  if (!me) return 'belum-terhubung';
  if (!getShowInProfile()) return 'tersembunyi';
  if (localStorage.getItem('mynahwu_amgz_last_sync')) return 'tersinkron';
  if (lastSyncError) return 'gagal';
  return 'belum-terkirim';
}

function applySyncStatus() {
  const statusText = $('aksara-status-text');
  const el = $('aksara-sync-note');
  const state = syncState();
  const last = Number(localStorage.getItem('mynahwu_amgz_last_sync') || 0);
  const jam = last ? new Date(last).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '';
  const statusMap = {
    'belum-terhubung': 'Belum terhubung ke Akun AMOGENZ',
    'tersembunyi': 'Terhubung — disembunyikan dari profil Aksara',
    'belum-terkirim': 'Terhubung — pencapaian belum terkirim',
    'tersinkron': 'Terhubung — tampil di profil Aksara',
    'gagal': 'Terhubung — sinkronisasi gagal',
  };
  if (statusText) statusText.textContent = statusMap[state];
  if (!el) return;
  if (state === 'belum-terhubung') {
    el.textContent = 'Masuk dengan Akun AMOGENZ untuk menautkan pencapaian My Nahwu ke profil Aksara.';
  } else if (state === 'tersembunyi') {
    el.textContent = 'Pencapaian disembunyikan dari profil Aksara karena saklar mati. Nyalakan saklar untuk menampilkan lagi.';
  } else if (state === 'belum-terkirim') {
    el.textContent = 'Pencapaian belum terkirim ke profil Aksara. Ketuk “Sinkronkan sekarang” di bawah.';
  } else if (state === 'tersinkron') {
    el.textContent = 'Pencapaian disinkronkan ke profil Aksara' + (jam ? ' · ' + jam : '') + '.'
      + (lastSyncError ? ' Sinkronisasi terakhir gagal: ' + (SYNC_REASON_TEXT[lastSyncError] || 'coba lagi nanti.') : '');
  } else { // gagal
    el.textContent = (SYNC_REASON_TEXT[lastSyncError] || 'Sinkronisasi gagal — coba lagi nanti.')
      + ' Ketuk “Sinkronkan sekarang” untuk mencoba lagi.';
  }
}

// Kompatibilitas: pemanggil lama memakai setSyncNote(state).
function setSyncNote(state) {
  if (state === 'ok') {
    lastSyncError = null;
  } else if (state === 'sync-gagal') {
    lastSyncError = 'tulis-gagal';
  } else if (state === 'sync-diblokir') {
    lastSyncError = 'tulis-ditolak-rules';
  } else if (state === 'needs-aksara-account' || state === 'firebase-token-gagal'
    || state === 'firebase-signin-gagal' || state === 'firebase-token-kosong'
    || state === 'bridge-skor-belum-siap' || state === 'belum-terhubung') {
    lastSyncError = state;
  } else {
    lastSyncError = null; // 'belum' generik = belum pernah tersinkron, bukan error
  }
  applySyncStatus();
}

// --- UI Pengaturan: kartu Akun AMOGENZ ala Pusat Akun -----------------------
function renderAksaraRow() {
  const loginBox = $('aksara-login-box');
  const linkedBox = $('aksara-linked-box');
  const nameEl = $('aksara-linked-name');
  const subEl = $('aksara-linked-sub');
  const emailEl = $('aksara-linked-email');
  const avatarImg = $('aksara-linked-avatar');
  const avatarFb = $('aksara-linked-avatar-fallback');
  const sinceEl = $('aksara-linked-since');
  const rankEl = $('aksara-linked-rank');
  const toggle = $('aksara-show-toggle');
  if (!loginBox || !linkedBox) return; // halaman Pengaturan belum dirender
  const me = getIdentity();
  if (!me) {
    loginBox.hidden = false;
    linkedBox.hidden = true;
    applySyncStatus(); // "Belum terhubung ke Akun AMOGENZ"
    return;
  }
  loginBox.hidden = true;
  linkedBox.hidden = false;
  // Kartu Akun AMOGENZ: foto (atau huruf awal bila kosong), nama, @username,
  // email, dan tanggal tertaut — semuanya dari identitas lokal yang sudah
  // tersimpan saat login; tidak ada data yang dikarang.
  if (nameEl) nameEl.textContent = me.name || me.username || 'Pengguna AMOGENZ';
  if (subEl) subEl.textContent = 'Tertaut ke @' + (me.username || '—');
  if (emailEl) {
    if (me.email) {
      emailEl.textContent = me.email;
      emailEl.hidden = false;
    } else {
      emailEl.hidden = true;
    }
  }
  const initial = ((me.name || me.username || 'A').trim()[0] || 'A').toUpperCase();
  if (avatarImg && avatarFb) {
    if (me.picture) {
      avatarImg.src = me.picture;
      avatarImg.hidden = false;
      avatarFb.hidden = true;
    } else {
      avatarImg.hidden = true;
      avatarFb.textContent = initial;
      avatarFb.hidden = false;
    }
  }
  if (sinceEl) {
    if (me.linkedAt) {
      sinceEl.textContent = 'Tertaut sejak ' + new Date(me.linkedAt)
        .toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) + '.';
      sinceEl.hidden = false;
    } else {
      sinceEl.hidden = true;
    }
  }
  if (toggle) toggle.checked = getShowInProfile();
  // Pil rank: skor 0 BUKAN pencapaian — jangan tampilkan "PRAJURIT · 0
  // jawaban benar" seolah sudah ada pencapaian. Tampilkan ajakan kuis.
  const p = buildAchievementPayload();
  if (rankEl) {
    if (p && p.totalBenar > 0) {
      rankEl.className = 'aksara-linked-rank';
      rankEl.textContent = p.rank + ' · ' + p.totalBenar + ' jawaban benar · My Nahwu';
    } else if (p) {
      rankEl.className = 'aksara-linked-rank aksara-rank-empty';
      rankEl.textContent = 'Belum ada jawaban benar — jawab kuis dulu untuk mulai naik rank.';
    } else {
      rankEl.className = 'aksara-linked-rank aksara-rank-empty';
      rankEl.textContent = 'Skor My Nahwu belum siap — tutup lalu buka lagi Pengaturan.';
    }
  }
  // Status atas + catatan bawah dari SATU sumber (applySyncStatus).
  applySyncStatus();
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
  $('btn-aksara-sync')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    if (btn) btn.disabled = true;
    try {
      await syncWithRetry(2);
    } finally {
      if (btn) btn.disabled = false;
    }
  });
  $('aksara-show-toggle')?.addEventListener('change', async (e) => {
    localStorage.setItem('mynahwu_amgz_show', e.target.checked ? '1' : '0');
    renderAksaraRow();
    await syncWithRetry(2); // kirim ulang flag tampil
  });
  renderAksaraRow();
  // Sesudah login: sinkronkan (dengan retry) bila bridge sudah dikonfigurasi.
  // Bila Pengaturan dibuka belakangan (SPA, tanpa reload), sync dicoba lagi
  // lewat pembungkus switchPage di bawah — DOMContentLoaded hanya jalan sekali.
  if (getIdentity()) syncWithRetry(3);
  // Buka Pengaturan (tab Info) → render ulang + coba sync bila belum pernah berhasil.
  const bridge = window.MyNahwuBridge;
  if (bridge && !bridge.__aksaraWrapped) {
    bridge.__aksaraWrapped = true;
    const origSwitch = bridge.switchPage;
    bridge.switchPage = (pageName, ...rest) => {
      const out = origSwitch(pageName, ...rest);
      renderAksaraRow();
      if (pageName === 'info' && getIdentity() && getShowInProfile()
        && !localStorage.getItem('mynahwu_amgz_last_sync')) {
        syncWithRetry(3);
      }
      return out;
    };
  }
});
