#!/usr/bin/env python3
"""Upload all images from ~/Downloads/AJ BHAI to Impact Property Media portfolio."""
import os, sys, time, mimetypes, json
from pathlib import Path
import urllib.request, urllib.error

SUPABASE_URL = "https://wrplkntsqjasfiyhuscl.supabase.co"
SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndycGxrbnRzcWphc2ZpeWh1c2NsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjMxOTUxMCwiZXhwIjoyMDkxODk1NTEwfQ.snRDDL8t0RmOPggRB0VvIHsDVsesqxnaA1yEuNynuiY"
FOLDER = Path.home() / "Downloads" / "AJ BHAI"
BUCKET = "portfolio-images"
CATEGORY = "photography"

HEADERS = {
    "apikey": SERVICE_KEY,
    "Authorization": f"Bearer {SERVICE_KEY}",
}

def supabase_request(method, path, data=None, headers=None, raw_body=None, content_type=None):
    url = f"{SUPABASE_URL}{path}"
    h = {**HEADERS}
    if headers:
        h.update(headers)
    if content_type:
        h["Content-Type"] = content_type
    body = raw_body if raw_body is not None else (json.dumps(data).encode() if data else None)
    if data and not content_type:
        h["Content-Type"] = "application/json"
    req = urllib.request.Request(url, data=body, headers=h, method=method)
    try:
        with urllib.request.urlopen(req) as r:
            body = r.read()
            return json.loads(body) if body.strip() else {}
    except urllib.error.HTTPError as e:
        print(f"  HTTP {e.code}: {e.read().decode()}")
        return None

images = []
for ext in ["*.jpg","*.jpeg","*.png","*.JPG","*.JPEG","*.PNG"]:
    images.extend(FOLDER.glob(ext))
images = sorted(set(images))

if not images:
    print(f"No images in {FOLDER}")
    sys.exit(1)

# get current count for display_order
res = supabase_request("GET", "/rest/v1/portfolio_items?select=id")
base_order = len(res) if res else 0

print(f"Found {len(images)} images. Uploading...\n")

for i, img_path in enumerate(images):
    title = img_path.stem.replace("_", " ").replace("-", " ").title()
    storage_path = f"{int(time.time()*1000)}-{img_path.name.replace(' ', '_')}"
    mime = mimetypes.guess_type(img_path)[0] or "image/jpeg"

    print(f"[{i+1}/{len(images)}] {img_path.name}")

    with open(img_path, "rb") as f:
        raw = f.read()

    # Upload to storage
    up = supabase_request(
        "POST",
        f"/storage/v1/object/{BUCKET}/{storage_path}",
        raw_body=raw,
        content_type=mime,
    )

    public_url = f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET}/{storage_path}"

    # Insert DB record
    db = supabase_request("POST", "/rest/v1/portfolio_items", data={
        "title": title,
        "category": CATEGORY,
        "featured": False,
        "display_order": base_order + i,
        "image_url": public_url,
    }, headers={"Prefer": "return=minimal"})

    print(f"  ✓ {public_url[:70]}...")
    time.sleep(0.2)

print(f"\nDone! {len(images)} images uploaded.")
