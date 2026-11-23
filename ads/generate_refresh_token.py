"""
Lightweight Google Ads OAuth2 Refresh Token Generator
----------------------------------------------------
Automatically uses client_secret.json or .env.
"""

import http.server
import socketserver
import urllib.parse
import urllib.request
import json
import webbrowser
import sys
import os

PORT = 8080
REDIRECT_URI = f"http://localhost:{PORT}/"
AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
TOKEN_URL = "https://oauth2.googleapis.com/token"
SCOPE = "https://www.googleapis.com/auth/adwords"

auth_code = None

class OAuthCallbackHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        global auth_code
        query_components = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
        if "code" in query_components:
            auth_code = query_components["code"][0]
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(b"<html><body style='font-family:sans-serif;text-align:center;padding:50px;'>")
            self.wfile.write(b"<h2 style='color:#1a73e8;'>Authentication Successful!</h2><p>Your Google Ads Refresh Token has been generated. You can close this tab and return to VS Code.</p>")
            self.wfile.write(b"</body></html>")
        else:
            self.send_response(400)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(b"<html><body><h2>Authentication Cancelled or Failed</h2></body></html>")

    def log_message(self, format, *args):
        return

def run_flow():
    client_id = None
    client_secret = None

    # Try loading from client_secret.json
    if os.path.exists("client_secret.json"):
        with open("client_secret.json", "r", encoding="utf-8") as f:
            data = json.load(f)
            info = data.get("installed") or data.get("web") or {}
            client_id = info.get("client_id")
            client_secret = info.get("client_secret")

    # Fallback to .env
    if not client_id and os.path.exists(".env"):
        with open(".env", "r", encoding="utf-8") as f:
            for l in f:
                if l.startswith("GOOGLE_ADS_CLIENT_ID="):
                    client_id = l.split("=", 1)[1].strip()
                elif l.startswith("GOOGLE_ADS_CLIENT_SECRET="):
                    client_secret = l.split("=", 1)[1].strip()

    if not client_id or not client_secret:
        print("Error: Could not find client_id or client_secret in client_secret.json or .env.")
        sys.exit(1)

    params = {
        "client_id": client_id,
        "redirect_uri": REDIRECT_URI,
        "response_type": "code",
        "scope": SCOPE,
        "access_type": "offline",
        "prompt": "consent"
    }
    login_url = f"{AUTH_URL}?{urllib.parse.urlencode(params)}"

    print("=" * 65)
    print("STEP: GENERATING GOOGLE ADS REFRESH TOKEN")
    print("=" * 65)
    print(f"\n1. Click or open this authorization URL in your browser:\n\n{login_url}\n")
    webbrowser.open(login_url)

    print(f"2. Waiting for your Google login callback on {REDIRECT_URI}...")
    with socketserver.TCPServer(("localhost", PORT), OAuthCallbackHandler) as httpd:
        while auth_code is None:
            httpd.handle_request()

    print("\nAuthorization code received! Requesting Refresh Token from Google...")

    token_payload = urllib.parse.urlencode({
        "code": auth_code,
        "client_id": client_id,
        "client_secret": client_secret,
        "redirect_uri": REDIRECT_URI,
        "grant_type": "authorization_code"
    }).encode("utf-8")

    req = urllib.request.Request(TOKEN_URL, data=token_payload, headers={
        "Content-Type": "application/x-www-form-urlencoded"
    })

    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            refresh_token = data.get("refresh_token")

            if not refresh_token:
                print("\n[WARNING] No refresh_token returned. Response:", data)
                return

            print("\n" + "=" * 65)
            print("SUCCESS! Refresh Token obtained.")
            print("=" * 65)

            # Update .env
            env_file = ".env"
            lines = []
            if os.path.exists(env_file):
                with open(env_file, "r", encoding="utf-8") as f:
                    lines = [l for l in f.readlines() if not l.startswith("GOOGLE_ADS_REFRESH_TOKEN=")]
            lines.append(f"GOOGLE_ADS_REFRESH_TOKEN={refresh_token}\n")
            with open(env_file, "w", encoding="utf-8") as f:
                f.writelines(lines)
            print(f"[OK] Saved GOOGLE_ADS_REFRESH_TOKEN into {env_file} successfully!")

    except urllib.error.HTTPError as e:
        print(f"\n[ERROR] Failed to exchange token: {e.read().decode('utf-8')}")

if __name__ == "__main__":
    run_flow()
