"""
Autonomous Google Ads Direct REST API Client
-------------------------------------------
Direct communication with Google Ads API v17 using REST endpoints.
No complex heavy client libraries needed.
"""

import os
import json
import urllib.parse
import urllib.request
import sys

def load_env(env_path: str = ".env") -> dict:
    env_vars = {}
    target_path = env_path
    if not os.path.exists(target_path):
        # Fallback to file directory or parent
        script_dir = os.path.dirname(os.path.abspath(__file__))
        alt_path = os.path.join(script_dir, ".env")
        if os.path.exists(alt_path):
            target_path = alt_path
        else:
            parent_alt = os.path.join(script_dir, "..", ".env")
            if os.path.exists(parent_alt):
                target_path = parent_alt

    if os.path.exists(target_path):
        with open(target_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    env_vars[k.strip()] = v.strip()
    return env_vars

class GoogleAdsDirectAPI:
    def __init__(self, env_path: str = ".env"):
        self.config = load_env(env_path)
        self.dev_token = self.config.get("GOOGLE_ADS_DEVELOPER_TOKEN")
        self.client_id = self.config.get("GOOGLE_ADS_CLIENT_ID")
        self.client_secret = self.config.get("GOOGLE_ADS_CLIENT_SECRET")
        self.refresh_token = self.config.get("GOOGLE_ADS_REFRESH_TOKEN")
        self.customer_id = self.config.get("GOOGLE_ADS_CUSTOMER_ID", "7183123393").replace("-", "")
        self.login_customer_id = self.config.get("GOOGLE_ADS_LOGIN_CUSTOMER_ID", "").replace("-", "")
        self.login_cid = self.login_customer_id
        self.access_token = None

    def refresh_access_token(self) -> str:
        """Exchanges the refresh token for a short-lived access token."""
        if not all([self.client_id, self.client_secret, self.refresh_token]):
            raise ValueError("Missing client_id, client_secret, or refresh_token in .env")

        payload = urllib.parse.urlencode({
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "refresh_token": self.refresh_token,
            "grant_type": "refresh_token"
        }).encode("utf-8")

        req = urllib.request.Request(
            "https://oauth2.googleapis.com/token",
            data=payload,
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                self.access_token = data.get("access_token")
                return self.access_token
        except urllib.error.HTTPError as e:
            err_msg = e.read().decode("utf-8")
            print(f"[OAUTH ERROR] ({e.code}): {err_msg}")
            if "invalid_grant" in err_msg:
                print("[NOTE] OAuth Refresh Token has expired or been revoked. Run generate_refresh_token.py to re-authenticate.")
            raise

    def _get_headers(self) -> dict:
        if not self.access_token:
            self.refresh_access_token()
        headers = {
            "Authorization": f"Bearer {self.access_token}",
            "developer-token": self.dev_token,
            "Content-Type": "application/json"
        }
        if self.login_customer_id:
            headers["login-customer-id"] = self.login_customer_id
        return headers

    def query(self, gaql: str) -> list[dict]:
        """Runs a Google Ads Query Language (GAQL) query via searchStream."""
        url = f"https://googleads.googleapis.com/v23/customers/{self.customer_id}/googleAds:searchStream"
        payload = json.dumps({"query": gaql}).encode("utf-8")
        req = urllib.request.Request(url, data=payload, headers=self._get_headers())
        try:
            with urllib.request.urlopen(req) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                results = []
                for batch in data:
                    results.extend(batch.get("results", []))
                return results
        except urllib.error.HTTPError as e:
            err_msg = e.read().decode("utf-8")
            print(f"API Error ({e.code}): {err_msg}")
            raise

    def get_campaign_performance(self):
        """Fetches live campaign stats directly from Google Ads API."""
        query = """
            SELECT 
                campaign.id, 
                campaign.name, 
                campaign.status, 
                campaign_budget.amount_micros,
                metrics.clicks, 
                metrics.impressions, 
                metrics.cost_micros, 
                metrics.average_cpc, 
                metrics.conversions
            FROM campaign 
            WHERE campaign.status IN ('ENABLED', 'PAUSED')
        """
        return self.query(query)

if __name__ == "__main__":
    api = GoogleAdsDirectAPI()
    try:
        print(f"Connecting to Google Ads Account: {api.customer_id} via direct API...")
        results = api.get_campaign_performance()
        print(f"Successfully retrieved {len(results)} campaigns!")
        for r in results:
            c = r.get("campaign", {})
            m = r.get("metrics", {})
            cost = int(m.get("costMicros", 0)) / 1_000_000
            print(f"- {c.get('name')} | Status: {c.get('status')} | Clicks: {m.get('clicks')} | Spend: ₹{cost:.2f}")
    except Exception as e:
        print(f"Direct API check note: {e}")
