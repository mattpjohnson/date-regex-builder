const TokenToRegexLookup: { [token: string]: string } = {
    YY: '\\d{2}',
    YYYY: '\\d{4}',
    M: '([1-9]|1[0-2])',
    MM: '(0[1-9]|1[0-2])',
    MMM: '(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)',
    MMMM:
        '(January|February|March|April|May|June|July|August|September|October|November|December)',
    D: '([1-9]|[1-2][0-9]|3[0-1])',
    DD: '(0[1-9]|[1-2][0-9]|3[0-1])',
};

type SupportedLocale = 'en' | 'es';

export const DateRegexBuilder = {
    pure(
        str: string,
        { formatter, tokenizer }: { formatter: Function; tokenizer: Function }
    ) {
        return DateRegexBuilder.tokens(tokenizer(str), { formatter });
    },
    tokens(tokens: Array<string>, { formatter }: { formatter: Function }) {
        return tokens.map(token => formatter(token)).join('');
    },
    offsetTokenizer(offsets: Array<[number, number]>) {
        return (str: string) =>
            offsets.map(([start, finish]) => str.slice(start, finish));
    },
    formatter(locale: SupportedLocale) {
        return function(token: string) {
            if (token in TokenToRegexLookup) {
                return TokenToRegexLookup[token];
            }

            return token;
        };
    },
};

const result = DateRegexBuilder.pure('MMM D, YYYY', {
    formatter: DateRegexBuilder.formatter('en'),
    tokenizer: DateRegexBuilder.offsetTokenizer([
        [0, 3],
        [3, 4],
        [4, 5],
        [5, 7],
        [7, 11],
    ]),
});

if (typeof window !== 'undefined') {
    (window as any).DateRegexBuilder = DateRegexBuilder;
}
