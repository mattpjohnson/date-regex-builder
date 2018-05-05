(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const TokenToRegexLookup = {
        YY: '\\d{2}',
        YYYY: '\\d{4}',
        M: '([1-9]|1[0-2])',
        MM: '(0[1-9]|1[0-2])',
        MMM: '(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)',
        MMMM: '(January|February|March|April|May|June|July|August|September|October|November|December)',
        D: '([1-9]|[1-2][0-9]|3[0-1])',
        DD: '(0[1-9]|[1-2][0-9]|3[0-1])',
    };
    exports.DateRegexBuilder = {
        pure(str, { formatter, tokenizer }) {
            return exports.DateRegexBuilder.tokens(tokenizer(str), { formatter });
        },
        tokens(tokens, { formatter }) {
            return tokens.map(token => formatter(token)).join('');
        },
        offsetTokenizer(offsets) {
            return (str) => offsets.map(([start, finish]) => str.slice(start, finish));
        },
        formatter(locale) {
            return function (token) {
                if (token in TokenToRegexLookup) {
                    return TokenToRegexLookup[token];
                }
                return token;
            };
        },
    };
    const result = exports.DateRegexBuilder.pure('MMM D, YYYY', {
        formatter: exports.DateRegexBuilder.formatter('en'),
        tokenizer: exports.DateRegexBuilder.offsetTokenizer([
            [0, 3],
            [3, 4],
            [4, 5],
            [5, 7],
            [7, 11],
        ]),
    });
});
