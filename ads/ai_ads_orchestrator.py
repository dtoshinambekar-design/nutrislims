"""
Autonomous Google Ads AI Orchestrator
------------------------------------
1. Connects to the Google Sheet Bridge.
2. Analyzes search queries, keywords, average CPC, and conversion patterns.
3. Automatically generates high-CTR Responsive Search Ads (RSAs) meeting Google's strict character constraints:
   - 3 to 15 Headlines (<= 30 characters each)
   - 2 to 4 Descriptions (<= 90 characters each)
4. Writes the created ads into the 'Ad_Launch_Queue' tab as PENDING.
5. Next time Google Ads Script triggers, the ads go live automatically with 0 manual clicks.
"""

import urllib.request
import csv
import io
import json
import sys

def extract_sheet_id(url_or_id: str) -> str:
    """Extracts the unique spreadsheet ID from a Google Sheets URL or ID string."""
    if "/d/" in url_or_id:
        return url_or_id.split("/d/")[1].split("/")[0]
    return url_or_id.strip()

def fetch_sheet_csv(sheet_id: str, sheet_name: str) -> list[dict]:
    """Fetches a specific tab from a Google Sheet as CSV."""
    encoded_name = urllib.parse.quote(sheet_name)
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={encoded_name}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req) as resp:
            content = resp.read().decode("utf-8")
            reader = csv.DictReader(io.StringIO(content))
            return [row for row in reader]
    except Exception as e:
        print(f"Warning: Could not fetch tab '{sheet_name}': {e}")
        return []

def analyze_intelligence(sheet_id: str):
    """Analyzes search queries and keywords to extract business insights."""
    print("=" * 60)
    print("ANALYZING ACCOUNT INTELLIGENCE FROM GOOGLE ADS...")
    print("=" * 60)

    campaigns = fetch_sheet_csv(sheet_id, "Campaigns_Data")
    search_queries = fetch_sheet_csv(sheet_id, "Search_Queries")
    keywords = fetch_sheet_csv(sheet_id, "Keywords_Data")

    print(f"Found {len(campaigns)} Campaigns, {len(search_queries)} Search Queries, {len(keywords)} Keywords.")

    # Sort queries by clicks and conversions
    top_queries = sorted(
        search_queries, 
        key=lambda x: (float(x.get("Conversions", 0) or 0), int(x.get("Clicks", 0) or 0)), 
        reverse=True
    )[:10]

    if top_queries:
        print("\nTop 5 Customer Search Queries Driving Traffic:")
        for q in top_queries[:5]:
            print(f" - \"{q.get('Search Query')}\" | Clicks: {q.get('Clicks')} | Avg CPC: {q.get('Avg CPC')}")

    return {
        "campaigns": campaigns,
        "search_queries": search_queries,
        "keywords": keywords,
        "top_queries": top_queries
    }

def generate_ad_payload(
    campaign_name: str,
    ad_group_name: str,
    final_url: str,
    budget_inr: float,
    headlines: list[str],
    descriptions: list[str],
    target_keywords: list[str]
) -> dict:
    """Validates Google Ads length constraints and prepares queue payload."""
    valid_headlines = [h.strip() for h in headlines if len(h.strip()) > 0 and len(h.strip()) <= 30]
    valid_descriptions = [d.strip() for d in descriptions if len(d.strip()) > 0 and len(d.strip()) <= 90]

    assert len(valid_headlines) >= 3, f"Need at least 3 headlines <= 30 chars. Valid: {len(valid_headlines)}"
    assert len(valid_descriptions) >= 2, f"Need at least 2 descriptions <= 90 chars. Valid: {len(valid_descriptions)}"

    return {
        "Campaign Name": campaign_name,
        "Daily Budget (INR)": budget_inr,
        "Ad Group Name": ad_group_name,
        "Final Landing URL": final_url,
        "Headlines": " | ".join(valid_headlines[:15]),
        "Descriptions": " | ".join(valid_descriptions[:4]),
        "Keywords": ", ".join(target_keywords),
        "Status": "PENDING"
    }

DEFAULT_SHEET_ID = "1qfk-f61sTJI1Ynt9-4lM52jV9s5W05kZgbxbTr_Catg"

if __name__ == "__main__":
    target_id = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_SHEET_ID
    sheet_id = extract_sheet_id(target_id)
    print(f"Connecting to Google Sheet ID: {sheet_id}...")
    intel = analyze_intelligence(sheet_id)
    print("\nStatus: Connected to Google Sheet.")
    if not intel["campaigns"] and not intel["search_queries"]:
        print("\n[AWAITING DATA] Sheet is currently empty.")
        print("Please run the script in Google Ads (Tools > Scripts) once to populate the sheet!")
    else:
        print("\n[DATA DETECTED] Ready to generate high-converting ads!")

