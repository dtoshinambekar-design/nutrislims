import json
import urllib.request
from google_ads_direct_api import GoogleAdsDirectAPI

def verify_live():
    api = GoogleAdsDirectAPI()
    token = api.refresh_access_token()
    cid = "7496638717"
    headers = {
        "Authorization": f"Bearer {token}",
        "developer-token": api.dev_token,
        "Content-Type": "application/json"
    }

    url = f"https://googleads.googleapis.com/v23/customers/{cid}/googleAds:searchStream"
    query = """
        SELECT 
            ad_group.name,
            ad_group_ad.ad.id,
            ad_group_ad.status,
            ad_group_ad.policy_summary.approval_status,
            ad_group_ad.policy_summary.review_status,
            ad_group_ad.ad.responsive_search_ad.headlines,
            ad_group_ad.ad.responsive_search_ad.descriptions
        FROM ad_group_ad
        WHERE ad_group_ad.ad.id IN (829682503093, 829682503096)
    """
    req = urllib.request.Request(url, data=json.dumps({"query": query}).encode("utf-8"), headers=headers)
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        for batch in data:
            for r in batch.get("results", []):
                aga = r.get("adGroupAd", {})
                ag = r.get("adGroup", {})
                ad = aga.get("ad", {})
                rsa = ad.get("responsiveSearchAd", {})
                pol = aga.get("policySummary", {})
                print(f"VERIFIED LIVE AD ID: {ad.get('id')}")
                print(f"  Group: {ag.get('name')}")
                print(f"  Status: {aga.get('status')} | Approval: {pol.get('approvalStatus')} | Review: {pol.get('reviewStatus')}")
                print(f"  Headlines ({len(rsa.get('headlines', []))}):")
                for h in rsa.get("headlines", []):
                    print(f"    - \"{h.get('text')}\"")
                print(f"  Descriptions ({len(rsa.get('descriptions', []))}):")
                for d in rsa.get("descriptions", []):
                    print(f"    - \"{d.get('text')}\"")
                print("-" * 60)

if __name__ == "__main__":
    verify_live()
