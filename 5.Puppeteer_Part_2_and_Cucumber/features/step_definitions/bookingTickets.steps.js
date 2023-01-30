const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { clickElement } = require("../../lib/commands.js");
const { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(45000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`${string}`, {
    setTimeout: 45000,
  });
});

When("user choose day {int}", async function (int) {
  const daySelector = "body > nav > a:nth-child(" + int + ")";
  await clickElement(this.page, daySelector);
});

When("user choose time", async function () {
  await clickElement(
    this.page,
    "section:nth-child(2) > div.movie-seances__hall > ul > li"
  );
});

When(
  "user select row {int} and seat {int}",
  async function (rowNumber, placeNumber) {
    const placeNumberSelector =
      "section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(" +
      rowNumber +
      ") > span:nth-child(" +
      placeNumber +
      ")";
    await clickElement(this.page, placeNumberSelector);
  }
);

When("user click button", async function () {
  debugger;
  await clickElement(this.page, "button.acceptin-button");
  await clickElement(this.page, "button.acceptin-button");
});

Then("user see {string}", async function (successMsg) {
  const ticket = await this.page.$eval(
    "body > main > section > header > h2",
    (el) => el.textContent
  );
  expect(ticket).equal(successMsg);
});
