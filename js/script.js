/**
 * DIAMOND CLEAN — Company Profile Interactive Scripts
 * Handles mobile navigation, WhatsApp inquiry generator, modal handlers, and accessibility.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initActiveNavLink();
  initContactFormToWhatsApp();
  initVideoPlayerModal();
  initYear();
});

/**
 * Mobile Navigation Drawer
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');

  if (!toggleBtn || !mobileMenu) return;

  const toggle = (force) => {
    const isCurrentlyOpen = mobileMenu.style.display === 'block' || (!mobileMenu.classList.contains('hidden') && mobileMenu.style.display !== 'none');
    const nextState = force !== undefined ? force : !isCurrentlyOpen;
    toggleBtn.setAttribute('aria-expanded', String(nextState));

    if (nextState) {
      mobileMenu.style.display = 'block';
      mobileMenu.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    } else {
      mobileMenu.style.display = 'none';
      mobileMenu.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  };

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle(false);
    });
  }

  // Close when clicking overlay backdrop or links
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu || e.target.id === 'mobile-menu-backdrop' || e.target.closest('a')) {
      toggle(false);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && (mobileMenu.style.display === 'block' || !mobileMenu.classList.contains('hidden'))) {
      toggle(false);
      toggleBtn.focus();
    }
  });
}

/**
 * Automatically highlight the active navigation item based on current page
 */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('[data-nav-link]');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('text-[#0B6E4F]', 'font-semibold');
      link.classList.remove('text-gray-600');
    }
  });
}

/**
 * Form to WhatsApp Generator on contact.html
 * Transforms static form inputs into an automated WhatsApp chat prompt.
 */
function initContactFormToWhatsApp() {
  const contactForm = document.getElementById('wa-contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('client-name');
    const companyInput = document.getElementById('client-company');
    const sectorInput = document.getElementById('client-sector');
    const messageInput = document.getElementById('client-message');

    const name = nameInput ? nameInput.value.trim() : '';
    const company = companyInput ? companyInput.value.trim() : '-';
    const sector = sectorInput ? sectorInput.value : 'Umum';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !message) {
      alert('Mohon lengkapi Nama Anda dan Kebutuhan/Pesan terlebih dahulu.');
      return;
    }

    const waPhone = '62882007907237';
    const textMessage = 
`Halo Diamond Clean, saya ingin konsultasi produk kebersihan.

*Nama:* ${name}
*Usaha / Perusahaan:* ${company}
*Sektor Usaha:* ${sector}

*Kebutuhan / Pesan:*
${message}`;

    const encodedText = encodeURIComponent(textMessage);
    const waUrl = `https://wa.me/${waPhone}?text=${encodedText}`;

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });
}

/**
 * Video Section Modal & Helper
 * Handles video playback trigger and demonstrates ease of swapping with local MP4 or YouTube embed.
 */
function initVideoPlayerModal() {
  const playButton = document.getElementById('play-video-btn');
  const modal = document.getElementById('video-modal');
  const modalClose = document.getElementById('video-modal-close');
  const videoElement = document.getElementById('company-video-player');

  if (!playButton || !modal) return;

  const openModal = () => {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
    if (videoElement && videoElement.play) {
      videoElement.play().catch(() => {});
    }
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
    if (videoElement && videoElement.pause) {
      videoElement.pause();
    }
  };

  playButton.addEventListener('click', openModal);

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/**
 * Dynamic Copyright Year
 */
function initYear() {
  const yearEls = document.querySelectorAll('.dynamic-year');
  const currentYear = new Date().getFullYear();
  yearEls.forEach((el) => {
    el.textContent = currentYear;
  });
}
