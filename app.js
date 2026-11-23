/* MAIN APPLICATION ENGINE - NUTRISLIMS PREMIUM WEB APPLICATION */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. DATA DIRECTORY (RECIPES, SWAPS, CHAT)
    // ==========================================

    const recipesData = [
        {
            id: 1,
            title: "Overnight Oats & Chia Seeds Bowl",
            category: "weight-loss",
            image: "assets/images/overnight-oats-bowl.jpg",
            prepTime: "10 mins",
            calories: 280,
            macros: { carbs: 36, protein: 12, fats: 8 },
            tags: ["High Fiber", "Gut Friendly", "Weight Loss"],
            ingredients: [
                { name: "Rolled Oats", qty: 40, unit: "g" },
                { name: "Chia Seeds", qty: 10, unit: "g" },
                { name: "Skimmed Milk", qty: 150, unit: "ml" },
                { name: "Raw Honey", qty: 5, unit: "g" },
                { name: "Almonds", qty: 5, unit: "pcs" }
            ],
            instructions: "Mix oats, chia seeds, and milk. Leave in refrigerator overnight. Top with honey and chopped almonds in the morning."
        },
        {
            id: 2,
            title: "Diabetic-Friendly Quinoa Khichdi",
            category: "diabetic",
            image: "assets/images/indian-balanced-thali.jpg",
            prepTime: "25 mins",
            calories: 320,
            macros: { carbs: 42, protein: 14, fats: 7 },
            tags: ["Low GI", "Heart Healthy", "Diabetic Friendly"],
            ingredients: [
                { name: "Quinoa Grains", qty: 50, unit: "g" },
                { name: "Yellow Moong Dal", qty: 20, unit: "g" },
                { name: "Mixed Vegetables (Carrot, Beans, Peas)", qty: 80, unit: "g" },
                { name: "Cow's Ghee", qty: 5, unit: "ml" },
                { name: "Turmeric & Cumin seeds", qty: 2, unit: "g" }
            ],
            instructions: "Wash quinoa and dal. Heat ghee, add cumin seeds, and sauté veggies. Stir in quinoa, dal, turmeric, and water. Pressure cook for 3 whistles."
        },
        {
            id: 3,
            title: "PCOS-Approved Paneer Tikka Salad",
            category: "pcos",
            image: "assets/images/paneer-vegetable-bowl.jpg",
            prepTime: "15 mins",
            calories: 380,
            macros: { carbs: 12, protein: 22, fats: 16 },
            tags: ["High Protein", "Hormone Balancing", "PCOS Friendly"],
            ingredients: [
                { name: "Low-Fat Paneer (Tofu for Vegan)", qty: 150, unit: "g" },
                { name: "Bell Peppers (Red, Yellow, Green)", qty: 60, unit: "g" },
                { name: "Cucumber & Tomatoes", qty: 80, unit: "g" },
                { name: "Olive Oil", qty: 5, unit: "ml" },
                { name: "Lemon Juice & Chat Masala", qty: 10, unit: "ml" }
            ],
            instructions: "Dice paneer and veggies. Toss with olive oil, lemon juice, and seasonings. Serve fresh or lightly air-fried."
        },
        {
            id: 4,
            title: "High-Protein Salmon / Tofu Stir-Fry",
            category: "high-protein",
            image: "assets/images/high-protein-tofu-stir-fry.jpg",
            prepTime: "20 mins",
            calories: 410,
            macros: { carbs: 18, protein: 32, fats: 14 },
            tags: ["Lean Muscle", "Omega 3 Rich", "High Protein"],
            ingredients: [
                { name: "Fresh Salmon or Firm Tofu", qty: 180, unit: "g" },
                { name: "Broccoli florets", qty: 100, unit: "g" },
                { name: "Garlic cloves", qty: 3, unit: "pcs" },
                { name: "Soy Sauce (Low Sodium)", qty: 10, unit: "ml" },
                { name: "Sesame Oil", qty: 5, unit: "ml" }
            ],
            instructions: "Sear protein in sesame oil with minced garlic. Add steamed broccoli and soy sauce. Toss on high heat for 3 minutes."
        },
        {
            id: 5,
            title: "PCOS Superfood Chickpea Salad",
            category: "pcos",
            image: "assets/images/chickpea-avocado-salad.jpg",
            prepTime: "15 mins",
            calories: 310,
            macros: { carbs: 32, protein: 11, fats: 14 },
            tags: ["Hormone Balance", "High Fiber", "PCOS Approved"],
            ingredients: [
                { name: "Boiled Desi Chickpeas", qty: 100, unit: "g" },
                { name: "Sliced Avocado", qty: 50, unit: "g" },
                { name: "Diced Crunchy Cucumber", qty: 60, unit: "g" },
                { name: "Extra Virgin Olive Oil", qty: 5, unit: "ml" },
                { name: "Fresh Lemon Juice", qty: 10, unit: "ml" }
            ],
            instructions: "Combine boiled chickpeas, avocado, and cucumber. Dress with extra virgin olive oil, lemon juice, and roasted cumin powder."
        },
        {
            id: 6,
            title: "Sprouted Moong & Pomegranate Salad",
            category: "weight-loss",
            image: "assets/images/healthy-meal-prep.jpg",
            prepTime: "12 mins",
            calories: 210,
            macros: { carbs: 34, protein: 11, fats: 3 },
            tags: ["Live Enzymes", "Low Calorie", "Weight Loss"],
            ingredients: [
                { name: "Sprouted Green Moong", qty: 100, unit: "g" },
                { name: "Fresh Pomegranate Pearls", qty: 50, unit: "g" },
                { name: "Diced Crunchy Cucumber", qty: 50, unit: "g" },
                { name: "Fresh Lemon Juice", qty: 5, unit: "ml" },
                { name: "Roasted Cumin & Rock Salt", qty: 2, unit: "g" }
            ],
            instructions: "Mix live sprouted moong with sweet pomegranate pearls and diced cucumber. Lightly dress with fresh lemon and rock salt."
        }
    ];

    const foodSubstitutionEngine = {
        "white-rice": {
            fromName: "White Rice (High Glycemic Index)",
            fromDesc: "Causes rapid insulin spikes and lacks dietary fiber, contributing to sudden hunger spikes.",
            toName: "Quinoa or Cauliflower Rice",
            toDesc: "High protein, high fiber options that release energy slowly and support stable blood glucose levels."
        },
        "refined-sugar": {
            fromName: "Refined White Sugar (Empty Calories)",
            fromDesc: "Destroys gut flora, causes fatty liver accumulation, and leads to rapid insulin crashes.",
            toName: "Stevia Steep or Small Date Paste",
            toDesc: "Provides natural sweetness with zero glycemic load or beneficial potassium/fiber metrics."
        },
        "potato-chips": {
            fromName: "Deep Fried Potato Chips (Trans Fats)",
            fromDesc: "Highly processed, loaded with sodium, and cooked in inflammatory vegetable seed oils.",
            toName: "Roasted Foxnuts (Makhana) or Almonds",
            toDesc: "Rich in antioxidants, magnesium, and healthy fats that support brain and metabolic function."
        },
        "whole-milk": {
            fromName: "High Fat Dairy Milk (Visceral Weight)",
            fromDesc: "Contains heavy saturated fats and lactose, which can trigger bloating and inflammatory skin breakouts.",
            toName: "Unsweetened Almond Milk or Oats Milk",
            toDesc: "Low calorie, dairy-free alternative that is gentle on the stomach and supports clear skin."
        },
        "soda": {
            fromName: "Carbonated Sweetened Soda (Fructose Spike)",
            fromDesc: "Contains high-fructose corn syrup that causes visceral fat accumulation and increases diabetes risk.",
            toName: "Mint & Lemon Infused Detox Water",
            toDesc: "Hydrates cells, flushes liver toxins, and provides natural vitamin C without calorie load."
        }
    };

    const dietitianChatResponses = {
        "hello": "Hello! I am Oshin's virtual assistant. How can I help you today? Ask me about 'weight loss tips', 'PCOS diets', or 'diabetic routines'.",
        "hi": "Hello! I am Oshin's virtual assistant. How can I help you today? Ask me about 'weight loss tips', 'PCOS diets', or 'diabetic routines'.",
        "weight loss tips": "To support sustainable weight loss: 1) Focus on calorie maintenance deficits (calculate using our BMR tool!). 2) Drink at least 3 Liters of water. 3) Restrict dinner carbohydrates and eat before 7:30 PM.",
        "pcos diets": "PCOS management benefits from low-glycemic index (GI) foods. Focus on leafy greens, lean proteins (sprouts, paneer), healthy fats (walnuts, seeds), and avoid gluten and processed sugars.",
        "diabetic routines": "For blood sugar stability, balance carbohydrate intake with fiber and protein. Have apple cider vinegar before large meals, eat salad first, and take a 15-minute walk after eating.",
        "water intake": "Hydration is key for metabolism. Most active adults require 2.5 to 3.5 Liters of water daily. Use our Daily Water Intake Calculator to get your specific goal!",
        "appointment": "You can schedule a discovery session using the form on our home page or call our Indore clinic directly at 07828149178 (+91 78281 49178).",
        "default": "I appreciate your query! Oshin recommends eating whole home-cooked meals, focusing on hydration, and sleeping 8 hours daily. For specific advice, consider booking a consultation session!"
    };

    const symptomDeficiencyLookup = {
        "vitamin-d": { name: "Vitamin D3 Deficiency", tip: "Get 15 mins of morning sun exposure. Incorporate egg yolks, mushrooms, and consult Oshin for clinical supplementation guidelines." },
        "iron": { name: "Iron Deficiency / Anemia", tip: "Consume spinach, beetroot, pomegranate juice, black raisins, and combine with Vitamin C (lemon juice) to enhance absorption." },
        "vitamin-b12": { name: "Vitamin B12 Deficit", tip: "Common in vegetarian diets. Enhance dairy, yogurt, fortified cereals, or consult for sublingual B12 supplements." },
        "magnesium": { name: "Magnesium Shortage", tip: "Incorporate pumpkin seeds, almonds, dark leafy greens, and bananas to prevent muscle spasms and support sleep." },
        "zinc": { name: "Zinc Mineral Deficit", tip: "Eat sesame seeds, chickpeas, cashews, and whole grains to improve immunity and skin cell healing." }
    };

    // ==========================================
    // 2. STATE ENVIRONMENT variables
    // ==========================================

    let isMuted = false;
    let isDarkMode = false;
    let isContrastMode = false;
    let activeFastingTimer = null;
    let fastingDurationHrs = 16;
    let fastingState = "idle"; // "idle", "active", "paused"
    let fastingElapsedSeconds = 0;
    
    // Authenticated state parameters
    let isUserLoggedIn = false;
    let userStats = {
        name: "Oshin",
        id: "NS-4982",
        caloriesTarget: 1600,
        caloriesLogged: 0,
        waterTarget: 2.5,
        waterLogged: 0.0,
        sleepTarget: 8,
        sleepLogged: 0,
        streakDays: 5,
        weightHistory: [88.5, 87.2, 85.9, 84.1, 82.5, 80.2],
        loggedFoods: [],
        loggedWorkouts: []
    };

    // ==========================================
    // 3. UI ELEMENT SELECTORS
    // ==========================================

    const mainHeader = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const appPages = document.querySelectorAll('.app-page');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const soundToggleBtn = document.getElementById('sound-toggle');
    const accessibilityToggleBtn = document.getElementById('accessibility-toggle');
    
    // Audio elements
    const clickSound = document.getElementById('audio-click');
    const completeSound = document.getElementById('audio-complete');
    const alarmSound = document.getElementById('audio-alarm');

    // Global Search Elements
    const searchIconBtn = document.getElementById('search-icon-btn');
    const globalSearchInput = document.getElementById('global-search-input');
    const searchDropdownResults = document.getElementById('search-dropdown-results');

    // Toast Container
    const toastContainer = document.getElementById('toast-container');

    // Live clinic status element
    const liveClinicStatus = document.getElementById('live-clinic-status');

    // Booking Form
    const clinicBookingForm = document.getElementById('clinic-booking-form');

    // Quick Hero BMI check
    const heroBmiCalcBtn = document.getElementById('hero-bmi-calc-btn');
    const heroWeightInput = document.getElementById('hero-weight');
    const heroHeightInput = document.getElementById('hero-height');
    const heroBmiResults = document.getElementById('hero-bmi-results');
    const heroBmiScore = document.getElementById('hero-bmi-score');
    const heroBmiBadge = document.getElementById('hero-bmi-badge');
    const heroBmiMsg = document.getElementById('hero-bmi-msg');

    // Fasting Timer Elements
    const fastPlanSelect = document.getElementById('fast-plan-type');
    const fastStartBtn = document.getElementById('fast-start-btn');
    const fastPauseBtn = document.getElementById('fast-pause-btn');
    const fastResetBtn = document.getElementById('fast-reset-btn');
    const fastCountdownTimer = document.getElementById('fast-countdown-timer');
    const fastTimeElapsed = document.getElementById('fast-time-elapsed');
    const fastStatusLbl = document.getElementById('fast-status-lbl');
    const timerProgressFill = document.getElementById('timer-progress-fill');

    // Chat modal triggers
    const aiChatTrigger = document.getElementById('ai-chat-trigger');
    const aiChatModal = document.getElementById('ai-chat-modal');
    const aiChatCloseBtn = document.getElementById('ai-chat-close-btn');
    const chatConversationBody = document.getElementById('chat-conversation-body');
    const chatUserInput = document.getElementById('chat-user-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatTabQA = document.getElementById('chat-tab-qa');
    const chatTabSymptoms = document.getElementById('chat-tab-symptoms');
    const chatTabAnalyzer = document.getElementById('chat-tab-analyzer');
    const chatPhotoPanel = document.getElementById('chat-photo-panel');

    // Dashboard Portal logic
    const headerPortalBtn = document.getElementById('header-portal-btn');
    const dashboardLoggedOut = document.getElementById('dashboard-logged-out');
    const dashboardLoggedIn = document.getElementById('dashboard-logged-in');
    const clientLoginForm = document.getElementById('client-login-form');
    const dashboardLogoutBtn = document.getElementById('dashboard-logout-btn');
    const navDashboardLink = document.getElementById('nav-dashboard-link');

    // ==========================================
    // 4. MICRO-INTERACTION & UTILITY MOTIFS
    // ==========================================

    // Play click sound
    function playClick() {
        if (!isMuted && clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {});
        }
    }

    // Play complete sound
    function playComplete() {
        if (!isMuted && completeSound) {
            completeSound.currentTime = 0;
            completeSound.play().catch(() => {});
        }
    }

    // Show dynamic toast notifications
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast-alert ${type}`;
        
        let icon = 'fa-circle-info';
        if (type === 'success') icon = 'fa-circle-check';
        if (type === 'error') icon = 'fa-circle-xmark';
        
        toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
        toastContainer.appendChild(toast);
        
        // Remove toast from DOM after animation completes
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // sticky header shrink and slide down transitions
    window.addEventListener('scroll', () => {
        if (window.scrollY > 150) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    });

    // Theme controls (Light/Dark Mode toggle)
    themeToggleBtn.addEventListener('click', () => {
        playClick();
        isDarkMode = !isDarkMode;
        if (isDarkMode) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            showToast("Dark Mode Enabled", "info");
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            showToast("Light Mode Enabled", "info");
        }
    });

    // Mute/Unmute audio controls
    soundToggleBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        if (isMuted) {
            soundToggleBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
            showToast("Sound Feedback Muted", "info");
        } else {
            soundToggleBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            playClick();
            showToast("Sound Feedback Enabled", "info");
        }
    });

    // Toggle Accessibility High Contrast
    accessibilityToggleBtn.addEventListener('click', () => {
        playClick();
        isContrastMode = !isContrastMode;
        if (isContrastMode) {
            document.body.classList.add('accessibility-contrast');
            showToast("High Contrast Mode On", "info");
        } else {
            document.body.classList.remove('accessibility-contrast');
            showToast("High Contrast Mode Off", "info");
        }
    });

    // Check clinic opening status based on user local time
    function evaluateClinicStatus() {
        if (!liveClinicStatus) return;
        const now = new Date();
        const day = now.getDay(); // 0 is Sunday, 6 is Saturday
        const hour = now.getHours();
        
        // Clinic open hours: Monday-Saturday 9:00 AM - 8:00 PM (hour 9 to 20)
        if (day === 0) {
            liveClinicStatus.innerText = "Closed (Opens Monday 9:00 AM)";
            liveClinicStatus.style.backgroundColor = "var(--color-danger)";
        } else if (hour >= 9 && hour < 20) {
            liveClinicStatus.innerText = "Clinic is Open (Walk-ins Welcome)";
            liveClinicStatus.style.backgroundColor = "var(--color-success)";
        } else {
            liveClinicStatus.innerText = "Closed (Opens tomorrow 9:00 AM)";
            liveClinicStatus.style.backgroundColor = "var(--color-warning)";
        }
    }
    evaluateClinicStatus();
    setInterval(evaluateClinicStatus, 60000); // update every minute

    // Ambient Particles backdrop in Hero section
    function loadHeroParticles() {
        const container = document.getElementById('particles-container');
        if (!container) return;
        
        container.innerHTML = '';
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random styling layouts
            const size = Math.random() * 8 + 4;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 92 + 2}%`;
            particle.style.bottom = `-${Math.random() * 20}%`;
            particle.style.animationDelay = `${Math.random() * 8}s`;
            particle.style.animationDuration = `${Math.random() * 12 + 6}s`;
            
            container.appendChild(particle);
        }
    }
    loadHeroParticles();

    // ==========================================
    // 5. APPLICATION VIRTUAL ROUTING
    // ==========================================

    // Mobile Hamburger Menu Toggle
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const mainNavbar = document.getElementById('main-navbar') || document.querySelector('.navbar-links');
    if (menuToggleBtn && mainNavbar) {
        menuToggleBtn.addEventListener('click', () => {
            playClick();
            mainNavbar.classList.toggle('active');
            const icon = menuToggleBtn.querySelector('i');
            if (icon) {
                if (mainNavbar.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                    menuToggleBtn.setAttribute('aria-expanded', 'true');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                    menuToggleBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetSectionId = link.getAttribute('data-target');
            if (targetSectionId) {
                e.preventDefault();
                playClick();
                
                // Toggle active tags
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Close mobile dropdown if open
                if (mainNavbar && mainNavbar.classList.contains('active')) {
                    mainNavbar.classList.remove('active');
                    const icon = menuToggleBtn?.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-xmark');
                        icon.classList.add('fa-bars');
                        menuToggleBtn?.setAttribute('aria-expanded', 'false');
                    }
                }
                
                appPages.forEach(page => {
                    page.classList.remove('active');
                    if (page.id === targetSectionId) {
                        page.classList.add('active');
                    }
                });

                // Scroll to top of window
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // Support quick CTAs redirection to pages
    document.querySelectorAll('.scroll-to-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetPageId = btn.getAttribute('data-target');
            if (targetPageId) {
                e.preventDefault();
                playClick();
                
                appPages.forEach(page => page.classList.remove('active'));
                document.getElementById(targetPageId).classList.add('active');
                
                // Highlight link
                navLinks.forEach(l => {
                    l.classList.remove('active');
                    if (l.getAttribute('data-target') === targetPageId) {
                        l.classList.add('active');
                    }
                });
                
                // Scroll to actual block element if hash present
                const hash = btn.getAttribute('href');
                if (hash && hash !== '#') {
                    const targetEl = document.querySelector(hash);
                    if (targetEl) {
                        setTimeout(() => {
                            targetEl.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                    }
                }
            }
        });
    });

    // Quick direct trigger buttons redirection
    document.getElementById('hero-tools-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('[data-target="tools-section"]')?.click();
    });

    // ==========================================
    // 6. HEALTH CALCULATORS HUB CONTROLS
    // ==========================================

    // Tab switcher sidebar
    const calcTabs = document.querySelectorAll('.sidebar-tab-btn');
    const calcPanels = document.querySelectorAll('.calc-panel');

    calcTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            playClick();
            calcTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const targetCalc = tab.getAttribute('data-calc');
            calcPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `calc-panel-${targetCalc}`) {
                    panel.classList.add('active');
                }
            });

            // On mobile viewports, scroll calculator card into view
            if (window.innerWidth <= 768) {
                const calcCard = document.querySelector('.calculator-display-card');
                if (calcCard) {
                    calcCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    });

    // A. Quick Hero BMI Widget Action (Metric / Imperial)
    const heroUnitMetric = document.getElementById('hero-unit-metric');
    const heroUnitImperial = document.getElementById('hero-unit-imperial');
    const heroWeightLbl = document.getElementById('hero-weight-lbl');
    const heroHeightLbl = document.getElementById('hero-height-lbl');

    if (heroUnitMetric && heroUnitImperial) {
        heroUnitMetric.addEventListener('click', () => {
            playClick();
            heroUnitMetric.classList.add('active');
            heroUnitImperial.classList.remove('active');
            if (heroWeightLbl) heroWeightLbl.innerText = 'kg';
            if (heroHeightLbl) heroHeightLbl.innerText = 'cm';
            if (heroWeightInput) {
                heroWeightInput.placeholder = '70';
                heroWeightInput.min = '20';
                heroWeightInput.max = '300';
            }
            if (heroHeightInput) {
                heroHeightInput.placeholder = '170';
                heroHeightInput.min = '50';
                heroHeightInput.max = '250';
            }
        });

        heroUnitImperial.addEventListener('click', () => {
            playClick();
            heroUnitImperial.classList.add('active');
            heroUnitMetric.classList.remove('active');
            if (heroWeightLbl) heroWeightLbl.innerText = 'lbs';
            if (heroHeightLbl) heroHeightLbl.innerText = 'in';
            if (heroWeightInput) {
                heroWeightInput.placeholder = '154';
                heroWeightInput.min = '44';
                heroWeightInput.max = '660';
            }
            if (heroHeightInput) {
                heroHeightInput.placeholder = '67';
                heroHeightInput.min = '20';
                heroHeightInput.max = '100';
            }
        });
    }

    if (heroBmiCalcBtn) {
        heroBmiCalcBtn.addEventListener('click', () => {
            playClick();
            const w = parseFloat(heroWeightInput.value);
            const h = parseFloat(heroHeightInput.value);
            
            if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
                showToast("Please enter valid weight and height measurements.", "error");
                return;
            }

            const isImperial = heroUnitImperial && heroUnitImperial.classList.contains('active');
            let bmi = 0;
            if (isImperial) {
                // Imperial calculation: BMI = (weight in lbs / (height in in * height in in)) * 703
                bmi = (w / (h * h)) * 703;
            } else {
                // Standard Metric calculation (Height is in cm)
                bmi = w / ((h / 100) * (h / 100));
            }
            heroBmiScore.innerText = bmi.toFixed(1);
            
            // Set badges
            heroBmiResults.classList.remove('hidden');
            heroBmiBadge.className = "bmi-badge";
            
            if (bmi < 18.5) {
                heroBmiBadge.innerText = "Underweight";
                heroBmiBadge.classList.add('underweight');
                heroBmiMsg.innerText = "Consider a calorie surplus meal plan rich in proteins and nutrient-dense fats.";
            } else if (bmi >= 18.5 && bmi < 24.9) {
                heroBmiBadge.innerText = "Normal Weight";
                heroBmiBadge.classList.add('normal');
                heroBmiMsg.innerText = "Perfect! Your weight matches healthy metabolic ranges. Maintain balanced meal maps.";
            } else if (bmi >= 24.9 && bmi < 29.9) {
                heroBmiBadge.innerText = "Overweight";
                heroBmiBadge.classList.add('overweight');
                heroBmiMsg.innerText = "Consider calorie cuts and daily hydration upgrades to support safe fat reduction.";
            } else {
                heroBmiBadge.innerText = "Obese";
                heroBmiBadge.classList.add('obese');
                heroBmiMsg.innerText = "High metabolic index. Consult Dietician Oshin for clinical visceral fat analysis and custom program design.";
            }
            playComplete();
        });
    }

    // B. Advanced Hub BMI Calculator Action
    const advBmiForm = document.getElementById('adv-bmi-form');
    const bmiAdvOutput = document.getElementById('bmi-adv-output');
    const bmiAdvScore = document.getElementById('bmi-adv-score');
    const bmiAdvRange = document.getElementById('bmi-adv-range');
    const bmiAdvRangeSummary = document.getElementById('bmi-adv-range-summary');
    const bmiAdvLimits = document.getElementById('bmi-adv-limits');

    if (advBmiForm) {
        advBmiForm.addEventListener('submit', (e) => {
            e.preventDefault();
            playClick();
            
            const w = parseFloat(document.getElementById('bmi-weight').value);
            const h = parseFloat(document.getElementById('bmi-height').value);
            const age = parseInt(document.getElementById('bmi-age').value);
            
            if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
                showToast("Please enter valid positive measurements for weight and height.", "error");
                return;
            }
            
            const bmi = w / ((h / 100) * (h / 100));
            bmiAdvScore.innerText = bmi.toFixed(1);
            bmiAdvOutput.classList.remove('hidden');
            
            // Ideal limits formulas (Standard BMI 18.5 to 24.9)
            const minIdealW = 18.5 * ((h / 100) * (h / 100));
            const maxIdealW = 24.9 * ((h / 100) * (h / 100));
            
            bmiAdvLimits.innerHTML = `Healthy weight boundaries for your height: <strong>${minIdealW.toFixed(1)} kg - ${maxIdealW.toFixed(1)} kg</strong>`;
            
            bmiAdvRange.className = "bmi-badge";
            if (bmi < 18.5) {
                bmiAdvRange.innerText = "Underweight";
                bmiAdvRange.classList.add('underweight');
                bmiAdvRangeSummary.innerText = "You are currently below standard healthy weight ranges for your height profile.";
            } else if (bmi >= 18.5 && bmi < 24.9) {
                bmiAdvRange.innerText = "Normal Weight";
                bmiAdvRange.classList.add('normal');
                bmiAdvRangeSummary.innerText = "Congratulations! Your BMI score suggests you are at a very healthy target weight range.";
            } else if (bmi >= 24.9 && bmi < 29.9) {
                bmiAdvRange.innerText = "Overweight";
                bmiAdvRange.classList.add('overweight');
                bmiAdvRangeSummary.innerText = "You are slightly above healthy averages, which increases strain on endocrine and heart wellness.";
            } else {
                bmiAdvRange.innerText = "Obese Range";
                bmiAdvRange.classList.add('obese');
                bmiAdvRangeSummary.innerText = "Clinical obesity indicator. viseral fat accumulation poses metabolic and hormone disruption risks.";
            }
            playComplete();
        });
    }

    // C. BMR Harris-Benedict Metabolic Rate
    const advBmrForm = document.getElementById('adv-bmr-form');
    const bmrAdvOutput = document.getElementById('bmr-adv-output');
    const bmrAdvCalories = document.getElementById('bmr-adv-calories');

    if (advBmrForm) {
        advBmrForm.addEventListener('submit', (e) => {
            e.preventDefault();
            playClick();
            
            const w = parseFloat(document.getElementById('bmr-weight').value);
            const h = parseFloat(document.getElementById('bmr-height').value);
            const age = parseInt(document.getElementById('bmr-age').value);
            const gender = document.getElementById('bmr-gender').value;
            
            if (isNaN(w) || isNaN(h) || isNaN(age) || w <= 0 || h <= 0 || age <= 0) {
                showToast("Please enter valid positive values for weight, height, and age.", "error");
                return;
            }
            
            let bmr = 0;
            if (gender === 'male') {
                bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * age);
            } else {
                bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * age);
            }
            
            bmrAdvCalories.innerText = Math.round(bmr);
            bmrAdvOutput.classList.remove('hidden');
            
            // Share calculation to next TDEE form automatically
            const tdeeBmrInput = document.getElementById('tdee-bmr');
            if (tdeeBmrInput) tdeeBmrInput.value = Math.round(bmr);
            
            playComplete();
        });
    }

    // D. TDEE & Activity
    const advTdeeForm = document.getElementById('adv-tdee-form');
    const tdeeAdvOutput = document.getElementById('tdee-adv-output');
    const tdeeAdvCalories = document.getElementById('tdee-adv-calories');
    const tdeeZoneCut = document.getElementById('tdee-zone-cut');
    const tdeeZoneMaintain = document.getElementById('tdee-zone-maintain');
    const tdeeZoneBulk = document.getElementById('tdee-zone-bulk');

    if (advTdeeForm) {
        advTdeeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            playClick();
            
            const bmr = parseFloat(document.getElementById('tdee-bmr').value);
            const activity = parseFloat(document.getElementById('tdee-activity').value);
            
            if (isNaN(bmr) || isNaN(activity) || bmr <= 0 || activity <= 0) {
                showToast("Please calculate your BMR first or enter a valid positive number.", "error");
                return;
            }
            
            const tdee = bmr * activity;
            tdeeAdvCalories.innerText = Math.round(tdee);
            
            // Calculate ranges
            tdeeZoneCut.innerText = `${Math.round(tdee - 450)} kcal`;
            tdeeZoneMaintain.innerText = `${Math.round(tdee)} kcal`;
            tdeeZoneBulk.innerText = `${Math.round(tdee + 350)} kcal`;
            
            tdeeAdvOutput.classList.remove('hidden');
            
            // Populate calories splitter target automatically
            const macroCalInput = document.getElementById('macro-calories');
            if (macroCalInput) macroCalInput.value = Math.round(tdee);
            
            playComplete();
        });
    }

    // E. Body Fat Percentage (US Navy)
    const advBodyfatForm = document.getElementById('adv-bodyfat-form');
    const bodyfatAdvOutput = document.getElementById('bodyfat-adv-output');
    const bodyfatScore = document.getElementById('bodyfat-score');
    const bodyfatRangeBadge = document.getElementById('bodyfat-range-badge');
    const bfGenderSelect = document.getElementById('bf-gender');
    const bfHipWrapper = document.getElementById('bf-hip-wrapper');

    if (bfGenderSelect) {
        bfGenderSelect.addEventListener('change', () => {
            if (bfGenderSelect.value === 'male') {
                bfHipWrapper.classList.add('hidden');
            } else {
                bfHipWrapper.classList.remove('hidden');
            }
        });
    }

    if (advBodyfatForm) {
        advBodyfatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            playClick();
            
            const gender = bfGenderSelect.value;
            const h = parseFloat(document.getElementById('bf-height').value);
            const neck = parseFloat(document.getElementById('bf-neck').value);
            const waist = parseFloat(document.getElementById('bf-waist').value);
            
            if (isNaN(h) || isNaN(neck) || isNaN(waist) || h <= 0 || neck <= 0 || waist <= 0) {
                showToast("Please enter valid positive numbers for all body measurements.", "error");
                return;
            }

            if (gender === 'male' && waist <= neck) {
                showToast("Waist measurement must be greater than neck measurement.", "warning");
                return;
            }
            
            let bodyFat = 0;
            
            if (gender === 'male') {
                // US Navy Male formula (log base 10)
                bodyFat = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(h) + 36.76;
            } else {
                // US Navy Female formula
                const hip = parseFloat(document.getElementById('bf-hip').value) || 90;
                if (isNaN(hip) || hip <= 0) {
                    showToast("Please enter a valid positive hip measurement.", "error");
                    return;
                }
                if (waist + hip <= neck) {
                    showToast("Waist + hip measurement must be greater than neck measurement.", "warning");
                    return;
                }
                bodyFat = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(h) - 78.387;
            }

            if (isNaN(bodyFat) || !isFinite(bodyFat)) {
                showToast("Unable to calculate body fat with the provided dimensions.", "error");
                return;
            }
            
            bodyfatScore.innerText = bodyFat.toFixed(1);
            bodyfatAdvOutput.classList.remove('hidden');
            
            // Set body fat level badge
            bodyfatRangeBadge.className = "bmi-badge";
            if (gender === 'male') {
                if (bodyFat < 6) bodyfatRangeBadge.classList.add('underweight'), bodyfatRangeBadge.innerText = "Essential Fat Only";
                else if (bodyFat < 14) bodyfatRangeBadge.classList.add('normal'), bodyfatRangeBadge.innerText = "Athlete Fitness";
                else if (bodyFat < 25) bodyfatRangeBadge.classList.add('overweight'), bodyfatRangeBadge.innerText = "Acceptable Average";
                else bodyfatRangeBadge.classList.add('obese'), bodyfatRangeBadge.innerText = "Excessive Adipose Fat";
            } else {
                if (bodyFat < 14) bodyfatRangeBadge.classList.add('underweight'), bodyfatRangeBadge.innerText = "Essential Fat Only";
                else if (bodyFat < 21) bodyfatRangeBadge.classList.add('normal'), bodyfatRangeBadge.innerText = "Athlete Fitness";
                else if (bodyFat < 32) bodyfatRangeBadge.classList.add('overweight'), bodyfatRangeBadge.innerText = "Acceptable Average";
                else bodyfatRangeBadge.classList.add('obese'), bodyfatRangeBadge.innerText = "Excessive Adipose Fat";
            }
            playComplete();
        });
    }

    // F. Daily Water Intake Target
    const advWaterForm = document.getElementById('adv-water-form');
    const waterAdvOutput = document.getElementById('water-adv-output');
    const waterLiters = document.getElementById('water-liters');
    const waterGlasses = document.getElementById('water-glasses');

    if (advWaterForm) {
        advWaterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            playClick();
            
            const w = parseFloat(document.getElementById('water-weight').value);
            const exercise = parseFloat(document.getElementById('water-exercise').value);
            
            if (isNaN(w) || w <= 0) {
                showToast("Please enter a valid positive body weight.", "error");
                return;
            }
            const safeExercise = isNaN(exercise) || exercise < 0 ? 0 : exercise;
            
            // Baseline water: weight (kg) * 35 ml
            let baselineMl = w * 35;
            // Add 350ml water for every 30 mins exercise
            let extraMl = (safeExercise / 30) * 350;
            
            const totalLiters = (baselineMl + extraMl) / 1000;
            waterLiters.innerText = totalLiters.toFixed(1);
            waterGlasses.innerText = Math.round(totalLiters / 0.25); // 250ml glass
            
            waterAdvOutput.classList.remove('hidden');
            playComplete();
        });
    }

    // G. Macro Nutrient Splitter
    const advMacroForm = document.getElementById('adv-macro-form');
    const macroAdvOutput = document.getElementById('macro-adv-output');
    const macroCarbPct = document.getElementById('macro-carb-pct');
    const macroCarbG = document.getElementById('macro-carb-g');
    const macroProtPct = document.getElementById('macro-prot-pct');
    const macroProtG = document.getElementById('macro-prot-g');
    const macroFatPct = document.getElementById('macro-fat-pct');
    const macroFatG = document.getElementById('macro-fat-g');
    
    // Progress fill elements
    const barCarb = document.getElementById('macro-bar-carb');
    const barProt = document.getElementById('macro-bar-prot');
    const barFat = document.getElementById('macro-bar-fat');

    if (advMacroForm) {
        advMacroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            playClick();
            
            const calories = parseFloat(document.getElementById('macro-calories').value);
            const profile = document.getElementById('macro-goal').value;
            
            if (isNaN(calories) || calories <= 0) {
                showToast("Please enter a valid daily calorie target.", "error");
                return;
            }
            
            let carbRatio = 0.5, protRatio = 0.2, fatRatio = 0.3;
            if (profile === 'highprotein') {
                carbRatio = 0.4; protRatio = 0.3; fatRatio = 0.3;
            } else if (profile === 'lowcarb') {
                carbRatio = 0.1; protRatio = 0.25; fatRatio = 0.65;
            }
            
            // Calculations (Carbs: 4kcal/g, Protein: 4kcal/g, Fat: 9kcal/g)
            const carbsG = (calories * carbRatio) / 4;
            const proteinG = (calories * protRatio) / 4;
            const fatsG = (calories * fatRatio) / 9;
            
            macroCarbPct.innerText = Math.round(carbRatio * 100);
            macroCarbG.innerText = `${Math.round(carbsG)} g`;
            barCarb.style.width = `${carbRatio * 100}%`;
            
            macroProtPct.innerText = Math.round(protRatio * 100);
            macroProtG.innerText = `${Math.round(proteinG)} g`;
            barProt.style.width = `${protRatio * 100}%`;

            macroFatPct.innerText = Math.round(fatRatio * 100);
            macroFatG.innerText = `${Math.round(fatsG)} g`;
            barFat.style.width = `${fatRatio * 100}%`;

            macroAdvOutput.classList.remove('hidden');
            playComplete();
        });
    }

    // H. Ideal Body Weight Calculator (IBW)
    const advIbwForm = document.getElementById('adv-ibw-form');
    const ibwAdvOutput = document.getElementById('ibw-adv-output');
    const ibwScore = document.getElementById('ibw-score');

    if (advIbwForm) {
        advIbwForm.addEventListener('submit', (e) => {
            e.preventDefault();
            playClick();
            
            const h = parseFloat(document.getElementById('ibw-height').value);
            const gender = document.getElementById('ibw-gender').value;
            
            if (isNaN(h) || h <= 0) {
                showToast("Please enter a valid positive height.", "error");
                return;
            }
            
            // Height in inches
            const hInches = h / 2.54;
            const inchesOver5Foot = Math.max(0, hInches - 60);
            
            let baseW = 50.0; // Male base weight at 5ft (kg)
            let multiplier = 2.3; // 2.3 kg per inch
            
            if (gender === 'female') {
                baseW = 45.5;
            }
            
            const ibw = baseW + (multiplier * inchesOver5Foot);
            ibwScore.innerText = `${Math.round(ibw - 4)} - ${Math.round(ibw + 4)}`;
            ibwAdvOutput.classList.remove('hidden');
            playComplete();
        });
    }

    // I. Waist-to-Hip Ratio (WHR)
    const advWhrForm = document.getElementById('adv-whr-form');
    const whrAdvOutput = document.getElementById('whr-adv-output');
    const whrScore = document.getElementById('whr-score');
    const whrRangeBadge = document.getElementById('whr-range-badge');
    const whrDesc = document.getElementById('whr-desc');

    if (advWhrForm) {
        advWhrForm.addEventListener('submit', (e) => {
            e.preventDefault();
            playClick();
            
            const waist = parseFloat(document.getElementById('whr-waist').value);
            const hip = parseFloat(document.getElementById('whr-hip').value);
            const gender = document.getElementById('whr-gender').value;
            
            if (isNaN(waist) || isNaN(hip) || waist <= 0 || hip <= 0) {
                showToast("Please enter valid positive measurements for waist and hip.", "error");
                return;
            }
            
            const ratio = waist / hip;
            whrScore.innerText = ratio.toFixed(2);
            whrAdvOutput.classList.remove('hidden');
            
            whrRangeBadge.className = "bmi-badge";
            
            if (gender === 'male') {
                if (ratio < 0.9) {
                    whrRangeBadge.innerText = "Low Health Risk";
                    whrRangeBadge.classList.add('normal');
                    whrDesc.innerText = "Your fat distribution profile is healthy. Visceral organ fat load is minimal.";
                } else if (ratio >= 0.9 && ratio < 1.0) {
                    whrRangeBadge.innerText = "Moderate Risk";
                    whrRangeBadge.classList.add('overweight');
                    whrDesc.innerText = "Indicates moderate abdominal weight load. Consider active exercises.";
                } else {
                    whrRangeBadge.innerText = "High Cardio Risk";
                    whrRangeBadge.classList.add('obese');
                    whrDesc.innerText = "Significant abdominal fat distribution. Strongly linked to cardiovascular diseases.";
                }
            } else {
                if (ratio < 0.8) {
                    whrRangeBadge.innerText = "Low Health Risk";
                    whrRangeBadge.classList.add('normal');
                    whrDesc.innerText = "Healthy body fat distribution. Visceral strain levels are fully optimal.";
                } else if (ratio >= 0.8 && ratio < 0.85) {
                    whrRangeBadge.innerText = "Moderate Risk";
                    whrRangeBadge.classList.add('overweight');
                    whrDesc.innerText = "Indicates moderate visceral tissue concentrations. Balanced diet swaps are suggested.";
                } else {
                    whrRangeBadge.innerText = "High Cardio Risk";
                    whrRangeBadge.classList.add('obese');
                    whrDesc.innerText = "High abdominal visceral ratio. Increases indicators for hypertension and insulin resistance.";
                }
            }
            playComplete();
        });
    }

    // J. PCOS Symptom Screener Form
    const pcosScreenerForm = document.getElementById('pcos-screener-form');
    const pcosScreenerOutput = document.getElementById('pcos-screener-output');
    const pcosScore = document.getElementById('pcos-score');
    const pcosBadge = document.getElementById('pcos-badge');
    const pcosSuggestion = document.getElementById('pcos-suggestion');

    if (pcosScreenerForm) {
        pcosScreenerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            playClick();
            
            let checkedCount = 0;
            if (document.getElementById('pcos-q1').checked) checkedCount++;
            if (document.getElementById('pcos-q2').checked) checkedCount++;
            if (document.getElementById('pcos-q3').checked) checkedCount++;
            if (document.getElementById('pcos-q4').checked) checkedCount++;
            if (document.getElementById('pcos-q5').checked) checkedCount++;
            
            pcosScore.innerText = checkedCount;
            pcosScreenerOutput.classList.remove('hidden');
            
            pcosBadge.className = "bmi-badge";
            
            if (checkedCount <= 1) {
                pcosBadge.innerText = "Low Risk Indicator";
                pcosBadge.classList.add('normal');
                pcosSuggestion.innerText = "Hormonal symptoms are within normal limits. Maintain balanced sleep and hydration habits.";
            } else if (checkedCount <= 3) {
                pcosBadge.innerText = "Moderate Risk Indicator";
                pcosBadge.classList.add('warning');
                pcosSuggestion.innerText = "Hormone imbalances may be present. Consider exploring low glycemic index carbs and regular pelvic yoga exercises.";
            } else {
                pcosBadge.innerText = "High Diagnostic Indicator";
                pcosBadge.classList.add('obese');
                pcosSuggestion.innerText = "Strong signs of insulin resistance and hyperandrogenism. We advise arranging a clinical ultrasound check and consulting Dietician Oshin.";
            }
            playComplete();
        });
    }

    // K. Diabetes Risk Index Assessment
    const diabetesScreenerForm = document.getElementById('diabetes-screener-form');
    const dbScreenerOutput = document.getElementById('db-screener-output');
    const dbScore = document.getElementById('db-score');
    const dbMsg = document.getElementById('db-msg');

    if (diabetesScreenerForm) {
        diabetesScreenerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            playClick();
            
            const family = parseInt(document.getElementById('db-family').value);
            const activity = parseInt(document.getElementById('db-activity').value);
            const bp = parseInt(document.getElementById('db-bp').value);
            const thirst = parseInt(document.getElementById('db-thirst').value);
            
            const totalScore = family + activity + bp + thirst;
            dbScreenerOutput.classList.remove('hidden');
            
            if (totalScore <= 2) {
                dbScore.innerText = "Low Risk";
                dbScore.className = "text-success";
                dbMsg.innerText = "Great! Your blood sugar control markers are highly active. Keep up the high fiber diets.";
            } else if (totalScore <= 4) {
                dbScore.innerText = "Borderline / Pre-Diabetic Risk";
                dbScore.className = "text-warning";
                dbMsg.innerText = "Potential insulin receptor burnout. Consider removing refined sugars immediately and scheduling HbA1c tests.";
            } else {
                dbScore.innerText = "High Clinic Risk Alert";
                dbScore.className = "text-danger";
                dbMsg.innerText = "Symptom markers strongly suggest active pre-diabetic spikes. Arrange a consulting call-back to draft custom insulin-support diets.";
            }
            playComplete();
        });
    }

    // L. Target Heart Rate Zones (Karvonen age)
    const heartCalcForm = document.getElementById('heart-calc-form');
    const heartCalcOutput = document.getElementById('heart-calc-output');
    const hrZoneFat = document.getElementById('hr-zone-fat');
    const hrZoneCardio = document.getElementById('hr-zone-cardio');
    const hrZonePeak = document.getElementById('hr-zone-peak');

    if (heartCalcForm) {
        heartCalcForm.addEventListener('submit', (e) => {
            e.preventDefault();
            playClick();
            
            const age = parseInt(document.getElementById('hr-age').value);
            const rhr = parseInt(document.getElementById('hr-rhr').value) || 70;
            
            if (isNaN(age) || age <= 0 || age > 120) {
                showToast("Please enter a valid age between 1 and 120.", "error");
                return;
            }
            if (rhr <= 0 || rhr >= 220) {
                showToast("Please enter a valid resting heart rate.", "error");
                return;
            }
            
            // Max heart rate (Fox formula)
            const mhr = 220 - age;
            // Heart Rate Reserve (HRR)
            const hrr = mhr - rhr;
            
            // Fat burn range (60% to 70% intensity)
            const fbMin = Math.round((hrr * 0.6) + rhr);
            const fbMax = Math.round((hrr * 0.7) + rhr);
            
            // Cardio range (70% to 85% intensity)
            const cdMin = Math.round((hrr * 0.7) + rhr);
            const cdMax = Math.round((hrr * 0.85) + rhr);
            
            hrZoneFat.innerText = `${fbMin} - ${fbMax} bpm`;
            hrZoneCardio.innerText = `${cdMin} - ${cdMax} bpm`;
            hrZonePeak.innerText = `${Math.round((hrr * 0.85) + rhr)}+ bpm`;
            
            heartCalcOutput.classList.remove('hidden');
            playComplete();
        });
    }

    // M. Calorie Burned activity calculator
    const activityBurnForm = document.getElementById('activity-burn-form');
    const activityBurnOutput = document.getElementById('activity-burn-output');
    const actBurnedText = document.getElementById('act-burned');

    if (activityBurnForm) {
        activityBurnForm.addEventListener('submit', (e) => {
            e.preventDefault();
            playClick();
            
            const w = parseFloat(document.getElementById('act-weight').value);
            const dur = parseFloat(document.getElementById('act-duration').value);
            const met = parseFloat(document.getElementById('act-type').value);
            
            if (isNaN(w) || isNaN(dur) || isNaN(met) || w <= 0 || dur <= 0 || met <= 0) {
                showToast("Please enter valid positive numbers for weight, duration, and exercise.", "error");
                return;
            }
            
            // Calories burned = MET * 3.5 * weight (kg) / 200 * duration
            const burned = met * 3.5 * w / 200 * dur;
            
            actBurnedText.innerText = Math.round(burned);
            activityBurnOutput.classList.remove('hidden');
            playComplete();
        });
    }

    // N. Vitamin Deficiency Screener Quiz
    const nutrientScreenerForm = document.getElementById('nutrient-screener-form');
    const nutrientScreenerOutput = document.getElementById('nutrient-screener-output');
    const nutResultsList = document.getElementById('nut-results-list');

    if (nutrientScreenerForm) {
        nutrientScreenerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            playClick();
            
            nutResultsList.innerHTML = '';
            const checkedSymps = document.querySelectorAll('.nut-symp:checked');
            
            if (checkedSymps.length === 0) {
                nutResultsList.innerHTML = '<p class="empty-log-msg">No symptoms selected. You appear to be in good health!</p>';
            } else {
                // Map checked values to suggestions
                checkedSymps.forEach(cb => {
                    const key = cb.value;
                    const details = symptomDeficiencyLookup[key];
                    if (details) {
                        const card = document.createElement('div');
                        card.className = "deficiency-item";
                        card.innerHTML = `<h4><i class="fa-solid fa-triangle-exclamation"></i> Possible ${details.name}</h4><p>${details.tip}</p>`;
                        nutResultsList.appendChild(card);
                    }
                });
            }
            
            nutrientScreenerOutput.classList.remove('hidden');
            playComplete();
        });
    }

    // ==========================================
    // 7. RECIPES CENTER & DYNAMIC SCALING
    // ==========================================

    const recipesCardGrid = document.getElementById('recipes-card-grid');

    function renderRecipes(filterCategory = 'all') {
        if (!recipesCardGrid) return;
        recipesCardGrid.innerHTML = '';
        
        const filtered = recipesData.filter(r => filterCategory === 'all' || r.category === filterCategory);
        
        filtered.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-card glass-card';
            card.setAttribute('data-id', recipe.id);
            
            // Build tags markup
            const tagsMarkup = recipe.tags.map(t => `<span class="recipe-badge">${t}</span>`).join(' ');
            
            // Build ingredients list markup with scaled values (base portion = 1)
            const ingredientsMarkup = recipe.ingredients.map((ing, index) => `
                <li class="ing-item" data-name="${ing.name}" data-base-qty="${ing.qty}">
                    <span>${ing.name}</span>
                    <strong class="ing-qty-val">${ing.qty}</strong> <span class="ing-unit-val">${ing.unit}</span>
                </li>
            `).join('');

            card.innerHTML = `
                <div class="recipe-card-img" style="background-image: url('${recipe.image}');">
                    <span class="recipe-badge" style="background-color: var(--color-primary-dark);">${recipe.category}</span>
                </div>
                <div class="recipe-card-body">
                    <h3>${recipe.title}</h3>
                    <div class="recipe-meta-row">
                        <span><i class="fa-solid fa-clock"></i> ${recipe.prepTime}</span>
                        <span><i class="fa-solid fa-fire"></i> <span class="recipe-cal-lbl">${recipe.calories}</span> kcal</span>
                    </div>
                    <div class="recipe-nutrients-badge">
                        <span>Carbs: <strong class="recipe-carb-lbl">${recipe.macros.carbs}g</strong></span>
                        <span>Prot: <strong class="recipe-prot-lbl">${recipe.macros.protein}g</strong></span>
                        <span>Fat: <strong class="recipe-fat-lbl">${recipe.macros.fats}g</strong></span>
                    </div>
                    
                    <div class="recipe-ingredients-box">
                        <h4 style="font-family: var(--font-heading); margin-bottom:10px;">Ingredients needed:</h4>
                        <ul style="list-style:none; margin-bottom:20px; font-size:0.9rem;" class="recipe-ing-list">
                            ${ingredientsMarkup}
                        </ul>
                    </div>

                    <div class="recipe-actions">
                        <div class="portion-scaler">
                            <span>Portions:</span>
                            <button class="scaler-btn scaler-minus" data-id="${recipe.id}">-</button>
                            <strong class="portion-val" id="portion-val-${recipe.id}">1</strong>
                            <button class="scaler-btn scaler-plus" data-id="${recipe.id}">+</button>
                        </div>
                        <button class="theme-btn primary-btn btn-sm btn-favourite-recipe" data-id="${recipe.id}">
                            <i class="fa-regular fa-star"></i> Save
                        </button>
                    </div>
                </div>
            `;
            recipesCardGrid.appendChild(card);
        });

        // Attach event listeners for scaled values and favourites
        attachRecipeInteractions();
    }
    renderRecipes();

    // Portions multiplier calculations
    function attachRecipeInteractions() {
        document.querySelectorAll('.scaler-plus').forEach(btn => {
            btn.addEventListener('click', () => {
                playClick();
                const recipeId = btn.getAttribute('data-id');
                const portionEl = document.getElementById(`portion-val-${recipeId}`);
                let val = parseInt(portionEl.innerText);
                val++;
                portionEl.innerText = val;
                updateRecipeQuantities(recipeId, val);
            });
        });

        document.querySelectorAll('.scaler-minus').forEach(btn => {
            btn.addEventListener('click', () => {
                playClick();
                const recipeId = btn.getAttribute('data-id');
                const portionEl = document.getElementById(`portion-val-${recipeId}`);
                let val = parseInt(portionEl.innerText);
                if (val > 1) {
                    val--;
                    portionEl.innerText = val;
                    updateRecipeQuantities(recipeId, val);
                }
            });
        });

        // Recipe Favourite star clicker toggle
        document.querySelectorAll('.btn-favourite-recipe').forEach(btn => {
            btn.addEventListener('click', () => {
                playClick();
                const star = btn.querySelector('i');
                if (star.classList.contains('fa-regular')) {
                    star.className = 'fa-solid fa-star';
                    btn.classList.remove('primary-btn');
                    btn.classList.add('accent-btn');
                    showToast("Recipe added to client favorites!", "success");
                } else {
                    star.className = 'fa-regular fa-star';
                    btn.classList.remove('accent-btn');
                    btn.classList.add('primary-btn');
                    showToast("Recipe removed from favorites.", "info");
                }
            });
        });
    }

    function updateRecipeQuantities(recipeId, multiplier) {
        const recipeCard = document.querySelector(`.recipe-card[data-id="${recipeId}"]`);
        const item = recipesData.find(r => r.id == recipeId);
        
        // Scale energy macros labels
        recipeCard.querySelector('.recipe-cal-lbl').innerText = item.calories * multiplier;
        recipeCard.querySelector('.recipe-carb-lbl').innerText = `${item.macros.carbs * multiplier}g`;
        recipeCard.querySelector('.recipe-prot-lbl').innerText = `${item.macros.protein * multiplier}g`;
        recipeCard.querySelector('.recipe-fat-lbl').innerText = `${item.macros.fats * multiplier}g`;

        // Scale individual ingredients values list
        recipeCard.querySelectorAll('.ing-item').forEach(el => {
            const baseQty = parseFloat(el.getAttribute('data-base-qty'));
            el.querySelector('.ing-qty-val').innerText = (baseQty * multiplier).toFixed(0);
        });
    }

    // Category filtering engine
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            playClick();
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderRecipes(btn.getAttribute('data-filter'));
        });
    });

    // Diet Swap Select handler
    const swapSourceSelect = document.getElementById('swap-source-select');
    const swapFromName = document.getElementById('swap-from-name');
    const swapFromDesc = document.getElementById('swap-from-desc');
    const swapToName = document.getElementById('swap-to-name');
    const swapToDesc = document.getElementById('swap-to-desc');

    if (swapSourceSelect) {
        swapSourceSelect.addEventListener('change', () => {
            playClick();
            const key = swapSourceSelect.value;
            const details = foodSubstitutionEngine[key];
            if (details) {
                swapFromName.innerText = details.fromName;
                swapFromDesc.innerText = details.fromDesc;
                swapToName.innerText = details.toName;
                swapToDesc.innerText = details.toDesc;
            }
        });
    }

    // ==========================================
    // 8. INTERMITTENT FASTING (IF) TIMER ENGINE
    // ==========================================

    function updateFastingRing(pct) {
        if (!timerProgressFill) return;
        const totalLength = 440; // SVG circle length
        const offset = totalLength - (pct * totalLength);
        timerProgressFill.style.strokeDashoffset = offset;
    }

    function formatTime(sec) {
        const h = Math.floor(sec / 3600).toString().padStart(2, '0');
        const m = Math.floor((sec % 3600) / 60).toString().padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    }

    function handleFastingTick() {
        fastingElapsedSeconds++;
        const targetSeconds = fastingDurationHrs * 3600;
        
        // Show elapsed clock text
        fastTimeElapsed.innerText = `Elapsed: ${formatTime(fastingElapsedSeconds)}`;

        if (fastingElapsedSeconds >= targetSeconds) {
            // Fasting Completed!
            clearInterval(activeFastingTimer);
            fastingState = "idle";
            fastStatusLbl.innerText = "COMPLETED";
            fastCountdownTimer.innerText = "00:00:00";
            updateFastingRing(1);
            
            fastStartBtn.classList.remove('hidden');
            fastPauseBtn.classList.add('hidden');
            
            // Audio Alarm chime
            if (!isMuted && alarmSound) {
                alarmSound.play().catch(() => {});
            }
            showToast("Congratulations! You completed your fasting target.", "success");
        } else {
            // Count down clock
            const remaining = targetSeconds - fastingElapsedSeconds;
            fastCountdownTimer.innerText = formatTime(remaining);
            updateFastingRing(fastingElapsedSeconds / targetSeconds);
        }
    }

    fastStartBtn.addEventListener('click', () => {
        playClick();
        fastingDurationHrs = parseInt(fastPlanSelect.value);
        fastingState = "active";
        
        fastStartBtn.classList.add('hidden');
        fastPauseBtn.classList.remove('hidden');
        fastStatusLbl.innerText = "FASTING";
        
        activeFastingTimer = setInterval(handleFastingTick, 1000);
        showToast("Intermittent Fasting timer started!", "success");
    });

    fastPauseBtn.addEventListener('click', () => {
        playClick();
        fastingState = "paused";
        clearInterval(activeFastingTimer);
        
        fastStartBtn.classList.remove('hidden');
        fastPauseBtn.classList.add('hidden');
        fastStatusLbl.innerText = "PAUSED";
        showToast("Fasting timer paused.", "info");
    });

    fastResetBtn.addEventListener('click', () => {
        playClick();
        clearInterval(activeFastingTimer);
        fastingState = "idle";
        fastingElapsedSeconds = 0;
        
        fastStartBtn.classList.remove('hidden');
        fastPauseBtn.classList.add('hidden');
        
        fastStatusLbl.innerText = "READY";
        fastCountdownTimer.innerText = `${fastPlanSelect.value.padStart(2, '0')}:00:00`;
        fastTimeElapsed.innerText = "Elapsed: 00:00:00";
        updateFastingRing(0);
        showToast("Fasting timer has been reset.", "info");
    });

    // Plan selection updates countdown screen
    fastPlanSelect.addEventListener('change', () => {
        if (fastingState === 'idle') {
            fastCountdownTimer.innerText = `${fastPlanSelect.value.padStart(2, '0')}:00:00`;
        }
    });

    // ==========================================
    // 9. VIRTUAL AI CONSULTANT CHATBOT SYSTEM
    // ==========================================

    // Toggle Chat window view
    aiChatTrigger.addEventListener('click', () => {
        playClick();
        aiChatModal.classList.toggle('hidden');
    });

    aiChatCloseBtn.addEventListener('click', () => {
        playClick();
        aiChatModal.classList.add('hidden');
    });

    chatTabQA.addEventListener('click', () => {
        playClick();
        chatTabQA.classList.add('active');
        chatTabSymptoms.classList.remove('active');
        chatTabAnalyzer.classList.remove('active');
        
        chatConversationBody.classList.remove('hidden');
        chatPhotoPanel.classList.add('hidden');
    });

    chatTabSymptoms.addEventListener('click', () => {
        playClick();
        chatTabSymptoms.classList.add('active');
        chatTabQA.classList.remove('active');
        chatTabAnalyzer.classList.remove('active');
        
        chatConversationBody.classList.remove('hidden');
        chatPhotoPanel.classList.add('hidden');
        
        // Show starter symptom guidelines
        const sysMsg = document.createElement('div');
        sysMsg.className = "chat-msg system";
        sysMsg.innerHTML = `<p><strong>Symptom Screening Guide:</strong> Type physical signs (e.g. 'cramps', 'dizzy', 'skin') and I will check potential vitamin/mineral deficiency flags.</p>`;
        chatConversationBody.appendChild(sysMsg);
        chatConversationBody.scrollTop = chatConversationBody.scrollHeight;
    });

    chatTabAnalyzer.addEventListener('click', () => {
        playClick();
        chatTabAnalyzer.classList.add('active');
        chatTabQA.classList.remove('active');
        chatTabSymptoms.classList.remove('active');
        
        chatConversationBody.classList.add('hidden');
        chatPhotoPanel.classList.remove('hidden');
    });

    // Trigger AI Chat response logic
    function handleChatSubmit() {
        const query = chatUserInput.value.trim().toLowerCase();
        if (!query) return;

        playClick();
        
        // User message bubble
        const userBubble = document.createElement('div');
        userBubble.className = "chat-msg user";
        userBubble.innerText = chatUserInput.value;
        chatConversationBody.appendChild(userBubble);
        
        chatUserInput.value = '';
        chatConversationBody.scrollTop = chatConversationBody.scrollHeight;

        // Simulate AI loading delay
        setTimeout(() => {
            let reply = dietitianChatResponses["default"];
            
            // Direct query string matching
            if (dietitianChatResponses[query]) {
                reply = dietitianChatResponses[query];
            } else if (query.includes("weight") || query.includes("slim") || query.includes("fat")) {
                reply = dietitianChatResponses["weight loss tips"];
            } else if (query.includes("pcos") || query.includes("pcod") || query.includes("period")) {
                reply = dietitianChatResponses["pcos diets"];
            } else if (query.includes("sugar") || query.includes("diabetes") || query.includes("hba1c")) {
                reply = dietitianChatResponses["diabetic routines"];
            } else if (query.includes("water") || query.includes("drink") || query.includes("hydrate")) {
                reply = dietitianChatResponses["water intake"];
            } else if (query.includes("cramp") || query.includes("eyelid") || query.includes("sleep")) {
                reply = `This may indicate a **Magnesium** gap. ${symptomDeficiencyLookup['magnesium'].tip}`;
            } else if (query.includes("dizzy") || query.includes("pale") || query.includes("cold")) {
                reply = `This may suggest an **Iron** gap. ${symptomDeficiencyLookup['iron'].tip}`;
            } else if (query.includes("sun") || query.includes("bone") || query.includes("ache")) {
                reply = `This suggests a **Vitamin D3** gap. ${symptomDeficiencyLookup['vitamin-d'].tip}`;
            }

            const sysBubble = document.createElement('div');
            sysBubble.className = "chat-msg system";
            sysBubble.innerHTML = `<p>${reply}</p>`;
            chatConversationBody.appendChild(sysBubble);
            chatConversationBody.scrollTop = chatConversationBody.scrollHeight;
            playComplete();
        }, 800);
    }

    chatSendBtn.addEventListener('click', handleChatSubmit);
    chatUserInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleChatSubmit();
    });

    // Mock Meal photo upload analyzer triggers
    const chatMealDropzone = document.getElementById('chat-meal-dropzone');
    const chatMealFile = document.getElementById('chat-meal-file');
    const chatPhotoAnalysisRes = document.getElementById('chat-photo-analysis-res');

    if (chatMealDropzone) {
        chatMealDropzone.addEventListener('click', () => {
            chatMealFile.click();
        });
        chatMealFile.addEventListener('change', () => {
            playClick();
            showToast("Uploading plate image...", "info");
            
            setTimeout(() => {
                chatPhotoAnalysisRes.classList.remove('hidden');
                playComplete();
                showToast("Plate scan complete!", "success");
            }, 1500);
        });
    }

    // ==========================================
    // 10. CLIENT DASHBOARD PORTAL & STATE LOGS
    // ==========================================

    // Show authentication portal
    headerPortalBtn.addEventListener('click', () => {
        playClick();
        document.querySelector('[data-target="dashboard-section"]').click();
    });

    // Handle authentication login
    if (clientLoginForm) {
        clientLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            playClick();
            
            const email = document.getElementById('login-email').value.trim();
            const pass = document.getElementById('login-pass').value.trim();
            
            if (email === "oshin@nutrislims.com" && pass === "portal123") {
                isUserLoggedIn = true;
                dashboardLoggedOut.classList.add('hidden');
                dashboardLoggedIn.classList.remove('hidden');
                
                // Show Logout inside portal button
                headerPortalBtn.innerHTML = '<i class="fa-solid fa-sign-out-alt"></i> Logout';
                headerPortalBtn.classList.remove('primary-btn');
                headerPortalBtn.classList.add('dark-btn');
                
                showToast("Sign in successful. Welcome, Oshin!", "success");
                playComplete();
                
                // Initial updates console dashboard metrics
                updateDashboardConsole();
            } else {
                showToast("Invalid credentials. Try our demo account details.", "error");
            }
        });
    }

    // Handle logout action
    function handleLogout() {
        playClick();
        isUserLoggedIn = false;
        dashboardLoggedIn.classList.add('hidden');
        dashboardLoggedOut.classList.remove('hidden');
        
        headerPortalBtn.innerHTML = '<i class="fa-solid fa-user-lock"></i> Portal Login';
        headerPortalBtn.classList.remove('dark-btn');
        headerPortalBtn.classList.add('primary-btn');
        
        showToast("Signed out successfully.", "info");
        document.querySelector('[data-target="home-section"]').click();
    }
    
    dashboardLogoutBtn.addEventListener('click', handleLogout);
    headerPortalBtn.addEventListener('click', () => {
        if (isUserLoggedIn) {
            handleLogout();
        }
    });

    // Helper functions for Dashboard UI values updates
    function updateDashboardConsole() {
        // Text labels
        document.getElementById('dash-cal-target').innerText = userStats.caloriesTarget;
        document.getElementById('dash-cal-logged').innerText = userStats.caloriesLogged;
        
        const calRem = Math.max(0, userStats.caloriesTarget - userStats.caloriesLogged);
        document.getElementById('dash-cal-rem').innerText = calRem;
        
        document.getElementById('dash-water-target').innerText = userStats.waterTarget;
        document.getElementById('dash-water-logged').innerText = userStats.waterLogged.toFixed(2);
        
        document.getElementById('dash-sleep-target').innerText = userStats.sleepTarget;
        document.getElementById('dash-sleep-logged').innerText = userStats.sleepLogged;
        
        document.getElementById('dash-streak-count').innerText = userStats.streakDays;

        // Circular progress rings logic (dashoffset)
        const totalOffset = 264; // ring circumf
        
        const calPct = Math.min(1.0, userStats.caloriesLogged / userStats.caloriesTarget);
        document.getElementById('ring-calories-fill').style.strokeDashoffset = totalOffset - (calPct * totalOffset);
        
        const watPct = Math.min(1.0, userStats.waterLogged / userStats.waterTarget);
        document.getElementById('ring-water-fill').style.strokeDashoffset = totalOffset - (watPct * totalOffset);
        
        const slpPct = Math.min(1.0, userStats.sleepLogged / userStats.sleepTarget);
        document.getElementById('ring-sleep-fill').style.strokeDashoffset = totalOffset - (slpPct * totalOffset);

        // Update list of logged foods
        renderLoggedFoodsList();
        
        // Update list of workouts
        renderWorkoutList();

        // Update SVG Chart points
        renderWeightChartSVG();
    }

    // Toggle Settings Target Panel
    const btnShowSettings = document.getElementById('btn-show-settings');
    const settingsTargetsPanel = document.getElementById('settings-targets-panel');
    const btnSaveTargets = document.getElementById('btn-save-targets');

    btnShowSettings.addEventListener('click', () => {
        playClick();
        settingsTargetsPanel.classList.toggle('hidden');
    });

    btnSaveTargets.addEventListener('click', () => {
        playClick();
        const cal = parseInt(document.getElementById('set-cal-target').value);
        const wat = parseFloat(document.getElementById('set-water-target').value);
        const slp = parseInt(document.getElementById('set-sleep-target').value);
        
        userStats.caloriesTarget = cal;
        userStats.waterTarget = wat;
        userStats.sleepTarget = slp;
        
        settingsTargetsPanel.classList.add('hidden');
        updateDashboardConsole();
        showToast("Health goals targets updated!", "success");
    });

    // Hydration tracking log buttons
    document.getElementById('btn-add-water')?.addEventListener('click', () => {
        playClick();
        userStats.waterLogged += 0.25; // 250ml
        updateDashboardConsole();
        showToast("Logged 250ml water!", "success");
    });

    document.getElementById('btn-clear-water')?.addEventListener('click', () => {
        playClick();
        userStats.waterLogged = 0.0;
        updateDashboardConsole();
        showToast("Water log reset.", "info");
    });

    // Sleep tracking log button
    document.getElementById('btn-log-sleep')?.addEventListener('click', () => {
        playClick();
        const val = parseInt(document.getElementById('sleep-input-val')?.value) || 0;
        userStats.sleepLogged = val;
        updateDashboardConsole();
        showToast(`Logged ${val} hours of sleep!`, "success");
    });

    // Food logging preset/custom options toggling
    const foodPresetSelect = document.getElementById('food-select-preset');
    const customFoodInputs = document.getElementById('custom-food-inputs');

    foodPresetSelect?.addEventListener('change', () => {
        if (foodPresetSelect.value === 'custom') {
            customFoodInputs?.classList.remove('hidden');
        } else {
            customFoodInputs?.classList.add('hidden');
        }
    });

    document.getElementById('btn-log-food')?.addEventListener('click', () => {
        playClick();
        let name = "";
        let cal = 0;
        
        if (foodPresetSelect.value === 'custom') {
            name = document.getElementById('food-custom-name').value.trim();
            cal = parseInt(document.getElementById('food-custom-cal').value) || 0;
        } else {
            const selectEl = foodPresetSelect.options[foodPresetSelect.selectedIndex];
            name = selectEl.value;
            cal = parseInt(selectEl.getAttribute('data-c')) || 0;
        }

        if (!name || cal <= 0) {
            showToast("Please enter a valid food name and calories.", "error");
            return;
        }

        userStats.loggedFoods.push({ name, calories: cal });
        userStats.caloriesLogged += cal;
        
        updateDashboardConsole();
        showToast(`Logged: ${name} (${cal} kcal)`, "success");
        
        // Reset form inputs
        document.getElementById('food-custom-name').value = '';
        document.getElementById('food-custom-cal').value = '';
        foodPresetSelect.value = 'custom';
        customFoodInputs.classList.remove('hidden');
    });

    function renderLoggedFoodsList() {
        const listUl = document.getElementById('logged-foods-list');
        listUl.innerHTML = '';
        
        if (userStats.loggedFoods.length === 0) {
            listUl.innerHTML = '<li class="empty-log-msg">No foods logged today. Log calories above.</li>';
        } else {
            userStats.loggedFoods.forEach((item, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${item.name}</span>
                    <div>
                        <strong>${item.calories} kcal</strong>
                        <button class="delete-item-btn" data-idx="${index}"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                `;
                listUl.appendChild(li);
            });

            // Attach food deletions triggers
            listUl.querySelectorAll('.delete-item-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    playClick();
                    const idx = parseInt(btn.getAttribute('data-idx'));
                    const item = userStats.loggedFoods[idx];
                    userStats.caloriesLogged -= item.calories;
                    userStats.loggedFoods.splice(idx, 1);
                    updateDashboardConsole();
                    showToast("Food item removed.", "info");
                });
            });
        }
    }

    // Workout Logger controls
    document.getElementById('btn-log-workout')?.addEventListener('click', () => {
        playClick();
        const name = document.getElementById('workout-name-input').value.trim();
        const cal = parseInt(document.getElementById('workout-calories-input').value) || 0;
        
        if (!name || cal <= 0) {
            showToast("Enter workout name and active calorie burn.", "error");
            return;
        }

        userStats.loggedWorkouts.push({ name, calories: cal });
        updateDashboardConsole();
        showToast(`Logged workout: ${name}`, "success");
        
        document.getElementById('workout-name-input').value = '';
        document.getElementById('workout-calories-input').value = '';
    });

    function renderWorkoutList() {
        const listUl = document.getElementById('workout-list-ul');
        listUl.innerHTML = '';
        
        if (userStats.loggedWorkouts.length === 0) {
            listUl.innerHTML = '<li class="empty-log-msg">No exercises logged today.</li>';
        } else {
            userStats.loggedWorkouts.forEach((item, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${item.name}</span>
                    <strong>-${item.calories} kcal</strong>
                `;
                listUl.appendChild(li);
            });
        }
    }

    // Interactive weight checks logger
    document.getElementById('btn-log-weight')?.addEventListener('click', () => {
        playClick();
        const val = parseFloat(document.getElementById('input-log-weight-val').value);
        if (isNaN(val) || val <= 30) {
            showToast("Please enter a valid weight in kg.", "error");
            return;
        }
        
        userStats.weightHistory.push(val);
        // Shift history keeping maximum 6 points on SVG grid
        if (userStats.weightHistory.length > 6) {
            userStats.weightHistory.shift();
        }
        
        document.getElementById('input-log-weight-val').value = '';
        updateDashboardConsole();
        showToast("New weight record logged!", "success");
    });

    // Render weight graph points on SVG coordinates
    function renderWeightChartSVG() {
        const pathLine = document.getElementById('chart-path-line');
        const dotsGroup = document.getElementById('chart-dots-group');
        if (!pathLine || !dotsGroup) return;

        const pts = userStats.weightHistory;
        const xStep = 80;
        const xStart = 60;
        const yBaseline = 180;
        
        // Weight mapping margins (Min weight: 60kg mapping to y=180, Max: 100kg mapping to y=20)
        let pathD = "";
        dotsGroup.innerHTML = '';
        
        pts.forEach((w, i) => {
            const x = xStart + (i * xStep);
            
            // Map weight 60-100 to y coordinate 180-20
            const pct = (w - 60) / 40;
            const y = yBaseline - (pct * 160);
            
            if (i === 0) {
                pathD = `M ${x} ${y}`;
            } else {
                pathD += ` L ${x} ${y}`;
            }

            // Create SVG Circle node
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", x);
            circle.setAttribute("cy", y);
            circle.setAttribute("r", "5");
            circle.setAttribute("class", "chart-dot");
            
            // tooltip title
            const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
            title.textContent = `${w} kg`;
            circle.appendChild(title);
            
            dotsGroup.appendChild(circle);
        });

        pathLine.setAttribute("d", pathD);
    }

    // Grocery checklist toggle generator
    document.getElementById('btn-generate-groceries')?.addEventListener('click', () => {
        playClick();
        document.getElementById('grocery-list-panel')?.classList.remove('hidden');
        showToast("Shopping list auto-compiled!", "success");
    });

    document.getElementById('btn-close-grocery')?.addEventListener('click', () => {
        playClick();
        document.getElementById('grocery-list-panel')?.classList.add('hidden');
    });

    // Health Vault drag & drop triggers
    const reportDropzone = document.getElementById('report-dropzone');
    const reportFileInput = document.getElementById('report-file-input');
    const reportVaultUl = document.getElementById('report-vault-ul');

    if (reportDropzone) {
        reportDropzone.addEventListener('click', () => {
            reportFileInput?.click();
        });
        reportFileInput?.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                playClick();
                showToast(`Uploading ${file.name}...`, "info");
                
                setTimeout(() => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <div class="report-info"><i class="fa-solid fa-file-pdf"></i> <span>${file.name}</span></div>
                        <span class="report-status-badge success">Verified</span>
                    `;
                    reportVaultUl?.insertBefore(li, reportVaultUl.firstChild);
                    playComplete();
                    showToast("Document verified and vaulted!", "success");
                }, 1200);
            }
        });
    }

    // ==========================================
    // 11. PRINTABLE HEALTH REPORT PDF BUILDER
    // ==========================================

    document.getElementById('btn-generate-pdf')?.addEventListener('click', () => {
        playClick();
        showToast("Compiling clinical metrics report PDF...", "info");

        setTimeout(() => {
            // Build report window block
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                <head>
                    <title>Nutrislims Clinical Progress Report</title>
                    <style>
                        body { font-family: 'DM Sans', sans-serif; padding: 40px; color: #1E2022; line-height: 1.6; }
                        h1 { color: #6F9B4B; border-bottom: 2px solid #6F9B4B; padding-bottom: 10px; font-size: 2.2rem; }
                        .meta-info { margin-bottom: 30px; font-size: 1rem; color: #64748B; }
                        .meta-info strong { color: #1E2022; }
                        .section-card { border: 1px solid #E2E8F0; padding: 20px; border-radius: 12px; margin-bottom: 25px; }
                        .section-card h3 { color: #6F9B4B; margin-top: 0; font-size: 1.25rem; text-transform: uppercase; }
                        .stats-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                        .stats-table th, .stats-table td { padding: 12px; border-bottom: 1px solid #E2E8F0; text-align: left; }
                        .stats-table th { background: #f8fafc; font-weight: bold; }
                        .stamp { float: right; border: 3px double #6F9B4B; color: #6F9B4B; font-weight: bold; padding: 10px 20px; text-transform: uppercase; transform: rotate(-5deg); margin-top: 20px; font-size: 1rem; }
                    </style>
                </head>
                <body>
                    <div class="stamp">Verified Clinical</div>
                    <h1>Nutrislims Clinic Report</h1>
                    <div class="meta-info">
                        Patient Name: <strong>${userStats.name}</strong><br>
                        Patient Identifier: <strong>${userStats.id}</strong><br>
                        Date of Report: <strong>${new Date().toLocaleDateString()}</strong><br>
                        Supervising Consultant: <strong>Oshin Ambekar (Certified Dietician)</strong>
                    </div>
                    
                    <div class="section-card">
                        <h3>Daily Goals Progress Status</h3>
                        <table class="stats-table">
                            <thead>
                                <tr>
                                    <th>Parameter</th>
                                    <th>Logged Value</th>
                                    <th>Prescribed Goal Target</th>
                                    <th>Adherence Rate %</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Caloric Energy Intake</td>
                                    <td>${userStats.caloriesLogged} kcal</td>
                                    <td>${userStats.caloriesTarget} kcal</td>
                                    <td>${Math.min(100, Math.round((userStats.caloriesLogged / userStats.caloriesTarget) * 100))}%</td>
                                </tr>
                                <tr>
                                    <td>Fluid Hydration Volume</td>
                                    <td>${userStats.waterLogged.toFixed(2)} L</td>
                                    <td>${userStats.waterTarget} L</td>
                                    <td>${Math.min(100, Math.round((userStats.waterLogged / userStats.waterTarget) * 100))}%</td>
                                </tr>
                                <tr>
                                    <td>Sleep Duration</td>
                                    <td>${userStats.sleepLogged} Hours</td>
                                    <td>${userStats.sleepTarget} Hours</td>
                                    <td>${Math.min(100, Math.round((userStats.sleepLogged / userStats.sleepTarget) * 100))}%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="section-card">
                        <h3>Recent Bi-Weekly Weight History Log</h3>
                        <p>Latest Weight Record: <strong>${userStats.weightHistory[userStats.weightHistory.length - 1]} kg</strong></p>
                        <p>Weight Records Trend points: [${userStats.weightHistory.join(' kg, ')} kg]</p>
                    </div>

                    <p style="font-size:0.8rem; color:#64748B; margin-top:50px; text-align:center;">This is a system generated progress sheet based on patient input data. For professional clinical diagnosis adjustments, visit our Rajendra Nagar clinic in Indore.</p>
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            
            setTimeout(() => {
                printWindow.print();
            }, 500);
            
            playComplete();
            showToast("Report compiled. Print dialog loaded.", "success");
        }, 1500);
    });

    // ==========================================
    // 12. GLOBAL SEARCH ENGINE DISPATCH
    // ==========================================

    searchIconBtn.addEventListener('click', () => {
        document.querySelector('.global-search-container').classList.toggle('active');
        globalSearchInput.focus();
    });

    globalSearchInput.addEventListener('input', () => {
        const query = globalSearchInput.value.trim().toLowerCase();
        
        if (query.length < 2) {
            searchDropdownResults.innerHTML = '';
            searchDropdownResults.classList.remove('active');
            return;
        }

        searchDropdownResults.innerHTML = '';
        let matches = [];

        // 1. Search recipes
        recipesData.forEach(r => {
            if (r.title.toLowerCase().includes(query) || r.category.includes(query)) {
                matches.push({ title: r.title, type: "Recipe", target: "recipes-section" });
            }
        });

        // 2. Search calculators tabs
        calcTabs.forEach(tab => {
            const text = tab.innerText.toLowerCase();
            if (text.includes(query)) {
                const dataCalc = tab.getAttribute('data-calc');
                matches.push({ title: tab.innerText, type: "Calculator", target: "tools-section", detail: dataCalc });
            }
        });

        // 3. Search services
        const servicesList = ["Weight Management", "Diabetes Management", "PCOS Care", "Pregnancy Nutrition", "Child Nutrition", "Corporate Wellness"];
        servicesList.forEach(s => {
            if (s.toLowerCase().includes(query)) {
                matches.push({ title: s, type: "Service Clinic", target: "home-section" });
            }
        });

        if (matches.length > 0) {
            searchDropdownResults.classList.add('active');
            matches.forEach(item => {
                const el = document.createElement('div');
                el.className = 'search-res-item';
                el.innerHTML = `<span class="category">${item.type}</span>${item.title}`;
                
                el.addEventListener('click', () => {
                    playClick();
                    globalSearchInput.value = '';
                    searchDropdownResults.classList.remove('active');
                    document.querySelector('.global-search-container').classList.remove('active');
                    
                    // Route to target section
                    document.querySelector(`[data-target="${item.target}"]`).click();
                    
                    // If target calculator tab, switch to it
                    if (item.detail) {
                        const tabBtn = document.querySelector(`.sidebar-tab-btn[data-calc="${item.detail}"]`);
                        if (tabBtn) tabBtn.click();
                    }
                });
                
                searchDropdownResults.appendChild(el);
            });
        } else {
            searchDropdownResults.classList.remove('active');
        }
    });

    // Close search dropdown on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.global-search-container')) {
            searchDropdownResults.classList.remove('active');
        }
    });

    // ==========================================
    // 13. BOOKING FORM HANDLER & MODALS
    // ==========================================

    if (clinicBookingForm) {
        clinicBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            playClick();
            
            const name = document.getElementById('book-name').value.trim();
            const phone = document.getElementById('book-phone').value.trim();
            const program = document.getElementById('book-program') ? document.getElementById('book-program').value : 'Weight Loss Consultation';
            const bookingId = '#NUTRI-' + Math.floor(1000 + Math.random() * 9000);
            
            // 1. Prepare Structured WhatsApp Message
            const waMessage = encodeURIComponent(
                `*New Clinic Consultation Request*\n` +
                `🔖 *Booking ID:* ${bookingId}\n` +
                `👤 *Patient Name:* ${name}\n` +
                `📞 *WhatsApp Number:* ${phone}\n` +
                `🎯 *Health Program:* ${program}\n` +
                `📍 *Clinic:* Nutrislims, 1st Floor B, 109, Rajendra Nagar Main Rd, Indore\n` +
                `🌐 *Source:* Google Ads Verified Booking`
            );
            const waUrl = `https://wa.me/917828149178?text=${waMessage}`;

            // 2. Google Ads Conversion Tracking Trigger
            if (typeof gtag === 'function') {
                gtag('event', 'generate_lead', {
                    'event_category': 'Appointments',
                    'event_label': program,
                    'transaction_id': bookingId,
                    'value': 1.0
                });
            }

            // 3. Local Backup Storage
            try {
                const existingLeads = JSON.parse(localStorage.getItem('nutrislims_leads') || '[]');
                existingLeads.push({
                    bookingId, name, phone, program,
                    created_at: new Date().toISOString()
                });
                localStorage.setItem('nutrislims_leads', JSON.stringify(existingLeads));
            } catch (err) {}

            // 4. Update and Display On-Screen Verified Receipt Proof
            const formWrapper = document.getElementById('booking-form-wrapper');
            const receipt = document.getElementById('booking-proof-receipt');
            const receiptId = document.getElementById('receipt-id');
            const receiptName = document.getElementById('receipt-name');
            const receiptPhone = document.getElementById('receipt-phone');
            const receiptProgram = document.getElementById('receipt-program');
            const receiptWaBtn = document.getElementById('receipt-wa-btn');

            if (receiptId) receiptId.textContent = bookingId;
            if (receiptName) receiptName.textContent = name;
            if (receiptPhone) receiptPhone.textContent = phone;
            if (receiptProgram) receiptProgram.textContent = program;
            if (receiptWaBtn) receiptWaBtn.href = waUrl;

            if (formWrapper) formWrapper.classList.add('hidden');
            if (receipt) receipt.classList.remove('hidden');

            playComplete();
            showToast(`Verified! Booking ${bookingId} confirmed. Opening WhatsApp...`, "success");

            // 5. Open WhatsApp Immediately (synchronous user action prevents popup blocker)
            window.open(waUrl, '_blank');
        });

        // Handler to book another consultation
        const resetBtn = document.getElementById('receipt-reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                const formWrapper = document.getElementById('booking-form-wrapper');
                const receipt = document.getElementById('booking-proof-receipt');
                clinicBookingForm.reset();
                if (receipt) receipt.classList.add('hidden');
                if (formWrapper) formWrapper.classList.remove('hidden');
            });
        }

        // 6. Track Click-to-Call Conversions on all phone buttons
        document.querySelectorAll('a[href^="tel:"]').forEach(link => {
            link.addEventListener('click', () => {
                if (typeof gtag === 'function') {
                    gtag('event', 'conversion', {
                        'event_category': 'Phone Call',
                        'event_label': link.getAttribute('href')
                    });
                }
            });
        });
    }

    // Newsletter subscription handling
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            playClick();
            
            const email = document.getElementById('news-email').value.trim();
            showToast("Adding you to our newsletter...", "info");
            
            setTimeout(() => {
                playComplete();
                showToast("Subscription successful! Welcome to Nutrislims.", "success");
                document.getElementById('news-email').value = '';
            }, 1200);
        });
    }

    // FAQ collapse toggles
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            playClick();
            const item = btn.parentElement;
            const isActive = item.classList.contains('active');
            
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Telehealth Room Modals details
    const virtualRoomModal = document.getElementById('virtual-room-modal');
    const roomCloseBtn = document.getElementById('room-close-btn');

    // Trigger tele-health session mockup when booking complete
    document.querySelectorAll('.srv-link').forEach(link => {
        link.addEventListener('click', () => {
            playClick();
            const srv = link.getAttribute('data-service');
            showToast(`Loading telemedicine mockup for: ${srv}`, "info");
            
            setTimeout(() => {
                if (virtualRoomModal) {
                    virtualRoomModal.classList.remove('hidden');
                    playComplete();
                }
            }, 1000);
        });
    });

    if (roomCloseBtn) {
        roomCloseBtn.addEventListener('click', () => {
            playClick();
            virtualRoomModal.classList.add('hidden');
        });
    }

});
