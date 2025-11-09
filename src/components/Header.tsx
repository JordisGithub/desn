import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PublicIcon from "@mui/icons-material/Public";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const TopBar = styled(Box)(({ theme }) => ({
  backgroundColor: "#004c91",
  padding: theme.spacing(2.75, 4),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const SearchField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "10px",
    color: "white",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.3)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(255, 255, 255, 0.4)",
    },
    "& input::placeholder": {
      color: "rgba(255, 255, 255, 0.6)",
      opacity: 1,
    },
  },
});

const ContactInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(4),
  alignItems: "center",
  color: "white",
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  alignItems: "center",
  fontSize: "16px",
}));

const SocialLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
}));

const NavBar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(2, 4),
  justifyContent: "space-between",
  minHeight: "80px !important",
}));

const LogoLink = styled(RouterLink)({
  display: "flex",
  alignItems: "center",
});

const Logo = styled("img")({
  height: "60px",
  cursor: "pointer",
});

const NavLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(4),
  alignItems: "center",
  flex: 1,
  justifyContent: "center",
}));

const NavLink = styled(RouterLink)(({ theme }) => ({
  color: "#333",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: 400,
  padding: theme.spacing(1, 2),
  "&:hover": {
    color: "#004c91",
  },
}));

const RightSection = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  alignItems: "center",
}));

const LanguageButton = styled(Button)(({ theme }) => ({
  color: "#333",
  textTransform: "none",
  fontSize: "16px",
  padding: theme.spacing(1, 2),
  minWidth: "auto",
}));

const DonateButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#f6d469",
  color: "#333",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 500,
  padding: theme.spacing(1.5, 3),
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#f5ca4a",
  },
}));

const Header: React.FC = () => {
  const { lang, setLang } = useLanguage();
  const { t, i18n } = useTranslation();
  const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setLangAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = (newLang?: "en" | "ne") => {
    if (newLang) {
      setLang(newLang);
      i18n.changeLanguage(newLang);
    }
    setLangAnchorEl(null);
  };

  const navItems = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.about"), path: "/about" },
    { label: t("nav.programs"), path: "/programs" },
    { label: t("nav.resources"), path: "/resources" },
    { label: t("nav.events"), path: "/events" },
    { label: t("nav.projects"), path: "/projects" },
    { label: t("nav.get_involved"), path: "/get-involved" },
    { label: t("nav.contact"), path: "/contact" },
  ];

  return (
    <>
      <TopBar>
        <SearchField
          placeholder={t("header.search_placeholder")}
          variant='outlined'
          size='small'
          sx={{ width: "500px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon sx={{ color: "rgba(255, 255, 255, 0.6)" }} />
              </InputAdornment>
            ),
          }}
        />
        <ContactInfo>
          <ContactItem>
            <EmailIcon fontSize='small' />
            <span>disabilityemp@gmail.com</span>
          </ContactItem>
          <ContactItem>
            <PhoneIcon fontSize='small' />
            <span>+977-15709205</span>
          </ContactItem>
          <SocialLinks>
            <IconButton
              size='small'
              sx={{ color: "white" }}
              aria-label='Facebook'
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              size='small'
              sx={{ color: "white" }}
              aria-label='Twitter'
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              size='small'
              sx={{ color: "white" }}
              aria-label='LinkedIn'
            >
              <LinkedInIcon />
            </IconButton>
          </SocialLinks>
        </ContactInfo>
      </TopBar>
      <AppBar position='static' elevation={1}>
        <NavBar>
          <LogoLink to='/'>
            <Logo
              src='https://www.figma.com/api/mcp/asset/ccc1b5e8-ef62-4fef-ae8f-f8e654b30036'
              alt='DESN Logo'
            />
          </LogoLink>
          <NavLinks>
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path}>
                {item.label}
              </NavLink>
            ))}
          </NavLinks>
          <RightSection>
            <LanguageButton
              onClick={handleLanguageClick}
              startIcon={<PublicIcon />}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {lang.toUpperCase()}
            </LanguageButton>
            <Menu
              anchorEl={langAnchorEl}
              open={Boolean(langAnchorEl)}
              onClose={() => handleLanguageClose()}
            >
              <MenuItem onClick={() => handleLanguageClose("en")}>
                English
              </MenuItem>
              <MenuItem onClick={() => handleLanguageClose("ne")}>
                नेपाली
              </MenuItem>
            </Menu>
            <DonateButton>{t("header.donate")}</DonateButton>
          </RightSection>
        </NavBar>
      </AppBar>
    </>
  );
};

export default Header;
