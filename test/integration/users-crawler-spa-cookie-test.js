const { expect } = require('chai');

const UsersCrawler = require('../../lib/crawler/users-crawler.js'); // TODO: Sort out these requires
const ApiEndpointData = require('../../lib/data/api-endpoint-data.js');
const PageData = require('../../lib/data/page-data.js');
const ExampleConfig = require('../../examples/example-spa-config.js');
const CompareFiles = require('../utils/compare_files.js');

async function crawlUsers() {
  const webAppConfig = new ExampleConfig();
  const apiEndpointData = new ApiEndpointData({webAppConfig: webAppConfig});
  const pageData = new PageData({webAppConfig: webAppConfig});

  const usersCrawler = new UsersCrawler(webAppConfig, apiEndpointData, pageData);
  await usersCrawler.start();
}

// TODO: Make this tell you which apirequest is failing if it fails
describe('UsersCrawler for SPA with cookie-based auth', () => {
  describe('./tmp/api_endpoints.json', () => {
    it('should save apiRequests for users: Public, evanrolfe@gmail.com, evanrolfe@onescan.io', async () => {
      await crawlUsers();
      CompareFiles.compareApiEndpointsFiles('./tmp/api_endpoints.json', './test/integration/expected_output/spa_cookie_api_endpoints.json');
      CompareFiles.comparePagesFiles('./tmp/pages.json', './test/integration/expected_output/spa_cookie_pages.json');
    });
  });
});
