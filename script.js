// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('primary-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');     // show/hide menu
    toggle.classList.toggle('is-open', isOpen);      // animate hamburger → X (CSS uses .is-open)
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.classList.toggle('nav-open', isOpen); // lock background scroll while open
  });
}

// Close mobile nav when clicking a link (for small screens)
document.querySelectorAll('#primary-nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (!toggle || !nav) return;
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    }
  });
});

// Set active nav link based on body[data-page]
const page = document.body.getAttribute('data-page');
document.querySelectorAll('nav a[data-nav]').forEach(a => {
  if (a.dataset.nav === page) a.classList.add('is-active');
});

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Contact form simple client-side validation + fake submit
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = document.getElementById('formStatus');
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    let valid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Reset errors
    form.querySelectorAll('.error').forEach(el => el.textContent = '');

    if (name.length < 2) {
      form.querySelector('#name + .error').textContent = 'Please enter at least 2 characters.';
      valid = false;
    }
    if (!emailPattern.test(email)) {
      form.querySelector('#email + .error').textContent = 'Please enter a valid email address.';
      valid = false;
    }
    if (message.length < 10) {
      form.querySelector('#message + .error').textContent = 'Please enter at least 10 characters.';
      valid = false;
    }

    if (!valid) {
      status.textContent = 'Please fix the errors above.';
      return;
    }

    // Simulate success
    status.textContent = 'Thanks! Your message has been sent.';
    form.reset();
  });
}
