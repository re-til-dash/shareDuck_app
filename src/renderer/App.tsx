import { Link } from "react-router-dom";
import { GlobalStyle, LightTheme } from "shareduck-ui";
import { ThemeProvider } from "styled-components";
import Layout from "./components/template/Layout";

function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <Link to={"/"}>home</Link>
      <GlobalStyle />
      <Layout />
    </ThemeProvider>
  );
}

export default App;
