import json
import urllib.request
from google_ads_direct_api import GoogleAdsDirectAPI

def inspect_details():
    api = GoogleAdsDirectAPI()
    token = api.refresh_access_token()
    cid = "7496638717"
    headers = {
        "Authorization": f"Bearer {token}",
        "developer-token": api.dev_token,
        "Content-Type": "application/json"
    }

    print("==========================================")
    print(f"QUERYING ACTIVE AD GROUPS IN {cid}")
    print("==========================================")
    url = f"https://googleads.googleapis.com/v23/customers/{cid}/googleAds:searchStream"
    query = """
        SELECT 
            campaign.name,
            ad_group.id, 
            ad_group.name, 
            ad_group.status
        FROM ad_group 
        WHERE ad_group.status = 'ENABLED'
    """
    req = urllib.request.Request(url, data=json.dumps({"query": query}).encode("utf-8"), headers=headers)
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        for batch in data:
            for r in batch.get("results", []):
                camp = r.get("campaign", {}).get("name")
                ag = r.get("adGroup", {})
                print(f"  [AdGroup] ID: {ag.get('id')} | Name: '{ag.get('name')}' | Campaign: '{camp}'")

    print("\n==========================================")
    print(f"QUERYING EXISTING ADS IN {cid}")
    print("==========================================")
    query_ads = """
        SELECT 
            ad_group.name,
            ad_group_ad.ad.id,
            ad_group_ad.ad.type,
            ad_group_ad.status,
            ad_group_ad.ad.responsive_search_ad.headlines,
            ad_group_ad.ad.responsive_search_ad.descriptions
        FROM ad_group_ad
        WHERE ad_group_ad.status = 'ENABLED'
    """
    req_ads = urllib.request.Request(url, data=json.dumps({"query": query_ads}).encode("utf-8"), headers=headers)
    with urllib.request.urlopen(req_ads) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        for batch in data:
            for r in batch.get("results", []):
                ag_name = r.get("adGroup", {}).get("name")
                ad = r.get("adGroupAd", {}).get("ad", {})
                rsa = ad.get("responsiveSearchAd", {})
                headlines = [h.get("text") for h in rsa.get("headlines", [])]
                descriptions = [d.get("text") for d in rsa.get("descriptions", [])]
                print(f"\n  [AD] ID: {ad.get('id')} | Type: {ad.get('type')} | Group: '{ag_name}'")
                print(f"       Headlines ({len(headlines)}): {headlines[:3]} ...")
                print(f"       Descriptions ({len(descriptions)}): {descriptions}")

if __name__ == "__main__":
    inspect_details()
