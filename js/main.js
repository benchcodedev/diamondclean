/* ==========================================================================
   DIAMOND CLEAN - Main Interactive Controller (main.js)
   Bumigas Architecture Adaptation with Smooth Physics & Mobile Transitions
   ========================================================================== */

/* --------------------------------------------------------------------------
   0. CLEAN URL MANAGER (Immediate URL normalization & Local routing)
   -------------------------------------------------------------------------- */
(function initCleanUrls() {
  if (typeof window === 'undefined' || !window.location) return;
  if (!window.location.protocol.startsWith('http')) return;

  // Normalize URL in browser address bar immediately without reloading
  try {
    const path = window.location.pathname;
    if (path.endsWith('/index.html') || path === '/index.html') {
      const clean = path.replace(/\/index\.html$/, '') || '/';
      window.history.replaceState(null, '', clean + window.location.search + window.location.hash);
    } else if (path.endsWith('.html')) {
      const clean = path.slice(0, -5);
      window.history.replaceState(null, '', clean + window.location.search + window.location.hash);
    }
  } catch (e) {}

  // Local development route resolution (for simple servers like python http.server)
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (!link || !link.href) return;

    const rawHref = link.getAttribute('href');
    if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:') || rawHref.startsWith('javascript:')) return;

    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (!isLocal) return;

    try {
      const url = new URL(link.href);
      if (url.origin === window.location.origin) {
        const routes = {
          '/': '/index.html',
          '/about': '/about.html',
          '/product-catalogue': '/product-catalogue.html',
          '/solutions': '/product-catalogue.html',
          '/product': '/product-catalogue.html',
          '/industries': '/industries.html',
          '/certification': '/certification.html',
          '/sustainability': '/certification.html',
          '/contact': '/contact.html'
        };

        const targetPath = url.pathname.replace(/\/$/, '') || '/';
        if (routes[targetPath]) {
          e.preventDefault();
          window.location.href = routes[targetPath] + url.search + url.hash;
        }
      }
    } catch (err) {}
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initScrollAnimations();
  initStatsCounters();
  initAccordions();
  initVideoPlayer();
  initWhatsAppForms();
  initBackToTop();
  initSmoothAnchorScroll();
  initProductLightbox();
  initProductDetailModal();
  initProductSlider();
});

/* --------------------------------------------------------------------------
   1. STICKY HEADER & SCROLL TRANSFORMATIONS
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 40) {
          header.classList.add('scrolled');
          header.classList.remove('transparent-theme');
        } else {
          // If the page has a transparent hero, revert to transparent
          if (document.body.classList.contains('has-transparent-hero')) {
            header.classList.remove('scrolled');
            header.classList.add('transparent-theme');
          }
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  onScroll(); // Initial check
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* --------------------------------------------------------------------------
   2. SILKY SMOOTH MOBILE MENU DRAWER
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const burgerMenu = document.querySelector('.burger-menu');
  const navMenu = document.querySelector('.nav-menu');

  if (!burgerMenu || !navMenu) return;

  // Create or retrieve backdrop element
  let backdrop = document.querySelector('.mobile-menu-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'mobile-menu-backdrop';
    document.body.appendChild(backdrop);
  }

  const toggleMenu = (forceClose = false) => {
    const shouldOpen = forceClose ? false : !navMenu.classList.contains('active');

    if (shouldOpen) {
      burgerMenu.classList.add('open');
      navMenu.classList.add('active');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden'; // Lock scroll cleanly
    } else {
      burgerMenu.classList.remove('open');
      navMenu.classList.remove('active');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  burgerMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  backdrop.addEventListener('click', () => toggleMenu(true));

  // Close when tapping any link inside the mobile drawer
  const navLinks = navMenu.querySelectorAll('.nav-link, .btn');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(true);
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      toggleMenu(true);
    }
  });
}

/* --------------------------------------------------------------------------
   3. HARDWARE-ACCELERATED SCROLL REVEAL ANIMATIONS
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (reveals.length === 0) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(element => {
    revealObserver.observe(element);
  });
}

/* --------------------------------------------------------------------------
   4. STATISTICAL NUMBER COUNTER ANIMATION (500+, 7, 100%, 35%)
   -------------------------------------------------------------------------- */
