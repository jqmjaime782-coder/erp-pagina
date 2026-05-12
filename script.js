/* ═══════════════════════════════════════════
   ContaFacil ERP — Static Site JavaScript
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Initialize all components
  initNavbar();
  initMobileMenu();
  initCarousel();
  initModuleToggles();
  initScrollReveal();
});

/* ═══════════════════════════════════════════
   NAVBAR SCROLL EFFECT
   ═══════════════════════════════════════════ */
function initNavbar() {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 20) {
      navbar.style.background = 'rgba(6,13,27,0.95)';
      navbar.style.backdropFilter = 'blur(24px)';
      navbar.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    } else {
      navbar.style.background = 'transparent';
      navbar.style.backdropFilter = 'none';
      navbar.style.borderBottom = 'none';
      navbar.style.boxShadow = 'none';
    }
  });
}

/* ═══════════════════════════════════════════
   MOBILE MENU
   ═══════════════════════════════════════════ */
function initMobileMenu() {
  var btn = document.getElementById('mobile-menu-btn');
  var menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  var isOpen = false;

  btn.addEventListener('click', function() {
    isOpen = !isOpen;
    toggleMobileMenu(isOpen);
  });

  // Close on link click
  var links = menu.querySelectorAll('a[href^="#"]');
  links.forEach(function(link) {
    link.addEventListener('click', function() {
      isOpen = false;
      toggleMobileMenu(false);
    });
  });

  function toggleMobileMenu(open) {
    var hb1 = document.getElementById('hb1');
    var hb2 = document.getElementById('hb2');
    var hb3 = document.getElementById('hb3');

    if (open) {
      menu.style.display = 'flex';
      menu.classList.remove('mobile-menu-hidden');
      hb1.classList.add('open-1');
      hb2.classList.add('open-2');
      hb3.classList.add('open-3');
    } else {
      menu.style.display = 'none';
      menu.classList.add('mobile-menu-hidden');
      hb1.classList.remove('open-1');
      hb2.classList.remove('open-2');
      hb3.classList.remove('open-3');
    }
  }
}

/* ═══════════════════════════════════════════
   HERO CAROUSEL
   ═══════════════════════════════════════════ */
var carouselData = [
  {
    image: '/pos-dashboard-real.png',
    tag: 'Para Empresas',
    titleHTML: 'O Seu Negocio.<br><span class="hero-title-gradient">Mais Inteligente.</span><br>Mais Lucrativo.',
    subtitle: 'Automatize a sua contabilidade, elimine erros humanos e foque no que realmente importa — fazer crescer o seu negocio. O ERP que as empresas de sucesso em Mocambique estao a usar.',
    cta: 'Entrar'
  },
  {
    image: '/ong-dashboard-real.png',
    tag: 'Para ONGs',
    titleHTML: 'Transparencia Total.<br><span class="hero-title-gradient">Doadores Felizes.</span><br>Maior Impacto.',
    subtitle: 'Preste contas com confianca. Os seus doadores merecem ver exactamente como cada centavo esta a transformar comunidades. Relatorios profissionais que fortalecem parcerias e abrem portas.',
    cta: 'Entrar'
  },
  {
    image: '/erp-dashboard-real.png',
    tag: 'Stock & POS',
    titleHTML: 'Nunca Perca Uma Venda.<br><span class="hero-title-gradient">Estoques Sempre Em Dia.</span><br>Facturacao Na Hora.',
    subtitle: 'O unico POS que funciona quando a internet cai e a energia falta. Venda, receba via M-Pesa e sincronize tudo automaticamente. O sistema que nao para.',
    cta: 'Entrar'
  }
];

var currentSlide = 0;
var carouselTimer = null;

function initCarousel() {
  startCarouselTimer();

  // Indicator clicks
  var dots = document.querySelectorAll('.carousel-dot');
  dots.forEach(function(dot) {
    dot.addEventListener('click', function() {
      var idx = parseInt(this.getAttribute('data-idx'));
      goToSlide(idx);
    });
  });
}

function startCarouselTimer() {
  if (carouselTimer) clearInterval(carouselTimer);
  carouselTimer = setInterval(function() {
    goToSlide((currentSlide + 1) % carouselData.length);
  }, 6000);
}

