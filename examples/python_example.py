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
