import re

def verify():
    with open(r'D:\vs code\antigravity\index.html', encoding='utf-8') as f:
        html = f.read()
    
    old_html = re.findall('9876543210', html)
    new_html = re.findall('7828149178', html)
    
    assert len(old_html) == 0, f"Found {len(old_html)} instances of old phone in index.html"
    assert len(new_html) >= 7, f"Expected >= 7 instances of new phone in index.html, found {len(new_html)}"
    assert 'id="weight-loss"' in html, "Missing #weight-loss anchor"
    assert 'id="pcos-care"' in html, "Missing #pcos-care anchor"
    assert 'mobile-sticky-action-bar' in html, "Missing mobile sticky bar"
    assert 'pulse-glow' in html, "Missing pulse-glow class"
    
    with open(r'D:\vs code\antigravity\app.js', encoding='utf-8') as f:
        js = f.read()
        
    old_js = re.findall('9876543210', js)
    new_js = re.findall('7828149178', js)
    
    assert len(old_js) == 0, f"Found {len(old_js)} instances of old phone in app.js"
    assert len(new_js) >= 2, f"Expected >= 2 instances of new phone in app.js, found {len(new_js)}"
    assert 'wa.me/917828149178' in js, "Missing WhatsApp lead routing"
    
    with open(r'D:\vs code\antigravity\styles.css', encoding='utf-8') as f:
        css = f.read()
        
    assert 'mobile-sticky-action-bar' in css, "Missing mobile sticky bar styles"
    assert 'pulse-glow-ring' in css, "Missing pulse glow animation"
    assert 'ad-focus-banner' in css, "Missing ad focus banner styles"
    
    print("ALL VERIFICATION CHECKS PASSED SUCCESSFULLY (100% CLEAN)!")

if __name__ == '__main__':
    verify()
