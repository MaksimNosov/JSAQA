let page;
const { clickElement } = require("./lib/commands.js");

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Going to the cinema", () => {
  beforeEach(async () => {
    await page.goto("http://qamid.tmweb.ru/client/index.php", {
      waitUntill: "load",
      timeout: 35000,
    }); //открываем страницу кинотеатра
  });

  test.only("Place reservation", async () => {
    const dayAfterTomorrowSelector = "body > nav > a:nth-child(3)"; //создаем селектор послезавтра
    await clickElement(page, dayAfterTomorrowSelector); //кликаем на послезавтра
    const timeOfSecondFilmSelrctor =
      "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li"; //создаем селектор времени второго фильма
    await clickElement(page, timeOfSecondFilmSelrctor); //кликаем по второму фильму
    const rowNumber = 9; //задаем ряд
    const placeNumber = 9; //задаем место
    const rowNumberSelector =
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(" +
      rowNumber +
      ")"; //создаем селектор номера ряда
    const placeNumberSelector =
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(" +
      rowNumber +
      ") > span:nth-child(" +
      placeNumber +
      ")"; //создаем селектор номера места в ряду

    try {
      await page.waitForSelector(rowNumberSelector, {
        visible: true,
      });
    } catch (error) {
      throw new Error(`Выбранного Вами ряда ${rowNumber} не существует!`);
    } //ищем ряд

    try {
      await page.waitForSelector(placeNumberSelector, {
        visible: true,
      });
    } catch (error) {
      throw new Error(
        `Выбранного Вами места ${placeNumber} не существует в выбранном ряду ${rowNumber}!`
      );
    } //ищем место в ряду

    try {
      await clickElement(page, placeNumberSelector); //кликаем по месту

      await page.waitForSelector(".acceptin-button", {
        visible: true,
      });
      expect(
        await page.$eval("button.acceptin-button", (button) => {
          return button.disabled;
        })
      ).toBe(false); //проверяем, что кнопка Забронировать активна
    } catch (error) {
      throw new Error(
        `Выбранное Вами место ${placeNumber} в ряду ${rowNumber} занято!`
      );
    }
    await clickElement(page, "button.acceptin-button"); // нажимаем кнопку Забронировать
    await page.waitForTimeout(3000);
  }, 15000);
});
