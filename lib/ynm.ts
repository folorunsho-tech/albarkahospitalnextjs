const generateYear = (from: number, to: number) => {
	const generated = [];
	for (let index = from; index <= to; index++) {
		generated.push(String(index));
	}
	return generated;
};
export const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
export const curYear = String(new Date().getFullYear());
export const curMonth = months[new Date().getMonth()];
export const curMonthNo = new Date().getMonth();
export const years = generateYear(2010, Number(curYear));
export const nyears = generateYear(2025, Number(curYear));
