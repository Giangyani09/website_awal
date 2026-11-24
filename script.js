const envelope = document.getElementById('envelope');
const envelopeStage = document.getElementById('envelopeStage');
const greetingCard = document.getElementById('greetingCard');
const closeCardBtn = document.getElementById('closeCardBtn');

const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');
const musicText = document.getElementById('musicText');

let isPlaying = false;
let isOpened = false;

// Fungsi Kontrol Musik
function toggleMusic(forcePlay = false) {
  if (forcePlay && isPlaying) return;

  if (!isPlaying || forcePlay) {
    bgMusic.play().then(() => {
      isPlaying = true;
      musicBtn.classList.add('playing');
      musicIcon.textContent = '⏸';
      musicText.textContent = 'Jeda Musik';
    }).catch(() => {
      // Browser memblokir autoplay sebelum interaksi
      console.log('Menunggu interaksi pengguna untuk memutar audio.');
    });
  } else {
    bgMusic.pause();
    isPlaying = false;
    musicBtn.classList.remove('playing');
    musicIcon.textContent = '▶';
    musicText.textContent = 'Putar Musik';
  }
}

musicBtn.addEventListener('click', () => toggleMusic(false));

// Animasi Membuka Amplop
envelope.addEventListener('click', () => {
  if (isOpened) return;
  isOpened = true;

  // Mulai musik otomatis saat amplop diklik (opsional, bisa dijeda lewat tombol)
  toggleMusic(true);

  // Buka tutup amplop & naikkan kertas
  envelope.classList.add('open');

  // Jalankan efek kelopak bunga jatuh
  createPetals();

  // Transisi dari amplop ke kartu penuh
  setTimeout(() => {
    envelopeStage.classList.add('hidden');
    greetingCard.classList.add('visible');
    
    // Sedikit jeda agar transisi CSS berjalan mulus
    requestAnimationFrame(() => {
      greetingCard.classList.add('animate-in');
    });
  }, 950);
});

// Tombol untuk kembali melipat kartu ke dalam amplop
closeCardBtn.addEventListener('click', () => {
  greetingCard.classList.remove('animate-in');
  
  setTimeout(() => {
    greetingCard.classList.remove('visible');
    envelopeStage.classList.remove('hidden');
    envelope.classList.remove('open');
    isOpened = false;
  }, 500);
});

// Efek Kelopak Bunga Lembut
function createPetals() {
  const colors = ['#f8bbd0', '#f48fb1', '#fce4ec', '#c5cae9'];
  for (let i = 0; i < 25; i++) {
    setTimeout(() => {
      const petal = document.createElement('div');
      petal.classList.add('petal');
      
      const size = Math.random() * 12 + 8;
      petal.style.width = `${size}px`;
      petal.style.height = `${size}px`;
      petal.style.left = `${Math.random() * 100}vw`;
      petal.style.background = colors[Math.floor(Math.random() * colors.length)];
      petal.style.animationDuration = `${Math.random() * 3 + 3}s`;
      
      document.body.appendChild(petal);

      setTimeout(() => {
        petal.remove();
      }, 6000);
    }, i * 120);
  }
}