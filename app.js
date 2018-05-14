require(['node_modules/date-regex-builder/dist/index.js'], function({ DateRegexBuilder }) {
	const result = DateRegexBuilder.pure('MMM D, YYYY', {
		formatter: DateRegexBuilder.formatter('en'),
		tokenizer: DateRegexBuilder.offsetTokenizer([
			[0, 3],
			[3, 4],
			[4, 5],
			[5, 7],
			[7, 11]
		]),
	});

	console.log({ result })
});
