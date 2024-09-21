import Layout from "@components/template/Layout";
import { useEffect } from "react";
import { GlobalStyle, LightTheme } from "shareduck-ui";
import { ThemeProvider } from "styled-components";
function App() {
  useEffect(() => {
    window.shareDuck
      .invoke("categories-get-ipc")
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }, []);
  return (
    <ThemeProvider theme={LightTheme}>
      <GlobalStyle />
      <Layout />
    </ThemeProvider>
  );
}

export default App;
