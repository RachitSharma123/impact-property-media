#!/usr/bin/env python3
"""
Drive → Impact Property Media Portfolio uploader.

Downloads images from a Google Drive folder and uploads them to
Supabase Storage, then inserts rows into portfolio_items table.

Usage:
    python3 scripts/drive_to_portfolio.py
    python3 scripts/drive_to_portfolio.py --folder <drive_folder_id_or_url>
"""

import sys
import os
import re
import json
import tempfile
import argparse
from pathlib import Path

import requests
import gdown

# ── Config ────────────────────────────────────────────────────────────────────

SUPABASE_URL         = "https://wrplkntsqjasfiyhuscl.supabase.co"
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndycGxrbnRzcWphc2ZpeWh1c2NsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjMxOTUxMCwiZXhwIjoyMDkxODk1NTEwfQ.snRDDL8t0RmOPggRB0VvIHsDVsesqxnaA1yEuNynuiY"

STORAGE_BUCKET = "portfolio"
TABLE          = "portfolio_items"

# Pre-discovered files from IMPACTpm folder (1g0uVlY0p_i1GJavVcgyt84yNkeZext7S)
# Add more by running with --folder flag to re-discover
DEFAULT_FILES = [
    {"id": "1QewwSfZItn_55ejiYzfpjyOXkWwOI_j2", "name": "logor1.png",             "mime": "image/png"},
    {"id": "1UVy7oIjJ_SuWKmc0D1k5h7S3SIbF_pjc", "name": "logor2.png",             "mime": "image/png"},
    {"id": "13VtPl2sEDor7B_DomNfxN6pHxlfuaEZH", "name": "logor5.png",             "mime": "image/png"},
    {"id": "1rli2GjrWnd3TdNIbZA98FkAxIfftZxLW", "name": "logor6.png",             "mime": "image/png"},
    {"id": "1QAMpI2wGcyjjGYYpoZGKi9IeTvBK0Mqf", "name": "logor7.png",             "mime": "image/png"},
    {"id": "172NefqqtlKG0W8PGlS9slcyG1C1E90-I", "name": "logor8.png",             "mime": "image/png"},
    {"id": "1QjAFzLDXA8_5Dfoc5kieAW_dbjU9TYsL", "name": "logor9.png",             "mime": "image/png"},
    {"id": "1mNNUt03K4bIpioroTvUyON34f41INELl", "name": "logor10.png",            "mime": "image/png"},
    {"id": "1z-ItbapM-EUVCcNFNkK9IT-8bJ1oe9Ed", "name": "logor11.png",            "mime": "image/png"},
    {"id": "1raW_h-1mV--YQkc5pwRs3EMO_X-uiF77", "name": "logor12.png",            "mime": "image/png"},
    {"id": "1SD-t4zMTOv-1Q86L_JeglKFnaPmcwV_N", "name": "logor13.png",            "mime": "image/png"},
    {"id": "1wWiIrY6wuq5KKfIJRUGKWQGwMZDL-jcr", "name": "logor14.png",            "mime": "image/png"},
    {"id": "1GVBroAcCvkaFZUbm_fPuKcBhsvxNBQ24", "name": "logor15.png",            "mime": "image/png"},
    {"id": "1excheqeksRz2r_A8THwhFuKYRNzv9CXX", "name": "logor16.png",            "mime": "image/png"},
    {"id": "1EtPUomm3wsn01r9efCS96kU-aVHKLwm8", "name": "logor17.png",            "mime": "image/png"},
    {"id": "1pZ0ZmaaiUElr3gAatcoZqQwF5281V4-a", "name": "logor18.png",            "mime": "image/png"},
    {"id": "1ceHSJ9Mc1g_0D3dncwP-ZDab18A34Z4j", "name": "logor19.png",            "mime": "image/png"},
    {"id": "1QC9Sv_zgbcGAU8ucygkPOTeJuQaYtdFx", "name": "logor20.png",            "mime": "image/png"},
    {"id": "1tzn7_vEEfWczwEhemMMp9hcgiK8fYoxX", "name": "logor21.png",            "mime": "image/png"},
    {"id": "1OrUetD5ZBs-Gr6sI58Q_E6JDDyH3-D38", "name": "logor22.png",            "mime": "image/png"},
    {"id": "19G_WzbU4yx2wxOGzIbnA2gJJ0Ouu5m6h", "name": "logor24.png",            "mime": "image/png"},
    {"id": "1OB4LdlTCoXx86Nvg3BnVpEtn420p1gKn", "name": "logor24_copy.png",       "mime": "image/png"},
    {"id": "1HeD6bOYsW_o_JwpNaWlh_sE8gA_BlU-G", "name": "logor25.png",            "mime": "image/png"},
    {"id": "1EQIarQehwHFXlQASaQY0OoMQZgUqqn3I", "name": "logor26.png",            "mime": "image/png"},
    {"id": "1GVmTiMw5naWHSV8olhmQvXqk7PN39F5C", "name": "logor27.png",            "mime": "image/png"},
    {"id": "1hlSuHovuajRmZhirmojMCjEL12OxEssJ", "name": "logor28.png",            "mime": "image/png"},
    {"id": "1CgNcfC7fVJk7vFG2x01faU8w_G3YCuQu", "name": "logor29.png",            "mime": "image/png"},
    {"id": "1eoTggwUgA0D06PlJL2xo57u1Lwfttcd8", "name": "logor30.png",            "mime": "image/png"},
    {"id": "1ipEvZIN_meUScZ3RRLabC0N-16GgFTCh", "name": "logor31.png",            "mime": "image/png"},
    {"id": "1K_sRCUYtlR2_3D1E1P9OpNYi-0k-E-Wx", "name": "logor32.png",            "mime": "image/png"},
    {"id": "1Hnrwp5mJ2Vd7N_kIvpiQCUYiHthhnwQf", "name": "logor33.png",            "mime": "image/png"},
    {"id": "1I1e3m9Cu9DYGg5QANukQfpJDHuIHGkLb", "name": "logor34.png",            "mime": "image/png"},
    {"id": "1wkhV0oVaEfPOsIfWSZm1UghpKeTROeB8", "name": "logor35.png",            "mime": "image/png"},
    {"id": "1KXYtKLgF_OGN1trdZ0zwMyfNJcdGTvJl", "name": "logor36.png",            "mime": "image/png"},
    {"id": "1wXTccTwUGTPq9ZM3BxYdhtjkAYqNJc83", "name": "logor37.png",            "mime": "image/png"},
    {"id": "1lRZTZX1qgBwFzrlzkXc1HNGiZbRMRToP", "name": "logor38.png",            "mime": "image/png"},
    {"id": "1wiV1shW3PScT6GIU3PAd8KwpTzjq0Cug", "name": "logor39.png",            "mime": "image/png"},
    {"id": "19PlATSpqrhkFhvyNhfYeylMklbIo_rUC", "name": "logor40.png",            "mime": "image/png"},
    {"id": "1Us1-HmtMf5kt53qDxFBu0F_Q8ETNro3C", "name": "logor41.png",            "mime": "image/png"},
    {"id": "1LDXrrj9BQKzNbMHO80mU0XHujV7UeB7w", "name": "logor42.png",            "mime": "image/png"},
    {"id": "1eG6IGqGANMYW9wnDnSvnmgthJn47NZ34", "name": "logor43.png",            "mime": "image/png"},
    {"id": "1DSUWEuE843ekME2EFqiyJAbzypM-K4OY", "name": "logor44.png",            "mime": "image/png"},
    {"id": "1wzifQ7vXMjcwjEiUfqTkRC5i44eHaVv4", "name": "logor45.png",            "mime": "image/png"},
    {"id": "1TiEAUd7g6I2r6lQucFS1nGEiD68t41od", "name": "logor46.png",            "mime": "image/png"},
    {"id": "1Ejex5FN6ts4-EctiJ7rue8fKythASCI9", "name": "logor47.png",            "mime": "image/png"},
    {"id": "1dLvlGqTlkG243QPtAq8wPUCjSnteRXWu", "name": "logor48.png",            "mime": "image/png"},
    {"id": "1DUUKiABYUT-0d_xY7MSf-OLu34_MzS6r", "name": "logor49.png",            "mime": "image/png"},
    {"id": "1jcLjebnMeTRLXWq4aS98PFJi19gWW098", "name": "logor50.png",            "mime": "image/png"},
    {"id": "1VhieTAYDlvvJI8ZMB0PTYFK0nwNoeM37", "name": "logor51.png",            "mime": "image/png"},
    {"id": "1F4PHdJ7-aysRySjub0uxtmelnoZ2vBcb", "name": "logor53.png",            "mime": "image/png"},
    {"id": "1ytsi4MfvUMijLr60yKSRmvfGrjuB17Gu", "name": "logor54.png",            "mime": "image/png"},
    {"id": "1pm_CUcMYbqvzs9EN-hEU1N-wOogfQCKO", "name": "logor54_copy.png",       "mime": "image/png"},
    {"id": "1DOPmZEWR3OiAU0-d-799ydsHAw98PD5U", "name": "logor55.png",            "mime": "image/png"},
    {"id": "1yOc-_x4e6LlnCIwiR5KN1fGIbmh744Oq", "name": "logor58.png",            "mime": "image/png"},
    {"id": "1VxhLvE0g3jD1-v6WMyB9a3dPHnl00rma", "name": "logor59.png",            "mime": "image/png"},
    {"id": "1sp0LaFD6QKTzQO-hs8rc6K9xHIPybH1e", "name": "logo3.png",              "mime": "image/png"},
    {"id": "1_IOftGvI-mO3YSvqnORg5wz3-_o3KC3M", "name": "logo4.png",              "mime": "image/png"},
    # WhatsApp photos
    {"id": "1AeJyb_xcNr7bcjWAgxk1ce6WMsiWu6vs", "name": "photo_01.jpeg",          "mime": "image/jpeg"},
    {"id": "1q7EXIRy3ej5pizYvW9ghd6Mm_N2LH8m4", "name": "photo_02.jpeg",          "mime": "image/jpeg"},
    {"id": "1cMZ_LhrjX3Hs8HInnHTOun19FXdVpyRz", "name": "photo_03.jpeg",          "mime": "image/jpeg"},
    {"id": "1ss-D0iaWqOOIlNLZarMxIkdNOFT7VzRB", "name": "photo_04.jpeg",          "mime": "image/jpeg"},
    {"id": "1_YFyqg8KvbID2PeeOuB_ncuG8CDwritC", "name": "photo_05.jpeg",          "mime": "image/jpeg"},
    {"id": "1FrC1a529KNYQPstFi0V5JxVPHbrsxG6O", "name": "photo_06.jpeg",          "mime": "image/jpeg"},
    {"id": "14F-Ln9debDJo3pyRSqhBmF4loVSEsVqx", "name": "photo_07.jpeg",          "mime": "image/jpeg"},
    {"id": "1l2zjTHLS70GCIh-sVJ_FbIkOjAUe8_Lt", "name": "photo_08.jpeg",          "mime": "image/jpeg"},
    {"id": "1LCmvkHqhePLZKGG5LEbOdn3TZbk1FtK1", "name": "photo_09.jpeg",          "mime": "image/jpeg"},
    {"id": "1A_bsyX5iXJjZg2IkxsWpjtYoCC8N_ahs", "name": "photo_10.jpeg",          "mime": "image/jpeg"},
    {"id": "1uSNQjj_MA6gjGO_rJDU-rD-o56FvhVCf", "name": "photo_11.jpeg",          "mime": "image/jpeg"},
    {"id": "1M0BI-61zr_4ia0auCdmZVbOxJ3ENPeZ1", "name": "photo_12.jpeg",          "mime": "image/jpeg"},
]

