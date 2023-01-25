let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Going to the cinema", () => {
  beforeEach(async () => {
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });

  test.only("Place reservation", async () => {
    const dayAfterTomorrow = await page.$("body > nav > a:nth-child(3)");
    await dayAfterTomorrow.click();
    const timeOfSecondFilm = await page.$(
      "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li"
    );
    await timeOfSecondFilm.click();
    const rowNumber = 7;
    const placeNumber = 8;
    const rowNumberSelector =
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(" +
      rowNumber +
      ")";
    const placeNumberSelector = "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(" +
      rowNumber + ") > span:nth-child(" + placeNumber +")";

    try {
      await page.waitForSelector(rowNumberSelector, {
        visible: true,
      });
    } catch (error) {
      throw new Error(`Выбранного Вами ряда ${rowNumber} не существует!`);
    }

    try {
      await page.waitForSelector(placeNumberSelector, {
        visible: true,
      });
    } catch (error) {
      throw new Error(
        `Выбранного Вами места ${placeNumber} не существует в выбранном ряду ${rowNumber}!`
      );
    }

    try {
			// await page.waitForSelector(placeNumberSelector);
			// const place = await page.$(placeNumberSelector);
			// await place.click();

      await page.click(placeNumberSelector);


      // await page.$eval(placeNumberSelector, (el) => {
      //   if (el.classList.contains("buying-scheme__chair_taken")) {
			// 		oshibka = new Error;
			// 	}
			// }
      // );
    } catch (error) {
      throw new Error(`Выбранное Вами место ${placeNumber} в ряду ${rowNumber} занято!`);
    }
		await page.waitForTimeout(3000);
    }, 15000);
});


  //   await page.waitForSelector("h1");
  //   const title2 = await page.title();
  //   expect(title2).toEqual(
  //     "GitHub for teams · Build like the best teams on the planet · GitHub"
  //   );
  // 

//   test("The first link attribute", async () => {
//     const actual = await page.$eval("a", link => link.getAttribute('href') );
//     expect(actual).toEqual("#start-of-content");
//   }, 10000);

//   test("The page contains Sign in button", async () => {
//     const btnSelector = ".btn-large-mktg.btn-mktg";
//     await page.waitForSelector(btnSelector, {
//       visible: true,
//     });
//     const actual = await page.$eval(btnSelector, link => link.textContent);
//     expect(actual).toContain("Get started with Team")
//   }, 10000);
// });

// test("Video button text'", async () => {
//     await page.goto("https://github.com/features/issues");
//     const videoButton = "div.position-absolute.top-0.left-0.width-full.height-full.d-flex.flex-column.flex-justify-center.px-3.events-auto > div > details > summary";
//     const firstLink = await page.$eval(videoButton, el => el.textContent);
//     expect(firstLink).toContain('Watch video');
//   }, 60000);

// test("The h1 header content Issues", async () => {
//     await page.goto("https://github.com/features/issues");
//     const firstLink = await page.$("header div div a");
//     await firstLink.click();
//     await page.waitForSelector('h1');
//     const title2 = await page.title();
//     expect(title2).toEqual('GitHub Issues · Project planning for developers · GitHub');
//   }, 60000);

// test("The h1 header content Packages", async () => {
//     await page.goto("https://github.com/features/packages");
//     const firstLink = await page.$("header div div a");
//     await firstLink.click();
//     await page.waitForSelector('h1');
//     const title2 = await page.title();
//     expect(title2).toEqual('GitHub Packages: Your packages, at home with their code · GitHub');
//   }, 10000);

// test("The h1 header content Pricing", async () => {
//     await page.goto("https://github.com/pricing");
//     const firstLink = await page.$("header div div a");
//     await firstLink.click();
//     await page.waitForSelector('h1');
//     const title2 = await page.title();
//     expect(title2).toEqual('Pricing · Plans for every developer · GitHub');
// }, 20000);

//   test("The h1 header content HomePage", async () => {
//     await page.goto("https://netology.ru/", {
//       waitUntill: "load",
//       timeout: 60000,
//     });		
//     const title2 = await page.title();
//     expect(title2).toEqual("Нетология — обучение современным профессиям онлайн");
//   }, 60000);

//   test("The h1 header content Development", async () => {
//     await page.goto("https://netology.ru/development", {
//       waitUntill: "load",
//       timeout: 60000,
//     });		
//     const title = await page.title();
//     expect(title).toEqual("Курсы программирования онлайн – обучение с нуля | Нетология");
//   }, 60000);

//   test("The h1 header content QAMID", async () => {
//     await page.goto("https://netology.ru/programs/qa-middle", {
//       waitUntill: "load",
//       timeout: 60000,
//     });
//     const title = await page.title();
//     expect(title).toEqual("Тестировщик – обучение QA-инженеров на курсе в Нетологии");
//   }, 60000);