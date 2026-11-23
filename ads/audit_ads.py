# Character and Policy Audit Script for Google Ads
import re

# Policy-Compliant Audited Headlines and Descriptions (Excellent Ad Strength: 12 Distinct Headlines, 4 Descriptions)
headlines_group1 = [
    "Nutrislims Wellness Clinic",
    "Best Dietitian in Indore",
    "Weight Loss Clinic Indore",
    "Near Jain Temple, Indore",
    "Best Diet Clinic in Indore",
    "Call Our Clinic Today",
    "Certified Clinical Nutrition",
    "Visit Our Clinic in Indore",
    "Customized Diet Plans",
    "Healthy Sustainable Fat Loss",
    "Book Consultation Today",
    "Rajendra Nagar, Indore"
]

descriptions_group1 = [
    "Visit Nutrislims Health & Wellness Clinic in Rajendra Nagar, Indore. Book Today!",
    "Located Near Jain Temple, Scheme 97. Customized Weight Loss & Diet Plans for You.",
    "Consult Certified Dietitians For Healthy Weight Loss & Lifestyle Wellness. Call Today!",
    "Near Jain Temple, Rajendra Nagar. Get Proven Diet Solutions Tailored For Your Body."
]

headlines_group2 = [
    "PCOS Diet & Health Clinic",
    "Nutrislims Wellness Clinic",
    "Top PCOS Specialist Indore",
    "Near Jain Temple, Indore",
    "PCOS Weight Loss Indore",
    "Call Our Clinic Today",
    "Balance Hormones Naturally",
    "Natural PCOS Management",
    "Top Dietitian For Women",
    "PCOS Dietitian in Indore",
    "Customized Hormonal Diets",
    "Book Consultation Today"
]

descriptions_group2 = [
    "Specialized PCOS & Hormonal Weight Management Plans in Indore. Consult Today!",
    "Located Near Jain Temple, Scheme 97. Natural PCOS Nutrition Consultations.",
    "Certified Dietitians For Natural PCOS Care & Hormonal Balance. Book Your Visit Today.",
    "Visit Our Clinic Today for Customized Lifestyle & Clinical Diet Management for Women."
]

def audit(name, headlines, descriptions):
    print("=" * 60)
    print(f"AUDITING: {name}")
    print("=" * 60)
    has_error = False
    
    phone_pattern = re.compile(r'\b(?:\+?91|0)?[6-9]\d{9}\b')
    prohibited_terms = re.compile(r'\b(doctor|cure|reverse|guarantee|pills)\b', re.IGNORECASE)
    trademark_terms = re.compile(r'\b(google|google maps)\b', re.IGNORECASE)

    print("HEADLINES (Limit <= 30 chars, No '!', No phone numbers, No prohibited/trademark terms):")
    for i, h in enumerate(headlines, 1):
        length = len(h)
        exclamation = "!" in h
        has_phone = bool(phone_pattern.search(h))
        has_prohibited = bool(prohibited_terms.search(h))
        has_tm = bool(trademark_terms.search(h))
        
        valid = length <= 30 and not exclamation and not has_phone and not has_prohibited and not has_tm
        status = "PASS" if valid else "FAIL"
        if not valid: 
            has_error = True
        print(f"  [{status}] #{i}: \"{h}\" -> Length: {length}/30 | Phone: {has_phone} | Prohibited: {has_prohibited} | TM: {has_tm}")

    print("\nDESCRIPTIONS (Limit <= 90 chars, Max 1 '!', No phone numbers, No prohibited terms):")
    for i, d in enumerate(descriptions, 1):
        length = len(d)
        exclamation_count = d.count("!")
        has_phone = bool(phone_pattern.search(d))
        has_prohibited = bool(prohibited_terms.search(d))
        
        valid = length <= 90 and exclamation_count <= 1 and not has_phone and not has_prohibited
        status = "PASS" if valid else "FAIL"
        if not valid: 
            has_error = True
        print(f"  [{status}] #{i}: \"{d}\" -> Length: {length}/90 | Exclamations: {exclamation_count} | Phone: {has_phone} | Prohibited: {has_prohibited}")

    return has_error

def audit_urls(urls):
    print("\n" + "=" * 60)
    print("AUDITING FINAL LANDING URLS")
    print("=" * 60)
    has_error = False
    for i, u in enumerate(urls, 1):
        is_https = u.startswith("https://")
        no_fragment = "#" not in u
        valid = is_https and no_fragment and len(u) <= 2048
        status = "PASS" if valid else "FAIL"
        if not valid:
            has_error = True
        print(f"  [{status}] URL #{i}: \"{u}\" -> HTTPS: {is_https} | No-Fragment: {no_fragment} | Len: {len(u)}/2048")
    return has_error

if __name__ == "__main__":
    print("RUNNING GOOGLE ADS FORMAT & POLICY AUDIT...")
    err1 = audit("GROUP 1: WEIGHT LOSS CLINIC", headlines_group1, descriptions_group1)
    err2 = audit("GROUP 2: PCOS / HORMONAL WEIGHT", headlines_group2, descriptions_group2)
    err3 = audit_urls(["https://dtoshinambekar-design.github.io/nutrislims/?v=3.3.0"])
    print("=" * 60)
    print(f"OVERALL AUDIT RESULT: {'ERRORS FOUND - NEEDS FIX' if (err1 or err2 or err3) else '100% PERFECT COMPLIANCE'}")