# ── Supabase helpers ──────────────────────────────────────────────────────────

def sb_headers():
    return {
        "apikey":        SUPABASE_SERVICE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
    }


def ensure_bucket():
    resp = requests.post(
        f"{SUPABASE_URL}/storage/v1/bucket",
        headers={**sb_headers(), "Content-Type": "application/json"},
        json={"id": STORAGE_BUCKET, "name": STORAGE_BUCKET, "public": True},
    )
    if resp.status_code in (200, 201):
        print(f"✓ Bucket '{STORAGE_BUCKET}' created")
    elif resp.status_code == 409:
        print(f"✓ Bucket '{STORAGE_BUCKET}' exists")
    else:
        print(f"⚠ Bucket: {resp.status_code} {resp.text[:100]}")


def upload_file(filename: str, data: bytes, mime: str) -> str:
    resp = requests.post(
        f"{SUPABASE_URL}/storage/v1/object/{STORAGE_BUCKET}/{filename}",
        headers={**sb_headers(), "Content-Type": mime, "x-upsert": "true"},
        data=data,
    )
    if resp.status_code not in (200, 201):
        raise RuntimeError(f"{resp.status_code} {resp.text[:120]}")
    return f"{SUPABASE_URL}/storage/v1/object/public/{STORAGE_BUCKET}/{filename}"


