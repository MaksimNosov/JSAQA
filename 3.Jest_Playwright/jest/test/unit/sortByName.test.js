const sorting = require("../../app");

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order", () => {
		const input = [
			"Гарри Поттер",
      "Властелин Колец",
      "Волшебник изумрудного города",
		]

		const expected = [
			"Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
		]

		const result = sorting.sortByName(input);

		expect(result).toEqual(expected);
  });
});

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order (no sorting)", () => {
		const input = [
			"Властелин Колец",
      "Властелин Колец",
      "Властелин Колец",
		]

		const expected = [
			"Властелин Колец",
      "Властелин Колец",
      "Властелин Колец",
		]

		const result = sorting.sortByName(input);

		expect(result).toEqual(expected);
  });
});

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order (different letters)", () => {
		const input = [
			"Колец Властелин",
      "Волшебник изумрудного города",
      "Гарри Поттер",
		]

		const expected = [
			"Волшебник изумрудного города",
      "Гарри Поттер",
			"Колец Властелин",
		]

		const result = sorting.sortByName(input);

		expect(result).toEqual(expected);
  });
});
