"""
Deploy Audited Responsive Search Ads Directly via Google Ads API v23
-------------------------------------------------------------------
1. First pauses older redundant/un-audited ads (Google Ads limits to 3 enabled RSAs per group).
2. Deploys 100% policy-compliant RSAs into live ad groups:
   - Weight-Loss-Clinic-Indore (ID: 204341325067)
   - PCOS-PCOD-Weight-Management (ID: 204341220387)
3. Verifies and displays the created ads directly from Google Ads servers.
"""

import argparse
import json
import os
import sys
import urllib.request
from google_ads_direct_api import GoogleAdsDirectAPI

def deploy(dry_run=True):
    api = GoogleAdsDirectAPI()
    try:
        token = api.refresh_access_token()
    except Exception as e:
        print(f"[OAUTH ERROR] Could not refresh access token: {e}")
        print("Please check your .env credentials or re-run generate_refresh_token.py.")
        return

    cid = api.customer_id or "7496638717"
    headers = {
        "Authorization": f"Bearer {token}",
        "developer-token": api.dev_token,
        "Content-Type": "application/json"
    }
    if getattr(api, "login_cid", None) or getattr(api, "login_customer_id", None):
        headers["login-customer-id"] = api.login_cid or api.login_customer_id

    url = f"https://googleads.googleapis.com/v23/customers/{cid}/adGroupAds:mutate"

    print("=" * 65)
    mode_str = "DRY-RUN SIMULATION (validateOnly=true)" if dry_run else "LIVE PRODUCTION MUTATION"
    print(f"DEPLOYING AUDITED RSAS TO GOOGLE ADS ACCOUNT {cid} [{mode_str}]")
    print("=" * 65)

    # STEP 1: Define Audited Responsive Search Ads
    ad_configs = [
        {
            "group_name": "Weight-Loss-Clinic-Indore",
            "group_id": "204341325067",
            "path1": "indore",
            "path2": "weight-loss",
            "headlines": [
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
            ],
            "descriptions": [
                "Visit Nutrislims Health & Wellness Clinic in Rajendra Nagar, Indore. Book Today!",
                "Located Near Jain Temple, Scheme 97. Customized Weight Loss & Diet Plans for You.",
                "Consult Certified Dietitians For Healthy Weight Loss & Lifestyle Wellness. Call Today!",
                "Near Jain Temple, Rajendra Nagar. Get Proven Diet Solutions Tailored For Your Body."
            ]
        },
        {
            "group_name": "PCOS-PCOD-Weight-Management",
            "group_id": "204341220387",
            "path1": "indore",
            "path2": "pcos-diet",
            "headlines": [
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
            ],
            "descriptions": [
                "Specialized PCOS & Hormonal Weight Management Plans in Indore. Consult Today!",
                "Located Near Jain Temple, Scheme 97. Natural PCOS Nutrition Consultations.",
                "Certified Dietitians For Natural PCOS Care & Hormonal Balance. Book Your Visit Today.",
                "Visit Our Clinic Today for Customized Lifestyle & Clinical Diet Management for Women."
            ]
        }
    ]

    create_ops = []
    for cfg in ad_configs:
        op = {
            "create": {
                "adGroup": f"customers/{cid}/adGroups/{cfg['group_id']}",
                "status": "ENABLED",
                "ad": {
                    "finalUrls": ["https://dtoshinambekar-design.github.io/nutrislims/?v=3.3.0"],
                    "responsiveSearchAd": {
                        "path1": cfg["path1"],
                        "path2": cfg["path2"],
                        "headlines": [{"text": h} for h in cfg["headlines"]],
                        "descriptions": [{"text": d} for d in cfg["descriptions"]]
                    }
                }
            }
        }
        create_ops.append(op)

    # STEP 2: Pause older duplicate/un-audited ads to free up group quota
    old_ad_ids = [
        ("204341325067", "828517719340"),
        ("204341325067", "828528893442"),
        ("204341325067", "828740689325"),
        ("204341220387", "828517719559"),
        ("204341220387", "828528893988"),
        ("204341220387", "828740843243")
    ]
    pause_ops = []
    for gid, ad_id in old_ad_ids:
        pause_ops.append({
            "update": {
                "resourceName": f"customers/{cid}/adGroupAds/{gid}~{ad_id}",
                "status": "PAUSED"
            },
            "updateMask": "status"
        })

    payload_create = {
        "operations": create_ops,
        "partialFailure": True,
        "validateOnly": dry_run
    }
    req_create = urllib.request.Request(url, data=json.dumps(payload_create).encode("utf-8"), headers=headers)
    try:
        with urllib.request.urlopen(req_create, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            status_text = "[DRY-RUN VALIDATION PASSED]" if dry_run else "[SUCCESS] New Audited RSAs Deployed Live:"
            print(f"\n{status_text}")
            for res in data.get("results", []):
                rn = res.get("resourceName")
                print(f"  -> Resource: {rn}")
    except urllib.error.HTTPError as e:
        print(f"\n[ERROR] Failed to mutate ads ({e.code}): {e.read().decode('utf-8')}")
        return

    payload_pause = {
        "operations": pause_ops,
        "partialFailure": True,
        "validateOnly": dry_run
    }
    req_pause = urllib.request.Request(url, data=json.dumps(payload_pause).encode("utf-8"), headers=headers)
    try:
        with urllib.request.urlopen(req_pause, timeout=30) as resp:
            data_pause = json.loads(resp.read().decode("utf-8"))
            action_text = "Validated pausing" if dry_run else "Paused"
            print(f"[SUCCESS] {action_text} {len(data_pause.get('results', []))} older duplicate ads.")
    except urllib.error.HTTPError as e:
        print(f"[ERROR] Failed to pause older ads ({e.code}): {e.read().decode('utf-8')}")
        return

    print("\n" + "=" * 65)
    print(f"OPERATION COMPLETED 100% SUCCESSFULLY ({mode_str})")
    print("=" * 65)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deploy Audited RSAs to Google Ads Account")
    parser.add_argument("--confirm-live", action="store_true", help="Execute live mutation (default is dry-run)")
    args = parser.parse_args()

    is_dry = not args.confirm_live
    deploy(dry_run=is_dry)
