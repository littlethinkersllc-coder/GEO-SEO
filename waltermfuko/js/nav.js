// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  var overlay = document.querySelector('.nav-overlay');

  if (!toggle || !links) return;

  function closeMenu() {
    toggle.classList.remove('open');
    links.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function openMenu() {
    toggle.classList.add('open');
    links.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  toggle.addEventListener('click', function () {
    if (links.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close menu when a link is clicked
  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on ESC key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
});
