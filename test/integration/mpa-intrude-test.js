const { expect } = require('chai');
const fs = require('fs');

const UsersIntruder = require('../../lib/intruder/users-intruder.js');
const ApiEndpointData = require('../../lib/data/api-endpoint-data.js');
const config = require('./example-mpa-config.js');
const CompareFiles = require('../utils/compare_files.js');

// TODO: Make this tell you which apirequest is failing if it fails
describe('UsersCrawler for MPA with cookie-based auth', () => {
  describe('./tmp/api_endpoints.json', () => {
    it('should save apiRequests for users: Public, evanrolfe@gmail.com, evanrolfe@onescan.io', async () => {
      fs.copyFileSync('./test/integration/expected_output/mpa_cookie_api_endpoints.json', './tmp/api_endpoints.json', (err) => {
        if (err) throw err;
      });

      const apiEndpointData = new ApiEndpointData({config: config});
      apiEndpointData.loadFile('./tmp/api_endpoints.json');
      const usersIntruder = new UsersIntruder(config, apiEndpointData);

      await usersIntruder.start();
      CompareFiles.compareApiEndpointsFiles('./tmp/api_endpoints.json', './test/integration/expected_output/mpa_cookie_api_endpoints_after_intrusion.json');
    });
  });
});
