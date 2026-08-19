#!/usr/bin/env python3
import json, os, re
from xml.sax.saxutils import escape
SITE_URL=os.environ.get("ARGAMES_SITE_URL","https://arcrazygames.site").rstrip("/")
with open("games.json",encoding="utf-8") as f: games=json.load(f)
def slug(s): return re.sub(r"[^a-z0-9]+","-",str(s or "").lower()).strip("-") or "category"
urls=[SITE_URL+"/"]
for name in os.listdir("categories"):
    if name.endswith(".html"): urls.append(SITE_URL+"/categories/"+name)
for g in games:
    urls.append(SITE_URL+"/game/game.html?id="+str(g["id"]))
with open("sitemap.xml","w",encoding="utf-8") as f:
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
    for u in urls: f.write("<url><loc>"+escape(u)+"</loc></url>\n")
    f.write("</urlset>\n")
with open("robots.txt","w",encoding="utf-8") as f:
    f.write("User-agent: *\nAllow: /\nSitemap: "+SITE_URL+"/sitemap.xml\n")
print("Generated",len(urls),"URLs")
