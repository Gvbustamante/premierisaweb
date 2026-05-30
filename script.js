// Countdown timer – target: September 20, 2025 20:00
const target = new Date('2025-09-20T20:00:00').getTime();

function updateCountdown() {
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    document.getElementById('countdown').innerHTML =
      '<p class="hero-xv" style="color:#fff">¡Hoy es el gran día! &#10084;</p>';
    return;
  }

  const days    = Math.floor(diff / 86400000);
  const hours   = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000)  /   60000);
  const seconds = Math.floor((diff % 60000)    /    1000);

  document.getElementById('dias').textContent    = String(days).padStart(2, '0');
  document.getElementById('horas').textContent   = String(hours).padStart(2, '0');
  document.getElementById('minutos').textContent = String(minutes).padStart(2, '0');
  document.getElementById('segundos').textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Navbar shrink on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.padding = window.scrollY > 60 ? '0' : '';
});

// RSVP form submit
document.getElementById('rsvp-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  showToast(`¡Gracias, ${nombre}! Tu asistencia ha sido registrada ❤️`);
  this.reset();
});

function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 4000);
}

// Fade-in sections on scroll
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.15 }
);

document.querySelectorAll('.countdown-section, .about-section, .gallery-section, .program-section, .rsvp-section')
  .forEach(s => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(24px)';
    s.style.transition = 'opacity .7s ease, transform .7s ease';
    observer.observe(s);
  });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.countdown-section, .about-section, .gallery-section, .program-section, .rsvp-section')
    .forEach(s => {
      s.addEventListener('transitionend', () => {});
    });
});

// Add 'visible' class handler via CSS override
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: none !important; }';
document.head.appendChild(style);
