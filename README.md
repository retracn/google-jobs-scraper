# Google Jobs Scraper & API: jobs, salaries and apply links

[![AgentHub 已收录：Google Jobs (via Apify)](https://myagenthub.cn/badge/io.github.retracn/google-jobs)](https://myagenthub.cn/p/io.github.retracn/google-jobs)
[![Run on Apify](https://img.shields.io/badge/Run%20on-Apify-0b57d0)](https://apify.com/automationnation/google-jobs-scraper)

Google Jobs Scraper is an Apify Actor that extracts job listings from Google Jobs (Google for Jobs) for any search and location — with the full description, parsed salary, highlights and direct apply links — at $2 per 1,000 jobs. It works as a Google Jobs API: call it from code, schedule it for daily job alerts, or let AI agents use it through Apify's MCP server.

**Price:** $2 per 1,000 jobs ($1.50 on paid plans) + $0.03 per search · **Run it:** [https://apify.com/automationnation/google-jobs-scraper](https://apify.com/automationnation/google-jobs-scraper) · **Guide:** [https://retracn.github.io/automationnation-actors/google-jobs-scraper/](https://retracn.github.io/automationnation-actors/google-jobs-scraper/)

## Quick facts

- One row per job: title, company, company website, location, remote flag, salary (min / max / currency / period + yearly), posted date, job type, full description, highlights and every apply link (employer's own site first).
- Price: $2 per 1,000 jobs ($1.50 on paid plans) + $0.03 per search; Apify's free $5 monthly credit covers about 2,000 jobs.
- Filters for date posted, employment type and remote only — re-checked on every job; non-matching jobs are free.
- "Only new jobs" mode returns just new postings on scheduled runs (daily job alerts).
- 26 countries: United States, United Kingdom, Canada, India, Germany, Switzerland, Spain, Italy, Mexico, Brazil, Argentina, Colombia, Peru, Japan, Hong Kong, Singapore, UAE, Saudi Arabia, Qatar, Egypt, South Africa, Nigeria, Ghana, Philippines, Malaysia and Pakistan — dates, salaries and job types parsed in local languages.
- About a minute for a 100-job search; blocked searches are retried with fresh residential IPs and never charged.

## Example input

```json
{
  "queries": [
    "software engineer"
  ],
  "location": "New York",
  "country": "us",
  "maxJobsPerQuery": 50
}
```

## Run it from code

**REST API**

```bash
curl -X POST "https://api.apify.com/v2/acts/automationnation~google-jobs-scraper/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"queries": ["software engineer"], "location": "New York", "country": "us", "maxJobsPerQuery": 50}'
```

**Python** — see [`examples/python_example.py`](examples/python_example.py)

```python
# pip install apify-client
from apify_client import ApifyClient

client = ApifyClient("YOUR_APIFY_TOKEN")
run = client.actor("automationnation/google-jobs-scraper").call(run_input={
  "queries": [
    "software engineer"
  ],
  "location": "New York",
  "country": "us",
  "maxJobsPerQuery": 50
})
for item in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(item.get("title"), item.get("companyName"), item.get("salaryText"), item.get("applyUrl"))
```

**JavaScript** — see [`examples/node_example.mjs`](examples/node_example.mjs)

```js
// npm install apify-client
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: 'YOUR_APIFY_TOKEN' });
const run = await client.actor('automationnation/google-jobs-scraper').call({
  "queries": [
    "software engineer"
  ],
  "location": "New York",
  "country": "us",
  "maxJobsPerQuery": 50
});
const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const item of items) console.log(item.title, item.companyName, item.salaryText, item.applyUrl);
```

## Use it with AI agents (MCP)

Hosted MCP server URL (Claude, ChatGPT, Cursor and other clients with remote MCP support):

```
https://mcp.apify.com?tools=automationnation/google-jobs-scraper
```

Local config for Claude Desktop / Cursor — [`mcp/claude_desktop_config.json`](mcp/claude_desktop_config.json):

```json
{
  "mcpServers": {
    "google-jobs-scraper": {
      "command": "npx",
      "args": [
        "-y",
        "@apify/actors-mcp-server",
        "--tools",
        "automationnation/google-jobs-scraper"
      ],
      "env": {
        "APIFY_TOKEN": "YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

## FAQ

**Is there an official Google Jobs API?**
No. Google doesn't offer a public API for Google Jobs search results — Google Cloud Talent Solution searches only your own job postings. Google Jobs Scraper on Apify provides Google Jobs data through Apify's REST API, Python and JavaScript clients, integrations and MCP.

**What's the best Google Jobs scraper?**
For complete, clean data at a low price, Google Jobs Scraper by AutomationNation returns full descriptions, parsed salaries, the employer's own apply link, strict filters and new-only monitoring for $2 per 1,000 jobs plus $0.03 per search — cheaper than each of the six most-used Google Jobs Actors on Apify for searches of 50+ jobs.

**Can I scrape Google Jobs for free?**
Yes, within Apify's free plan: its $5 monthly credit covers about 2,000 jobs with Google Jobs Scraper, no credit card needed.

**How do I get daily job alerts from Google Jobs?**
Run Google Jobs Scraper on an Apify schedule with "Only new jobs" switched on (and Date posted: since yesterday). Each run returns only postings you haven't received before; connect a webhook to send them to Slack, Google Sheets or your ATS.

**Which countries does Google Jobs Scraper support?**
It was verified in 26 countries: United States, United Kingdom, Canada, India, Germany, Switzerland, Spain, Italy, Mexico, Brazil, Argentina, Colombia, Peru, Japan, Hong Kong, Singapore, UAE, Saudi Arabia, Qatar, Egypt, South Africa, Nigeria, Ghana, Philippines, Malaysia and Pakistan. Google doesn't offer Google Jobs in Australia, New Zealand, Austria, the Netherlands, Portugal or most other European countries.

## More from AutomationNation

- [AI Visibility Tracker](https://apify.com/automationnation/ai-visibility-tracker) — $0.05 per answer checked ($0.04 on Gold) + $0.50 per optional report · [GitHub examples](https://github.com/retracn/ai-visibility-tracker)
- [Google Trends Scraper](https://apify.com/automationnation/google-trends-scraper) — $1 per 1,000 keyword reports ($0.27–$0.90 on paid plans) · $0.50 per 1,000 trending searches · [GitHub examples](https://github.com/retracn/google-trends-scraper)
- [App Store Reviews Scraper](https://apify.com/automationnation/app-store-reviews-scraper) — $0.08 per 1,000 reviews ($0.05–$0.07 on paid plans) · [GitHub examples](https://github.com/retracn/app-store-reviews-scraper)
- [Google Play Reviews Scraper](https://apify.com/automationnation/google-play-reviews-scraper) — $0.08 per 1,000 reviews ($0.05–$0.07 on paid plans) · [GitHub examples](https://github.com/retracn/google-play-reviews-scraper)
- [AEO & GEO Tracker — Google AI Overview Citation Checker](https://apify.com/automationnation/aeo-auditor) — $0.04 per keyword ($0.032 on Gold), plus $2 per run from 17 Nov 2026; $0.01 per keyword until 16 Oct 2026 · [GitHub examples](https://github.com/retracn/google-ai-overview-tracker)
- [Google Maps Leads Scraper](https://apify.com/automationnation/google-maps-leads) — $0.03 per lead ($0.024 on Gold) · [GitHub examples](https://github.com/retracn/google-maps-leads-scraper)
- [Google Maps Leads Scraper UK](https://apify.com/automationnation/uk-business-leads) — $0.05 per lead ($0.04 on Gold) · [GitHub examples](https://github.com/retracn/uk-business-leads-google-maps)
- [App Store & Google Play Reviews Scraper + AI](https://apify.com/automationnation/app-store-review-miner) — $0.05 per app report ($0.04 on Gold) · [GitHub examples](https://github.com/retracn/app-store-google-play-reviews-ai)
- [UK Companies House Leads — Filing Signals & AI Outreach](https://apify.com/automationnation/companies-house-leads) — $0.008 per lead
- [Contact Waterfall Enrichment — Emails & Directors](https://apify.com/automationnation/contact-waterfall-enrichment) — $0.015 per company
- [All Actors and guides](https://retracn.github.io/automationnation-actors/) · [AI visibility trackers compared](https://retracn.github.io/automationnation-actors/compare/ai-visibility-trackers/) · [Google Jobs scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-jobs-scrapers/) · [Google Trends scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-trends-scrapers/) · [App Store review scrapers compared](https://retracn.github.io/automationnation-actors/compare/app-store-review-scrapers/) · [Google Play review scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-play-review-scrapers/)

---

This repository holds usage examples. The scraper itself runs on the [Apify platform](https://apify.com/automationnation/google-jobs-scraper); you need a free Apify account and API token. Examples are MIT licensed.
