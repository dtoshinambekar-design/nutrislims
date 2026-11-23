"""
Upload website files to GitHub repository using GitHub REST API v3
and automatically enable GitHub Pages.
"""
import os
import sys
import base64
import json
import urllib.request
import urllib.error

REPO_OWNER = "dtoshinambekar-design"
REPO_NAME = "nutrislims"
BASE_DIR = r"D:\vs code\antigravity"

FILES_TO_UPLOAD = [
    "index.html",
    "styles.css",
    "app.js",
    "assets/dietician_portrait.png",
    "assets/hero_banner.png"
]

def make_github_request(url, method="GET", token=None, data=None):
    headers = {
        "User-Agent": "Antigravity-Clinic-Deployer",
        "Accept": "application/vnd.github.v3+json"
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
    
    payload = json.dumps(data).encode("utf-8") if data else None
    req = urllib.request.Request(url, data=payload, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as resp:
            content = resp.read().decode("utf-8")
            return json.loads(content) if content else {}
    except urllib.error.HTTPError as e:
        err_msg = e.read().decode("utf-8")
        return {"error": e.code, "message": err_msg}
    except Exception as e:
        return {"error": 500, "message": str(e)}

def upload_file(rel_path, token):
    full_path = os.path.join(BASE_DIR, rel_path.replace("/", os.sep))
    if not os.path.exists(full_path):
        print(f"[-] File not found: {full_path}")
        return False
    
    with open(full_path, "rb") as f:
        file_bytes = f.read()
    b64_content = base64.b64encode(file_bytes).decode("utf-8")
    
    # Check if file already exists to get SHA
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/contents/{rel_path}"
    existing = make_github_request(url, method="GET", token=token)
    sha = existing.get("sha") if isinstance(existing, dict) and "sha" in existing else None
    
    body = {
        "message": f"Upload {rel_path} for Nutrislims high-conversion clinic landing page",
        "content": b64_content,
        "branch": "main"
    }
    if sha:
        body["sha"] = sha
        
    put_res = make_github_request(url, method="PUT", token=token, data=body)
    if "error" in put_res:
        print(f"[-] Failed to upload {rel_path}: {put_res.get('message')}")
        return False
    else:
        print(f"[+] Successfully uploaded {rel_path}")
        return True

def enable_github_pages(token):
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/pages"
    body = {
        "source": {
            "branch": "main",
            "path": "/"
        }
    }
    res = make_github_request(url, method="POST", token=token, data=body)
    if "error" in res:
        # If already enabled, get details
        get_res = make_github_request(url, method="GET", token=token)
        print(f"[*] GitHub Pages status: {get_res}")
    else:
        print(f"[+] Successfully enabled GitHub Pages: {res.get('html_url')}")

def main():
    if len(sys.argv) < 2:
        print("Usage: python upload_via_github_api.py <GITHUB_PERSONAL_ACCESS_TOKEN>")
        sys.exit(1)
        
    token = sys.argv[1].strip()
    print(f"[*] Starting GitHub API upload for {REPO_OWNER}/{REPO_NAME}...")
    
    success_count = 0
    for file_rel in FILES_TO_UPLOAD:
        if upload_file(file_rel, token):
            success_count += 1
            
    print(f"\n[*] Uploaded {success_count}/{len(FILES_TO_UPLOAD)} files successfully.")
    
    if success_count > 0:
        print("[*] Configuring GitHub Pages via API...")
        enable_github_pages(token)

if __name__ == "__main__":
    main()
