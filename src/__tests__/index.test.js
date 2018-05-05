const { DateRegexBuilder } = require('../index');

const buildSingleTokenTestRegex = (token => new RegExp('^' + DateRegexBuilder.pure(token, { formatter: DateRegexBuilder.formatter('en'), tokenizer: str => ([str]) }) + '$'));
const buildFullDateTestRegex = (token => new RegExp('^' + DateRegexBuilder.pure(token, { formatter: DateRegexBuilder.formatter('en'), tokenizer: DateRegexBuilder.offsetTokenizer([[0, 2], [2, 3], [3, 5], [5, 6], [6, 10]]) }) + '$'));

test('M is true for all valid inputs', () => {
	const validMonths = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
	const regex = buildSingleTokenTestRegex('M');

	for (const month of validMonths) {
		expect(regex.test(month)).toBe(true);
	}
});

test('M is false for invalid inputs', () => {
	const invalidMonths = ['0', '01', '13', 'text'];
	const regex = buildSingleTokenTestRegex('M');

	for (const month of invalidMonths) {
		expect(regex.test(month)).toBe(false);
	}
});

test('MM is true for all valid inputs', () => {
	const validMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
	const regex = buildSingleTokenTestRegex('MM');

	for (const month of validMonths) {
		expect(regex.test(month)).toBe(true);
	}
});

test('MM is false for invalid inputs', () => {
	const invalidMonths = ['00', '1', '13', 'text'];
	const regex = buildSingleTokenTestRegex('MM');

	for (const month of invalidMonths) {
		expect(regex.test(month)).toBe(false);
	}
});

test('MMM is true for valid inputs', () => {
	const validInputs = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const regex = buildSingleTokenTestRegex('MMM');

	for (const input of validInputs) {
		expect(regex.test(input)).toBe(true);
	}
});

test('MMM is false for invalid inputs', () => {
	const invalidInputs = ['0', '22', '101', 'Mov', 'Jane', 'text'];
	const regex = buildSingleTokenTestRegex('MMM');

	for (const input of invalidInputs) {
		expect(regex.test(input)).toBe(false);
	}
});

test('MMMM is true for valid inputs', () => {
	const validInputs = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const regex = buildSingleTokenTestRegex('MMMM');

	for (const input of validInputs) {
		expect(regex.test(input)).toBe(true);
	}
});

test('MMMM is false for invalid inputs', () => {
	const invalidInputs = ['0', '22', '101', 'Mov', 'Jane', 'Jun', 'text'];
	const regex = buildSingleTokenTestRegex('MMMM');

	for (const input of invalidInputs) {
		expect(regex.test(input)).toBe(false);
	}
});

test('YY is true for valid inputs', () => {
	const validInputs = ['00', '01', '02', '99'];
	const regex = buildSingleTokenTestRegex('YY');

	for (const input of validInputs) {
		expect(regex.test(input)).toBe(true);
	}
});

test('YY is false for invalid inputs', () => {
	const invalidInputs = ['0', '101', '2002', 'text'];
	const regex = buildSingleTokenTestRegex('YY');

	for (const input of invalidInputs) {
		expect(regex.test(input)).toBe(false);
	}
});

test('YYYY is true for valid inputs', () => {
	const validInputs = ['1800', '1776', '2002', '0029'];
	const regex = buildSingleTokenTestRegex('YYYY');

	for (const input of validInputs) {
		expect(regex.test(input)).toBe(true);
	}
});

test('YYYY is false for invalid inputs', () => {
	const invalidInputs = ['0', '22', '101', 'text'];
	const regex = buildSingleTokenTestRegex('YYYY');

	for (const input of invalidInputs) {
		expect(regex.test(input)).toBe(false);
	}
});

test('D is true for valid inputs', () => {
	const validInputs = ['1', '4', '15', '29', '31'];
	const regex = buildSingleTokenTestRegex('D');

	for (const input of validInputs) {
		expect(regex.test(input)).toBe(true);
	}
});

test('D is false for invalid inputs', () => {
	const invalidInputs = ['0', '32', '02', 'a'];
	const regex = buildSingleTokenTestRegex('D');

	for (const input of invalidInputs) {
		expect(regex.test(input)).toBe(false);
	}
});

test('DD is true for valid inputs', () => {
	const validInputs = ['01', '04', '15', '29', '31'];
	const regex = buildSingleTokenTestRegex('DD');

	for (const input of validInputs) {
		expect(regex.test(input)).toBe(true);
	}
});

test('DD is false for invalid inputs', () => {
	const invalidInputs = ['00', '32', '2', 'a'];
	const regex = buildSingleTokenTestRegex('DD');

	for (const input of invalidInputs) {
		expect(regex.test(input)).toBe(false);
	}
});

test('MM/DD/YYYY is true for valid inputs', () => {
	const validInputs = ['01/28/1800', '07/04/1776', '12/14/2002', '09/31/0029'];
	const regex = buildFullDateTestRegex('MM/DD/YYYY');

	for (const input of validInputs) {
		expect(regex.test(input)).toBe(true);
	}
});

test('MM/DD/YYYY is false for invalid inputs', () => {
	const invalidInputs = ['0', '22', '101', 'text', '13/01/2004', '12/32/2004', '12/01/203'];
	const regex = buildFullDateTestRegex('MM/DD/YYYY');

	for (const input of invalidInputs) {
		expect(regex.test(input)).toBe(false);
	}
});

