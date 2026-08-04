/**
 * Apex Studio / Ashish Ranjan Portfolio Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Sticky Header & Active Navigation Tracking
     ========================================================================== */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    highlightNavOnScroll();
  });

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /* ==========================================================================
     2. Mobile Drawer Navigation
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  /* ==========================================================================
     3. Intersection Observer for Scroll Reveal Animations
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================================================
     4. Interactive ROI / Revenue Estimator Calculator
     ========================================================================== */
  const trafficInput = document.getElementById('monthlyTraffic');
  const orderInput = document.getElementById('orderValue');
  const conversionInput = document.getElementById('conversionRate');

  const trafficVal = document.getElementById('trafficVal');
  const orderVal = document.getElementById('orderVal');
  const conversionVal = document.getElementById('conversionVal');
  const extraRevenue = document.getElementById('extraMonthlyRevenue');
  const extraOrders = document.getElementById('extraOrders');

  function updateCalculator() {
    if (!trafficInput || !orderInput || !conversionInput) return;

    const traffic = parseInt(trafficInput.value, 10);
    const orderValue = parseFloat(orderInput.value);
    const conversionLift = parseFloat(conversionInput.value);

    // Format display labels
    trafficVal.textContent = traffic.toLocaleString();
    orderVal.textContent = `$${orderValue}`;
    conversionVal.textContent = `+${conversionLift}%`;

    // Calculations
    const additionalOrdersCount = Math.round(traffic * (conversionLift / 100));
    const calculatedRevenue = Math.round(additionalOrdersCount * orderValue);

    // Animate & update output
    extraOrders.textContent = additionalOrdersCount.toLocaleString();
    extraRevenue.textContent = `$${calculatedRevenue.toLocaleString()}`;
  }

  if (trafficInput) {
    [trafficInput, orderInput, conversionInput].forEach(input => {
      input.addEventListener('input', updateCalculator);
    });
    updateCalculator();
  }

  /* ==========================================================================
     5. Case Studies Interactive Lightbox Modal
     ========================================================================== */
  const caseModal = document.getElementById('caseModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBody = document.getElementById('modalBody');

  const caseStudyData = {
    "1": {
      title: "Boutique Shopify Store Migration",
      category: "Retail & Fashion Boutique",
      img: "assets/case_retail.png",
      stats: [
        { label: "Sales Increase", value: "+40%" },
        { label: "Mobile Conversion", value: "3.2x" },
        { label: "Page Load Time", value: "0.8s" }
      ],
      problem: "The client was relying on a slow, non-responsive legacy setup with high abandon rates during mobile checkout and stock sync headaches.",
      solution: "Engineered a custom Shopify Liquid theme built mobile-first, integrated real-time inventory management, streamlined 1-click Apple Pay / Shop Pay checkout, and set up Instagram shop integration.",
      results: "Online revenue surged 40% in the first 90 days. Mobile sales now account for 72% of total storefront revenue.",
      tags: ["Shopify Liquid", "UI/UX Design", "Inventory Sync", "Speed Tuning"]
    },
    "2": {
      title: "Salon & Spa Service Booking Platform",
      category: "Service Provider & Spa",
      img: "assets/case_salon.png",
      stats: [
        { label: "Automated Bookings", value: "70%" },
        { label: "Staff Time Saved", value: "15 hrs/wk" },
        { label: "No-Show Reduction", value: "-45%" }
      ],
      problem: "The salon staff spent 20+ hours weekly managing phone appointments, leading to double-bookings, phone tag dropouts, and missed revenue.",
      solution: "Created an intuitive, ultra-clean web portal featuring an interactive treatment browser, calendar picker, SMS confirmation reminders, and deposit payments.",
      results: "Automated 70% of total weekly appointments, saving 15 hours of receptionist labor per week while dramatically lowering no-shows.",
      tags: ["Web Redesign", "Custom Calendar UI", "SMS Automated Reminders", "Stripe API"]
    },
    "3": {
      title: "Niche Coffee Brand Shopify Launch",
      category: "Artisanal Food & Beverage",
      img: "assets/case_brand.png",
      stats: [
        { label: "Month-1 Sales", value: "$42,000" },
        { label: "Subscription Rate", value: "38%" },
        { label: "Repeat Customer", value: "55%" }
      ],
      problem: "A premium local roaster needed a direct-to-consumer online store to expand beyond cafe foot traffic and introduce recurring bean subscriptions.",
      solution: "Designed a high-trust, immersive digital brand experience on Shopify with custom subscription workflows, grind selection options, and automated customer notifications.",
      results: "Generated $42,000 in revenue in month one and established a recurring monthly subscription baseline of 250+ active members.",
      tags: ["Shopify Subscriptions", "Brand Design", "CRO Funnel", "Klaviyo Email"]
    }
  };

  function openCaseModal(caseId) {
    const data = caseStudyData[caseId];
    if (!data || !caseModal) return;

    modalBody.innerHTML = `
      <div class="case-modal-header">
        <span class="section-tag">${data.category}</span>
        <h3 class="modal-title">${data.title}</h3>
      </div>
      <img src="${data.img}" alt="${data.title}" class="modal-case-hero">
      
      <div class="modal-case-stats">
        ${data.stats.map(s => `
          <div>
            <span class="modal-stat-val">${s.value}</span>
            <span class="modal-stat-lbl">${s.label}</span>
          </div>
        `).join('')}
      </div>

      <div class="modal-section" style="margin-bottom: 1.2rem;">
        <h4 style="font-size: 1.1rem; color: var(--accent-cyan); margin-bottom: 0.4rem;">The Challenge:</h4>
        <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">${data.problem}</p>
      </div>

      <div class="modal-section" style="margin-bottom: 1.2rem;">
        <h4 style="font-size: 1.1rem; color: var(--accent-cyan); margin-bottom: 0.4rem;">The Solution:</h4>
        <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">${data.solution}</p>
      </div>

      <div class="modal-section" style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.1rem; color: var(--accent-green); margin-bottom: 0.4rem;">The Impact:</h4>
        <p style="font-size: 0.95rem; color: var(--text-main); font-weight: 500; line-height: 1.6;">${data.results}</p>
      </div>

      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.8rem;">
        ${data.tags.map(t => `<span class="case-pill">${t}</span>`).join('')}
      </div>

      <a href="#contact" class="btn btn-primary btn-full close-modal-cta">
        Build a Similar Site for Your Business
      </a>
    `;

    caseModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Hook up internal close CTA
    const closeCta = modalBody.querySelector('.close-modal-cta');
    if (closeCta) {
      closeCta.addEventListener('click', () => {
        closeCaseModal();
      });
    }
  }

  function closeCaseModal() {
    if (caseModal) {
      caseModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('.view-case-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const caseId = btn.getAttribute('data-case');
      openCaseModal(caseId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeCaseModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeCaseModal);

  /* ==========================================================================
     6. Discovery Call Modal Trigger
     ========================================================================== */
  const discoveryModal = document.getElementById('discoveryModal');
  const discoveryBackdrop = document.getElementById('discoveryModalBackdrop');
  const discoveryCloseBtn = document.getElementById('discoveryModalCloseBtn');
  const openDiscBtns = [
    document.getElementById('openDiscoveryCallBtnHeader'),
    document.getElementById('openDiscoveryCallBtnMobile')
  ];

  function openDiscoveryModal() {
    if (discoveryModal) {
      discoveryModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDiscoveryModal() {
    if (discoveryModal) {
      discoveryModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openDiscBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', openDiscoveryModal);
  });

  if (discoveryCloseBtn) discoveryCloseBtn.addEventListener('click', closeDiscoveryModal);
  if (discoveryBackdrop) discoveryBackdrop.addEventListener('click', closeDiscoveryModal);

  // Time slot toggle
  const slotBtns = document.querySelectorAll('.slot-btn');
  slotBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      slotBtns.forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Discovery form handling
  const discoveryForm = document.getElementById('discoveryForm');
  const discoveryStatus = document.getElementById('discoveryStatus');
  if (discoveryForm) {
    discoveryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      discoveryStatus.className = 'form-status success';
      discoveryStatus.innerHTML = '✓ Call Reserved! Ashish will send a Google Meet invite shortly.';
      setTimeout(() => {
        discoveryForm.reset();
        closeDiscoveryModal();
        discoveryStatus.style.display = 'none';
      }, 3000);
    });
  }

  /* ==========================================================================
     7. Main Contact Form Validation & Submission
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const formStatus = document.getElementById('formStatus');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.parentElement.classList.add('error');
        isValid = false;
      } else {
        nameInput.parentElement.classList.remove('error');
      }

      // Validate Email
      if (!validateEmail(emailInput.value.trim())) {
        emailInput.parentElement.classList.add('error');
        isValid = false;
      } else {
        emailInput.parentElement.classList.remove('error');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageInput.parentElement.classList.add('error');
        isValid = false;
      } else {
        messageInput.parentElement.classList.remove('error');
      }

      if (isValid) {
        const submitBtn = document.getElementById('submitFormBtn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';

        setTimeout(() => {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = '🚀 Message Received! Ashish will respond within 2 hours.';
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Send Message & Book Discovery';
          contactForm.reset();
        }, 1000);
      }
    });
  }

  /* ==========================================================================
     8. Back To Top Button
     ========================================================================== */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
