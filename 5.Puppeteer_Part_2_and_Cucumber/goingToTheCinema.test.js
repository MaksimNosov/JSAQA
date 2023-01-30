let page;
const {
  clickElement,
  checkRow,
  checkPlace,
  checkBookButton,
  checkPlaceAndRowOnTicket,
  checkTicket,
  checkPlaceIsFree,
	checkPlaceIsNotFree
} = require("./lib/commands.js");

const dayTomorrowSelector = "body > nav > a:nth-child(2)"; // выбираем день (создаем селектор завтра)
const dayAfterTomorrowSelector = "body > nav > a:nth-child(3)"; // выбираем день (создаем селектор послезавтра)
const timeOfSecondFilmSelrctor =
  "section:nth-child(2) > div.movie-seances__hall > ul > li"; //создаем селектор времени второго фильма
const rowNumber = 3; //задаем ряд первого билета
const placeNumber = 1; //задаем место первого билета
const rowNumber2 = 3; //задаем ряд второго билета
const placeNumber2 = 2; //задаем место второго билета
const invalidPlaceNumber = 1000;
const rowNumberSelector =
  "section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(" +
  rowNumber +
  ")"; //создаем селектор номера ряда первого билета
const placeNumberSelector =
  "section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(" +
  rowNumber +
  ") > span:nth-child(" +
  placeNumber +
  ")"; //создаем селектор номера места в ряду первого билета
const rowNumberSelector2 =
  "section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(" +
  rowNumber2 +
  ")"; //создаем селектор номера ряда второго билета
const placeNumberSelector2 =
  "section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(" +
  rowNumber2 +
  ") > span:nth-child(" +
  placeNumber2 +
  ")"; //создаем селектор номера места в ряду второго билета
const invalidPlaceNumberSelector =
  "section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(" +
  rowNumber +
  ") > span:nth-child(" +
  invalidPlaceNumber +
  ")"; //создаем селектор номера места в ряду второго билета
const bookButtonSelector = "button.acceptin-button"; //создаем селектор кнопки забронироавть
const successMsg = "Электронный билет";

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
      timeout: 25000,
    }); //открываем страницу кинотеатра
  });

  test("Booking one place", async () => {
    await clickElement(page, dayAfterTomorrowSelector); //выбираем день
    await clickElement(page, timeOfSecondFilmSelrctor); //выбираем фильм
    await checkRow(page, rowNumber, rowNumberSelector); //проверяем существование ряда
    await checkPlace(page, rowNumber, placeNumber, placeNumberSelector); //проверяем существование места в ряду
    await clickElement(page, placeNumberSelector); //кликаем по месту
    await checkBookButton(page, bookButtonSelector, rowNumber, placeNumber); //проверяем, что кнопка Забронировать активна
    await clickElement(page, "button.acceptin-button"); // нажимаем кнопку Забронировать
    await checkPlaceAndRowOnTicket(page, rowNumber, placeNumber); // сверяем выбранные ряд/место в билете
    await clickElement(page, "button.acceptin-button"); // нажимаем кнопку Получить код бронирования
    await checkTicket(page, successMsg); //проверяем получение билета
  }, 45000);

  test("Reservation two place", async () => {
    await clickElement(page, dayTomorrowSelector); //выбираем день
    await clickElement(page, timeOfSecondFilmSelrctor); //выбираем фильм
    await checkRow(page, rowNumber, rowNumberSelector); //проверяем существование ряда первого билета
    await checkPlace(page, rowNumber, placeNumber, placeNumberSelector); //проверяем существование места в ряду первого билета
    await checkRow(page, rowNumber2, rowNumberSelector2); //проверяем существование ряда второго билета
    await checkPlace(page, rowNumber2, placeNumber2, placeNumberSelector2); //проверяем существование места в ряду второго билета
    await checkPlaceIsFree(page, rowNumber, placeNumber, placeNumberSelector); //проверяем, что место первого билета свободно
    await checkPlaceIsFree(
      page,
      rowNumber2,
      placeNumber2,
      placeNumberSelector2
    ); //проверяем, что место второго билета свободно
    await clickElement(page, placeNumberSelector); //кликаем по месту первого билета
    await clickElement(page, placeNumberSelector2); //кликаем по месту второго билета
    await checkBookButton(page, bookButtonSelector, rowNumber, placeNumber); //проверяем, что кнопка Забронировать активна
    await clickElement(page, "button.acceptin-button"); // нажимаем кнопку Забронировать
    await checkPlaceAndRowOnTicket(page, rowNumber, placeNumber); // сверяем выбранные ряд/место в билете
    await clickElement(page, "button.acceptin-button"); // нажимаем кнопку Получить код бронирования
    await checkTicket(page, successMsg); //проверяем получение билета
  }, 45000);

  test("Can't buy a ticket with a non-existent place", async () => {
    await clickElement(page, dayAfterTomorrowSelector); //выбираем день
    await clickElement(page, timeOfSecondFilmSelrctor); //выбираем фильм
    await checkRow(page, rowNumber, rowNumberSelector); //проверяем существование ряда
    await checkPlace(page, rowNumber, placeNumber, placeNumberSelector); //проверяем существование места в ряду
		await checkPlaceIsNotFree( page, rowNumber, placeNumber, placeNumberSelector); //проверяем, что место занято
  }, 45000);
});