function goToSlide(idx) {
  currentSlide = idx;
  var slide = carouselData[idx];

  // Update background images
  var bgSlides = document.querySelectorAll('.carousel-bg-slide');
  bgSlides.forEach(function(el, i) {
    el.style.opacity = (i === idx) ? '1' : '0';
  });

  // Update title
  var titleEl = document.getElementById('hero-title');
  if (titleEl) {
    titleEl.style.opacity = '0';
    titleEl.style.transform = 'translateY(20px)';
    setTimeout(function() {
      titleEl.innerHTML = slide.titleHTML;
      titleEl.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      titleEl.style.opacity = '1';
      titleEl.style.transform = 'translateY(0)';
    }, 200);
  }

  // Update subtitle
  var subtitleEl = document.getElementById('hero-subtitle');
  if (subtitleEl) {
    subtitleEl.style.opacity = '0';
    subtitleEl.style.transform = 'translateY(15px)';
    setTimeout(function() {
      subtitleEl.textContent = slide.subtitle;
      subtitleEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      subtitleEl.style.opacity = '1';
      subtitleEl.style.transform = 'translateY(0)';
    }, 300);
  }

  // Update tag
  var tagEl = document.getElementById('hero-tag');
  if (tagEl) {
    tagEl.style.opacity = '0';
    tagEl.style.transform = 'scale(0.9)';
    setTimeout(function() {
      tagEl.textContent = slide.tag;
      tagEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      tagEl.style.opacity = '1';
      tagEl.style.transform = 'scale(1)';
    }, 350);
  }

  // Update CTA text
  var ctaText = document.getElementById('hero-cta-text');
  if (ctaText) ctaText.textContent = slide.cta;

  // Update laptop image
  var laptopImg = document.getElementById('laptop-img');
  if (laptopImg) {
    laptopImg.style.opacity = '0';
    setTimeout(function() {
      laptopImg.src = slide.image;
      laptopImg.style.transition = 'opacity 0.5s ease';
      laptopImg.style.opacity = '1';
    }, 100);
  }

  // Update dots
  var dots = document.querySelectorAll('.carousel-dot');
  dots.forEach(function(dot, i) {
    if (i === idx) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  // Reset progress bar
  var progressBar = document.getElementById('carousel-progress');
  if (progressBar) {
    progressBar.style.animation = 'none';
    progressBar.offsetHeight; // force reflow
    progressBar.style.animation = 'progressBar 6s linear forwards';
  }

  startCarouselTimer();
}

/* ═══════════════════════════════════════════
   MODULE TOGGLES (Diferencial)
   ═══════════════════════════════════════════ */
function initModuleToggles() {
  var items = document.querySelectorAll('.toggle-module-item');
  items.forEach(function(item) {
    item.addEventListener('click', function() {
      var idx = parseInt(this.getAttribute('data-idx'));
      toggleModuleItem(idx, this);
    });
  });
  updateActiveCount();
}

function toggleModuleItem(idx, el) {
  el.classList.toggle('active');
  var toggleSwitch = el.querySelector('.toggle-switch');
  if (toggleSwitch) {
    toggleSwitch.classList.toggle('active');
  }
  // Update text color
  var nameEl = el.querySelector('span:last-child');
  if (nameEl) {
    if (el.classList.contains('active')) {
      nameEl.style.color = 'white';
    } else {
      nameEl.style.color = 'rgba(255,255,255,0.6)';
    }
  }
  updateActiveCount();
}

function updateActiveCount() {
  var activeItems = document.querySelectorAll('.toggle-module-item.active');
  var count = activeItems.length;

  var badge = document.getElementById('active-count-badge');
  if (badge) badge.textContent = count + ' ativos';

  var savings = document.getElementById('savings-count');
  if (savings) savings.textContent = count;
}

/* ═══════════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════════ */
function initScrollReveal() {
  var elements = document.querySelectorAll('.reveal-on-scroll');
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(function(el) {
    observer.observe(el);
  });
}

/* ═══════════════════════════════════════════
   PLAN ANNUAL/MONTHLY TOGGLE
   ═══════════════════════════════════════════ */
function togglePlanPeriod(btn) {
  var card = btn.closest('.plan-card');
  var isAnnual = btn.classList.contains('annual-active');

  if (isAnnual) {
    // Switch to monthly
    btn.classList.remove('annual-active');
    btn.style.background = 'rgba(255,255,255,0.1)';

    var dot = btn.querySelector('.plan-toggle-dot');
    if (dot) {
      dot.style.left = '3px';
      dot.style.background = 'rgba(255,255,255,0.4)';
    }

    // Update price
    var priceDisplay = card.querySelector('.plan-price-display');
    if (priceDisplay) priceDisplay.textContent = priceDisplay.getAttribute('data-monthly');

    // Update period
    var periodDisplay = card.querySelector('.plan-period-display');
    if (periodDisplay) periodDisplay.textContent = '/mes';

    // Update labels
    var monthlyLabel = card.querySelector('.plan-monthly-label');
    var annualLabel = card.querySelector('.plan-annual-label');
    if (monthlyLabel) monthlyLabel.style.color = 'rgba(255,255,255,0.7)';
    if (annualLabel) annualLabel.style.color = 'rgba(255,255,255,0.3)';

    // Show monthly currency label
    var monthlyCurrencyLabel = card.querySelector('[data-monthly-label]');
    if (monthlyCurrencyLabel) monthlyCurrencyLabel.style.display = 'inline-block';

    // Hide savings badge
    var savingsBadge = card.querySelector('.plan-annual-savings');
    if (savingsBadge) savingsBadge.style.display = 'none';
  } else {
    // Switch to annual
    btn.classList.add('annual-active');
    btn.style.background = '#10b981';

    var dot = btn.querySelector('.plan-toggle-dot');
    if (dot) {
      dot.style.left = '18px';
      dot.style.background = 'white';
    }

    // Update price
    var priceDisplay = card.querySelector('.plan-price-display');
    if (priceDisplay) priceDisplay.textContent = priceDisplay.getAttribute('data-annual');

    // Update period
    var periodDisplay = card.querySelector('.plan-period-display');
    if (periodDisplay) periodDisplay.textContent = '/ano';

    // Update labels
    var monthlyLabel = card.querySelector('.plan-monthly-label');
    var annualLabel = card.querySelector('.plan-annual-label');
    if (monthlyLabel) monthlyLabel.style.color = 'rgba(255,255,255,0.3)';
    if (annualLabel) annualLabel.style.color = '#6ee7b7';

    // Hide monthly currency label
    var monthlyCurrencyLabel = card.querySelector('[data-monthly-label]');
    if (monthlyCurrencyLabel) monthlyCurrencyLabel.style.display = 'none';

    // Show savings badge
    var savingsBadge = card.querySelector('.plan-annual-savings');
    if (savingsBadge) savingsBadge.style.display = 'inline-block';
  }
}

/* ═══════════════════════════════════════════
   IMAGE MODAL
   ═══════════════════════════════════════════ */
function openModal(src, alt) {
  var modal = document.getElementById('image-modal');
  var img = document.getElementById('modal-img');
  if (modal && img) {
    img.src = src;
    img.alt = alt || '';
    modal.style.display = 'flex';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  var modal = document.getElementById('image-modal');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});
