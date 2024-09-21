import { GlobalStyle, LightTheme } from "shareduck-ui";
import { ThemeProvider } from "styled-components";
import Layout from "./template/Layout";

function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <GlobalStyle />
      <Layout />
    </ThemeProvider>
  );
}

export default App;
