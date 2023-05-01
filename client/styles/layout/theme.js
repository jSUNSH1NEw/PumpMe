import { createTheme } from "@mui/material/styles";

import { keyframes } from "styled-components";

export const PumpTheme = createTheme({
  typography: {
    fontFamily: [
      '"Poppins"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
    ].join(","),
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 1836,
    },
  },
  components: {
    MuiTabs: {
      variants: [
        {
          props: { variant: "landingCard" },
          style: {
            backgroundColor: "#1D1D2E",
            borderRadius: "30px",
            textTransform: "none",

            ".MuiTab-root": {
              color: "#9E9FA1",
              padding: "30px 0px",
              textTransform: "none",
              fontFamily: "ManropeBold",
              background: "#1D1D2E",
            },
            ".MuiTab-root.Mui-selected": {
              color: "white",
              borderBottom: "0px solid",
              background: "#11111B",
            },
            ".MuiTabs-indicator": {
              display: "none",
            },
          },
        },
        {
          props: { variant: "dashboardCard" },
          style: {
            backgroundColor: "#1D1D2E",
            borderRadius: "30px",
            textTransform: "none",

            ".MuiTab-root": {
              color: "#9E9FA1",
              padding: "30px 0px",
              textTransform: "none",
              fontFamily: "ManropeBold",
              background: "#1D1D2E",
            },
            ".MuiTab-root.Mui-selected": {
              color: "white",
              borderBottom: "0px solid",
              background: "#11111B",
            },
            ".MuiTabs-indicator": {
              display: "none",
            },
          },
        },
      ],
    },
    MuiButton: {
      defaultProps: {},
      variants: [
        {
          props: { variant: "primaryConnect" },

          style: {
            backgroundColor: "transparent",
            border: "2px solid #2D2D2D",
            width: "233px",
            height: "55px",
            color: "black",
            fontWeight: "800",
            padding: "20px 40px",
            borderRadius: "50px",
            textTransform: "none",
            fontSize: "1.125rem",
            transition: "all 0.7s ease",
            fontFamily: "Poppins",

            "&:hover": {
              boxShadow: "inset 233px 0 0 0 #2D2D2D",
              color: "white",
            },
            "&:active": {
              background: "#2D2D2D",
              color: "#fffff",
              border: "1px solid #2D2D2D",
              transition: "all 0.3s ease",
            },
            "&:disabled": {
              color: "#9E9FA1",
              background: "#1D1D2E",
              border: "#1D1D2E",
            },
          },
        },
        {
          props: { variant: "secondaryConnect" },

          style: {
            backgroundColor: "transparent",
            border: "1px solid #B3CEFF",
            width: "134px",
            height: "55px",
            color: "#B3CEFF",
            padding: "20px 40px",
            borderRadius: "50px",
            fontWeight: "400",
            textTransform: "none",
            fontSize: "1.125rem",
            transition: "all 0.3s ease",
            fontFamily: "Poppins",

            "&:hover": {
              color: "#B3CEFF",
              background:
                "linear-gradient(180.09deg, rgba(1, 110, 255, 0.5) -44.32%, rgba(1, 96, 247, 0) 99.93%)",
            },
            "&:active": {
              background: "#005BFF",
              color: "#B3CEFF",
              transition: "all 0.3s ease",
            },
          },
        },
        {
          props: { variant: "wrongNetwork" },

          style: {
            backgroundColor: "transparent",
            border: "2px solid #EF4444",
            width: "233px",
            height: "55px",
            color: "white",
            fontWeight: "800",
            padding: "20px 40px",
            borderRadius: "50px",
            textTransform: "none",
            fontSize: "1.125rem",
            transition: "all 0.7s ease",
            fontFamily: "Poppins",

            "&:hover": {
              boxShadow: "inset 244px 0 0 0 #EF4444",
            },
            "&:active": {
              background: "#EF4444",
              color: "#fff",
              border: "1px solid #EF4444",
              transition: "all 0.3s ease",
            },
          },
        },
        {
          props: { variant: "choseNetwork" },

          style: {
            background: "#ECA4BF",
            border: "1px solid #242424",
            padding: "10px 20px",
            height: "47px",
            color: "#242424",
            borderRadius: "50px",
            fontFamily: "Poppins",
            fontWeight: "500",
            textTransform: "none",
            transition: "all 0.7s ease",

            "&:hover": {
              boxShadow: "inset 244px 0 0 0 #13141F",
              color: "#B3CEFF",
            },
            "&:active": {},
          },
        },
        {
          props: { variant: "navbar" },

          style: {
            background: "#0F1238",
            border: "1px solid #242424",
            padding: "10px 20px",
            height: "47px",
            color: "#00ACFF",
            borderRadius: "50px",
            fontFamily: "Poppins",
            textTransform: "none",
            transition: "all 0.7s ease",

            "&:hover": {
              boxShadow: "14px 14px 50px 0#f0f",
            },
            "&:active": {},
          },
        },
      ],
    },
  },
});

MuiTheme.typography.h1 = {
  color: "black",
  fontWeight: "700",
  fontSize: "68px",
  lineHeight: {
    xs: "40px",
    md: "90px",
  },
};

MuiTheme.typography.h2 = {
  color: "black",
};
MuiTheme.typography.h3 = {
  fontWeight: "200",
  textTransform: "uppercase",
  fontSize: "1.125rem",
  letterSpacing: "0.1em",
  color: "#FFFFFF",
};
MuiTheme.typography.subtitle1 = {
  fontWeight: "400",
  textTransform: "uppercase",
  fontSize: "22px",
  letterSpacing: "0.1em",
  color: "#FFFFFF",
};

MuiTheme.typography.subtitle2 = {
  fontWeight: "300",
  fontSize: "16px",
  color: "#FFFFFF",
};
MuiTheme.typography.body2 = {
  fontWeight: "300",
  fontSize: "16px",
  color: "#7C8BA0",
};
