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
  storageBucket: 'wedding-b0528.firebasestorage.app',
  messagingSenderId: '1068876789536',
  appId: '1:1068876789536:web:76eeb20b013f4dfd6cc945',
  measurementId: 'G-ZCVEYJ91MF',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const ucapanRef = ref(db, 'ucapan');

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('ucapanForm');
  const container = document.getElementById('listUcapan');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nama = document.getElementById('nama').value.trim();
    const pesan = document.getElementById('pesan').value.trim();
    const hadir = document.getElementById('hadir').checked;

    if (!nama || !pesan) {
      alert('Nama dan pesan harus diisi!');
      return;
    }

    const newUcapanRef = push(ucapanRef);
    set(newUcapanRef, {
      nama,
      pesan,
      hadir,
      waktu: Date.now(),
    })
      .then(() => {
        alert('Ucapan berhasil dikirim!');
        form.reset();
      })
      .catch((err) => {
        console.error('Gagal kirim ucapan:', err);
      });
  });

  onValue(ucapanRef, (snapshot) => {
    container.innerHTML = '';
    const data = snapshot.val();
    if (data) {
      const list = Object.values(data).sort((a, b) => b.waktu - a.waktu);
      list.forEach((item) => {
        const el = document.createElement('div');
        el.innerHTML = `<strong>${item.nama}</strong> (${
          item.hadir ? 'Hadir' : 'Tidak Hadir'
        }):<br>${item.pesan}<hr>`;
        container.appendChild(el);
      });
    }
  });
});

