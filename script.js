// ═══════════ NAVBAR SCROLL & ACTIVE LINK ═══════════
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.getAttribute('id');
  });
  navLinks.forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('href') === '#' + current) l.classList.add('active');
  });
});

hamburger?.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  hamburger.classList.toggle('active');
});
navLinks.forEach(l => l.addEventListener('click', () => navMenu.classList.remove('open')));

// ═══════════ SCROLL REVEAL ═══════════
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-flip');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('active');
      // staggered children
      const children = e.target.querySelectorAll('.stagger');
      children.forEach((c, i) => {
        setTimeout(() => c.classList.add('active'), i * 150);
      });
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
revealEls.forEach(el => revealObs.observe(el));

// ═══════════ SKILL BARS ANIMATION ═══════════
const skillBars = document.querySelectorAll('.skill-fill');
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const bar = e.target;
      const target = parseInt(bar.dataset.width);
      bar.style.width = target + '%';
      // count up percentage
      const pctEl = bar.closest('.skill-item').querySelector('.skill-pct');
      if (pctEl) countUp(pctEl, target);
      skillObs.unobserve(bar);
    }
  });
}, { threshold: 0.3 });
skillBars.forEach(b => skillObs.observe(b));

function countUp(el, target) {
  let current = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = current + '%';
  }, 30);
}

// ═══════════ STAT COUNTERS ═══════════
const statNums = document.querySelectorAll('.stat-number');
const statObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 30));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current + suffix;
      }, 50);
      statObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(s => statObs.observe(s));

// ═══════════ CONTACT FORM ═══════════
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('fname').value;
  const email = document.getElementById('femail').value;
  const subject = document.getElementById('fsubject').value;
  const message = document.getElementById('fmessage').value;
  const mailtoLink = `mailto:vivek.singh.24cse@bmu.edu.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
  window.location.href = mailtoLink;
});

// ═══════════ SMOOTH SCROLL FOR ALL ANCHOR LINKS ═══════════
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ═══════════ CERT CARD TILT EFFECT ═══════════
document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
  });
});
