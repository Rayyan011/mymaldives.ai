/**
 * Scraper for hummingbird.travel resort data.
 *
 * Data was scraped from individual resort pages at:
 *   https://hummingbird.travel/property/{resort-slug}
 *
 * Note: The main listing page uses Algolia for client-side rendering,
 * so resort data must be fetched from individual property pages.
 *
 * 26 of 28 resorts were scraped from hummingbird.travel.
 * 2 resorts (Sun Island, OBLU Helengeli) were not found on the site
 * and were manually curated.
 *
 * The scraped data is stored in worker/seed.sql.
 *
 * To re-seed the local D1 database:
 *   cd worker
 *   npx wrangler d1 execute mymaldives-db --local --command="DELETE FROM resorts;"
 *   npx wrangler d1 execute mymaldives-db --local --file=./seed.sql
 */

console.log('Resort data has been scraped and stored in worker/seed.sql');
console.log('28 resorts total (26 from hummingbird.travel, 2 manually curated)');
console.log('');
console.log('To re-seed the local D1 database:');
console.log('  cd worker');
console.log('  npx wrangler d1 execute mymaldives-db --local --command="DELETE FROM resorts;"');
console.log('  npx wrangler d1 execute mymaldives-db --local --file=./seed.sql');
