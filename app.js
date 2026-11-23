/**
 * NutriSlims Health & Wellness Clinic - Core JavaScript Engine
 * Redesign Prototype v1.0 — Bound to index.html markup
 *
 * Features:
 * 1. Mobile nav drawer toggle, aria-expanded, background scroll lock, Escape key.
 * 2. Sticky header shadow and compacting on scroll.
 * 3. Desktop nav dropdown toggling.
 * 4. Search Modal: live filtering across Services, Recipes, Calculators, and FAQs.
 * 5. Health Calculators Suite:
 *    - Quick BMI (Hero) & Full Hub BMI (metric/imperial, category, disclaimer).
 *    - BMR Harris-Benedict (gender, age, weight, height, 3 TDEE tiers).
 *    - Daily Water Intake (weight, activity level, climate).
 *    - Waist-to-Hip Ratio (WHO risk bands).
 *    - Ideal Body Weight (Devine formula).
 *    - Calculator tab switching.
 * 6. Recipe Explorer:
 *    - Category chip filtering via data-recipe-filter / data-category.
 *    - Live search across data-title and data-ingredients attributes.
 *    - Dynamic HTML portion scaling (data-action="dec"/"inc").
 *    - LocalStorage favorite toggle (data-recipe-save).
 * 7. Video Gallery Modal:
 *    - Play button click opens #video-modal with Drive /preview iframe.
 *    - Reads data-embed-url, data-share-url, data-title from play button.
 *    - Close on button/backdrop/Escape; resets iframe src.
 * 8. FAQ Accordion: accessible click/keyboard toggle.
 * 9. Consultation Booking Form:
 *    - 10-digit Indian phone validation.
 *    - Inline validation, simulated submit, reference ID.
 *    - Dynamic #whatsapp-btn link prefill.
 * 10. Service card select trigger pre-fills booking form service.
 * 11. Client Portal Modal (server-side auth disclaimer).
 */

