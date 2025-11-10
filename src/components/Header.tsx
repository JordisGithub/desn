import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import PublicIcon from "@mui/icons-material/Public";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DonationPaymentModal from "./payment/DonationPaymentModal";
import desnLogo from "../assets/DESN_logo_500x500.jpg";

const TopBar = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #e0e0e0",
  padding: theme.spacing(2, 4),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: "1920px",
  margin: "0 auto",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(1.5, 2),
  },
}));

const SearchField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#f5f5f5",
    borderRadius: "24px",
    fontSize: "14px",
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "#004c91",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#004c91",
      borderWidth: "1px",
    },
    "& input::placeholder": {
      color: "#666",
      opacity: 1,
    },
  },
});

const TopBarLeft = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "16px",
});

const TopBarRight = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "24px",
});

const NavBar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(2, 4),
  justifyContent: "center",
  minHeight: "64px !important",
  maxWidth: "1920px",
  margin: "0 auto",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    justifyContent: "space-between",
  },
}));

const LogoLink = styled(RouterLink)({
  display: "flex",
  alignItems: "center",
});

const Logo = styled("img")({
  height: "80px",
  cursor: "pointer",
  transition: "transform 0.2s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const NavLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(4),
  alignItems: "center",
  flex: 1,
  justifyContent: "flex-start",
  [theme.breakpoints.down("lg")]: {
    display: "none", // Hide desktop nav on tablet and mobile
  },
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
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1, 2),
    fontSize: "14px",
  },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  color: "#333",
  [theme.breakpoints.down("lg")]: {
    display: "flex",
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2, 2),
  backgroundColor: "#004c91",
}));

const DrawerContent = styled(Box)({
  width: 280,
});

const Header: React.FC = () => {
  const { lang, setLang } = useLanguage();
  const { user, isAdmin, logout, isAuthenticated } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setLangAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = (newLang?: "en" | "ne") => {
    if (newLang) {
      setLang(newLang);
      // Ensure i18n fully changes before closing menu
      void i18n.changeLanguage(newLang).then(() => {
        // Force a re-render by creating a new object
        setLangAnchorEl(null);
      });
    } else {
      setLangAnchorEl(null);
    }
  };

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.about"), path: "/about" },
    { label: t("nav.get_involved"), path: "/get-involved" },
    { label: t("nav.events"), path: "/events" },
    { label: t("nav.resources"), path: "/resources" },
    { label: t("nav.programs"), path: "/programs" },
    // { label: t("nav.projects"), path: "/projects" },
    { label: t("nav.contact"), path: "/contact" },
  ];

  return (
    <>
      {/* Top Utility Bar - Logo, Language, Login, Search */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
          backgroundColor: "white",
        }}
      >
        <TopBar>
          <TopBarLeft>
            <LogoLink to='/'>
              <Logo src={desnLogo} alt='DESN Logo' style={{ height: "90px" }} />
            </LogoLink>
          </TopBarLeft>{" "}
          <TopBarRight>
            <LanguageButton
              onClick={handleLanguageClick}
              startIcon={<PublicIcon />}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{ display: { xs: "none", md: "flex" } }}
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

            {user ? (
              <>
                <Button
                  onClick={handleUserMenuClick}
                  startIcon={<AccountCircleIcon />}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{
                    color: "#004c91",
                    textTransform: "none",
                    fontSize: "14px",
                    display: { xs: "none", md: "flex" },
                  }}
                >
                  {user.fullName || user.username}
                </Button>
                <Menu
                  anchorEl={userMenuAnchorEl}
                  open={Boolean(userMenuAnchorEl)}
                  onClose={handleUserMenuClose}
                >
                  {isAuthenticated && !isAdmin && (
                    <MenuItem
                      onClick={() => {
                        navigate("/member/dashboard");
                        handleUserMenuClose();
                      }}
                    >
                      <DashboardIcon sx={{ mr: 1 }} fontSize='small' />
                      My Events
                    </MenuItem>
                  )}
                  {isAdmin && (
                    <MenuItem
                      onClick={() => {
                        navigate("/admin/dashboard");
                        handleUserMenuClose();
                      }}
                    >
                      <DashboardIcon sx={{ mr: 1 }} fontSize='small' />
                      Admin Dashboard
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ mr: 1 }} fontSize='small' />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                onClick={handleLogin}
                startIcon={<LoginIcon />}
                sx={{
                  color: "#004c91",
                  textTransform: "none",
                  fontSize: "14px",
                  display: { xs: "none", md: "flex" },
                }}
              >
                Login
              </Button>
            )}

            <SearchField
              placeholder={t("header.search_placeholder")}
              variant='outlined'
              size='small'
              sx={{
                width: { xs: "200px", md: "300px" },
                display: { xs: "none", sm: "block" },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon sx={{ color: "#666", fontSize: "20px" }} />
                  </InputAdornment>
                ),
              }}
            />

            <MobileMenuButton
              edge='end'
              aria-label='menu'
              onClick={toggleMobileMenu}
            >
              <MenuIcon />
            </MobileMenuButton>
          </TopBarRight>
        </TopBar>

        {/* Main Navigation Bar */}
        <AppBar position='static' elevation={1}>
          <NavBar>
            <NavLinks>
              {navItems.map((item) => (
                <NavLink key={item.path} to={item.path}>
                  {item.label}
                </NavLink>
              ))}
            </NavLinks>
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                position: "absolute",
                right: "32px",
              }}
            >
              <DonateButton onClick={() => setDonationModalOpen(true)}>
                {t("header.donate")}
              </DonateButton>
            </Box>
          </NavBar>
        </AppBar>
      </Box>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor='left'
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
          },
        }}
      >
        <DrawerContent>
          <DrawerHeader>
            <Logo
              src='https://www.figma.com/api/mcp/asset/ccc1b5e8-ef62-4fef-ae8f-f8e654b30036'
              alt='DESN Logo'
              style={{ height: "40px" }}
            />
            <IconButton onClick={toggleMobileMenu} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton onClick={() => handleMobileNavClick(item.path)}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLanguageClick}>
                <PublicIcon sx={{ mr: 2 }} />
                <ListItemText primary={lang.toUpperCase()} />
                <KeyboardArrowDownIcon />
              </ListItemButton>
            </ListItem>
            {user ? (
              <>
                {!isAdmin && (
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate("/member/dashboard");
                        setMobileMenuOpen(false);
                      }}
                    >
                      <DashboardIcon sx={{ mr: 2 }} />
                      <ListItemText primary='My Events' />
                    </ListItemButton>
                  </ListItem>
                )}
                {isAdmin && (
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate("/admin/dashboard");
                        setMobileMenuOpen(false);
                      }}
                    >
                      <DashboardIcon sx={{ mr: 2 }} />
                      <ListItemText primary='Admin Dashboard' />
                    </ListItemButton>
                  </ListItem>
                )}
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogoutIcon sx={{ mr: 2 }} />
                    <ListItemText primary='Logout' />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    handleLogin();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LoginIcon sx={{ mr: 2 }} />
                  <ListItemText primary='Login' />
                </ListItemButton>
              </ListItem>
            )}
          </List>
          <Box sx={{ p: 2 }}>
            <DonateButton
              fullWidth
              onClick={() => {
                setDonationModalOpen(true);
                setMobileMenuOpen(false);
              }}
            >
              {t("header.donate")}
            </DonateButton>
          </Box>
        </DrawerContent>
      </Drawer>

      <DonationPaymentModal
        open={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
      />
    </>
  );
};

export default Header;