function initStatsCounters() {
  const counters = document.querySelectorAll('.counter-value');
  if (counters.length === 0) return;

  const countUp = (counter) => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const suffix = counter.getAttribute('data-suffix') || '';
    const speed = parseInt(counter.getAttribute('data-speed')) || 1800;
    const stepTime = 25;

    let current = 0;
    const increment = target / (speed / stepTime);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      if (Number.isInteger(target)) {
        counter.textContent = Math.floor(current) + suffix;
      } else {
        counter.textContent = current.toFixed(1) + suffix;
      }
    }, stepTime);
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.4
  });

  counters.forEach(counter => {
    statsObserver.observe(counter);
  });
}

/* --------------------------------------------------------------------------
   5. SILKY SMOOTH ACCORDION FAQ LOGIC (CSS Grid 60FPS)
   -------------------------------------------------------------------------- */
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  if (accordionHeaders.length === 0) return;

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Close other accordions in the same container
      const container = item.closest('.accordion');
      if (container) {
        container.querySelectorAll('.accordion-item').forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
      }

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. VIDEO SHOWCASE PLAYER CONTROLLER (PREMIER FEATURE ON HOME)
   -------------------------------------------------------------------------- */
function initVideoPlayer() {
  const videoElement = document.getElementById('company-video');
  const playTrigger = document.getElementById('video-play-btn');
  const overlayDetails = document.getElementById('video-overlay');
  const customControls = document.getElementById('video-custom-controls');
  const playPauseBtn = document.getElementById('ctrl-play-pause');
  const muteBtn = document.getElementById('ctrl-mute');
  const tabButtons = document.querySelectorAll('.video-tab-btn');
  const videoTitle = document.getElementById('video-display-title');
  const videoDesc = document.getElementById('video-display-desc');
  const videoBadge = document.getElementById('video-display-badge');

  if (!videoElement) return;

  // Video topic metadata with chapter timestamps (bilingual responsive)
  const getVideoTopics = () => {
    const lang = (window.DiamondI18n && window.DiamondI18n.get) ? window.DiamondI18n.get() : 'id';
    const dict = (window.DiamondI18n && window.DiamondI18n.translations && window.DiamondI18n.translations[lang]) || {};
    return {
      'profile': {
        title: dict.video_chapter_1_title || 'Diamond Clean — Profil Pasokan Chemical & Kemasan 5L Industri',
        desc: dict.video_chapter_1_desc || 'Saksikan komitmen kami dalam menghadirkan formulasi konsentrat pembersih berdaya bersih tinggi dengan kemasan 5L hemat biaya bagi mitra usaha.',
        badge: dict.video_chapter_1_badge || 'PRODUKSI & SUPPLY 5L',
        time: 0
      },
      'testing': {
        title: dict.video_chapter_2_title || 'Uji Kinerja Formulasi: Busa Melimpah & Daya Angkat Minyak Seketika',
        desc: dict.video_chapter_2_desc || 'Demonstrasi daya angkat lemak pada sabun cuci piring dan performa busa salju shampo mobil yang efektif namun tetap aman dengan pH balance seimbang.',
        badge: dict.video_chapter_2_badge || 'UJI LABORATORIUM & KINERJA',
        time: 3.3
      },
      'halal': {
        title: dict.video_chapter_3_title || 'Standar Mutu Higienis & Kepatuhan Sertifikasi Halal Indonesia',
        desc: dict.video_chapter_3_desc || 'Seluruh lini formulasi sabun Diamond Clean diproduksi bebas dari bahan non-halal dan alkohol berbahaya, menjamin keamanan mutlak untuk hotel, resto, dan café Anda.',
        badge: dict.video_chapter_3_badge || '100% HALAL INDONESIA',
        time: 6.6
      }
    };
  };

  const updatePlayBtnIcon = (isPlaying) => {
    if (!playPauseBtn) return;
    if (isPlaying) {
      playPauseBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
      `;
    } else {
      playPauseBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
      `;
    }
  };

  const startPlayback = () => {
    const playPromise = videoElement.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        if (overlayDetails) overlayDetails.classList.add('playing');
        if (playTrigger) playTrigger.style.display = 'none';
        updatePlayBtnIcon(true);
      }).catch(err => {
        console.log('Video playback error:', err);
      });
    }
  };

  const pausePlayback = () => {
    videoElement.pause();
    if (overlayDetails) overlayDetails.classList.remove('playing');
    if (playTrigger) playTrigger.style.display = 'flex';
    updatePlayBtnIcon(false);
  };

  const togglePlay = () => {
    if (videoElement.paused) {
      startPlayback();
    } else {
      pausePlayback();
    }
  };

  if (playTrigger) {
    playTrigger.addEventListener('click', togglePlay);
  }

  if (videoElement) {
    videoElement.addEventListener('click', togglePlay);
    videoElement.addEventListener('ended', () => {
      if (!videoElement.loop) {
        pausePlayback();
      }
    });

    // Auto-sync active tab button and caption during continuous playback
    let isUserSeeking = false;
    videoElement.addEventListener('timeupdate', () => {
      if (isUserSeeking) return;
      const cur = videoElement.currentTime;
      let activeKey = 'profile';
      if (cur >= 6.6) {
        activeKey = 'halal';
      } else if (cur >= 3.3) {
        activeKey = 'testing';
      }

      tabButtons.forEach(b => {
        const key = b.getAttribute('data-topic');
        if (key === activeKey) {
          if (!b.classList.contains('active')) {
            b.classList.add('active');
            const topics = getVideoTopics();
            const topicData = topics[activeKey];
            if (topicData) {
              if (videoTitle) videoTitle.textContent = topicData.title;
              if (videoDesc) videoDesc.textContent = topicData.desc;
              if (videoBadge) videoBadge.textContent = topicData.badge;
            }
          }
        } else {
          b.classList.remove('active');
        }
      });
    });
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlay();
    });
  }

  if (muteBtn) {
    muteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      videoElement.muted = !videoElement.muted;
      if (videoElement.muted) {
        muteBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
        `;
      } else {
        muteBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        `;
      }
    });
  }

  // Topic Switcher Tabs - Seamless chapter navigation without stopping playback
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const topicKey = btn.getAttribute('data-topic');
      const topics = getVideoTopics();
      const topicData = topics[topicKey];
      if (topicData) {
        if (videoTitle) videoTitle.textContent = topicData.title;
        if (videoDesc) videoDesc.textContent = topicData.desc;
        if (videoBadge) videoBadge.textContent = topicData.badge;

        // Jump smoothly to chapter timestamp
        if (typeof topicData.time === 'number') {
          videoElement.currentTime = topicData.time;
        }

        // Keep playing continuously without pausing
        startPlayback();
      }
    });
  });

  // Re-sync active topic text when language switches
  window.addEventListener('languageChanged', () => {
    const activeBtn = document.querySelector('.video-tab-btn.active') || document.querySelector('.video-tab-btn');
    const topicKey = activeBtn ? activeBtn.getAttribute('data-topic') : 'profile';
    const topics = getVideoTopics();
    const topicData = topics[topicKey];
    if (topicData) {
      if (videoTitle) videoTitle.textContent = topicData.title;
      if (videoDesc) videoDesc.textContent = topicData.desc;
      if (videoBadge) videoBadge.textContent = topicData.badge;
    }
  });
}