(function () {
  'use strict';

  /* ==========================================================================
     SEARCH INDEX DATA (kept in JS for instant search)
     ========================================================================== */

  const SEARCH_INDEX = [
    { type: 'Service', title: 'Weight Loss & Weight Gain Management', link: '#services', text: 'Personalised metabolic profiling, calorie restructuring, and sustainable weight management.' },
    { type: 'Service', title: 'Diabetes Lifestyle & Glucose Management', link: '#services', text: 'Low glycemic index meal plans, HbA1c reduction, and insulin resistance management.' },
    { type: 'Service', title: 'PCOS / PCOD Nutritional Recovery', link: '#services', text: 'Anti-inflammatory protocols, menstrual regularity, hormonal balance, and metabolic markers.' },
    { type: 'Service', title: 'Pre & Post Pregnancy Care', link: '#services', text: 'Trimester nutrition guidance, gestational diabetes prevention, postpartum healing, lactation.' },
    { type: 'Service', title: 'Child Growth & Pediatric Nutrition', link: '#services', text: 'Age-appropriate meal planning, picky eating, immunity support, and healthy food relationships.' },
    { type: 'Service', title: 'Corporate Wellness & Executive Health', link: '#services', text: 'Workplace nutrition workshops, desk-worker energy, preventive screenings, and habit coaching.' },
    { type: 'Calculator', title: 'BMI Calculator', link: '#calculators', text: 'Educational body mass index check with WHO and Asian-Indian category cutoffs.' },
    { type: 'Calculator', title: 'BMR Harris-Benedict', link: '#calculators', text: 'Basal metabolic rate estimate and daily calorie needs across activity tiers.' },
    { type: 'Calculator', title: 'Daily Water Intake Estimator', link: '#calculators', text: 'Recommended daily hydration based on body weight, activity level, and climate.' },
    { type: 'Calculator', title: 'Waist-to-Hip Ratio (WHR)', link: '#calculators', text: 'Visceral fat distribution screening with WHO cardiovascular risk bands.' },
    { type: 'Calculator', title: 'Ideal Body Weight (Devine)', link: '#calculators', text: 'Lean body weight estimate based on height and biological sex.' },
    { type: 'Recipe', title: 'Overnight Oats & Chia Seeds Bowl', link: '#recipes', text: 'Prebiotic fiber and omega-3 rich breakfast bowl for sustained energy and satiety.' },
    { type: 'Recipe', title: 'Diabetic-Friendly Quinoa Khichdi', link: '#recipes', text: 'Low-GI whole grain Indian comfort bowl with spinach, moong dal, and cumin.' },
    { type: 'Recipe', title: 'PCOS Chickpea & Avocado Bowl', link: '#recipes', text: 'Anti-inflammatory chickpea bowl with healthy fats, zinc, and prebiotics.' },
    { type: 'Recipe', title: 'High-Protein Tofu Stir-Fry', link: '#recipes', text: 'Plant protein stir-fry with broccoli florets, bell peppers, and toasted sesame.' },
    { type: 'Recipe', title: 'Paneer & Veggie Rainbow Bowl', link: '#recipes', text: 'Calcium-rich paneer with roasted antioxidant-packed rainbow peppers and hung curd.' },
    { type: 'FAQ', title: 'How do online consultations work?', link: '#faq', text: 'HD video call, blood report review, tailored meal blueprint, weekly WhatsApp check-ins.' },
    { type: 'FAQ', title: 'Will I have to stop eating Indian food?', link: '#faq', text: 'No. We build plans around home-cooked Indian meals with roti, dal, rice, and sabzi.' },
    { type: 'FAQ', title: 'Can NutriSlims manage PCOS, Thyroid, Diabetes?', link: '#faq', text: 'Yes — clinical dietitian Oshin holds M.Sc. Public Health and specializes in MNT.' }
  ];

  /* ==========================================================================
     UTILITY FUNCTIONS
     ========================================================================== */

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }

  function highlightMatch(text, query) {
    if (!query) return escapeHtml(text);
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('(' + escaped + ')', 'gi');
    return escapeHtml(text).replace(regex, '<mark>$1</mark>');
  }

  function qs(selector) {
    return document.querySelector(selector);
  }

  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /* ==========================================================================
     1. HEADER SCROLL COMPACTING
     ========================================================================== */

  function initHeaderScroll() {
    var header = qs('header.header, header.site-header, .site-header, header');
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 20) {
        header.classList.add('scrolled', 'compact');
      } else {
        header.classList.remove('scrolled', 'compact');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ==========================================================================
     2. MOBILE NAV DRAWER
     ========================================================================== */

  function initMobileNav() {
    var menuToggle = qs('#menu-toggle, .menu-toggle');
    var drawer = qs('#mobile-drawer');
    var drawerBackdrop = qs('#drawer-backdrop');
    var drawerCloseBtn = qs('#drawer-close-btn, .drawer-close, [data-close-modal]', drawer || document);

    if (!menuToggle || !drawer) return;

    function openDrawer() {
      drawer.removeAttribute('hidden');
      drawer.setAttribute('aria-hidden', 'false');
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Close navigation menu');
      menuToggle.classList.add('is-active');
      document.body.classList.add('nav-open');
      document.documentElement.style.overflow = 'hidden';
      if (drawerBackdrop) {
        drawerBackdrop.classList.add('visible');
        drawerBackdrop.removeAttribute('hidden');
        drawerBackdrop.setAttribute('aria-hidden', 'false');
      }
    }

    function closeDrawer() {
      drawer.setAttribute('hidden', 'true');
      drawer.setAttribute('aria-hidden', 'true');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
      menuToggle.classList.remove('is-active');
      document.body.classList.remove('nav-open');
      document.documentElement.style.overflow = '';
      if (drawerBackdrop) {
        drawerBackdrop.classList.remove('visible');
        drawerBackdrop.setAttribute('hidden', 'true');
        drawerBackdrop.setAttribute('aria-hidden', 'true');
      }
      menuToggle.focus();
    }

    menuToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isHidden = drawer.hasAttribute('hidden') || drawer.getAttribute('aria-hidden') === 'true';
      if (isHidden) {
        openDrawer();
      } else {
        closeDrawer();
      }
    });

    // Close on internal link clicks
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });

    // Close button inside drawer
    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', closeDrawer);
    }

    // Backdrop click
    if (drawerBackdrop) {
      drawerBackdrop.addEventListener('click', closeDrawer);
    }

    // Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        var drawerOpen = !drawer.hasAttribute('hidden') && drawer.getAttribute('aria-hidden') !== 'true';
        if (drawerOpen) {
          closeDrawer();
        }
      }
    });
  }

  /* ==========================================================================
     3. DESKTOP NAV DROPDOWNS
     ========================================================================== */

  function initNavDropdowns() {
    var dropdownToggles = qsa('.dropdown-toggle, .has-dropdown > a');
    dropdownToggles.forEach(function (toggle) {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        var isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        // Close all
        dropdownToggles.forEach(function (t) { t.setAttribute('aria-expanded', 'false'); });
        if (!isExpanded) {
          toggle.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // Close on click outside
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-dropdown, .has-dropdown')) {
        dropdownToggles.forEach(function (t) { t.setAttribute('aria-expanded', 'false'); });
      }
    });
  }

  /* ==========================================================================
     4. GLOBAL MODAL CONTROLLER
     All HTML modals use `hidden` attribute and aria-hidden for show/hide.
     ========================================================================== */

  var _lastFocusedEl = null;

  function openModal(modal) {
    if (!modal) return;
    _lastFocusedEl = document.activeElement;
    modal.removeAttribute('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    // Focus first focusable element
    var focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length > 0) {
      setTimeout(function () { focusable[0].focus(); }, 50);
    }
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.setAttribute('hidden', 'true');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    // Stop video if present
    var iframe = modal.querySelector('iframe');
    if (iframe) {
      iframe.src = '';
    }

    if (_lastFocusedEl && typeof _lastFocusedEl.focus === 'function') {
      _lastFocusedEl.focus();
    }
  }

  function initGlobalModalListeners() {
    // Global Escape key: close any open modal
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        var openModals = qsa('.modal:not([hidden])');
        openModals.forEach(function (m) { closeModal(m); });
      }
    });

    // [data-close-modal] buttons and modal-close buttons
    document.addEventListener('click', function (e) {
      var closeBtn = e.target.closest('[data-close-modal], .modal-close, .modal-close-btn');
      if (closeBtn) {
        var modal = closeBtn.closest('.modal');
        if (modal) {
          closeModal(modal);
          return;
        }
      }

      // Backdrop click (click on .modal directly, not .modal-box)
      if (e.target.classList.contains('modal') || e.target.classList.contains('modal-backdrop')) {
        // Only if click was on backdrop, not inner content
        if (!e.target.classList.contains('modal-box') && !e.target.closest('.modal-box')) {
          closeModal(e.target.closest('.modal') || e.target);
        }
      }
    });
  }

  /* ==========================================================================
     5. SEARCH MODAL ENGINE
     Binds to HTML-rendered #search-modal with #global-search-input and #search-results-list
     ========================================================================== */

  function initSearchModal() {
    var searchModal = qs('#search-modal');
    var searchInput = qs('#global-search-input');
    var searchResults = qs('#search-results-list');

    if (!searchModal) return;

    // Open triggers
    var searchTriggers = qsa('[data-modal="search"], .search-trigger, #search-open-btn');
    searchTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        openModal(searchModal);
        if (searchInput) {
          searchInput.value = '';
          setTimeout(function () { searchInput.focus(); }, 80);
          if (searchResults) {
            searchResults.innerHTML = '<p class="search-initial-tip">Type a keyword like <em>diabetes</em>, <em>PCOS</em>, <em>BMI</em>, <em>oats</em>, or <em>appointment</em>...</p>';
          }
        }
      });
    });

    if (!searchInput || !searchResults) return;

    searchInput.addEventListener('input', function () {
      var query = searchInput.value.trim().toLowerCase();

      if (query.length < 2) {
        searchResults.innerHTML = '<p class="search-initial-tip">Type at least 2 characters to search services, recipes, and FAQs.</p>';
        return;
      }

      var matches = SEARCH_INDEX.filter(function (item) {
        return item.title.toLowerCase().includes(query) ||
               item.text.toLowerCase().includes(query) ||
               item.type.toLowerCase().includes(query);
      });

      if (matches.length === 0) {
        searchResults.innerHTML = '<p class="search-no-results">No results for &ldquo;<strong>' + escapeHtml(query) + '</strong>&rdquo;. Try searching &ldquo;weight&rdquo;, &ldquo;PCOS&rdquo;, or &ldquo;consultation&rdquo;.</p>';
        return;
      }

      var html = matches.map(function (item) {
        var typeClass = 'badge-' + item.type.toLowerCase();
        return '<a href="' + item.link + '" class="search-result-item" data-search-result>' +
          '<div class="result-header">' +
            '<span class="result-type ' + typeClass + '">' + item.type + '</span>' +
            '<strong class="result-title">' + highlightMatch(item.title, query) + '</strong>' +
          '</div>' +
          '<p class="result-snippet">' + highlightMatch(item.text, query) + '</p>' +
        '</a>';
      }).join('');

      searchResults.innerHTML = html;

      searchResults.querySelectorAll('[data-search-result]').forEach(function (link) {
        link.addEventListener('click', function () { closeModal(searchModal); });
      });
    });
  }

  /* ==========================================================================
     6. HEALTH CALCULATORS
     ========================================================================== */

  // BMI Category from WHO + Asian-Indian thresholds
  function getBmiCategory(bmi) {
    if (bmi < 18.5) {
      return { label: 'Underweight', cls: 'badge-warning', guidance: 'Consider a clinical dietitian consultation to support nutritious, sustainable weight restoration.' };
    } else if (bmi < 23.0) {
      return { label: 'Normal Weight', cls: 'badge-success', guidance: 'Healthy range. Maintain balanced, nutrient-dense eating habits and regular physical activity.' };
    } else if (bmi < 25.0) {
      return { label: 'Overweight (Asian-Indian threshold)', cls: 'badge-amber', guidance: 'Personalized nutrition support can optimize metabolic health without extreme restriction.' };
    } else if (bmi < 30.0) {
      return { label: 'Overweight / Pre-Obese', cls: 'badge-amber', guidance: 'Clinical nutrition guidance can support sustainable visceral fat reduction.' };
    } else {
      return { label: 'Obese Range', cls: 'badge-danger', guidance: 'Clinical dietitian consultation recommended for structured metabolic intervention.' };
    }
  }

  function formatCalcResult(value, unit, badgeClass, badgeLabel, mainText, disclaimerText, extraHTML) {
    return '<div class="calc-output-card">' +
      '<div class="calc-output-header">' +
        '<span class="calc-value">' + value + '</span>' +
        '<span class="calc-unit">' + unit + '</span>' +
        '<span class="status-badge ' + badgeClass + '">' + badgeLabel + '</span>' +
      '</div>' +
      (mainText ? '<p class="calc-guidance">' + mainText + '</p>' : '') +
      (extraHTML || '') +
      '<div class="calc-disclaimer"><small>⚠️ ' + disclaimerText + '</small></div>' +
    '</div>';
  }

  // Quick BMI (Hero Section - #bmi-form with #weight, #height, #bmi-result)
  function initQuickBmi() {
    var form = qs('#bmi-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var weightEl = form.querySelector('#weight');
      var heightEl = form.querySelector('#height');
      var out = form.querySelector('#bmi-result');

      var weight = parseFloat(weightEl ? weightEl.value : '');
      var heightCm = parseFloat(heightEl ? heightEl.value : '');

      if (!out) return;

      if (!weight || !heightCm || weight < 20 || weight > 350 || heightCm < 70 || heightCm > 250) {
        out.innerHTML = '<div class="alert-box error">Please enter a valid weight (20–300 kg) and height (70–250 cm).</div>';
        return;
      }

      var heightM = heightCm / 100;
      var bmi = weight / (heightM * heightM);
      var cat = getBmiCategory(bmi);

      out.innerHTML = formatCalcResult(
        bmi.toFixed(1), 'kg/m²', cat.cls, cat.label,
        cat.guidance,
        'Educational screening only. BMI does not distinguish muscle from fat. Not a medical diagnosis.'
      );
    });
  }

  // Calculator Tab Switching (uses aria-controls to find panels)
  function initCalcTabs() {
    var tabButtons = qsa('[data-calc-tab]');
    if (tabButtons.length === 0) return;

    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetPanelId = btn.getAttribute('aria-controls') || ('panel-' + btn.getAttribute('data-calc-tab'));

        // Update tab buttons
        tabButtons.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Show/hide panels
        qsa('.calc-panel, .calc-tab-panel').forEach(function (panel) {
          if (panel.id === targetPanelId) {
            panel.removeAttribute('hidden');
            panel.classList.add('active');
          } else {
            panel.setAttribute('hidden', 'true');
            panel.classList.remove('active');
          }
        });
      });
    });
  }

  // Full Hub BMI (#full-bmi-form → output: #hub-bmi-output)
  function initFullBmi() {
    var form = qs('#full-bmi-form');
    if (!form) return;

    // Unit toggle
    var unitRadios = form.querySelectorAll('input[name="bmi-unit"]');
    var metricFields = form.querySelector('.metric-fields');
    var imperialFields = form.querySelector('.imperial-fields');

    // Determine fields dynamically
    var weightMetric = form.querySelector('#hub-bmi-weight, #full-bmi-weight');
    var heightMetric = form.querySelector('#hub-bmi-height, #full-bmi-height');

    unitRadios.forEach(function (radio) {
      radio.addEventListener('change', function () {
        var isMetric = radio.value === 'metric';
        if (metricFields) metricFields.style.display = isMetric ? '' : 'none';
        if (imperialFields) imperialFields.style.display = isMetric ? 'none' : '';
        // Update label text dynamically if needed
        var weightLabel = form.querySelector('[for="hub-bmi-weight"], [for="full-bmi-weight"]');
        var heightLabel = form.querySelector('[for="hub-bmi-height"], [for="full-bmi-height"]');
        if (weightMetric && weightLabel) {
          weightLabel.textContent = isMetric ? 'Weight (kg)' : 'Weight (lbs)';
          weightMetric.placeholder = isMetric ? 'e.g. 70' : 'e.g. 155';
        }
        if (heightMetric && heightLabel) {
          heightLabel.textContent = isMetric ? 'Height (cm)' : 'Height (inches)';
          heightMetric.placeholder = isMetric ? 'e.g. 172' : 'e.g. 68';
        }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var out = form.querySelector('#hub-bmi-output, #full-bmi-result');
      if (!out) return;

      var selectedUnit = form.querySelector('input[name="bmi-unit"]:checked');
      var unit = selectedUnit ? selectedUnit.value : 'metric';

      var weightKg = 0, heightM = 0;

      if (unit === 'imperial') {
        var lbs = parseFloat((form.querySelector('#full-bmi-lbs, #hub-bmi-lbs') || {}).value || '');
        var totalInches = parseFloat((form.querySelector('#full-bmi-inches, #hub-bmi-inches') || {}).value || '') ||
                          ((parseFloat((form.querySelector('#full-bmi-feet') || {}).value || '') || 0) * 12 +
                           (parseFloat((form.querySelector('#full-bmi-in') || {}).value || '') || 0));
        // If still no imperial inputs, fall back to current field
        if (!lbs || !totalInches) {
          var wVal = parseFloat((weightMetric || {}).value || '');
          var hVal = parseFloat((heightMetric || {}).value || '');
          if (!wVal || !hVal) { out.innerHTML = '<div class="alert-box error">Please fill in all required fields.</div>'; return; }
          weightKg = wVal * 0.453592;
          heightM = (hVal * 2.54) / 100;
        } else {
          weightKg = lbs * 0.453592;
          heightM = (totalInches * 2.54) / 100;
        }
      } else {
        var w = parseFloat((weightMetric || {}).value || '');
        var h = parseFloat((heightMetric || {}).value || '');
        if (!w || !h || w < 20 || h < 60) { out.innerHTML = '<div class="alert-box error">Please enter a valid weight and height.</div>'; return; }
        weightKg = w;
        heightM = h / 100;
      }

      var bmi = weightKg / (heightM * heightM);
      var cat = getBmiCategory(bmi);
      var minKg = (18.5 * heightM * heightM).toFixed(1);
      var maxKg = (24.9 * heightM * heightM).toFixed(1);

      out.innerHTML = formatCalcResult(
        bmi.toFixed(1), 'BMI', cat.cls, cat.label,
        cat.guidance,
        'Educational estimate. Clinical decisions require in-person biometric screening.',
        '<div class="calc-meta-grid"><div><strong>Healthy BMI range for height:</strong> ' + minKg + ' – ' + maxKg + ' kg</div><div><strong>Asian-Indian overweight cutoff:</strong> ≥ 23.0 kg/m²</div></div>'
      );
    });
  }

  // BMR Harris-Benedict (#bmr-form → #hub-bmr-output)
  function initBmr() {
    var form = qs('#bmr-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var out = form.querySelector('#hub-bmr-output, #bmr-result');
      if (!out) return;

      var gender = (form.querySelector('#bmr-gender') || {}).value || 'female';
      var age = parseFloat((form.querySelector('#bmr-age') || {}).value || '');
      var weight = parseFloat((form.querySelector('#bmr-weight') || {}).value || '');
      var height = parseFloat((form.querySelector('#bmr-height') || {}).value || '');

      if (!age || !weight || !height || age < 10 || weight < 25 || height < 80) {
        out.innerHTML = '<div class="alert-box error">Please fill in valid age (10+), weight (25+ kg), and height (80+ cm).</div>';
        return;
      }

      // Revised Harris-Benedict (Roza & Shizgal, 1984)
      var bmr;
      if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }
      bmr = Math.round(bmr);

      var sedentary = Math.round(bmr * 1.2);
      var moderate = Math.round(bmr * 1.55);
      var active = Math.round(bmr * 1.725);

      out.innerHTML = formatCalcResult(
        bmr, 'kcal/day', 'badge-primary', 'Basal Energy (BMR)',
        'Your body requires approximately <strong>' + bmr + ' kcal</strong> per day at complete rest to sustain vital organ functions.',
        'Formula: Revised Harris-Benedict (Roza & Shizgal, 1984). Does not replace indirect calorimetry.',
        '<div class="calc-activity-tiers">' +
          '<div class="tier-row"><span>Sedentary (desk work):</span><strong> ' + sedentary + ' kcal</strong></div>' +
          '<div class="tier-row"><span>Moderate (3–5 workouts/wk):</span><strong> ' + moderate + ' kcal</strong></div>' +
          '<div class="tier-row"><span>High Activity (daily exercise):</span><strong> ' + active + ' kcal</strong></div>' +
        '</div>'
      );
    });
  }

  // Water Intake (#water-form → #hub-water-output)
  function initWater() {
    var form = qs('#water-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var out = form.querySelector('#hub-water-output, #water-result');
      if (!out) return;

      var weight = parseFloat((form.querySelector('#water-weight') || {}).value || '');
      var activity = (form.querySelector('#water-activity') || {}).value || 'sedentary';

      if (!weight || weight < 20) {
        out.innerHTML = '<div class="alert-box error">Please enter a valid body weight (minimum 20 kg).</div>';
        return;
      }

      var liters = weight * 0.035;
      if (activity === 'moderate') liters += 0.5;
      else if (activity === 'active') liters += 1.0;

      // Warm Indian climate adjustment (Indore, MP)
      liters += 0.3;

      var glasses = Math.round((liters * 1000) / 250);

      out.innerHTML = formatCalcResult(
        liters.toFixed(1), 'L/day', 'badge-info', '≈ ' + glasses + ' glasses',
        'Estimated fluid requirement (water, herbal teas, coconut water) spread across waking hours.',
        'Hydration needs vary with congestive heart failure, kidney disease, pregnancy, or breastfeeding.'
      );
    });
  }

  // WHR (#whr-form → #hub-whr-output)
  function initWhr() {
    var form = qs('#whr-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var out = form.querySelector('#hub-whr-output, #whr-result');
      if (!out) return;

      var gender = (form.querySelector('#whr-gender') || {}).value || 'female';
      var waist = parseFloat((form.querySelector('#whr-waist') || {}).value || '');
      var hip = parseFloat((form.querySelector('#whr-hip') || {}).value || '');

      if (!waist || !hip || waist < 40 || hip < 40) {
        out.innerHTML = '<div class="alert-box error">Please enter valid waist and hip measurements (minimum 40 cm).</div>';
        return;
      }

      var ratio = waist / hip;
      var risk, cls, note;

      if (gender === 'male') {
        if (ratio >= 1.0) { risk = 'High Cardiovascular Risk'; cls = 'badge-danger'; note = 'Strongly associated with hypertension, metabolic syndrome, and type 2 diabetes.'; }
        else if (ratio >= 0.91) { risk = 'Moderate Risk'; cls = 'badge-amber'; note = 'Moderate central adiposity. Aerobic conditioning and dietary adjustments recommended.'; }
        else { risk = 'Low Risk'; cls = 'badge-success'; note = 'Healthy abdominal fat distribution with low cardiovascular risk.'; }
      } else {
        if (ratio >= 0.86) { risk = 'High Cardiovascular Risk'; cls = 'badge-danger'; note = 'Central adiposity pattern. Common in PCOS and insulin resistance; targeted nutrition helps.'; }
        else if (ratio >= 0.81) { risk = 'Moderate Risk'; cls = 'badge-amber'; note = 'Moderate central waist-to-hip profile. Lifestyle modifications are beneficial.'; }
        else { risk = 'Low Risk'; cls = 'badge-success'; note = 'Healthy abdominal fat distribution with low cardiovascular risk.'; }
      }

      out.innerHTML = formatCalcResult(
        ratio.toFixed(2), 'WHR', cls, risk,
        note,
        'Reference: WHO Waist-to-Hip ratio cut-offs. Measure at narrowest waist and widest hip point.'
      );
    });
  }

  // IBW - Ideal Body Weight (#ibw-form → #hub-ibw-output)
  function initIbw() {
    var form = qs('#ibw-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var out = form.querySelector('#hub-ibw-output, #ibw-result');
      if (!out) return;

      var gender = (form.querySelector('#ibw-gender') || {}).value || 'female';
      var heightCm = parseFloat((form.querySelector('#ibw-height') || {}).value || '');

      if (!heightCm || heightCm < 120 || heightCm > 250) {
        out.innerHTML = '<div class="alert-box error">Please enter a valid height (120–250 cm).</div>';
        return;
      }

      var heightInches = heightCm / 2.54;
      var inchesOver60 = Math.max(0, heightInches - 60);
      var ibwKg = (gender === 'male') ? (50.0 + 2.3 * inchesOver60) : (45.5 + 2.3 * inchesOver60);

      var heightM = heightCm / 100;
      var bmiMin = (18.5 * heightM * heightM).toFixed(1);
      var bmiMax = (24.9 * heightM * heightM).toFixed(1);

      out.innerHTML = formatCalcResult(
        ibwKg.toFixed(1), 'kg', 'badge-primary', 'Devine IBW',
        'Healthy BMI weight range for your height: <strong>' + bmiMin + ' – ' + bmiMax + ' kg</strong>.',
        'Devine formula is a clinical reference baseline. Individual goals must consider lean muscle mass and body frame.'
      );
    });
  }

  /* ==========================================================================
     7. RECIPE EXPLORER — works with HTML-rendered cards
        HTML structure:
        - Cards: article.recipe-card[data-category="weight diabetes"][data-title="..."][data-ingredients="..."]
        - Portion scaler: button[data-action="dec"/"inc"][data-target="recipe-01"]
        - Serving display: span#servings-recipe-01
        - Macros: div#macros-recipe-01[data-base-cal="320"][data-base-protein="12"]...
          with inner strong.val-cal, .val-protein, .val-carbs, .val-fat
        - Ingredients: ul#ing-recipe-01 > li > span.ing-qty[data-base="40"]
        - Save: button.recipe-save-btn[data-recipe-id="recipe-01"][data-recipe-save="recipe-01"]
     ========================================================================== */

  function initRecipeExplorer() {
    var recipeGrid = qs('#recipe-cards-container, .recipe-grid');
    var filterBtns = qsa('[data-recipe-filter]');
    var searchInput = qs('#recipe-search');
    var savedKey = 'nutrislims_saved_recipes';
    var servingsCounts = {};  // tracking per recipe: { 'recipe-01': 1 }

    if (!recipeGrid) return;

    var allCards = recipeGrid.querySelectorAll('.recipe-card');

    // Initialize serving counts from initial HTML value
    allCards.forEach(function (card) {
      var recipeId = card.querySelector('[data-target]');
      if (recipeId) {
        var id = recipeId.getAttribute('data-target');
        var display = card.querySelector('#servings-' + id);
        servingsCounts[id] = display ? (parseInt(display.textContent, 10) || 1) : 1;
      }
    });

    // Load saved recipe IDs
    function getSaved() {
      try { return JSON.parse(localStorage.getItem(savedKey)) || []; }
      catch (e) { return []; }
    }

    // Apply save state to all save buttons on load
    function applySavedState() {
      var saved = getSaved();
      qsa('.recipe-save-btn[data-recipe-save]').forEach(function (btn) {
        var id = btn.getAttribute('data-recipe-save');
        var isSaved = saved.includes(id);
        btn.setAttribute('aria-pressed', String(isSaved));
        btn.classList.toggle('is-saved', isSaved);
        btn.setAttribute('title', isSaved ? 'Remove from saved' : 'Save recipe');
      });
    }

    // Category filter
    var activeFilter = 'all';
    var searchQuery = '';

    function filterCards() {
      allCards.forEach(function (card) {
        var category = card.getAttribute('data-category') || 'all';
        var title = (card.getAttribute('data-title') || '').toLowerCase();
        var ingredients = (card.getAttribute('data-ingredients') || '').toLowerCase();

        var matchCat = activeFilter === 'all' || category.includes(activeFilter);
        var matchSearch = !searchQuery || title.includes(searchQuery) || ingredients.includes(searchQuery);

        card.style.display = (matchCat && matchSearch) ? '' : 'none';
      });

      // Show no-results message if all cards hidden
      var visible = Array.from(allCards).filter(function (c) { return c.style.display !== 'none'; });
      var noResultMsg = recipeGrid.querySelector('.no-results-msg');
      if (visible.length === 0) {
        if (!noResultMsg) {
          var msg = document.createElement('p');
          msg.className = 'no-results-msg';
          msg.textContent = 'No recipes match the current filter or search. Try selecting "All Recipes" or clearing the search.';
          recipeGrid.appendChild(msg);
        }
      } else {
        if (noResultMsg) noResultMsg.remove();
      }
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        activeFilter = btn.getAttribute('data-recipe-filter') || btn.getAttribute('data-category') || 'all';
        filterCards();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        searchQuery = searchInput.value.trim().toLowerCase();
        filterCards();
      });
    }

    // Portion scaling via event delegation on the grid
    recipeGrid.addEventListener('click', function (e) {
      // Handle portion scaler buttons [data-action="dec"/"inc"]
      var scalerBtn = e.target.closest('[data-action="dec"], [data-action="inc"]');
      if (scalerBtn) {
        var action = scalerBtn.getAttribute('data-action');
        var targetId = scalerBtn.getAttribute('data-target');
        if (!targetId) return;

        var currentCount = servingsCounts[targetId] || 1;
        if (action === 'inc' && currentCount < 10) currentCount++;
        else if (action === 'dec' && currentCount > 1) currentCount--;
        servingsCounts[targetId] = currentCount;

        // Update serving display
        var servingDisplay = qs('#servings-' + targetId);
        if (servingDisplay) servingDisplay.textContent = currentCount;

        // Scale macros
        var macroBox = qs('#macros-' + targetId);
        if (macroBox) {
          var baseCal = parseFloat(macroBox.getAttribute('data-base-cal') || '0');
          var baseProt = parseFloat(macroBox.getAttribute('data-base-protein') || '0');
          var baseCarbs = parseFloat(macroBox.getAttribute('data-base-carbs') || '0');
          var baseFat = parseFloat(macroBox.getAttribute('data-base-fat') || '0');

          var valCal = macroBox.querySelector('.val-cal');
          var valProt = macroBox.querySelector('.val-protein');
          var valCarbs = macroBox.querySelector('.val-carbs');
          var valFat = macroBox.querySelector('.val-fat');

          if (valCal) valCal.textContent = Math.round(baseCal * currentCount);
          if (valProt) valProt.textContent = Math.round(baseProt * currentCount);
          if (valCarbs) valCarbs.textContent = Math.round(baseCarbs * currentCount);
          if (valFat) valFat.textContent = Math.round(baseFat * currentCount);
        }

        // Scale ingredient quantities
        var ingredientList = qs('#ing-' + targetId);
        if (ingredientList) {
          ingredientList.querySelectorAll('.ing-qty[data-base]').forEach(function (qty) {
            var base = parseFloat(qty.getAttribute('data-base') || '0');
            var scaled = base * currentCount;
            qty.textContent = (scaled % 1 === 0) ? scaled : scaled.toFixed(1);
          });
        }

        // Update disable state of dec button
        var card = scalerBtn.closest('.recipe-card');
        if (card) {
          var decBtn = card.querySelector('[data-action="dec"]');
          var incBtn = card.querySelector('[data-action="inc"]');
          if (decBtn) decBtn.disabled = (currentCount <= 1);
          if (incBtn) incBtn.disabled = (currentCount >= 10);
        }
        return;
      }

      // Handle recipe save toggle
      var saveBtn = e.target.closest('[data-recipe-save]');
      if (saveBtn) {
        var recipeId = saveBtn.getAttribute('data-recipe-save');
        try {
          var saved = getSaved();
          var idx = saved.indexOf(recipeId);
          var nowSaved;
          if (idx > -1) { saved.splice(idx, 1); nowSaved = false; }
          else { saved.push(recipeId); nowSaved = true; }
          localStorage.setItem(savedKey, JSON.stringify(saved));
          saveBtn.setAttribute('aria-pressed', String(nowSaved));
          saveBtn.classList.toggle('is-saved', nowSaved);
          saveBtn.setAttribute('title', nowSaved ? 'Remove from saved' : 'Save recipe');
        } catch (err) {
          console.warn('LocalStorage unavailable for recipe save.');
        }
      }
    });

    // Apply saved state on load
    applySavedState();
  }

  /* ==========================================================================
     8. VIDEO GALLERY MODAL
     HTML modal: #video-modal (hidden attr), #video-iframe, #video-modal-title, #video-fallback-link
     Play buttons: button[data-video-id][data-embed-url][data-share-url][data-title]
     Also handles .open-video-modal-btn buttons
     ========================================================================== */

  // Drive data as fallback lookup by video-id
  var VIDEO_DATA = {
    'video-01': {
      embedUrl: 'https://drive.google.com/file/d/1nfB5rQ9Z_GJ4kqiinFKj5keg89TB3eTv/preview',
      shareUrl: 'https://drive.google.com/file/d/1nfB5rQ9Z_GJ4kqiinFKj5keg89TB3eTv/view?usp=sharing',
      title: 'NutriSlims Video 01: Core Nutrition Fundamentals'
    },
    'video-02': {
      embedUrl: 'https://drive.google.com/file/d/1RDh_1iVl0I5NXvGbUJQDr2cWt4wVqIb-/preview',
      shareUrl: 'https://drive.google.com/file/d/1RDh_1iVl0I5NXvGbUJQDr2cWt4wVqIb-/view?usp=sharing',
      title: 'NutriSlims Video 02: Diabetic & Metabolic Meal Planning'
    },
    'video-03': {
      embedUrl: 'https://drive.google.com/file/d/1lR1_-uQvuony95gs3AFOCxX1No8zYqPh/preview',
      shareUrl: 'https://drive.google.com/file/d/1lR1_-uQvuony95gs3AFOCxX1No8zYqPh/view?usp=sharing',
      title: 'NutriSlims Video 03: Sustainable Habits & Gut Health'
    }
  };

  function initVideoGallery() {
    var videoModal = qs('#video-modal');
    if (!videoModal) return;

    var videoIframe = qs('#video-iframe', videoModal) || videoModal.querySelector('iframe');
    var titleEl = videoModal.querySelector('#video-modal-title');
    var fallbackLink = videoModal.querySelector('#video-fallback-link');

    document.addEventListener('click', function (e) {
      var playBtn = e.target.closest('[data-video-id].play, [data-video-id].play-btn, [data-video-id].video-play-btn, .open-video-modal-btn[data-video-id]');
      if (playBtn) {
        e.preventDefault();
        var videoId = playBtn.getAttribute('data-video-id');
        var embedUrl = playBtn.getAttribute('data-embed-url');
        var shareUrl = playBtn.getAttribute('data-share-url');
        var title = playBtn.getAttribute('data-title') || '';

        // Fallback to data map if button doesn't have URL attrs
        if (!embedUrl && VIDEO_DATA[videoId]) {
          embedUrl = VIDEO_DATA[videoId].embedUrl;
          shareUrl = VIDEO_DATA[videoId].shareUrl;
          title = title || VIDEO_DATA[videoId].title;
        }

        if (titleEl) titleEl.textContent = title || 'NutriSlims Video';
        if (fallbackLink && shareUrl) fallbackLink.href = shareUrl;
        if (videoIframe && embedUrl) videoIframe.src = embedUrl;

        openModal(videoModal);
      }
    });
  }

  /* ==========================================================================
     9. FAQ ACCORDION
     HTML: button.faq-question.accordion-button[aria-expanded][aria-controls="faq-a1"]
           div.faq-answer.accordion-collapse#faq-a1[hidden]
     ========================================================================== */

  function initFaqAccordion() {
    var questions = qsa('.faq-question, .accordion-button[aria-controls]');

    questions.forEach(function (button) {
      var panelId = button.getAttribute('aria-controls');
      var panel = panelId ? qs('#' + panelId) : button.nextElementSibling;
      if (!panel) return;

      // Ensure initial hidden state
      if (button.getAttribute('aria-expanded') !== 'true') {
        panel.setAttribute('hidden', 'true');
        panel.classList.remove('open');
      }

      button.addEventListener('click', function () {
        var isExpanded = button.getAttribute('aria-expanded') === 'true';
        var nextState = !isExpanded;

        button.setAttribute('aria-expanded', String(nextState));
        button.classList.toggle('active', nextState);

        // Toggle faq-icon text
        var icon = button.querySelector('.faq-icon');
        if (icon) icon.textContent = nextState ? '−' : '+';

        if (nextState) {
          panel.removeAttribute('hidden');
          panel.classList.add('open');
        } else {
          panel.setAttribute('hidden', 'true');
          panel.classList.remove('open');
        }
      });

      // Arrow key navigation
      button.addEventListener('keydown', function (e) {
        var allBtns = Array.from(qsa('.faq-question, .accordion-button[aria-controls]'));
        var idx = allBtns.indexOf(button);
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          allBtns[(idx + 1) % allBtns.length].focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          allBtns[(idx - 1 + allBtns.length) % allBtns.length].focus();
        } else if (e.key === 'Home') {
          e.preventDefault();
          allBtns[0].focus();
        } else if (e.key === 'End') {
          e.preventDefault();
          allBtns[allBtns.length - 1].focus();
        }
      });
    });
  }

  /* ==========================================================================
     10. CONSULTATION BOOKING FORM
     HTML: #booking-form with inputs: #booking-name, #booking-phone, #booking-email,
     #booking-service, #booking-mode, #booking-consent, output #booking-result
     WhatsApp CTA: #whatsapp-btn (dynamic href updates as user types)
     Service select trigger links: a.select-service-trigger[data-service-select="Weight management"]
     ========================================================================== */

  function isValidIndianPhone(phone) {
    var clean = phone.replace(/[\s\-\+\(\)]/g, '').slice(-10);
    return /^[6-9]\d{9}$/.test(clean);
  }

  function initBookingForm() {
    var form = qs('#booking-form');
    if (!form) return;

    var nameInput = form.querySelector('#booking-name, input[name="name"]');
    var phoneInput = form.querySelector('#booking-phone, input[name="phone"]');
    var emailInput = form.querySelector('#booking-email, input[name="email"]');
    var serviceSelect = form.querySelector('#booking-service, select[name="service"]');
    var modeSelect = form.querySelector('#booking-mode, select[name="mode"]');
    var consentCb = form.querySelector('#booking-consent, input[type="checkbox"][name="consent"]');
    var out = form.querySelector('#booking-result, .booking-result');
    var submitBtn = form.querySelector('button[type="submit"]');
    var whatsappBtn = qs('#whatsapp-btn');

    // Dynamic WhatsApp CTA update
    function updateWhatsApp() {
      var name = (nameInput ? nameInput.value.trim() : '') || 'Website Visitor';
      var service = (serviceSelect ? serviceSelect.value : '') || 'Nutrition Consultation';
      if (!service) service = 'Nutrition Consultation';
      var msg = 'Hello Dietitian Oshin Ambekar at NutriSlims, I would like to enquire about the ' + service + ' program. My name is ' + name + '.';
      var url = 'https://wa.me/917828149178?text=' + encodeURIComponent(msg);
      if (whatsappBtn) {
        whatsappBtn.href = url;
        whatsappBtn.setAttribute('title', 'WhatsApp enquiry for ' + service);
      }
    }

    form.addEventListener('input', updateWhatsApp);
    form.addEventListener('change', updateWhatsApp);

    // Service card select trigger (pre-fills service dropdown)
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-service-select]');
      if (trigger && serviceSelect) {
        var serviceName = trigger.getAttribute('data-service-select');
        // Set the matching option
        Array.from(serviceSelect.options).forEach(function (opt) {
          if (opt.value === serviceName || opt.textContent.includes(serviceName)) {
            opt.selected = true;
          }
        });
        updateWhatsApp();
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!out) return;

      var name = nameInput ? nameInput.value.trim() : '';
      var phone = phoneInput ? phoneInput.value.trim() : '';
      var email = emailInput ? emailInput.value.trim() : '';
      var service = serviceSelect ? serviceSelect.value : '';
      var mode = modeSelect ? modeSelect.value : 'Online';
      var consent = consentCb ? consentCb.checked : true;

      // Validation
      if (!name || name.length < 2) {
        out.innerHTML = '<div class="alert-box error" role="alert">Please enter your full name (at least 2 characters).</div>';
        if (nameInput) nameInput.focus();
        return;
      }
      if (!phone || !isValidIndianPhone(phone)) {
        out.innerHTML = '<div class="alert-box error" role="alert">Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.</div>';
        if (phoneInput) phoneInput.focus();
        return;
      }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        out.innerHTML = '<div class="alert-box error" role="alert">Please enter a valid email address.</div>';
        if (emailInput) emailInput.focus();
        return;
      }
      if (!service) {
        out.innerHTML = '<div class="alert-box error" role="alert">Please select the nutrition program you are interested in.</div>';
        if (serviceSelect) serviceSelect.focus();
        return;
      }
      if (!consent) {
        out.innerHTML = '<div class="alert-box error" role="alert">Please check the consent box to allow our team to contact you.</div>';
        if (consentCb) consentCb.focus();
        return;
      }

      // Submitting state
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Submitting...'; }

      setTimeout(function () {
        var refId = 'NS-IND-' + Math.floor(100000 + Math.random() * 900000);
        var cleanPhone = phone.replace(/[\s\-\+\(\)]/g, '').slice(-10);
        var confirmMsg = 'Hi Dietitian Oshin, I just submitted consultation booking request ' + refId + ' for ' + service + '.';

        out.innerHTML = '<div class="booking-success-card" role="alert">' +
          '<div class="success-icon" aria-hidden="true">✓</div>' +
          '<h4>Consultation Request Received!</h4>' +
          '<p>Thank you, <strong>' + escapeHtml(name) + '</strong>! Your request for <strong>' + escapeHtml(service) + '</strong> (' + escapeHtml(mode) + ') has been registered.</p>' +
          '<div class="booking-ref-box">Reference ID: <strong>' + refId + '</strong></div>' +
          '<p>Our clinic coordinator will contact you on <strong>+91 ' + cleanPhone + '</strong> within 24 business hours.</p>' +
          '<a href="https://wa.me/917828149178?text=' + encodeURIComponent(confirmMsg) + '" target="_blank" rel="noopener" class="button primary small">Confirm via WhatsApp ↗</a>' +
        '</div>';

        form.reset();
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Consultation Request'; }
        updateWhatsApp();
      }, 600);
    });
  }

  /* ==========================================================================
     11. CLIENT PORTAL MODAL
     HTML: #portal-modal (hidden), #portal-form, #portal-email, #portal-password, #portal-output
     Triggers: [data-modal="portal"], .portal-trigger
     ========================================================================== */

  function initClientPortal() {
    var portalModal = qs('#portal-modal');
    if (!portalModal) return;

    // Open triggers
    var portalTriggers = qsa('[data-modal="portal"], .portal-trigger, .portal-link, a[href="#portal"]');
    portalTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        openModal(portalModal);
      });
    });

    var portalForm = portalModal.querySelector('#portal-form, form');
    var portalOutput = portalModal.querySelector('#portal-output, .portal-output');

    if (portalForm && portalOutput) {
      portalForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var emailInput = portalForm.querySelector('#portal-email');
        var passInput = portalForm.querySelector('#portal-password');

        if (!emailInput || !emailInput.value.trim()) {
          portalOutput.innerHTML = '<div class="alert-box error">Please enter your registered email or Patient ID.</div>';
          return;
        }

        // Security note: no demo credentials, no client-side auth
        portalOutput.innerHTML = '<div class="alert-box warning">' +
          '<strong>🔒 Security Notice:</strong> This prototype does not process real credentials. ' +
          'Production portal login requires server-side authentication. No credentials are transmitted or stored. ' +
          'Please contact the clinic directly for portal access.' +
        '</div>';

        // Clear password for security
        if (passInput) passInput.value = '';
      });
    }
  }

  /* ==========================================================================
     12. SERVICE CARD INTERACTIONS
     ========================================================================== */

  function initServiceCards() {
    // Service card "Book This Program" links pre-fill the booking service field
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-service-select]');
      if (trigger) {
        var serviceName = trigger.getAttribute('data-service-select');
        var serviceSelect = qs('#booking-service, select[name="service"]');
        if (serviceSelect && serviceName) {
          Array.from(serviceSelect.options).forEach(function (opt) {
            opt.selected = (opt.value === serviceName);
          });
          // Dispatch change event to update WhatsApp link
          serviceSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    });
  }

  /* ==========================================================================
     13. SMOOTH SCROLL WITH HEADER OFFSET
     ========================================================================== */

  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      var href = anchor.getAttribute('href');
      if (!href || href === '#' || href === '#!' || href.startsWith('#privacy') || href.startsWith('#terms') || href.startsWith('#cookies') || href.startsWith('#medical')) return;

      // Skip modal triggers and calc tab links
      if (anchor.hasAttribute('data-modal') || anchor.hasAttribute('data-calc-tab')) return;

      var target = qs(href);
      if (!target) return;

      e.preventDefault();
      var header = qs('.site-header, .header, header');
      var headerH = header ? header.offsetHeight : 70;
      var offsetTop = target.getBoundingClientRect().top + window.pageYOffset - headerH - 12;

      window.scrollTo({ top: offsetTop, behavior: 'smooth' });

      // Accessibility: set tabindex for focus
      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }
      target.focus({ preventScroll: true });
    });
  }

  /* ==========================================================================
     14. FOOTER YEAR
     ========================================================================== */

  function initYear() {
    var yearEl = qs('#year, .current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     INITIALIZATION
     ========================================================================== */

  
  /* ==========================================================================
     12. LEGAL MODAL & TABS CONTROLLER (Privacy, Terms, Disclaimer, Cookies)
     ========================================================================== */
  function initLegalModal() {
    var legalModal = qs('#legal-modal');
    if (!legalModal) return;

    var tabButtons = qsa('.legal-tab-btn');
    var panels = qsa('.legal-panel');

    function switchLegalTab(tabId) {
      tabButtons.forEach(function (btn) {
        var isMatch = btn.getAttribute('data-legal') === tabId;
        btn.classList.toggle('active', isMatch);
        btn.setAttribute('aria-selected', String(isMatch));
      });
      panels.forEach(function (panel) {
        var isMatch = panel.id === ('legal-' + tabId);
        panel.classList.toggle('active', isMatch);
        if (isMatch) panel.removeAttribute('hidden');
        else panel.setAttribute('hidden', 'true');
      });
    }

    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tabId = btn.getAttribute('data-legal');
        switchLegalTab(tabId);
      });
    });

    // Intercept clicks on legal anchor links in footer
    document.addEventListener('click', function (e) {
      var legalLink = e.target.closest('a[href="#privacy"], a[href="#terms"], a[href="#medical-disclaimer"], a[href="#cookies"], #privacy-link, #terms-link, #disclaimer-link, #cookie-link');
      if (legalLink) {
        e.preventDefault();
        var href = legalLink.getAttribute('href') || '';
        var tabKey = 'privacy';
        if (href.includes('terms') || legalLink.id.includes('terms')) tabKey = 'terms';
        else if (href.includes('disclaimer') || legalLink.id.includes('disclaimer')) tabKey = 'disclaimer';
        else if (href.includes('cookie') || legalLink.id.includes('cookie')) tabKey = 'cookies';
        
        switchLegalTab(tabKey);
        openModal(legalModal);
      }
    });
  }

  /* ==========================================================================
     13. RECIPE MODAL DETAILS CONTROLLER
     ========================================================================== */
  var RECIPE_DETAILS = {
    'recipe-01': {
      title: 'Spiced Moong Dal & Spinach Khichdi',
      image: 'assets/images/indian-balanced-thali.jpg',
      prepTime: '15 mins',
      cookTime: '20 mins',
      calories: '280 kcal',
      protein: '14g',
      carbs: '48g',
      fiber: '8g',
      tags: ['Gut-Friendly', 'Post-Op Recovery', 'Low GI'],
      ingredients: [
        '1/2 cup split yellow moong dal (soaked 30 mins)',
        '1/2 cup brown basmati or broken rice',
        '2 cups fresh spinach (palak), finely chopped',
        '1 tsp cold-pressed sesame or mustard oil',
        '1/2 tsp cumin seeds (jeera) & pinch of asafoetida (hing)',
        '1/2 tsp turmeric powder & freshly ground black pepper',
        '3 cups warm water or vegetable broth'
      ],
      instructions: [
        'Rinse yellow moong dal and rice until water runs clear; soak for 20–30 minutes.',
        'In a pressure cooker or heavy-bottom pot, warm oil and temper cumin seeds and hing until aromatic.',
        'Stir in turmeric, soaked lentils, rice, chopped spinach, and salt to taste.',
        'Add 3 cups of water, cover, and pressure cook for 3 whistles on medium flame.',
        'Rest pressure, garnish with fresh coriander and crushed black pepper, and serve warm with curd.'
      ]
    },
    'recipe-02': {
      title: 'High-Protein Tofu & Vegetable Stir-Fry',
      image: 'assets/images/high-protein-tofu-stir-fry.jpg',
      prepTime: '12 mins',
      cookTime: '10 mins',
      calories: '320 kcal',
      protein: '24g',
      carbs: '16g',
      fiber: '7g',
      tags: ['PCOS-Friendly', 'Muscle Protein', 'Low Carb'],
      ingredients: [
        '200g firm organic tofu, pressed and cubed',
        '1 cup mixed bell peppers (red, yellow, green), diced',
        '1/2 cup broccoli florets, blanched',
        '1 tbsp low-sodium tamari or naturally fermented soy sauce',
        '1 tsp grated fresh ginger & 2 cloves crushed garlic',
        '1 tsp toasted white sesame seeds for garnish'
      ],
      instructions: [
        'Lightly sear pressed tofu cubes in a non-stick skillet until golden on all sides.',
        'Toss in minced ginger, garlic, bell peppers, and broccoli florets on high heat for 3–4 minutes.',
        'Drizzle tamari sauce and black pepper, stirring vigorously to coat evenly.',
        'Remove from heat, sprinkle toasted sesame seeds, and enjoy immediately.'
      ]
    },
    'recipe-03': {
      title: 'Overnight Chia & Rolled Oats Jar',
      image: 'assets/images/overnight-oats-bowl.jpg',
      prepTime: '5 mins',
      cookTime: 'Overnight',
      calories: '290 kcal',
      protein: '11g',
      carbs: '42g',
      fiber: '10g',
      tags: ['Heart Health', 'Cholesterol Care', 'High Fiber'],
      ingredients: [
        '1/2 cup whole rolled oats (gluten-free certified)',
        '1 tbsp chia seeds',
        '3/4 cup unsweetened almond or toned milk',
        '1/4 tsp ground Ceylon cinnamon',
        '1/4 cup fresh pomegranate pearls or blueberries',
        '4 halves crushed walnuts'
      ],
      instructions: [
        'In a clean glass mason jar, combine oats, chia seeds, and ground cinnamon.',
        'Pour milk over the mix, stir thoroughly to eliminate seed clumping, and seal lid.',
        'Refrigerate for at least 6 hours or overnight.',
        'Top with fresh fruit and walnuts in the morning before enjoying cold.'
      ]
    }
  };

  function initRecipeModal() {
    var modal = qs('#recipe-modal');
    var contentBox = qs('#recipe-modal-content');
    if (!modal || !contentBox) return;

    document.addEventListener('click', function (e) {
      var card = e.target.closest('.recipe-card');
      // If clicked save or portion buttons, don't trigger modal
      if (e.target.closest('.recipe-save-btn, [data-action="inc"], [data-action="dec"]')) return;

      if (card) {
        var title = card.getAttribute('data-title') || 'Nutrition Recipe';
        var recipeId = card.getAttribute('data-video-id') || card.querySelector('[data-target]')?.getAttribute('data-target') || 'recipe-01';
        var data = RECIPE_DETAILS[recipeId] || RECIPE_DETAILS['recipe-01'];

        var tagsHtml = (data.tags || []).map(function (t) {
          return '<span class="badge">' + escapeHtml(t) + '</span>';
        }).join(' ');

        var ingHtml = (data.ingredients || []).map(function (ing) {
          return '<li><span class="bullet" aria-hidden="true">✔</span> ' + escapeHtml(ing) + '</li>';
        }).join('');

        var stepHtml = (data.instructions || []).map(function (step, idx) {
          return '<li><strong>Step ' + (idx + 1) + ':</strong> ' + escapeHtml(step) + '</li>';
        }).join('');

        contentBox.innerHTML = '<div class="recipe-detail-header">' +
          '<img src="' + data.image + '" alt="' + escapeHtml(data.title) + '" class="recipe-detail-thumb">' +
          '<div class="recipe-detail-info">' +
            '<h4>' + escapeHtml(data.title) + '</h4>' +
            '<div class="recipe-tags-row">' + tagsHtml + '</div>' +
            '<p class="recipe-meta-strip"><small>Prep: ' + data.prepTime + ' | Cook: ' + data.cookTime + ' | Energy: ' + data.calories + ' | Protein: ' + data.protein + '</small></p>' +
          '</div>' +
        '</div>' +
        '<h5>Ingredients Checklist</h5>' +
        '<ul class="recipe-ingredients-list">' + ingHtml + '</ul>' +
        '<h5>Preparation Method</h5>' +
        '<ol class="recipe-step-list">' + stepHtml + '</ol>' +
        '<div class="recipe-modal-actions">' +
          '<button type="button" class="button outline sm" onclick="window.print()">Print Recipe</button>' +
        '</div>';

        openModal(modal);
      }
    });
  }

  /* ==========================================================================
     14. BACK TO TOP BUTTON CONTROLLER
     ========================================================================== */
  function initBackToTop() {
    var btn = qs('#back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     15. BOOKING FORM DATE RESTRICTION (Tomorrow min date)
     ========================================================================== */
  function initDateRestriction() {
    var dateInput = qs('#booking-date');
    if (!dateInput) return;
    try {
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var minStr = tomorrow.toISOString().split('T')[0];
      dateInput.setAttribute('min', minStr);
    } catch (e) {}
  }

  function init() {
    initHeaderScroll();
    initMobileNav();
    initNavDropdowns();
    initGlobalModalListeners();
    initLegalModal();
    initRecipeModal();
    initBackToTop();
    initDateRestriction();

    initSearchModal();
    initQuickBmi();
    initCalcTabs();
    initFullBmi();
    initBmr();
    initWater();
    initWhr();
    initIbw();
    initRecipeExplorer();
    initVideoGallery();
    initFaqAccordion();
    initBookingForm();
    initClientPortal();
    initServiceCards();
    initSmoothScroll();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
