import os
import sys
from playwright.sync_api import sync_playwright

def run_comprehensive_audit():
    html_path = os.path.abspath(r'd:\vs code\antigravity\index.html')
    file_url = f'file:///{html_path.replace("\\", "/")}'
    print(f"Loading target: {file_url}")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # -------------------------------------------------------------
        # Test 1: Cross-Viewport Horizontal Overflow Check (Requirement R2)
        # -------------------------------------------------------------
        viewports = [375, 390, 768, 800, 820, 900, 992, 1024, 1280, 1440]
        print("\n--- TEST 1: Cross-Viewport Horizontal Overflow Check ---", flush=True)
        for width in viewports:
            page = browser.new_page(viewport={"width": width, "height": 900})
            page.goto(file_url, wait_until="domcontentloaded")
            page.wait_for_timeout(100)

            doc_scroll_width = page.evaluate("() => document.documentElement.scrollWidth")
            body_scroll_width = page.evaluate("() => document.body.scrollWidth")
            inner_width = page.evaluate("() => window.innerWidth")

            print(f"Viewport {width:4d}px: doc.scrollWidth={doc_scroll_width:4d}px, body.scrollWidth={body_scroll_width:4d}px, innerWidth={inner_width:4d}px", flush=True)
            assert doc_scroll_width <= width, f"Horizontal overflow at {width}px: doc_scroll_width={doc_scroll_width} > {width}"
            assert body_scroll_width <= width, f"Horizontal overflow at {width}px: body_scroll_width={body_scroll_width} > {width}"
            page.close()
        print(">>> TEST 1 PASSED: Zero horizontal overflow across all 10 viewports!", flush=True)

        # -------------------------------------------------------------
        # Test 2: Newsletter & Header Collision and Spacing (Requirement R1)
        # -------------------------------------------------------------
        print("\n--- TEST 2: Newsletter & Header Layout Separation (R1) ---", flush=True)
        for width in [1280, 768, 375]:
            page = browser.new_page(viewport={"width": width, "height": 900})
            page.goto(file_url, wait_until="domcontentloaded")
            page.wait_for_timeout(100)

            # Ensure home-section and tools-section are in view / measure bounding boxes
            news_box = page.locator("#newsletter-form button").bounding_box()
            header_text = page.locator("#tools-section .page-title-banner .sub-lbl").bounding_box()
            banner_box = page.locator("#tools-section .page-title-banner").bounding_box()

            news_bottom = news_box["y"] + news_box["height"]
            banner_top = banner_box["y"]
            header_top = header_text["y"]
            gap_to_header_text = header_top - news_bottom
            gap_to_banner = banner_top - news_bottom

            print(f"Viewport {width:4d}px: Form button bottom={news_bottom:.1f}px, Banner top={banner_top:.1f}px, Sub-lbl top={header_top:.1f}px -> Separation to header text={gap_to_header_text:.1f}px, Separation to banner top={gap_to_banner:.1f}px", flush=True)
            
            # Separation between newsletter form button and header text must be > 100px on desktop
            if width == 1280:
                assert gap_to_header_text > 100, f"Expected desktop vertical gap > 100px, got {gap_to_header_text}px"
            else:
                assert gap_to_header_text >= 80, f"Expected mobile/tablet vertical gap >= 80px, got {gap_to_header_text}px"

            # Check high contrast text colors on banner
            h1_color = page.locator("#tools-section .page-title-banner h1").evaluate("el => getComputedStyle(el).color")
            p_color = page.locator("#tools-section .page-title-banner p").evaluate("el => getComputedStyle(el).color")
            print(f"Viewport {width:4d}px: Banner h1 color={h1_color}, p color={p_color}", flush=True)
            assert "255, 255, 255" in h1_color, f"Banner h1 must be white, got {h1_color}"

            # Check mobile column stacking
            if width <= 600:
                flex_dir = page.locator("#newsletter-form").evaluate("el => getComputedStyle(el).flexDirection")
                assert flex_dir == "column", f"Expected newsletter-form flex-direction column on mobile, got {flex_dir}"
                print(f"Viewport {width:4d}px: Newsletter form flex-direction is correctly '{flex_dir}'", flush=True)

            page.close()
        print(">>> TEST 2 PASSED: Verified clean vertical layout flow and high-contrast typography!", flush=True)

        # -------------------------------------------------------------
        # Test 3: Tablet Navbar Layout (768px - 992px) (Requirement R2)
        # -------------------------------------------------------------
        print("\n--- TEST 3: Tablet Navbar Layout Audit (768px - 992px) ---", flush=True)
        for tablet_w in [768, 800, 820, 900]:
            page = browser.new_page(viewport={"width": tablet_w, "height": 900})
            page.goto(file_url, wait_until="domcontentloaded")
            
            toggle_disp = page.locator("#menu-toggle-btn").evaluate("el => getComputedStyle(el).display")
            actions_disp = page.locator(".navbar-actions").evaluate("el => getComputedStyle(el).display")
            topbar_disp = page.locator(".header-topbar").evaluate("el => getComputedStyle(el).display")
            
            print(f"Tablet {tablet_w}px: menu-toggle-btn={toggle_disp}, navbar-actions={actions_disp}, header-topbar={topbar_disp}", flush=True)
            assert toggle_disp in ["flex", "block"], f"Mobile nav toggle should be visible on tablet {tablet_w}px"
            assert actions_disp == "none", f"Navbar actions should be hidden to prevent overflow on tablet {tablet_w}px"
            assert topbar_disp == "none", f"Header topbar should be hidden on tablet {tablet_w}px"
            page.close()
        print(">>> TEST 3 PASSED: Tablet navbar avoids collision and cleanly exposes mobile navigation toggle!", flush=True)

        # -------------------------------------------------------------
        # Test 4: Mobile Experience Badge & Calculators Usability (Requirement R2)
        # -------------------------------------------------------------
        print("\n--- TEST 4: Mobile Experience Badge & Calculators Usability ---", flush=True)
        page = browser.new_page(viewport={"width": 375, "height": 900})
        page.goto(file_url, wait_until="domcontentloaded")
        
        badge_box = page.locator(".experience-badge").bounding_box()
        badge_right = badge_box["x"] + badge_box["width"]
        print(f"Mobile 375px: experience-badge right coordinate = {badge_right:.1f}px (Viewport width = 375px)", flush=True)
        assert badge_right <= 375, f"Experience badge overflows viewport: {badge_right} > 375"

        sidebar_height = page.locator(".tools-sidebar-nav").bounding_box()["height"]
        print(f"Mobile 375px: tools-sidebar-nav computed height = {sidebar_height:.1f}px (Previously 744px)", flush=True)
        assert sidebar_height < 100, f"Calculators sidebar is too tall on mobile: {sidebar_height}px"
        
        room_body_cols = page.locator(".room-body").evaluate("el => getComputedStyle(el).gridTemplateColumns")
        print(f"Mobile 375px: .room-body gridTemplateColumns = {room_body_cols}", flush=True)
        assert " " not in room_body_cols.strip(), f"Room body should be 1-column on mobile, got {room_body_cols}"
        page.close()
        print(">>> TEST 4 PASSED: Mobile badge fits cleanly within container and sidebar is compact!", flush=True)

        # -------------------------------------------------------------
        # Test 5: Interactive Mobile Menu Toggle (Requirement R3)
        # -------------------------------------------------------------
        print("\n--- TEST 5: Interactive Mobile Menu Toggle ---", flush=True)
        page = browser.new_page(viewport={"width": 375, "height": 900})
        page.goto(file_url, wait_until="domcontentloaded")

        # Initially closed
        nav_has_active = page.locator("#main-navbar").evaluate("el => el.classList.contains('active')")
        assert not nav_has_active, "Nav menu should be closed initially"

        # Click menu toggle button
        page.locator("#menu-toggle-btn").click()
        page.wait_for_timeout(100)
        nav_has_active_after_click = page.locator("#main-navbar").evaluate("el => el.classList.contains('active')")
        aria_expanded = page.locator("#menu-toggle-btn").get_attribute("aria-expanded")
        print(f"After click on #menu-toggle-btn: nav active={nav_has_active_after_click}, aria-expanded={aria_expanded}", flush=True)
        assert nav_has_active_after_click, "Nav menu should be active after clicking toggle button"

        # Click a nav link inside the open menu
        page.locator("#main-navbar a[data-target='tools-section']").click()
        page.wait_for_timeout(200)
        nav_has_active_after_nav = page.locator("#main-navbar").evaluate("el => el.classList.contains('active')")
        print(f"After click on nav link: nav active={nav_has_active_after_nav}", flush=True)
        assert not nav_has_active_after_nav, "Nav menu should automatically close when a link is clicked"
        page.close()
        print(">>> TEST 5 PASSED: Mobile menu opens and closes seamlessly!", flush=True)

        # -------------------------------------------------------------
        # Test 6: Hero Quick BMI Unit Switcher & Calculations (Requirement R3)
        # -------------------------------------------------------------
        print("\n--- TEST 6: Hero Quick BMI Unit Switcher & Calculation ---", flush=True)
        page = browser.new_page(viewport={"width": 1280, "height": 900})
        page.goto(file_url, wait_until="domcontentloaded")

        # A: Metric Calculation (70 kg, 170 cm)
        page.locator("#hero-weight").fill("70")
        page.locator("#hero-height").fill("170")
        page.locator("#hero-bmi-calc-btn").click()
        page.wait_for_timeout(100)
        metric_score = page.locator("#hero-bmi-score").inner_text()
        metric_badge = page.locator("#hero-bmi-badge").inner_text()
        print(f"Metric (70kg, 170cm): Score={metric_score}, Badge={metric_badge}", flush=True)
        assert metric_score == "24.2", f"Expected metric BMI 24.2, got {metric_score}"
        assert metric_badge == "Normal Weight", f"Expected Normal Weight, got {metric_badge}"

        # B: Imperial Switch
        page.locator("#hero-unit-imperial").click()
        page.wait_for_timeout(100)
        w_lbl = page.locator("#hero-weight-lbl").inner_text()
        h_lbl = page.locator("#hero-height-lbl").inner_text()
        imperial_active = page.locator("#hero-unit-imperial").evaluate("el => el.classList.contains('active')")
        print(f"Imperial toggle: weight-lbl={w_lbl}, height-lbl={h_lbl}, active={imperial_active}", flush=True)
        assert w_lbl == "lbs", f"Expected weight label 'lbs', got {w_lbl}"
        assert h_lbl == "in", f"Expected height label 'in', got {h_lbl}"
        assert imperial_active, "Imperial tab should be active"

        # C: Imperial Calculation (154 lbs, 67 in)
        page.locator("#hero-weight").fill("154")
        page.locator("#hero-height").fill("67")
        page.locator("#hero-bmi-calc-btn").click()
        page.wait_for_timeout(100)
        imperial_score = page.locator("#hero-bmi-score").inner_text()
        imperial_badge = page.locator("#hero-bmi-badge").inner_text()
        print(f"Imperial (154lbs, 67in): Score={imperial_score}, Badge={imperial_badge}", flush=True)
        assert imperial_score == "24.1", f"Expected imperial BMI 24.1, got {imperial_score}"
        assert imperial_badge == "Normal Weight", f"Expected Normal Weight, got {imperial_badge}"
        page.close()
        print(">>> TEST 6 PASSED: Quick BMI unit switcher and formulas operate flawlessly!", flush=True)

        # -------------------------------------------------------------
        # Test 7: Hero Tools CTA Button Navigation (Requirement R3)
        # -------------------------------------------------------------
        print("\n--- TEST 7: Hero Tools CTA Button Navigation ---", flush=True)
        page = browser.new_page(viewport={"width": 1280, "height": 900})
        page.goto(file_url, wait_until="domcontentloaded")
        
        hero_btn = page.locator("#hero-tools-btn")
        assert hero_btn.count() == 1, "Missing #hero-tools-btn in DOM"
        hero_btn.click()
        page.wait_for_timeout(200)
        tools_active = page.locator("#tools-section").evaluate("el => el.classList.contains('active')")
        print(f"After click on #hero-tools-btn: tools-section active={tools_active}", flush=True)
        assert tools_active, "Clicking #hero-tools-btn should activate tools-section"
        page.close()
        print(">>> TEST 7 PASSED: Hero tools CTA exists and successfully activates Calculators Hub!", flush=True)

        # -------------------------------------------------------------
        # Test 8: Defensive Input Sanitization for Calculators (Requirement R3)
        # -------------------------------------------------------------
        print("\n--- TEST 8: Defensive Input Sanitization & NaN Shielding ---", flush=True)
        page = browser.new_page(viewport={"width": 1280, "height": 900})
        page.goto(file_url, wait_until="domcontentloaded")

        # Activate Calculators Hub
        page.locator("#hero-tools-btn").click()
        page.wait_for_timeout(100)

        # Test Body Fat with waist <= neck (male)
        page.locator("[data-calc='bodyfat-adv']").click()
        page.wait_for_timeout(100)
        page.locator("#bf-gender").select_option("male")
        page.locator("#bf-height").fill("175")
        page.locator("#bf-neck").fill("45")
        page.locator("#bf-waist").fill("42")  # 42 <= 45 and >= min(40)
        page.locator("#adv-bodyfat-form button[type='submit']").click()
        page.wait_for_timeout(200)
        toast_text = page.locator("#toast-container").inner_text()
        score_hidden = page.locator("#bodyfat-adv-output").evaluate("el => el.classList.contains('hidden')")
        print(f"Body Fat (waist=42 <= neck=45): Toast='{toast_text.strip()}', Output hidden={score_hidden}", flush=True)
        assert "Waist measurement must be greater than neck" in toast_text, "Failed to catch waist <= neck"
        assert score_hidden, "Result should remain hidden on invalid input"

        # Test WHR with 0 or empty hip
        page.locator("[data-calc='whr-adv']").click()
        page.wait_for_timeout(100)
        page.evaluate("() => { document.getElementById('adv-whr-form').noValidate = true; }")
        page.locator("#whr-waist").fill("80")
        page.locator("#whr-hip").fill("0")  # hip = 0
        page.locator("#adv-whr-form button[type='submit']").click()
        page.wait_for_timeout(200)
        whr_toast = page.locator("#toast-container").inner_text()
        whr_hidden = page.locator("#whr-adv-output").evaluate("el => el.classList.contains('hidden')")
        print(f"WHR (hip=0): Toast='{whr_toast.strip()}', Output hidden={whr_hidden}", flush=True)
        assert "Please enter valid positive measurements" in whr_toast, "Failed to catch hip <= 0"
        assert whr_hidden, "Result should remain hidden on invalid input"

        # Test Activity Burn with negative or empty duration
        page.locator("[data-calc='activity-burn']").click()
        page.wait_for_timeout(100)
        page.evaluate("() => { document.getElementById('activity-burn-form').noValidate = true; }")
        page.locator("#act-weight").fill("70")
        page.locator("#act-duration").fill("-10")
        page.locator("#activity-burn-form button[type='submit']").click()
        page.wait_for_timeout(200)
        act_toast = page.locator("#toast-container").inner_text()
        act_hidden = page.locator("#activity-burn-output").evaluate("el => el.classList.contains('hidden')")
        print(f"Activity Burn (dur=-10): Toast='{act_toast.strip()}', Output hidden={act_hidden}", flush=True)
        assert "Please enter valid positive numbers" in act_toast, "Failed to catch negative duration"
        assert act_hidden, "Result should remain hidden on invalid input"

        page.close()
        print(">>> TEST 8 PASSED: All defensive sanitization shields successfully prevent NaN and errors!", flush=True)

        browser.close()

    print("\n=======================================================", flush=True)
    print("ALL 8 COMPREHENSIVE E2E & VIEWPORT TESTS PASSED (100% CLEAN)!", flush=True)
    print("=======================================================", flush=True)

if __name__ == '__main__':
    run_comprehensive_audit()