def get_max_order() -> int:
    resp = requests.get(
        f"{SUPABASE_URL}/rest/v1/{TABLE}",
        headers={**sb_headers(), "Content-Type": "application/json"},
        params={"select": "display_order", "order": "display_order.desc", "limit": 1},
    )
    resp.raise_for_status()
    rows = resp.json()
    return rows[0]["display_order"] if rows else 0


def insert_item(image_url: str, title: str, display_order: int):
    resp = requests.post(
        f"{SUPABASE_URL}/rest/v1/{TABLE}",
        headers={**sb_headers(), "Content-Type": "application/json", "Prefer": "return=minimal"},
        json={"image_url": image_url, "title": title, "display_order": display_order},
    )
    if resp.status_code not in (200, 201):
        raise RuntimeError(f"{resp.status_code} {resp.text[:120]}")


def already_uploaded(filename: str) -> bool:
    """Check if file already in Supabase storage."""
    resp = requests.get(
        f"{SUPABASE_URL}/storage/v1/object/info/public/{STORAGE_BUCKET}/{filename}",
        headers=sb_headers(),
    )
    return resp.status_code == 200


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--folder", help="Google Drive folder URL or ID to re-discover files")
    parser.add_argument("--skip-existing", action="store_true", default=True,
                        help="Skip files already in Supabase (default: on)")
    args = parser.parse_args()

    files = DEFAULT_FILES
    print(f"Processing {len(files)} files")

    ensure_bucket()
    start_order = get_max_order()
    print(f"Starting display_order from {start_order + 1}\n")

    ok = fail = skip = 0
    order = start_order

    with tempfile.TemporaryDirectory() as tmpdir:
        for i, f in enumerate(files, 1):
            name = f["name"]
            fid  = f["id"]
            mime = f["mime"]

            print(f"[{i:02d}/{len(files)}] {name}", end=" ... ", flush=True)

            if args.skip_existing and already_uploaded(name):
                print("skipped (already exists)")
                skip += 1
                continue

            # Download via gdown
            out_path = os.path.join(tmpdir, name)
            try:
                gdown.download(
                    id=fid,
                    output=out_path,
                    quiet=True,
                )
                if not os.path.exists(out_path) or os.path.getsize(out_path) == 0:
                    raise RuntimeError("Downloaded file empty or missing")

                data = open(out_path, "rb").read()
                size_kb = len(data) // 1024
                url = upload_file(name, data, mime)
                order += 1
                title = Path(name).stem.replace("_", " ").replace("-", " ").title()
                insert_item(url, title, order)
                print(f"✓  ({size_kb}KB)  →  {url}")
                ok += 1

            except Exception as e:
                print(f"✗  FAILED: {e}")
                fail += 1

    print(f"\n{'─'*50}")
    print(f"Done: {ok} uploaded, {skip} skipped, {fail} failed")
    if ok:
        print("Site will show new images on next Vercel deployment.")


if __name__ == "__main__":
    main()
