import Layout from "@components/template/Layout";
import { GlobalStyle, LightTheme } from "shareduck-ui";
import { ThemeProvider } from "styled-components";
function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <GlobalStyle />
      <Layout />
    </ThemeProvider>
  );
}

export default App;
