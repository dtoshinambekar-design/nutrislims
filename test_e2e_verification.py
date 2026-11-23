import os
import sys
from playwright.sync_api import sync_playwright

def run_e2e_verification():
    html_path = os.path.abspath(r'd:\vs code\antigravity\index.html')
    file_url = f'file:///{html_path.replace("\\", "/")}'
    print(f"Loading target: {file_url}", flush=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # -------------------------------------------------------------
        # Test 1: R1 Browser Caching & Asset Versioning Query Strings
        # -------------------------------------------------------------
        print("\n--- TEST 1: R1 Browser Caching & Asset Versioning ---", flush=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        page.goto(file_url, wait_until="domcontentloaded")

        tokens_link = page.locator('link[href*="tokens.css"]').first
        styles_link = page.locator('link[href*="styles.css"]').first
        app_script = page.locator('script[src*="app.js"]').first

        assert tokens_link.count() > 0, "Missing tokens.css link tag"
        assert styles_link.count() > 0, "Missing styles.css link tag"
        assert app_script.count() > 0, "Missing app.js script tag"

        tokens_href = tokens_link.get_attribute("href")
        styles_href = styles_link.get_attribute("href")
        app_src = app_script.get_attribute("src")

        print(f"Tokens link href: {tokens_href}", flush=True)
        print(f"Styles link href: {styles_href}", flush=True)
        print(f"App script src:   {app_src}", flush=True)

        assert "?v=" in tokens_href, f"tokens.css missing version query string: {tokens_href}"
        assert "?v=" in styles_href, f"styles.css missing version query string: {styles_href}"
        assert "?v=" in app_src, f"app.js missing version query string: {app_src}"
        page.close()
        print(">>> TEST 1 PASSED: Asset links include cache-busting version query strings!", flush=True)

        # -------------------------------------------------------------
        # Test 2: R2 Showcase Images Eager Loading & Render Check
        # -------------------------------------------------------------
        print("\n--- TEST 2: R2 Showcase Images Eager Loading & Rendering ---", flush=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        page.goto(file_url, wait_until="networkidle")

        # Select all showcase card images
        showcase_selectors = [
            ".hero-image",
            ".service-card-img",
            ".about-image",
            ".recipe-card-img",
            ".video-poster-img"
        ]

        total_images_checked = 0
        for selector in showcase_selectors:
            images = page.locator(selector).all()
            assert len(images) > 0, f"Expected showcase images for selector {selector}"
            for img in images:
                src = img.get_attribute("src")
                loading = img.get_attribute("loading")
                decoding = img.get_attribute("decoding")
                natural_width = img.evaluate("el => el.naturalWidth")
                natural_height = img.evaluate("el => el.naturalHeight")

                print(f"Image [{selector}]: src={src}, loading={loading}, decoding={decoding}, dimensions={natural_width}x{natural_height}", flush=True)
                assert loading == "eager", f"Image {src} missing loading='eager' (got {loading})"
                assert decoding == "async", f"Image {src} missing decoding='async' (got {decoding})"
                assert natural_width > 0, f"Image {src} failed to load (naturalWidth=0, blank state)"
                assert natural_height > 0, f"Image {src} failed to load (naturalHeight=0)"
                total_images_checked += 1

        print(f"Verified {total_images_checked} showcase images loaded eagerly with valid naturalWidth > 0", flush=True)

        # Check that app.js does not contain non-existent spiced-moong-dal-khichdi.jpg
        with open(r'd:\vs code\antigravity\app.js', 'r', encoding='utf-8') as f:
            app_js_content = f.read()
        assert "spiced-moong-dal-khichdi.jpg" not in app_js_content, "Found broken 404 image reference in app.js"
        assert "assets/images/indian-balanced-thali.jpg" in app_js_content, "Missing replacement image in app.js"

        page.close()
        print(">>> TEST 2 PASSED: All showcase images load eagerly with zero blank states and 404 fixed!", flush=True)

        # -------------------------------------------------------------
        # Test 3: R3 Card Icons Constrained to <= 14x14px
        # -------------------------------------------------------------
        print("\n--- TEST 3: R3 Card Icons Constrained to <= 14x14px ---", flush=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        page.goto(file_url, wait_until="domcontentloaded")

        icon_selectors = [
            ".recipe-save-btn svg",
            ".service-card .service-inclusions img",
            ".service-card .service-link img",
            ".service-card .icon-inline"
        ]

        total_icons_checked = 0
        for selector in icon_selectors:
            icons = page.locator(selector).all()
            for icon in icons:
                box = icon.bounding_box()
                if box:
                    w = round(box["width"], 2)
                    h = round(box["height"], 2)
                    # SVG and inline icons constrained to <= 14px (allow 14.5 for fractional layout)
                    assert w <= 14.5, f"Icon {selector} width {w}px exceeds 14px limit"
                    assert h <= 14.5, f"Icon {selector} height {h}px exceeds 14px limit"
                    total_icons_checked += 1

        print(f"Verified {total_icons_checked} card icons are strictly constrained to <= 14x14px", flush=True)
        page.close()
        print(">>> TEST 3 PASSED: All card icons constrained strictly to <= 14x14px!", flush=True)

        # -------------------------------------------------------------
        # Test 4: R3 Cross-Viewport Horizontal Overflow Check (320px to 1440px)
        # -------------------------------------------------------------
        print("\n--- TEST 4: R3 Cross-Viewport Horizontal Overflow Check ---", flush=True)
        test_viewports = [320, 340, 360, 375, 390, 414, 430, 480, 600, 768, 800, 820, 900, 992, 1024, 1200, 1280, 1440]
        for width in test_viewports:
            page = browser.new_page(viewport={"width": width, "height": 800})
            page.goto(file_url, wait_until="domcontentloaded")
            page.wait_for_timeout(100)

            doc_scroll_width = page.evaluate("() => document.documentElement.scrollWidth")
            body_scroll_width = page.evaluate("() => document.body.scrollWidth")
            inner_width = page.evaluate("() => window.innerWidth")

            print(f"Viewport {width:4d}px: doc.scrollWidth={doc_scroll_width:4d}px, body.scrollWidth={body_scroll_width:4d}px, innerWidth={inner_width:4d}px", flush=True)
            assert doc_scroll_width <= width, f"Horizontal overflow at {width}px: doc.scrollWidth={doc_scroll_width} > {width}"
            assert body_scroll_width <= width, f"Horizontal overflow at {width}px: body.scrollWidth={body_scroll_width} > {width}"

            # At mobile viewports (<= 480px), check recipe-grid has 1 column
            if width <= 480:
                recipe_cols = page.locator("#recipes .recipe-grid").evaluate("el => getComputedStyle(el).gridTemplateColumns")
                assert " " not in recipe_cols.strip(), f"Expected single column recipe-grid at {width}px, got: {recipe_cols}"

            # At mobile viewports (<= 767px), check booking-container has 1 column
            if width <= 767:
                booking_cols = page.locator(".booking-container").evaluate("el => getComputedStyle(el).gridTemplateColumns")
                assert " " not in booking_cols.strip(), f"Expected single column booking-container at {width}px, got: {booking_cols}"

            page.close()
        print(">>> TEST 4 PASSED: Zero horizontal overflow across all 18 test viewports (320px–1440px)!", flush=True)

        # -------------------------------------------------------------
        # Test 5: Interactive Features & Calculators Suite
        # -------------------------------------------------------------
        print("\n--- TEST 5: Interactive Features & Calculators Suite ---", flush=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        page.goto(file_url, wait_until="domcontentloaded")

        # A: Metric BMI Calculation (70kg, 170cm)
        page.locator("#weight").fill("70")
        page.locator("#height").fill("170")
        page.locator("#bmi-form button[type='submit']").click()
        page.wait_for_timeout(100)
        bmi_score = page.locator("#bmi-result").inner_text()
        print(f"Quick BMI (70kg, 170cm): Result={bmi_score}", flush=True)
        assert "24.2" in bmi_score, f"Expected BMI 24.2, got {bmi_score}"

        # B: Calculators Hub Tab Switching
        calc_hub = page.locator("#calculators")
        assert calc_hub.count() > 0, "Missing #calculators section"
        # Click BMR Tab
        page.locator(".calc-tab-btn[data-calc-tab='bmr']").click()
        page.wait_for_timeout(100)
        bmr_active = page.locator("#panel-bmr").evaluate("el => el.classList.contains('active')")
        assert bmr_active, "BMR calculator should be active after clicking BMR tab"

        # C: Recipe Portion Scaler (+ and - buttons)
        servings_span = page.locator("#servings-recipe-01")
        initial_servings = servings_span.inner_text().strip()
        assert initial_servings == "1", f"Expected initial servings 1, got {initial_servings}"

        page.locator(".portion-btn.portion-inc[data-target='recipe-01']").click()
        page.wait_for_timeout(100)
        scaled_servings = servings_span.inner_text().strip()
        print(f"Portion scaler after increment: servings={scaled_servings}", flush=True)
        assert scaled_servings == "2", f"Expected scaled servings 2, got {scaled_servings}"

        # Ingredient quantity check (40g base for 1 serving -> 80g for 2 servings)
        oats_qty = page.locator("#ing-recipe-01 .ing-qty").first.inner_text().strip()
        assert oats_qty == "80", f"Expected scaled oats qty 80, got {oats_qty}"

        page.close()
        print(">>> TEST 5 PASSED: Interactive BMI calculation, tabs, and portion scaler work flawlessly!", flush=True)

        browser.close()

    print("\n=======================================================", flush=True)
    print("ALL 5 COMPREHENSIVE E2E & VIEWPORT TESTS PASSED (100% CLEAN)!", flush=True)
    print("=======================================================", flush=True)

if __name__ == '__main__':
    run_e2e_verification()
