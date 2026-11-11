export type TokenType = "plain" | "comment" | "string" | "keyword" | "number" | "prop" | "punct";

export type Token = {
  type: TokenType;
  value: string;
};

const KEYWORDS = new Set([
  "as",
  "const",
  "export",
  "false",
  "from",
  "import",
  "null",
  "return",
  "true",
  "type",
]);

export type HighlightLang = "ts" | "md" | "json" | "text";

function isIdent(char: string): boolean {
  return /[A-Za-z0-9_]/.test(char);
}

function classifyWord(word: string, rest: string): TokenType {
  if (KEYWORDS.has(word)) return "keyword";
  let i = 0;
  while (rest.charAt(i) === " ") i += 1;
  if (rest.charAt(i) === ":") return "prop";
  return "plain";
}

export function tokenize(line: string, lang: HighlightLang = "ts"): Token[] {
  if (line.length === 0) return [];
  if (lang === "text") return [{ type: "plain", value: line }];
  if (lang === "md") return tokenizeMarkdown(line);
  return tokenizeCode(line, lang === "json");
}

function tokenizeMarkdown(line: string): Token[] {
  const heading = /^(#{1,6})(\s.*)?$/.exec(line);
  if (heading) {
    const marks = heading[1] ?? "";
    const rest = line.slice(marks.length);
    return [
      { type: "keyword", value: marks },
      { type: "plain", value: rest },
    ];
  }
  if (line.startsWith("- ")) {
    return [
      { type: "keyword", value: "-" },
      { type: "plain", value: line.slice(1) },
    ];
  }
  return [{ type: "plain", value: line }];
}

function tokenizeCode(line: string, json: boolean): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  const push = (type: TokenType, value: string) => {
    if (value) tokens.push({ type, value });
  };

  while (i < line.length) {
    const char = line.charAt(i);

    if (!json && char === "/" && line.charAt(i + 1) === "/") {
      push("comment", line.slice(i));
      break;
    }

    if (char === " " || char === "\t") {
      let j = i + 1;
      while (line.charAt(j) === " " || line.charAt(j) === "\t") j += 1;
      push("plain", line.slice(i, j));
      i = j;
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      let j = i + 1;
      while (j < line.length) {
        const next = line.charAt(j);
        if (next === "\\") {
          j += 2;
          continue;
        }
        if (next === char) {
          j += 1;
          break;
        }
        j += 1;
      }
      const value = line.slice(i, j);
      let type: TokenType = "string";
      if (json || char === '"') {
        let k = j;
        while (line.charAt(k) === " ") k += 1;
        if (line.charAt(k) === ":") type = "prop";
      }
      push(type, value);
      i = j;
      continue;
    }

    if (/[0-9]/.test(char)) {
      let j = i + 1;
      while (/[0-9]/.test(line.charAt(j))) j += 1;
      push("number", line.slice(i, j));
      i = j;
      continue;
    }

    if (/[A-Za-z_]/.test(char)) {
      let j = i + 1;
      while (isIdent(line.charAt(j))) j += 1;
      const word = line.slice(i, j);
      push(classifyWord(word, line.slice(j)), word);
      i = j;
      continue;
    }

    push("punct", char);
    i += 1;
  }

  return tokens;
}

export function tokensToText(tokens: readonly Token[]): string {
  return tokens.map((token) => token.value).join("");
}
