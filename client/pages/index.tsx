import { useRouter } from "next/router";

// import { useTranslation } from "next-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Box, ThemeProvider } from "@mui/material";
import { GlobalStyle } from "../styles/layout/global";
import { MuiTheme } from "../styles/layout/theme";

// import { NavBar } from "../components/layout/NavBar";

const Home = () => {
  // const router = useRouter();
  // const { t } = useTranslation("common");

  return (
    <ThemeProvider theme={MuiTheme}>
      <GlobalStyle />

      {/* <NavBar title="" buttonJSX={null} />
      <MainSections /> */}
    </ThemeProvider>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({});

export default Home;