/* --------------------------------------------------------------------------
   7. INTERACTIVE WHATSAPP QUOTATION GENERATOR
   -------------------------------------------------------------------------- */
function initWhatsAppForms() {
  const quoteForm = document.getElementById('b2b-quote-form');
  if (!quoteForm) return;

  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name')?.value.trim() || 'Mitra Usaha';
    const company = document.getElementById('form-company')?.value.trim() || '-';
    const sector = document.getElementById('form-sector')?.value || 'Umum';
    const product = document.getElementById('form-product')?.value || 'Ragam Sabun 5L';
    const volume = document.getElementById('form-volume')?.value || 'Konsultasi Kebutuhan';
    const notes = document.getElementById('form-notes')?.value.trim() || 'Mohon info harga grosir dan ketersediaan sampel.';

    const isEn = (window.DiamondI18n && window.DiamondI18n.get && window.DiamondI18n.get() === 'en');
    const message = isEn ?
      `*OFFICIAL QUOTATION & SAMPLE REQUEST — DIAMOND CLEAN*
------------------------------------------------
👤 *Full Name:* ${name}
🏢 *Company / Business:* ${company}
🏷️ *Business Sector:* ${sector}
🧴 *Required Product:* ${product}
📦 *Estimated Volume:* ${volume}
💬 *Notes / Special Requests:* ${notes}
------------------------------------------------
_Sent automatically via Diamond Clean Official Website_` :
      `*PERMINTAAN PENAWARAN & SAMPEL — DIAMOND CLEAN*
------------------------------------------------
👤 *Nama:* ${name}
🏢 *Perusahaan / Usaha:* ${company}
🏷️ *Sektor Usaha:* ${sector}
🧴 *Kebutuhan Produk:* ${product}
📦 *Estimasi Kebutuhan:* ${volume}
💬 *Catatan:* ${notes}
------------------------------------------------
_Terkirim otomatis melalui Website Resmi Diamond Clean_`;

    const encodedMsg = encodeURIComponent(message);
    const waUrl = `https://wa.me/62882007907237?text=${encodedMsg}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });
}

/* --------------------------------------------------------------------------
   8. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  let backBtn = document.querySelector('.back-to-top');
  if (!backBtn) {
    backBtn = document.createElement('button');
    backBtn.className = 'back-to-top';
    backBtn.setAttribute('aria-label', 'Kembali ke atas');
    backBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>';
    document.body.appendChild(backBtn);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 380) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  }, { passive: true });

  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    smoothScrollTo(0, 600);
  });
}

/* --------------------------------------------------------------------------
   9. HIGH-PERFORMANCE SMOOTH SCROLL ENGINE (Mobile/HP & Desktop)
   -------------------------------------------------------------------------- */
function smoothScrollTo(targetY, duration = 600) {
  const startY = window.pageYOffset || document.documentElement.scrollTop;
  const diff = targetY - startY;
  if (Math.abs(diff) < 2) return;

  // Use native smooth scrolling if supported and preferred, else animate with cubic-bezier
  const startTime = performance.now();
  const easeInOutCubic = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  let animationFrame;
  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startY + diff * easedProgress);

    if (progress < 1) {
      animationFrame = requestAnimationFrame(step);
    }
  }

  // Cancel immediately if the user interacts with the screen during scrolling
  const cancel = () => {
    cancelAnimationFrame(animationFrame);
    window.removeEventListener('wheel', cancel);
    window.removeEventListener('touchstart', cancel);
    window.removeEventListener('touchmove', cancel);
  };
  window.addEventListener('wheel', cancel, { passive: true });
  window.addEventListener('touchstart', cancel, { passive: true });
  window.addEventListener('touchmove', cancel, { passive: true });

  animationFrame = requestAnimationFrame(step);
}

function initSmoothAnchorScroll() {
  // Delegate click for any anchor link pointing to a section on the current page
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (!link || !link.href) return;

    const rawHref = link.getAttribute('href');
    if (!rawHref) return;

    let hash = '';
    if (rawHref.startsWith('#')) {
      hash = rawHref;
    } else {
      try {
        const url = new URL(link.href, window.location.href);
        const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
        const targetPath = url.pathname.replace(/\/$/, '') || '/';
        const isSamePage = targetPath === currentPath ||
                           targetPath.replace(/\.html$/, '') === currentPath.replace(/\.html$/, '') ||
                           (currentPath === '/' && targetPath === '/index.html') ||
                           (currentPath === '/index.html' && targetPath === '/');
        if (url.origin === window.location.origin && isSamePage && url.hash) {
          hash = url.hash;
        }
      } catch (err) {}
    }

    if (!hash || hash === '#' || hash === '') return;

    const targetEl = document.querySelector(hash);
    if (targetEl) {
      e.preventDefault();

      // If mobile menu is open, smoothly close it
      const burgerMenu = document.querySelector('.burger-menu');
      const navMenu = document.querySelector('.nav-menu');
      const backdrop = document.querySelector('.mobile-menu-backdrop');
      if (navMenu && navMenu.classList.contains('active')) {
        burgerMenu?.classList.remove('open');
        navMenu.classList.remove('active');
        backdrop?.classList.remove('active');
        document.body.style.overflow = '';
      }

      const headerHeight = document.querySelector('.header')?.offsetHeight || 75;
      const targetPos = Math.max(0, targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight + 2);

      smoothScrollTo(targetPos, 650);

      try {
        history.pushState(null, '', hash);
      } catch (err) {}
    }
  });

  // Handle smooth scroll on initial page load if hash exists
  if (window.location.hash) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        try {
          const targetEl = document.querySelector(window.location.hash);
          if (targetEl) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 75;
            const targetPos = Math.max(0, targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight + 2);
            smoothScrollTo(targetPos, 700);
          }
        } catch (e) {}
      }, 150);
    });
  }
};

/* --------------------------------------------------------------------------
   10. PRODUCT FLYER LIGHTBOX MODAL
   -------------------------------------------------------------------------- */
function initProductLightbox() {
  let modal = document.querySelector('.flyer-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'flyer-modal';
    modal.innerHTML = `
      <div class="flyer-modal-container">
        <div class="flyer-modal-header">
          <span class="flyer-modal-title">Brosur Produk Diamond Clean 5L</span>
          <button class="flyer-modal-close" aria-label="Tutup Brosur">&times;</button>
        </div>
        <div class="flyer-modal-body">
          <img src="" alt="Brosur Produk" id="flyer-modal-img">
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.flyer-modal-close');
    const closeModal = () => modal.classList.remove('active');

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  const modalImg = modal.querySelector('#flyer-modal-img');
  const modalTitle = modal.querySelector('.flyer-modal-title');

  document.querySelectorAll('.product-img-box').forEach(box => {
    box.addEventListener('click', (e) => {
      // Prevent opening lightbox when clicking slider controls
      if (e.target.closest('.slider-nav') || e.target.closest('.variant-pill') || e.target.closest('.slider-dots')) {
        return;
      }

      // Check for active slide in slider, or regular img
      const img = box.querySelector('.slider-slide.active img') || box.querySelector('img');
      if (img && modalImg) {
        modalImg.src = img.src;
        modalImg.alt = img.alt || 'Brosur Produk';
        if (modalTitle) {
          modalTitle.textContent = img.alt || 'Brosur Produk Diamond Clean 5L';
        }
        modal.classList.add('active');
      }
    });
  });

  // Support for Certificate Document Lightbox
  document.querySelectorAll('.cert-lightbox-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const card = trigger.closest('.cert-doc-card') || trigger;
      const img = card.querySelector('.cert-doc-img') || trigger.querySelector('img');
      const docTitle = trigger.getAttribute('data-doc-title') || (card ? card.getAttribute('data-doc-title') : null);
      if (img && modalImg) {
        modalImg.src = img.src;
        modalImg.alt = img.alt || 'Dokumen Sertifikasi Resmi';
        if (modalTitle) {
          modalTitle.textContent = docTitle || img.alt || 'Dokumen Sertifikasi Resmi';
        }
        modal.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   10b. PRODUCT DETAIL & FULL SPECIFICATIONS MODAL
   (Bisa Diklik Pada Judul / Deskripsi / Spesifikasi Kartu untuk Baca Lengkap)
   -------------------------------------------------------------------------- */
function initProductDetailModal() {
  let modal = document.querySelector('.product-detail-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'product-detail-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Detail Spesifikasi Produk');
    modal.innerHTML = `
      <div class="product-detail-modal-container">
        <div class="product-detail-modal-header">
          <div class="product-detail-modal-header-left">
            <div class="product-detail-modal-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <span class="product-detail-modal-title">Detail Spesifikasi Produk</span>
          </div>
          <button class="product-detail-modal-close" aria-label="Tutup Detail">&times;</button>
        </div>
        <div class="product-detail-modal-body">
          <div class="product-detail-img-box">
            <img src="" alt="Foto Produk" id="product-detail-modal-img">
          </div>
          <div class="product-detail-content">
            <div class="product-detail-tag" id="product-detail-modal-tag">✨ Kemasan Grosir</div>
            <h3 class="product-detail-name" id="product-detail-modal-name">Nama Produk</h3>
            <p class="product-detail-desc" id="product-detail-modal-desc">Deskripsi produk lengkap.</p>
            
            <div class="product-detail-specs-heading" id="product-detail-modal-specs-heading">Spesifikasi &amp; Karakteristik</div>
            <div class="product-detail-specs-table" id="product-detail-modal-specs">
              <!-- Dynamic spec rows -->
            </div>

            <div class="product-detail-actions">
              <a href="#" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" id="product-detail-modal-wa">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span class="btn-text">Pesan via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.product-detail-modal-close');
    const closeModal = () => modal.classList.remove('active');

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  const modalImg = modal.querySelector('#product-detail-modal-img');
  const modalTag = modal.querySelector('#product-detail-modal-tag');
  const modalName = modal.querySelector('#product-detail-modal-name');
  const modalDesc = modal.querySelector('#product-detail-modal-desc');
  const modalSpecs = modal.querySelector('#product-detail-modal-specs');
  const modalWa = modal.querySelector('#product-detail-modal-wa');
  const modalTitle = modal.querySelector('.product-detail-modal-title');
  const specsHeading = modal.querySelector('#product-detail-modal-specs-heading');
  const waBtnText = modal.querySelector('.btn-text');

  function openDetail(card) {
    if (!card) return;
    const isEn = (document.documentElement.lang === 'en') || (localStorage.getItem('dc_lang') === 'en');

    // Image
    const activeSlideImg = card.querySelector('.slider-slide.active img');
    const defaultImg = card.querySelector('.product-img-box img');
    const imgEl = activeSlideImg || defaultImg;
    if (imgEl && modalImg) {
      modalImg.src = imgEl.src;
      modalImg.alt = imgEl.alt || 'Foto Produk Diamond Clean';
    }

    // Tag / Variant
    const tagEl = card.querySelector('.variant-tag') || card.querySelector('.variant-pill.active');
    if (tagEl && modalTag) {
      modalTag.textContent = tagEl.textContent.trim();
      modalTag.style.display = 'inline-flex';
    } else if (modalTag) {
      modalTag.style.display = 'none';
    }

    // Title
    const titleEl = card.querySelector('.product-card-main h3');
    if (titleEl && modalName) {
      modalName.textContent = titleEl.textContent.trim();
    }

    // Description
    const descEl = card.querySelector('.product-card-main p');
    if (descEl && modalDesc) {
      modalDesc.textContent = descEl.textContent.trim();
    }

    // Specs
    if (modalSpecs) {
      modalSpecs.innerHTML = '';
      const specRows = card.querySelectorAll('.product-spec-row');
      specRows.forEach(row => {
        const spans = row.querySelectorAll('span');
        if (spans.length >= 2) {
          const rowDiv = document.createElement('div');
          rowDiv.className = 'product-detail-spec-row';
          rowDiv.innerHTML = `
            <span class="detail-label">${spans[0].textContent.trim()}</span>
            <span class="detail-value">${spans[1].textContent.trim()}</span>
          `;
          modalSpecs.appendChild(rowDiv);
        }
      });
    }

    // WhatsApp CTA
    const waLink = card.querySelector('a[href*="wa.me"]');
    if (waLink && modalWa) {
      modalWa.href = waLink.href;
      if (waBtnText) {
        waBtnText.textContent = isEn ? 'Order via WhatsApp' : 'Pesan via WhatsApp';
      }
    }

    // Language labels
    if (modalTitle) {
      modalTitle.textContent = isEn ? 'Product Details & Specifications' : 'Detail Spesifikasi Produk';
    }
    if (specsHeading) {
      specsHeading.textContent = isEn ? 'Specifications & Characteristics' : 'Spesifikasi & Karakteristik';
    }

    modal.classList.add('active');
  }

  // Attach click listeners to product-card-main and product-specs
  document.querySelectorAll('.product-card').forEach(card => {
    const mainArea = card.querySelector('.product-card-main');
    const specsArea = card.querySelector('.product-specs');

    const handleCardClick = (e) => {
      // Ignore if user is selecting text
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) return;

      // Ignore if clicked on links or buttons
      if (e.target.closest('a') || e.target.closest('button')) return;

      openDetail(card);
    };

    if (mainArea) {
      mainArea.addEventListener('click', handleCardClick);
      mainArea.setAttribute('title', 'Klik untuk melihat detail lengkap produk');
    }
    if (specsArea) {
      specsArea.addEventListener('click', handleCardClick);
      specsArea.setAttribute('title', 'Klik untuk melihat spesifikasi lengkap');
    }
  });
}

/* --------------------------------------------------------------------------
   11. MULTI-VARIANT PRODUCT SLIDER (Bisa Digeser-geser)
   -------------------------------------------------------------------------- */
function initProductSlider() {
  document.querySelectorAll('.product-slider').forEach(slider => {
    const slides = slider.querySelectorAll('.slider-slide');
    if (slides.length <= 1) return;

    let currentIndex = 0;
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    const dots = slider.querySelectorAll('.slider-dot');
    const card = slider.closest('.product-card');
    const pills = card ? card.querySelectorAll('.variant-pill') : slider.querySelectorAll('.variant-pill');

    let autoPlayTimer = null;
    const isAutoPlay = slider.getAttribute('data-autoplay') === 'true';
    const autoPlayDelay = parseInt(slider.getAttribute('data-autoplay-delay')) || 4500;

    function goToSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentIndex = index;

      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });

      pills.forEach((pill, i) => {
        pill.classList.toggle('active', i === currentIndex);
      });

      if (card) {
        const activeSlide = slides[currentIndex];
        const variantName = activeSlide.getAttribute('data-variant');
        const dynamicTitle = activeSlide.getAttribute('data-title');
        const dynamicDesc = activeSlide.getAttribute('data-desc');
        const aromaName = activeSlide.getAttribute('data-aroma');
        const customWaText = activeSlide.getAttribute('data-wa-text');

        // Dynamic elements
        const titleEl = card.querySelector('.card-dynamic-title');
        const descEl = card.querySelector('.card-dynamic-desc');
        const aromaVal = card.querySelector('.spec-aroma-val');
        const specsContainer = card.querySelector('.product-specs');

        // Trigger smooth fade transition
        const animTargets = [titleEl, descEl, specsContainer].filter(Boolean);
        animTargets.forEach(el => el.classList.add('card-text-fading'));

        setTimeout(() => {
          if (titleEl && dynamicTitle) {
            titleEl.textContent = dynamicTitle;
          }

          if (descEl && dynamicDesc) {
            descEl.textContent = dynamicDesc;
          }

          if (aromaVal && aromaName) {
            aromaVal.textContent = aromaName;
          }

          // Dynamic specs (spec 1, 2, 3)
          for (let s = 1; s <= 3; s++) {
            const specLabel = activeSlide.getAttribute(`data-spec${s}-label`);
            const specVal = activeSlide.getAttribute(`data-spec${s}-val`);
            const labelEl = card.querySelector(`.spec-label-${s}`);
            const valEl = card.querySelector(`.spec-val-${s}`);
            if (labelEl && specLabel) labelEl.textContent = specLabel;
            if (valEl && specVal) valEl.textContent = specVal;
          }

          // WhatsApp CTA Button update
          const waBtn = card.querySelector('a[href^="https://wa.me"]');
          if (waBtn) {
            let msgText = customWaText;
            if (!msgText && variantName) {
              msgText = `Halo Diamond Clean, saya ingin pesan ${variantName} 5L.`;
            }
            if (msgText) {
              waBtn.href = `https://wa.me/62882007907237?text=${encodeURIComponent(msgText)}`;
            }
          }

          animTargets.forEach(el => el.classList.remove('card-text-fading'));
        }, 160);
      }
    }

    function startAutoPlay() {
      if (!isAutoPlay) return;
      stopAutoPlay();
      autoPlayTimer = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, autoPlayDelay);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    if (isAutoPlay) {
      startAutoPlay();
      if (card) {
        card.addEventListener('mouseenter', stopAutoPlay);
        card.addEventListener('mouseleave', startAutoPlay);
      }
      slider.addEventListener('touchstart', stopAutoPlay, { passive: true });
      slider.addEventListener('touchend', () => {
        setTimeout(startAutoPlay, 2000);
      }, { passive: true });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(currentIndex - 1);
        startAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(currentIndex + 1);
        startAutoPlay();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(idx);
        startAutoPlay();
      });
    });

    pills.forEach((pill, idx) => {
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(idx);
        startAutoPlay();
      });
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(currentIndex - 1);
        }
        startAutoPlay();
      }
    }, { passive: true });
  });
}
