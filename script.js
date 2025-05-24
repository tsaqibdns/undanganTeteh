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
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const ucapanRef = ref(db, 'ucapan');

const form = document.getElementById('ucapanForm');
const container = document.getElementById('listUcapan');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nama = document.getElementById('nama').value.trim();
  const pesan = document.getElementById('pesan').value.trim();
  const hadirValue = document.getElementById('hadir').value;

  if (!nama || !pesan || hadirValue === '') {
    alert('Nama, pesan, dan status kehadiran harus diisi!');
    return;
  }

  const hadir = hadirValue === 'true'; // ubah string ke boolean

  const newUcapanRef = push(ucapanRef);
  set(newUcapanRef, {
    nama,
    pesan,
    hadir,
    waktu: Date.now(),
  })
    .then(() => {
      Swal.fire({
        title: 'Du‘ā Received 🤍',
        text: 'JazākAllāhu Khayran for your kind wishes and heartfelt du‘ā for the bride and groom.',
        icon: 'success',
        confirmButtonText: 'Alhamdulillāh ✨',
      });
      form.reset();
    })
    .catch((err) => {
      console.error('Gagal kirim ucapan:', err);
      Swal.fire({
        title: 'Alhamdulillāh ✨',
        text: 'SubḥānAllāh… Something went wrong',
        icon: 'error',
        confirmButtonText: 'Inshā’Allāh I will',
      });
    });
});

onValue(ucapanRef, (snapshot) => {
  container.innerHTML = '';
  const data = snapshot.val();
  if (data) {
    const list = Object.values(data).sort((a, b) => b.waktu - a.waktu);
    list.forEach((item) => {
      const el = document.createElement('div');
      el.innerHTML = `
        <strong>${item.nama}</strong> 
        <span class="status-badge ${item.hadir}">${
        item.hadir ? 'Attend' : 'Not Attend'
      }</span>
        <br>${item.pesan}
      `;
      container.appendChild(el);
    });
  }
});

const countDownDate = new Date('2025-06-09T00:00:00Z').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countDownDate - now;

  // Time calculations
  const days = Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24)));
  const hours = Math.max(
    0,
    Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const minutes = Math.max(
    0,
    Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  );
  const seconds = Math.max(0, Math.floor((distance % (1000 * 60)) / 1000));

  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(
    2,
    '0'
  );
  document.getElementById('seconds').textContent = String(seconds).padStart(
    2,
    '0'
  );
}

updateCountdown();
setInterval(updateCountdown, 1000); // Update every second

document.addEventListener('DOMContentLoaded', () => {
  // Tunggu 2.5 detik sebelum menampilkan konten utama
  setTimeout(() => {
    document.getElementById('splash-screen').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
  }, 2500);
});
