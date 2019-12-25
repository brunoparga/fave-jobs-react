/* eslint-disable func-names */
module.exports = {
  'Step one: check for favorite job present': function (browser) {
    browser
      .url('https://brunoparga.github.io/fave-jobs-react')
      .waitForElementVisible('body')
      .assert.titleContains('FaveJobs')
      .waitForElementVisible('.job__wrapper:first-child')
      // Test that the first card (which is a favorite from the internal API)
      // is labeled as a favorite
      .assert.containsText('.fave-button__text', 'Favorite job!');
  },

  'Step two: search for more jobs': function (browser) {
    browser
      // With a query that can be expected to retrieve results...
      .setValue('input', 'React')
      .click('button[type=submit]')
      .pause(2000)
      // ... we get the last one as a not-yet-favorite...
      .assert.containsText(
        '.job__wrapper:last-child .fave-button',
        'Add to favorites',
      )
      // ... click on it to turn it into a favorite...
      .click('.job__wrapper:last-child .fave-button')
      .assert.containsText(
        '.job__wrapper:last-child .fave-button',
        'Favorite job!',
      )
      // ... then undo it so our tests do not affect the app itself
      .click('.job__wrapper:last-child .fave-button')
      .assert.containsText(
        '.job__wrapper:last-child .fave-button',
        'Add to favorites',
      );
  },

  'Step three: visit the job details page': function (browser) {
    browser
      .click('.job__wrapper:last-child')
      .waitForElementVisible('.job--details')
      // Our React job does indeed include a requirement for React (or at least
      // mentions it)
      .assert.containsText('.job--details', 'React')
      .assert.elementPresent('.fave-button')
      // Let's favorite it...
      .click('.fave-button')
      // ...wait for it to change...
      .waitForElementVisible('.fave-button--yes')
      .assert.not.containsText('.fave-button span', 'Add to favorites')
      // ...and see if the main page also lists it as a favorite
      .click('a > small')
      .waitForElementVisible('main')
      // Again, we undo what we did before (to make our tests idempotent)
      .click('.job__wrapper:last-child .fave-button')
      .assert.containsText(
        '.job__wrapper:last-child .fave-button',
        'Add to favorites',
      )
      .end();
  },
};
