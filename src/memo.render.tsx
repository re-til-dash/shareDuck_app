import React from "react";
import ReactDom from "react-dom/client";
import Memo from "@windows/Memo.tsx";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, LightTheme } from "shareduck-ui";

//? memo를 위해서 createRoot를 하나의 src에 두 번 사용하는 것이 맞을지 고민중
ReactDom.createRoot(document.getElementById("memo") as HTMLElement)!.render(
  <React.StrictMode>
    <ThemeProvider theme={LightTheme}>
      <GlobalStyle />
      <Memo />
    </ThemeProvider>
  </React.StrictMode>
);
