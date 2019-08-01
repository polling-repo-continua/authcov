class Config {
  constructor() {
    this.users = [
      {username: 'alice@authcov.io', password: 'password'}
    ];
    this.intruders = [
      {username: 'Public', password: null}
    ];
    this.authorisationHeaders = ['cookie'];
    this.baseUrl = 'http://localhost:3001';
    this.saveResponses = false;
    this.buttonXPath = 'button';
    this.type = 'mpa';  // mpa or spa
    this.authenticationType = 'cookie'; // cookie or token
  }

  async loginFunction(tab, username, password){
    console.log(`Logging in as ${username}...`);
    await tab.goto('http://localhost:3001/users/sign_in');
    await tab.waitForSelector('input[type=email]');
    await tab.waitForSelector('input[type=password]');

    await tab.type('input[type=email]', username);
    await tab.type('input[type=password]', password);

    await tab.tap('input[type=submit]');
    await tab.waitFor(500);

    return;
  }

  responseIsAuthorised(response) {
    return (response.status() != 401);
  }

  ignoreLink(url) {
    if(url.includes('/users/sign_out')) {
      console.log(`Ignoring link: ${url}`);
      return true;
    }

    return false;
  }

  ignoreApiRequest(url, method) {
    if(url.includes('http://localhost:3001/sockjs-node')){
      return true;
    }

    return false;
  }

  ignoreButton(outerHTML) {
    if(outerHTML.includes('Logout') || outerHTML.includes('submit') || outerHTML.includes('Save')) {
      return true;
    }

    return false;
  }

  //TODO: Add authorised checking function here
}

module.exports = Config;
