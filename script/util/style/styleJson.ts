export interface StyleJson {
  main: string
  sub: string
  baseWeek: string
  base: string
  base1: string
  base2: string
  line: string
  textWeek: string
  textBase: string
  textLight: string
  fonts: Font[]
  fontSize: string
  fontSize1: string
  fontSizeMin: string
  hFontSize: string
  hFontSize1: string
  hFontSize2: string
}


export function initStyle(): StyleJson {
  return {
    baseWeek: "#fefefe",
    base: "#f7f7f7",
    base1: "#eee",
    base2: "#ddd",
    line: "#999",
    main: "#ffa75e",
    sub: "#4b4b4b",
    textWeek: "#666",
    textBase: "#4b4b4b",
    textLight: "#ddd",
    fonts: [],
    fontSize: "1rem",
    fontSize1: "1.2rem",
    fontSizeMin: "0.8rem",
    hFontSize: "1.2rem",
    hFontSize1: "1.5rem",
    hFontSize2: "2rem",
  }
}

export interface Font {
  name: string
  url: string
}

export function initFont(): Font {
  return {
    name: "",
    url: "",
  }
}