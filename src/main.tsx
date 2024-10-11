import ReactDom from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./windows/Router";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, LightTheme } from "shareduck-ui";
import Header from "@components/template/Header";

ReactDom.createRoot(document.getElementById("root") as HTMLElement)!.render(
  <ThemeProvider theme={LightTheme}>
    <GlobalStyle />
    <Header />
    <RouterProvider router={router} />
  </ThemeProvider>
);
