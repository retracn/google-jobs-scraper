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
