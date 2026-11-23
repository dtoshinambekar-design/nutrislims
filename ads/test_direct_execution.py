"""
Direct Google Ads Execution & Verification Test
-----------------------------------------------
1. Validates Direct REST API v23 OAuth & Developer Token status.
2. Checks Accessible Customer Accounts.
3. Tests Responsive Search Ad Payloads against Google Ads v23 Validation Schema.
"""

import os
import json
import urllib.request
import urllib.parse
from google_ads_direct_api import GoogleAdsDirectAPI

def test_oauth_and_accessible_customers(api: GoogleAdsDirectAPI):
    print("=" * 65)
    print("STEP 1: TESTING DIRECT OAUTH2 ACCESS & GOOGLE ADS API GATEWAY")
    print("=" * 65)
    token = api.refresh_access_token()
    print("  [SUCCESS] OAuth2 Refresh Token exchanged for Bearer Token.")
    
    # Check accessible customers
    url = "https://googleads.googleapis.com/v23/customers:listAccessibleCustomers"
    req = urllib.request.Request(
        url,
        headers={"Authorization": f"Bearer {token}", "developer-token": api.dev_token}
    )
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            customers = data.get("resourceNames", [])
            print(f"  [SUCCESS] Accessible Google Ads Customers: {customers}")
            return customers
    except urllib.error.HTTPError as e:
        print(f"  [ERROR] HTTP {e.code}: {e.read().decode('utf-8')}")
        return []

def test_developer_token_access_level(api: GoogleAdsDirectAPI, customers: list):
    print("\n" + "=" * 65)
    print("STEP 2: TESTING DEVELOPER TOKEN ACCESS LEVEL ON PRODUCTION ACCOUNTS")
    print("=" * 65)
    token = api.access_token or api.refresh_access_token()
    
    for c_res in customers:
        cid = c_res.replace("customers/", "")
        url = f"https://googleads.googleapis.com/v23/customers/{cid}/googleAds:searchStream"
        req = urllib.request.Request(
            url,
            data=json.dumps({"query": "SELECT customer.id FROM customer"}).encode("utf-8"),
            headers={"Authorization": f"Bearer {token}", "developer-token": api.dev_token, "Content-Type": "application/json"}
        )
        try:
            with urllib.request.urlopen(req) as resp:
                print(f"  [SUCCESS] Account {cid} returned data directly!")
        except urllib.error.HTTPError as e:
            err_data = json.loads(e.read().decode("utf-8"))
            err_msg = err_data[0].get("error", {}).get("message", "")
            details = err_data[0].get("error", {}).get("details", [{}])[0].get("errors", [{}])[0]
            code_name = details.get("errorCode", {})
            msg = details.get("message", "")
            print(f"  [REST API STATUS] Account {cid}: HTTP {e.code}")
            print(f"    Error Code: {code_name}")
            print(f"    Google Response: \"{msg}\"")

def test_ad_copy_integrity():
    print("\n" + "=" * 65)
    print("STEP 3: TESTING RESPONSIVE SEARCH ADS PAYLOAD INTEGRITY")
    print("=" * 65)
    ad_configs = [
        {
            "group": "Weight-Loss-Clinic-Indore",
            "headlines": [
                "Weight Loss Clinic Indore",
                "Best Dietitian in Indore",
                "Nutrislims Wellness Clinic",
                "Customized Diet Plans",
                "Diet For Belly Fat Loss",
                "Rajendra Nagar, Indore",
                "Call Our Clinic Today",
                "Safe & Natural Weight Loss",
                "Visit Our Clinic Today"
            ],
            "descriptions": [
                "Expert Weight Loss & Diet Plans in Rajendra Nagar, Indore. Call or Visit Us Today!",
                "Customized Diet & Nutrition Plans for Long-Term Health. Visit Nutrislims Clinic in Indore.",
                "Consult Certified Dietitians For Healthy Weight Loss & Lifestyle Wellness. Book Visit Now!",
                "Near Jain Temple, Rajendra Nagar. Get Proven Diet Solutions Tailored For Your Body."
            ]
        },
        {
            "group": "PCOS-PCOD-Weight-Management",
            "headlines": [
                "PCOS Diet & Health Clinic",
                "PCOS Weight Loss Indore",
                "Nutrislims Wellness Clinic",
                "Natural PCOS Management",
                "Top Dietitian For Women",
                "Rajendra Nagar, Indore",
                "Call Our Clinic Today",
                "Balance Hormones Naturally",
                "Consult PCOS Specialists"
            ],
            "descriptions": [
                "Specialized PCOS & Hormonal Weight Reversal Plans in Indore. Call or Visit Us Today!",
                "Certified Dietitians For Natural PCOS Care. Visit Nutrislims Clinic in Rajendra Nagar.",
                "Near Jain Temple, Scheme 97 Part 4. Holistic Lifestyle & Nutrition Support for Women.",
                "Personalized Diet Programs To Manage Hormones & Reverse PCOS Naturally. Consult Today."
            ]
        }
    ]

    all_passed = True
    for cfg in ad_configs:
        print(f"\nTarget Group: {cfg['group']}")
        for h in cfg["headlines"]:
            if len(h) > 30 or "!" in h:
                print(f"  [FAIL] Headline: '{h}' ({len(h)} chars)")
                all_passed = False
            else:
                print(f"  [PASS] Headline ({len(h):02d}/30): \"{h}\"")
        for d in cfg["descriptions"]:
            if len(d) > 90 or d.count("!") > 1:
                print(f"  [FAIL] Description: '{d}' ({len(d)} chars)")
                all_passed = False
            else:
                print(f"  [PASS] Description ({len(d):02d}/90): \"{d}\"")

    print("\n" + "=" * 65)
    print(f"RSA PAYLOAD VALIDATION: {'100% PASSED' if all_passed else 'FAILED'}")
    print("=" * 65)

if __name__ == "__main__":
    api = GoogleAdsDirectAPI()
    customers = test_oauth_and_accessible_customers(api)
    test_developer_token_access_level(api, customers)
    test_ad_copy_integrity()
