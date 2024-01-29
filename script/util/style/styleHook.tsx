import React, {Context, HtmlHTMLAttributes, useContext, useEffect, useState} from "react";
import {initStyle, StyleJson} from "./styleJson.ts";
import {css, Global} from "@emotion/react";

let StyleContext: Context<StyleJson> = React.createContext(initStyle())
let styleSetter: (theme: StyleJson) => void = () => {
}

interface ThemeProviderProp extends HtmlHTMLAttributes<HTMLDivElement> {
}

export function StyleProvider(props: ThemeProviderProp) {
  const [theme, setState] = useState(initStyle)
  const [font, setFont] = useState("")
  styleSetter = setState
  const nonNullTheme = theme == undefined ? initStyle() : theme

  useEffect(() => {
    const promises = theme.fonts.map((font) => {
      return new FontFace(font.name, "url(" + font.url + ")").load()
    })

    Promise.all(promises).then((fontFaces) => {
      fontFaces.forEach((font) => {
        (document.fonts as FontFaceSet).add(font)
      })
      let fontsStr = ""
      for (const font of theme.fonts) {
        fontsStr = fontsStr == "" ? fontsStr + font.name : fontsStr + "," + font.name
      }
      setFont(fontsStr)
    }, (e: DOMException) => {
      console.error(e)
    })
  }, [theme])

  return <StyleContext.Provider value={nonNullTheme}>
    <Global styles={css`
      * {
        margin: 0;
        padding: 0;
        border: 0;
      }

      a {
        color: unset;
        text-decoration: unset;
      }

      button {
        background-color: unset;
        font-family: ${font} sans-serif;
        cursor: pointer;
      }

      p , h1 , h2 {
        font-family: ${font}
      }
      li {
        list-style: none;
      }
      strong {
        color: red;
      }
      label {
        display: block;
      }
      input {
        display: block;
      }
    ;
    `}/>


    <div {...props} css={css`
      background-color: ${nonNullTheme.base};
      font-family: ${font} sans-serif;
      color: ${nonNullTheme.textBase};
      min-height: 100vh;
    `}>
      {props.children}
    </div>
  </StyleContext.Provider>
}

export function useStyle(): StyleJson {
  return useContext(StyleContext)
}

export function setStyle(theme: StyleJson) {
  styleSetter(theme)
}