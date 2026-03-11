/**
 * One-time scraper for hummingbird.travel resort data.
 * Run with: npx tsx scripts/scrape.ts
 *
 * For now, resort data is manually curated in worker/seed.sql.
 * This script can be expanded later to scrape and update the data.
 */

console.log('Resort data is currently maintained in worker/seed.sql');
console.log('To seed the local D1 database, run:');
console.log('  cd worker && npx wrangler d1 execute mymaldives-db --local --file=./seed.sql');
