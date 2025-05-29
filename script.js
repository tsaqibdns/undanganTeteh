import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js';
const firebaseConfig = {
    apiKey: 'AIzaSyDFFFFUW2Fs1mCYH2JXonATgDmLNLxPSjg',
    authDomain: 'wedding-b0528.firebaseapp.com',
    databaseURL: 'https://wedding-b0528-default-rtdb.firebaseio.com',
    projectId: 'wedding-b0528',
    storageBucket: 'wedding-b0528.appspot.com',
    messagingSenderId: '1068876789536',
    appId: '1:1068876789536:web:76eeb20b013f4dfd6cc945',
    measurementId: 'G-ZCVEYJ91MF',
  },
  urlParams = new URLSearchParams(window.location.search),
  namaTamu = urlParams.get('to');
if (namaTamu) {
  const e = toCamelCase(namaTamu),
    t = document.getElementById('ucapan-nama');
  t && (t.innerText = `Yth. Bapak/Ibu/Saudara/i ${e}`);
}
const app = initializeApp(firebaseConfig),
  db = getDatabase(app),
  ucapanRef = ref(db, 'ucapan'),
  form = document.getElementById('ucapanForm'),
  container = document.getElementById('listUcapan');
function toCamelCase(e) {
  return e
    .toLowerCase()
    .split(' ')
    .filter((e) => '' !== e.trim())
    .map((e) => e[0].toUpperCase() + e.slice(1))
    .join(' ');
}
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const t = document.getElementById('nama').value.trim(),
    a = document.getElementById('pesan').value.trim(),
    n = document.getElementById('hadir').value;
  if (!t || !a || '' === n)
    return void alert('Nama, pesan, dan status kehadiran harus diisi!');
  const o = 'true' === n,
    s = push(ucapanRef);
  set(s, { nama: t, pesan: a, hadir: o, waktu: Date.now() })
    .then(() => {
      Swal.fire({
        title: 'Du‘ā Received 🤍',
        text: 'JazākAllāhu Khayran for your kind wishes and heartfelt du‘ā for the bride and groom.',
        icon: 'success',
        confirmButtonText: 'Alhamdulillāh ✨',
      }),
        form.reset();
    })
    .catch((e) => {
      console.error('Gagal kirim ucapan:', e),
        Swal.fire({
          title: 'Subhanallah',
          text: 'Something went wrong. Maybe your name is not on the invitation list or there was a typo in your input.',
          icon: 'error',
          confirmButtonText: 'Inshā’Allāh I will',
        });
    });
}),
  onValue(ucapanRef, (e) => {
    container.innerHTML = '';
    const t = e.val();
    if (t) {
      Object.values(t)
        .sort((e, t) => t.waktu - e.waktu)
        .forEach((e) => {
          toCamelCase(e.nama);
          const t = document.createElement('div');
          (t.innerHTML = `\n        <strong>${
            e.nama
          }</strong> \n        <span class="status-badge ${e.hadir}">${
            e.hadir ? 'Hadir' : 'Tidas Hadir'
          }</span>\n        <br>${e.pesan}\n      `),
            container.appendChild(t);
        });
    }
  });
const countDownDate = new Date('2025-06-09T00:00:00Z').getTime();
function updateCountdown() {
  const e = new Date().getTime(),
    t = countDownDate - e,
    a = Math.max(0, Math.floor(t / 864e5)),
    n = Math.max(0, Math.floor((t % 864e5) / 36e5)),
    o = Math.max(0, Math.floor((t % 36e5) / 6e4)),
    s = Math.max(0, Math.floor((t % 6e4) / 1e3));
  (document.getElementById('days').textContent = String(a).padStart(2, '0')),
    (document.getElementById('hours').textContent = String(n).padStart(2, '0')),
    (document.getElementById('minutes').textContent = String(o).padStart(
      2,
      '0'
    )),
    (document.getElementById('seconds').textContent = String(s).padStart(
      2,
      '0'
    ));
}

updateCountdown(),
  setInterval(updateCountdown, 1e3),
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      (document.getElementById('splash-screen').style.display = 'none'),
        (document.getElementById('main-content').style.display = 'block');
    }, 2500);
  });
  
const bgMusic = document.getElementById('bg-music');
function enableAudio() {
  bgMusic.play().catch((e) => {
    console.log('Autoplay prevented:', e);
  }),
    document.removeEventListener('click', enableAudio),
    document.removeEventListener('touchstart', enableAudio);
}
document.addEventListener('click', enableAudio),
  document.addEventListener('touchstart', enableAudio);
const music = document.getElementById('bg-music'),
  toggleBtn = document.getElementById('toggle-music'),
  icon = toggleBtn.querySelector('i');
toggleBtn.addEventListener('click', () => {
  music.paused
    ? (music.play(),
      icon.classList.remove('fa-play'),
      icon.classList.add('fa-pause'))
    : (music.pause(),
      icon.classList.remove('fa-pause'),
      icon.classList.add('fa-play'));
}),
  document.addEventListener('DOMContentLoaded', () => {
    icon.classList.add(music.paused ? 'fa-play' : 'fa-pause');
  });
let lastScrollTop = 0;
const musicBtn = document.getElementById('toggle-music');
window.addEventListener('scroll', () => {
  const e = window.pageYOffset || document.documentElement.scrollTop;
  e > lastScrollTop
    ? musicBtn.classList.add('hide')
    : musicBtn.classList.remove('hide'),
    (lastScrollTop = e <= 0 ? 0 : e);
});
