// Submit URLs to IndexNow (Bing, Yandex, Seznam, Naver… share submissions).
// Usage:
//   node scripts/indexnow.mjs                 -> every URL in the live sitemap
//   node scripts/indexnow.mjs /products/x ... -> only these paths/URLs
// Run after a deploy is live. The key file is public/<KEY>.txt.
const HOST = "www.decobesthome.com";
const BASE = `https://${HOST}`;
const KEY = "c16b9cc70e58c66da364daf8f5aa1c9b";

async function sitemapUrls() {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  return [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>|href="([^"]+)"/g)].map((m) => m[1] || m[2]))].filter(
    (u) => u.startsWith(BASE),
  );
}

const args = process.argv.slice(2);
const urls = args.length ? args.map((a) => (a.startsWith("http") ? a : BASE + a)) : await sitemapUrls();

for (let i = 0; i < urls.length; i += 10000) {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${BASE}/${KEY}.txt`, urlList: urls.slice(i, i + 10000) }),
  });
  console.log(`IndexNow: ${urls.slice(i, i + 10000).length} URLs -> HTTP ${res.status} ${res.statusText}`);
}
