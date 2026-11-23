import urllib.request
import csv
import io
import json

SHEET_ID = "1qfk-f61sTJI1Ynt9-4lM52jV9s5W05kZgbxbTr_Catg"

def fetch_tab(name):
    url = f"https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:csv&sheet={urllib.parse.quote(name)}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req) as resp:
            content = resp.read().decode("utf-8")
            return list(csv.DictReader(io.StringIO(content)))
    except Exception as e:
        return []

def main():
    print("=== PULLING FULL GOOGLE SHEET DATA ===")
    tabs = ["Campaigns_Data", "Keywords_Data", "Search_Queries", "Ad_Launch_Queue", "Negative_Keywords_Queue", "Daily_Optimization_Log"]
    data = {}
    for t in tabs:
        rows = fetch_tab(t)
        data[t] = rows
        print(f"Tab '{t}': {len(rows)} rows")

    # Analyze Campaigns
    camps = data.get("Campaigns_Data", [])
    print("\n--- CAMPAIGNS SUMMARY ---")
    total_spend = 0.0
    total_clicks = 0
    total_impressions = 0
    total_conversions = 0.0

    for c in camps:
        name = c.get("Campaign Name")
        status = c.get("Status")
        budget = float(c.get("Daily Budget (INR)", 0) or 0)
        clicks = int(c.get("Clicks", 0) or 0)
        impr = int(c.get("Impressions", 0) or 0)
        cost = float(c.get("Cost", 0) or 0)
        avg_cpc = float(c.get("Avg CPC", 0) or 0)
        conv = float(c.get("Conversions", 0) or 0)

        ctr = (clicks / impr * 100) if impr > 0 else 0
        cost_per_conv = (cost / conv) if conv > 0 else 0

        total_spend += cost
        total_clicks += clicks
        total_impressions += impr
        total_conversions += conv

        print(f"Campaign: {name} [{status}]")
        print(f"  Spend: INR {cost:,.2f}")
        print(f"  Impressions: {impr:,}")
        print(f"  Clicks: {clicks:,} | CTR: {ctr:.2f}%")
        print(f"  Average CPC: INR {avg_cpc:.2f}")
        print(f"  Conversions (Calls/Inquiries): {conv:.1f}")
        print(f"  Cost per Conversion: INR {cost_per_conv:.2f}")
        print("-" * 40)

    overall_ctr = (total_clicks / total_impressions * 100) if total_impressions > 0 else 0
    overall_cpc = (total_spend / total_clicks) if total_clicks > 0 else 0
    overall_cpa = (total_spend / total_conversions) if total_conversions > 0 else 0

    print("\n--- OVERALL TOTALS ---")
    print(f"Total Amount Spent: INR {total_spend:,.2f}")
    print(f"Total Impressions: {total_impressions:,}")
    print(f"Total Clicks Delivered: {total_clicks:,} (Overall CTR: {overall_ctr:.2f}%)")
    print(f"Overall Average CPC: INR {overall_cpc:.2f}")
    print(f"Total Conversions Recorded: {total_conversions:.1f}")
    print(f"Overall Cost per Patient Conversion: INR {overall_cpa:.2f}")

    # Inspect Daily Optimization Logs
    logs = data.get("Daily_Optimization_Log", [])
    print(f"\n--- DAILY OPTIMIZATION LOGS ({len(logs)} entries) ---")
    if logs:
        print("Latest log entry keys:", list(logs[0].keys()))
        print("Sample recent log entry:", logs[-1])

    # Inspect Negative Keywords
    negs = data.get("Negative_Keywords_Queue", [])
    print(f"\n--- NEGATIVE KEYWORDS QUEUE ({len(negs)} entries) ---")
    unique_negs = set(n.get("Negative Keyword") for n in negs if n.get("Negative Keyword"))
    print(f"Unique blocked negative keywords: {len(unique_negs)}")
    print(f"List: {unique_negs}")

if __name__ == "__main__":
    main()

