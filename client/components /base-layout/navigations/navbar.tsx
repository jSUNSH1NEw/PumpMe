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
import Logo from "../../../public/img/Logo.png";
import { KeyboardArrowRight, Label, Public } from "@mui/icons-material/";
import CloseIcon from "../../../public/img/closeIcon.png";
import HamburgerIcon from "../../../public/img/Hamburger.png";
import DiscordImg from "../../../public/img/DiscordIcon.png";
import LinkedinImg from "../../../public/img/LinkedIn.png";
import TwitterImg from "../../../public/img/TwitterIcon.png";
import InstagramImg from "../../../public/img/Instagram.png";
import TelegramImg from "../../../public/img/TelegramIcon.png";
import Portail from "../../../public/img/Portail1.png";
import { useTranslation } from "next-i18next";
import { i18n } from "i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { ConnectRainbow } from "../ConnectRainbow";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
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
    borderRadius: 15,
    marginTop: theme.spacing(1),
    minWidth: 130,
    boxShadow: "0px 8px 20px 0px rgb(0 56 253 / 15%)",
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],

    "& .MuiMenu-list": {
      padding: "4px 0",
    },
  },
}));

{
  /* Nav menu */
}
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

  const languages = [
    {
      code: "fr",
      name: "Français",
      country_code: "fr",
    },
    {
      code: "en",
      name: "English",
      country_code: "en",
    },
  ];

  const pages = [
    {
      ...(router.locale === "fr"
        ? {
            text: "Echange",
          }
        : { text: "Exchange" }),

      url: "/exchange",
    },
    {
      text: "Trading",
      url: "/trading",
    },
    {
      text: "ICO",
      url: "/ico",
    },
    {
      ...(router.locale === "fr"
        ? {
            text: "Gouvernance",
          }
        : { text: "Governance" }),
      url: "/governance",
    },
    {
      text: "Adventures",
      url: "/adventure",
    },
    {
      ...(router.locale === "fr"
        ? {
            text: "À propos",
          }
        : { text: "About us" }),
      url: "/about",
    },
    {
      text: "Guides",
      url: "/guides",
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
        boxShadow: "none",
        background: "white",
        borderBottom: "2px solid #E5E5E5",
        padding: "5px 0",
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
              height: "50px",
              width: "180px",
              fontFamily: "Poppins",
              cursor: "pointer",
            }}
            
          >
            <Image src={Logo} alt="Logo" />
          </Link>

          {/* Nav Desktop */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", lg: "flex" },
              justifyContent: "center",
              alignContent: "center",
              gap: { xs: "0px", md: "0px", lg: "15px" },
            }}
          >
            {router.pathname === "/hydroma" ? (
              ""
            ) : (
              <>
                {pages.map((page) => (
                  <Button
                    key={page.text}
                    sx={{
                      my: 2,
                      color: "black",
                      display: "block",
                      textTransform: "none",
                      minWidth: "0px",
                      fontSize: "0.9rem",
                      fontWeight: "400",
                    }}
                    onClick={() => router.push(`${page.url}`)}
                  >
                    {page.text}
                  </Button>
                ))}
              </>
            )}
          </Box>
          {/* Enter App Mobile */}
          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "none", md: "flex", lg: "none" },
              color: "black",
              mr: "20px",
            }}
          >
            {router.pathname === "/hydroma" ? (
              <ConnectRainbow />
            ) : (
              <Button
                variant="secondaryConnect"
                startIcon={<Image src={Portail} alt="Agora Portail Icon" />}
                onClick={() =>
                  window.open("https://app.agorabank.io/", "_blank")
                }
              >
                {t("enter-app")}
              </Button>
            )}
          </Box>

          {/* Language Menu Desktop            */}
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
            }}
          >
            <Button
              id="demo-customized-button"
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowRight />}
              startIcon={<Public />}
              sx={[
                {
                  display: { xs: "flex", sm: "flex", md: "flex" },
                  background: "transparent",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "hwb(210deg 10% 18% / 4%)",
                  },
                  "&:activ": {
                    backgroundColor: "hwb(210deg 10% 18% / 4%)",
                  },
                  fontFamily: "Poppins",
                  textTransform: "none",
                },
              ]}
            >
              {router.locale === "fr" ? "Fr" : "En"}
            </Button>
          </Box>

          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <Link href={router.asPath} locale="en">
              <MenuItem
                onClick={handleClose}
                sx={{ display: { xs: "none", lg: "block !important" } }}
              >
                English
              </MenuItem>
            </Link>
            <Link href={router.asPath} locale="fr">
              <MenuItem
                onClick={handleClose}
                sx={{ display: { xs: "none", lg: "block" } }}
              >
                Français
              </MenuItem>
            </Link>
            {/*
            <MenuItem onClick={handleClose} disableRipple>
            Español
            </MenuItem>
                     */}
          </StyledMenu>

          {/* Enter App Desktop */}
          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "none", sm: "none", lg: "flex" },
              color: "black",
            }}
          >
            {router.pathname === "/hydroma" ? (
              <ConnectRainbow />
            ) : (
              <Button
                variant="secondaryConnect"
                startIcon={<Image src={Portail} alt="Agora Portail Icon" />}
                onClick={() =>
                  window.open("https://app.agorabank.io/", "_blank")
                }
              >
                {t("enter-app")}
              </Button>
            )}
          </Box>

          <Box
            sx={{
              display: { xs: "flex", lg: "none" },
            }}
          >
            {/* Language Menu mobile */}
            <Button
              id="demo-customized-button"
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleClickMobile}
              endIcon={<KeyboardArrowRight />}
              startIcon={<Public />}
              sx={[
                {
                  display: { xs: "flex", sm: "flex", md: "flex", lg: "none" },
                  background: "transparent",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "hwb(210deg 10% 18% / 4%)",
                  },
                  "&:activ": {
                    backgroundColor: "hwb(210deg 10% 18% / 4%)",
                  },
                  fontFamily: "Poppins",
                  textTransform: "none",
                },
              ]}
            >
              {router.locale === "fr" ? "Fr" : "En"}
            </Button>

            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={openMob}
              onClose={handleClose}
              sx={{ display: { xs: "block", lg: "none !important" } }}
            >
              <Link href={router.asPath} locale="en">
                <MenuItem
                  onClick={handleClose}
                  sx={{ display: { xs: "block", lg: "none !important" } }}
                >
                  English
                </MenuItem>
              </Link>
              <Link href={router.asPath} locale="fr">
                <MenuItem
                  onClick={handleClose}
                  sx={{ display: { xs: "block", lg: "none !important" } }}
                >
                  Français
                </MenuItem>
              </Link>
              {/*
              <MenuItem onClick={handleClose} disableRipple>
                Espagnol
              </MenuItem>
            */}
            </StyledMenu>
            {/* Hamgurger */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", lg: "none", color: "black" },
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <Image src={HamburgerIcon} alt="AgoraBank Hamburger" />
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
                    <Image src={CloseIcon} alt="Close Logo" />
                  </IconButton>
                </Box>
                {pages.map((page) => (
                  <MenuItem
                    key={page.text}
                    onClick={() => router.push(`${page.url}`)}
                  >
                    <Typography
                      textAlign="center"
                      sx={{
                        fontFamily: "Coolvetica",
                        fontSize: { xs: "1.8rem" },
                        m: { xs: "3px 0px 3px 20px" },
                      }}
                    >
                      {page.text}
                    </Typography>
                  </MenuItem>
                ))}

                <MenuItem
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    gap: "10px",
                    mt: "10px",
                    alignItems: "center",
                  }}
                >
                  <Box
                    onClick={() =>
                      window.open(
                        "",
                        "_blank"
                      )
                    }
                  >
                    <Image src={DiscordImg} alt="Discord Icon" />
                  </Box>
                  <Box
                    onClick={() =>
                      window.open(
                        "",
                        "_blank"
                      )
                    }
                  >
                    <Image src={LinkedinImg} alt="" />
                  </Box>
                  <Box
                    onClick={() =>
                      window.open("", "_blank")
                    }
                  >
                    <Image src={TwitterImg} alt="" />
                  </Box>
                  <Box
                    onClick={() =>
                      window.open(
                        "",
                        "_blank"
                      )
                    }
                  >
                    <Image src={InstagramImg} alt="" />
                  </Box>
                  <Box
                    onClick={() =>
                      window.open("", "_blank")
                    }
                  >
                    <Image src={TelegramImg} alt="Agora Telegram Icon" />
                  </Box>
                </MenuItem>

                <MenuItem sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="secondaryConnect"
                    startIcon={<Image src={Portail} alt="Agora Portail Icon" />}
                    sx={{
                      width: "185px",
                      mt: "15px",
                    }}
                    onClick={() =>
                      window.open("https://app.agorabank.io/", "_blank")
                    }
                  >
                    {t("enter-app")}
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
