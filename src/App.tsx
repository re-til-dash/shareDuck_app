import Header from "@components/template/Header";
import Layout from "@components/template/Layout";
import { GlobalStyle, LightTheme } from "shareduck-ui";
import { ThemeProvider } from "styled-components";
function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <GlobalStyle />
      <Header />
      <Layout />
    </ThemeProvider>
  );
}

export default App;
