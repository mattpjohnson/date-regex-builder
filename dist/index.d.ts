export declare const DateRegexBuilder: {
    pure(str: string, { formatter, tokenizer }: {
        formatter: Function;
        tokenizer: Function;
    }): string;
    tokens(tokens: string[], { formatter }: {
        formatter: Function;
    }): string;
    offsetTokenizer(offsets: [number, number][]): (str: string) => string[];
    formatter(locale: "en" | "es"): (token: string) => string;
};
