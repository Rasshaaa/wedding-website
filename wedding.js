const undangan = document.querySelector('.btn-undangan');
const nav = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar-nav a.nav-link');

// Sticky Navbar
document.addEventListener('scroll', (e) => {
    if (window.scrollY > window.innerHeight) {
    nav.classList.add('fixed');
    } else {
    nav.classList.remove('fixed');
    }
});

// Auto close kalau links di navbar ditekan saat tampilan mobile
navLinks.forEach(function(navLink) {
    navLink.addEventListener('click', function() {
        // Jika navbar dalam mode responsif (hamburger menu), tutup navbar setelah link diklik
        var navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
        }
    });
});

// Transition Hover for Button 'Undangan'
setTimeout(() => {
    undangan.style.transition = '0.3s ease-in-out'
}, 1500);

// Simply Countdown Start Counting
simplyCountdown('.simply-countdown', {
    year: 2032, // required
    month: 8, // required 
    day: 13, // required
    hours: 8, // Default is 0 [0-23] integer
    words: { //words displayed into the countdown
    days: { singular: 'hari', plural: 'hari' },
    hours: { singular: 'jam', plural: 'jam' },
    minutes: { singular: 'menit', plural: 'menit' },
    seconds: { singular: 'detik', plural: 'detik' }
    },
});

// AOS Setup
AOS.init();

// Agar disable scroll saat posisi scroll berada pada titik 0 (teratas)
document.addEventListener('scroll', ()=> {
    if(window.scrollY == 0) {
        disableScroll();
    }
});

// Disable Scroll via add class list
function disableScroll() { 
    document.body.classList.add("stop-scrolling");
}

// Agar saat reload page di section lain tidak disable scroll terlebih dahulu
if(window.scrollY == 0) {
    setTimeout(() => {
        if(window.scrollY == 0) {
            disableScroll();
        }
    }, 1000);
}

// Enable Scroll via add class list
function enableScroll() { 
    document.body.classList.remove("stop-scrolling");
    playAudio();
}

// Play BGM dan ubah display audioIcon menjadi flex
const audioIcon = document.querySelector('.audio-icon');
const bgm = document.querySelector('#bgm');
const audioIconI = document.querySelector('.audio-icon i');
let isPlaying = false;
function playAudio() {
    bgm.volume = 0.1;
    audioIcon.style.display = 'flex';
    bgm.play();
    isPlaying = true;
}

// Audio Icon display (kalo pause ganti jadi icon pause)
audioIcon.onclick = function() {
    if (isPlaying) {
        bgm.pause();
        audioIconI.classList.remove('bi-disc');
        audioIconI.classList.add('bi-pause-circle');
    } else {
        bgm.play();
        audioIconI.classList.add('bi-disc');
        audioIconI.classList.remove('bi-pause-circle');
    }

    isPlaying = !isPlaying;
}

// Supaya tidak pindah tab saat kirim RSVP dan hanya memberikan alert pop-up saja
window.addEventListener("load", function() {
    const form = document.getElementById('my-form');
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const data = new FormData(form);
        const action = e.target.action;
        fetch(action, {
            method: 'POST',
            body: data,
        })
        .then(() => {
            alert("Konfirmasi Kehadiran Berhasil Terkirim!");
        })
    });
});

// Memindahkan class nav-active sesuai dengan ID section mereka
// Tambahkan event listener untuk setiap tautan
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Hapus class nav-active dari tautan yang aktif sebelumnya
        const currentActive = document.querySelector('.nav-active');
        if (currentActive) {
            currentActive.classList.remove('nav-active');
        }
        // Tambahkan class nav-active ke tautan yang saat ini diklik
        this.classList.add('nav-active');
    });
});

// Supaya tidak hanya saat dipencet class active nya berpindah, namun juga saat discroll akan berubah. 
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    const sectionScrollY = {
        'Home': document.getElementById('Home').offsetTop,
        'Info': document.getElementById('Info').offsetTop,
        'Story': document.getElementById('Story').offsetTop,
        'Gallery': document.getElementById('Gallery').offsetTop,
        'RSVP': document.getElementById('RSVP').offsetTop,
        'Gifts': document.getElementById('Gifts').offsetTop
    };

    for (const key in sectionScrollY) {
        const sectionHeight = document.getElementById(key).offsetHeight;
        if (scrollPosition >= sectionScrollY[key] - windowHeight / 2 && scrollPosition < sectionScrollY[key] + sectionHeight - windowHeight / 2) {
            const currentActive = document.querySelector('.nav-active');
            if (currentActive) {
                currentActive.classList.remove('nav-active');
            }
            const newActive = document.querySelector(`.navbar-nav a[href="#${key}"]`);
            if (newActive) {
                newActive.classList.add('nav-active');
            }
        }
    }
});

// Preloader Website dan background images supaya tidak load gambar dahulu saat animasi dijalankan
const preloader = document.getElementById('preloader');
const images = ['img/bg-hero.jpeg', 'img/bg-hero2.jpeg', 'img/bg-hero3.jpeg', 'img/bg-hero4.jpg', 'img/bg-hero5.jpg', 'img/bg-hero6.jpeg'];

function preloadImages() {
    for (let i = 0; i < images.length; i++) {
        const img = new Image();
        img.src = images[i];
    }
}

function hidePreloader() {
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
        AOS.init();
    }, 500);
}

// Call the hidePreloader function when all assets are loaded
window.onload = function () {
    preloadImages();
    hidePreloader();
};

// Nama tamu ditampilkan sesuai dengan form yang diisi
if(!localStorage.getItem('tamu')){
    document.getElementById("formAnjay").style.display = "flex";
    
} else {
    const elm = document.querySelector('#namaSpan');
    console.log(localStorage.getItem('tamu'));
    elm.innerHTML = localStorage.getItem('tamu');
}

document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('nameInput').value;
    const relationshipSelect = document.getElementById('relationshipSelect').value;
    
    // Update URL with new parameters
    const newUrl = `${nameInput} & ${relationshipSelect}`;
    
    localStorage.setItem('tamu' , newUrl)

    const elm = document.querySelector('#namaSpan')
    console.log(localStorage.getItem('tamu'));
    elm.innerHTML = localStorage.getItem('tamu')

    formAnjay.classList.add("hidden");

    // Menghilangkan form nya
    setTimeout(function() {
        formAnjay.style.display = "none";
    }, 1000);

    document.querySelector('#nama').value = nameInput;

});