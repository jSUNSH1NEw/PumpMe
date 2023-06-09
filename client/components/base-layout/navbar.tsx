import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Button,
  MenuItem,
} from "@mui/material/";
import Menu, { MenuProps } from "@mui/material/Menu";
import { styled } from "@mui/material/styles";
import Logo from "../../public/nav/Logo.png";
import { KeyboardArrowRight, Label, Public } from "@mui/icons-material/";
import CloseIcon from "../../public/nav/closeIcon.png";
import HamburgerIcon from "../../public/nav/Hamburger.png";
import DiscordImg from "../../public/nav/DiscordIcon.png";
import LinkedinImg from "../../public/nav/LinkedIn.png";
import TwitterImg from "../../public/nav/TwitterIcon.png";
import InstagramImg from "../../public/nav/Instagram.png";
import TelegramImg from "../../public/nav/TelegramIcon.png";
import Portail from "../../public/nav/Portail1.png";
import Coin from "../../public/landing/coint1.png";
import { useTranslation } from "next-i18next";
import { i18n } from "i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { ConnectRainbow } from "./ConnectRainbow";

const StyledMenuMobile = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "0px",
    minWidth: 130,
    padding: "0 !important",
    marginTop: "0px",
    width: "80%",
    height: "100vh !important",
    maxWidth: "80% !important",
    maxHeight: "100vh !important",
    left: "auto !important",
    right: "0 !important",
    bottom: "auto !important",
    top: "0 !important",
    background: "rgba(0, 0, 0, 0.39)",
    boxShadow: "46px 46px 40px rgba(0, 0, 0, 0.25)",
    backdropFilter: "blur(25px)",
    color: "white",

    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "&.MuiMenu-paper": {
      maxWidth: "100%",
      right: "0px",
    },
  },
}));

const NavBar = () => {
  const router = useRouter();
  const { t } = useTranslation("common");

  const pages = [
    {
      ...(router.locale === "fr"
        ? {
            text: "Ecosysteme",
          }
        : { text: "Ecosystem" }),

      url: "/litepaper",
    },
    {
      ...(router.locale === "fr"
        ? {
            text: "Comment jouer",
          }
        : { text: "How to play" }),
      url: "/Ecosystem",
    },
    {
      ...(router.locale === "fr"
        ? {
            text: "Docs",
          }
        : { text: "docs" }),
      url: "/about",
    },
  ];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openMob = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickMobile = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        padding: "5px 0",
        background: "rgba(0, 0, 0, 0.39)",
        boxShadow: "46px 46px 40px rgba(0, 0, 0, 0.25)",
        backdropFilter: "blur(25px)",
      }}
    >
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          {/* Logo desktop */}
          <Link
            href={"/"}
            style={{
              display: "flex",
              marginRight: "25px",
              cursor: "pointer",
            }}
          >
            <Image src={Logo} height={40} width={140} alt="Logo" />
          </Link>

          {/* Nav Desktop */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", lg: "flex" },
              justifyContent: "flex-end",
              alignContent: "right",
              gap: { xs: "0px", md: "0px", lg: "15px" },
            }}
          >
            {pages.map((page) => (
              <Button
                sx={{
                  backgroundColor: "transparent",
                  width: "auto",
                  color: "white",
                  padding: "20px 40px",
                  borderRadius: "50px",
                  fontWeight: "400",
                  fontSize: "0.925rem",
                  transition: "all 0.3s ease",
                  fontFamily: "Righteous",
                  textTransform: "uppercase",
                  mr: "20px",
                  "&:hover &:after": {
                    transform: "scaleX(1)",
                  },
                  "&:after": {
                    display: "block",
                    borderBottom: "solid 3px #019fb6",
                    transform: "scaleX(0)",
                    transition: "transform 250ms ease-in-out",
                  },
                }}
                key={page.text}
                onClick={() => router.push(`${page.url}`)}
              >
                {page.text}
              </Button>
            ))}
            <Button
              variant="enterApp"
              startIcon={
                <Box
                  sx={{
                    width: "20px",
                    height: "30px",
                    position: "absolute",
                    left: "20px",
                   top:"10px"
                  }}
                >
                  {" "}
                  <Image
                    src={Coin}
                    width={25}
                    height={30}
                    alt="Pump-me dashboard Portail Icon"
                  />
                </Box>
              }
              sx={{
                width: "230px",
                mt: "5px",
              }}
              onClick={() => window.open("https://", "_blank")}
            >
              {t("PLAY")}
            </Button>
          </Box>
          {/* Enter App Desktop */}
          <Box
            sx={{
              display: { xs: "none", sm: "none", lg: "flex" },
              color: "white",
            }}
          >
            {router.pathname === "/dashboard" ? <ConnectRainbow /> : null}
          </Box>

          <Box
            sx={{
              display: { xs: "flex", lg: "none" },
            }}
          >
            {/* Hamgurger */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", lg: "none" },
                position: "absolute",
                right: "0px",
                top: "5px",
              }}
            >
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <Image src={HamburgerIcon} width={40} alt="Pump me Hamburger" />
              </IconButton>

              {/* Nav Mobile */}
              <StyledMenuMobile
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", lg: "none" },
                  width: "100%",
                  left: "0px",
                }}
              >
                <Box
                  sx={{
                    height: "76px",
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "0px 24px",
                  }}
                >
                  <IconButton
                    size="large"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleCloseNavMenu}
                    color="inherit"
                  >
                    <Image
                      src={CloseIcon}
                      width={40}
                      height={40}
                      alt="Close Logo"
                    />
                  </IconButton>
                </Box>
                <Box sx={{ mt: "80px" }}>
                  {pages.map((page) => (
                    <MenuItem
                      sx={{ justifyContent: "center" }}
                      key={page.text}
                      onClick={() => router.push(`${page.url}`)}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: { xs: "1.2rem" },
                          textAlign: "center",
                        }}
                      >
                        {page.text}
                      </Typography>
                    </MenuItem>
                  ))}
                </Box>

                <MenuItem
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    mt: "20px",
                    mb: "50px",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "20px",
                      height: "30px",
                      filter: "invert(100%)",
                    }}
                    onClick={() => window.open("", "_blank")}
                  >
                    <Image src={DiscordImg} alt="Discord Icon" />
                  </Box>
                  <Box
                    sx={{
                      width: "20px",
                      height: "30px",
                      filter: "invert(100%)",
                    }}
                    onClick={() => window.open("", "_blank")}
                  >
                    <Image src={TwitterImg} alt="" />
                  </Box>
                  <Box
                    sx={{
                      width: "20px",
                      height: "30px",
                      filter: "invert(100%)",
                    }}
                    onClick={() => window.open("", "_blank")}
                  >
                    <Image
                      src={TelegramImg}
                      alt="Telegram Icon"
                      style={{ color: "white" }}
                    />
                  </Box>
                </MenuItem>

                <MenuItem sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="enterApp"
                    startIcon={
                      <Box
                        sx={{
                          width: "20px",
                          height: "30px",
                          mr: "20px",
                        }}
                      >
                        {" "}
                        <Image
                          src={Coin}
                          width={25}
                          height={30}
                          alt="Pump-me dashboard Portail Icon"
                        />
                      </Box>
                    }
                    sx={{
                      width: "185px",
                      mt: "15px",
                    }}
                    onClick={() => window.open("https://", "_blank")}
                  >
                    {t("PLAY")}
                  </Button>
                </MenuItem>
              </StyledMenuMobile>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
