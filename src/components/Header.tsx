import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
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
import Paper from "@mui/material/Paper";
import ListItemIcon from "@mui/material/ListItemIcon";
import EventIcon from "@mui/icons-material/Event";
import DescriptionIcon from "@mui/icons-material/Description";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PublicIcon from "@mui/icons-material/Public";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import desnLogo from "../assets/DESN_logo_500x500.jpg";
import SearchService from "../services/SearchService";
import type { SearchItem } from "../services/SearchService";

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
    display: "none",
  },
}));

const SearchField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    // default notched outline appearance
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#004c91 !important",
      borderWidth: "2px !important",
      borderStyle: "solid !important",
    },

    // Icon colors - default
    "& .MuiInputAdornment-positionStart svg": {
      color: "#004c91",
      transition: "color 0.2s ease",
    },

    // hover: stronger blue border and darker icons
    "&:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: "2px !important",
        borderColor: "#003d73 !important",
        borderStyle: "solid !important",
      },
      "& .MuiInputAdornment-positionStart svg": {
        color: "#003d73",
      },
    },

    // focus: prominent 3px solid dark blue border and white icon
    "&.Mui-focused": {
      outline: "none !important",
      boxShadow: "0 0 0 4px rgba(0, 76, 145, 0.15) !important",
      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: "3px !important",
        borderColor: "#002b52 !important",
        borderStyle: "solid !important",
      },
      "& .MuiInputAdornment-positionStart svg": {
        color: "#ffffff",
      },
    },

    // prevent browser default focus-visible on inner input
    "& input:focus-visible": {
      outline: "none !important",
      boxShadow: "none !important",
    },

    "& input::placeholder": { color: "#004c91", opacity: 1 },
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
  gap: theme.spacing(2.5),
  alignItems: "center",
  flex: 1,
  justifyContent: "flex-start",
  [theme.breakpoints.down("lg")]: {
    display: "none", // Hide desktop nav on tablet and mobile
  },
}));

const NavLink = styled(RouterLink)(() => ({
  color: "#333",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: 400,
  padding: "8px 12px",
  position: "relative",
  display: "inline-block",
  transition: "all 0.2s ease",
  "&:hover": {
    color: "#004c91",
    fontWeight: 700,
  },
  "&:focus": {
    outline: "2px solid #004c91",
    outlineOffset: "2px",
    borderRadius: "4px",
    color: "#004c91",
    fontWeight: 700,
  },
}));

// Lightweight plain button built on ButtonBase so we can fully control styles
const PlainButton = styled(ButtonBase)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1, 2),
  background: "transparent",
  border: "none",
  color: "#333",
  textTransform: "none",
  fontSize: "16px",
  cursor: "pointer",
  borderRadius: 6,
  transition:
    "background-color 0.2s ease, color 0.2s ease, transform 0.1s ease",
  "&:hover": {
    color: "#ffffff",
    backgroundColor: "rgba(0, 76, 145, 0.9)",
  },
  "&:focus": {
    outline: "3px solid #f6d469",
    outlineOffset: "2px",
    color: "#ffffff",
    backgroundColor: "rgba(0, 76, 145, 0.9)",
  },
  "& svg": {
    fontSize: 20,
  },
  WebkitAppearance: "none",
  MozAppearance: "none",
}));

const DonateButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#f6d469",
  color: "#2b2b2b",
  textTransform: "uppercase",
  fontSize: "1rem",
  fontWeight: 700,
  padding: theme.spacing(1.5, 4),
  borderRadius: "100px",
  boxShadow: "0px 4px 12px rgba(246, 212, 105, 0.4)",
  transition: "all 0.3s ease",
  letterSpacing: "0.02em",
  "&:hover, &:focus": {
    backgroundColor: "#f5c943",
    transform: "translateY(-2px)",
    boxShadow: "0px 8px 20px rgba(246, 212, 105, 0.6)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.25, 3),
    fontSize: "0.875rem",
  },
}));

const MobileNavBar = styled(Box)(({ theme }) => ({
  display: "none",
  backgroundColor: "#ffffff",
  padding: theme.spacing(1.5, 2),
  borderBottom: "1px solid #e0e0e0",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    display: "flex",
  },
}));

const MobileLogo = styled("img")(({ theme }) => ({
  height: "50px",
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    height: "45px",
  },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  color: "#333",
  [theme.breakpoints.down("lg")]: {
    display: "flex",
  },
}));

const MobileDonateButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.warning.main,
  color: "#2b2b2b",
  fontWeight: 700,
  fontSize: "0.875rem",
  textTransform: "uppercase",
  padding: theme.spacing(1, 2.5),
  borderRadius: "100px",
  boxShadow: "0px 4px 12px rgba(246, 212, 105, 0.4)",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.warning.dark,
    transform: "translateY(-2px)",
    boxShadow: "0px 6px 16px rgba(246, 212, 105, 0.6)",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8125rem",
    padding: theme.spacing(0.875, 2),
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
  // Donations route directly to PayPal; modal removed
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    // Initialize search index on mount
    SearchService.buildIndex().catch((err) => {
      console.error("Failed to build search index", err);
    });
  }, []);

  useEffect(() => {
    // Close results when clicking outside
    const onDocClick = (e: MouseEvent) => {
      if (!searchRef.current) return;
      if (!searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const id = setTimeout(async () => {
      try {
        const results = await SearchService.search(searchQuery, 8);
        setSearchResults(results);
        setSearchOpen(true);
        setActiveIndex(-1);
      } catch {
        setSearchResults([]);
      }
    }, 250);

    return () => clearTimeout(id);
  }, [searchQuery]);

  const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setSearchOpen(false);
      return;
    }

    // Only handle arrow and enter keys if dropdown is open
    if (!searchOpen || searchResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, searchResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      // Only select a result if one is actively highlighted
      if (activeIndex >= 0) {
        const sel = searchResults[activeIndex];
        if (sel) {
          setSearchOpen(false);
          setSearchQuery("");
          navigate(sel.url);
        }
      } else {
        // If no result is highlighted, submit the search form instead
        handleSearchSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
      }
    }
  };

  const handleSearchSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setLangAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = (newLang?: "en" | "ne" | "new" | "mai") => {
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
    <Box
      component='header'
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
        backgroundColor: "white",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* Top Utility Bar - Logo, Language, Login, Search */}
      <Box>
        <TopBar>
          <TopBarLeft>
            <LogoLink to='/'>
              <Logo
                src={desnLogo}
                alt='Disability Empowerment Society Nepal (DESN), established in the year 2060 Bikram Sambat (2003 AD)'
                style={{ height: "90px" }}
              />
            </LogoLink>
          </TopBarLeft>{" "}
          <TopBarRight>
            <PlainButton
              onClick={handleLanguageClick}
              disableRipple
              sx={{ display: { xs: "none", md: "flex" } }}
              aria-label={t("aria.globe_menu")}
              type='button'
            >
              <PublicIcon
                titleAccess='Global Translation Menu'
                aria-hidden='true'
                sx={{ mr: 1 }}
              />
              <span>
                {lang === "en"
                  ? "English"
                  : lang === "ne"
                  ? "नेपाली"
                  : lang === "new"
                  ? "नेवारी"
                  : "मैथिली"}
              </span>
              <KeyboardArrowDownIcon sx={{ ml: 1 }} />
            </PlainButton>
            <Menu
              anchorEl={langAnchorEl}
              open={Boolean(langAnchorEl)}
              onClose={() => handleLanguageClose()}
            >
              <MenuItem onClick={() => handleLanguageClose("en")}>
                {t("header.language_english")}
              </MenuItem>
              <MenuItem onClick={() => handleLanguageClose("ne")}>
                {t("header.language_nepali")}
              </MenuItem>
              <MenuItem onClick={() => handleLanguageClose("new")}>
                {t("header.language_newari")}
              </MenuItem>
              <MenuItem onClick={() => handleLanguageClose("mai")}>
                {t("header.language_maithili")}
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
                      {t("header.my_events")}
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
                      {t("header.admin_dashboard")}
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ mr: 1 }} fontSize='small' />
                    {t("header.logout")}
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <PlainButton
                onClick={handleLogin}
                disableRipple
                aria-label={t("aria.user_login")}
                type='button'
                sx={{
                  color: "#004c91",
                  textTransform: "none",
                  fontSize: "14px",
                  display: { xs: "none", md: "flex" },
                  // keep styles minimal and rely on MUI accessibility defaults
                  "&:hover": {
                    color: "#ffffff",
                    backgroundColor: "rgba(0, 76, 145, 0.9)",
                  },
                  "&:focus": {
                    outline: "3px solid #f6d469",
                    outlineOffset: "2px",
                    color: "#ffffff",
                    backgroundColor: "rgba(0, 76, 145, 0.9)",
                  },
                }}
              >
                <LoginIcon
                  titleAccess='User Login Portal'
                  aria-hidden='true'
                  sx={{ mr: 1 }}
                />
                {t("header.login")}
              </PlainButton>
            )}

            <Box
              component='form'
              onSubmit={handleSearchSubmit}
              sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
            >
              <SearchField
                placeholder={t("header.search_placeholder")}
                variant='outlined'
                size='small'
                aria-label={t("aria.search_bar")}
                inputProps={{
                  "aria-label": "Search bar",
                }}
                sx={{
                  width: { xs: "200px", md: "300px" },
                }}
                ref={searchRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchResults.length > 0) setSearchOpen(true);
                }}
                onKeyDown={onSearchKeyDown}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        type='submit'
                        size='small'
                        edge='end'
                        onClick={handleSearchSubmit}
                        aria-label={t("aria.search_submit", {
                          defaultValue: "Search",
                        })}
                        sx={{
                          color: "#004c91",
                          "&:hover": {
                            backgroundColor: "rgba(0, 76, 145, 0.08)",
                          },
                          "&:focus-visible": {
                            color: "#ffffff",
                            backgroundColor: "#002b52",
                            outline: "3px solid #f6d469",
                            outlineOffset: "2px",
                          },
                        }}
                      >
                        <SearchIcon sx={{ fontSize: "20px" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Search results dropdown */}
            {searchOpen && searchResults.length > 0 && (
              <Box
              // sx={{ position: "absolute", right: 120, top: 64, zIndex: 1400 }}
              >
                <Paper
                  elevation={3}
                  sx={{ width: 360, maxWidth: "clamp(260px, 40vw, 480px)" }}
                  role='region'
                  aria-label={t("aria.search_results")}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      width: "1px",
                      height: "1px",
                      padding: 0,
                      margin: "-1px",
                      overflow: "hidden",
                      clip: "rect(0, 0, 0, 0)",
                      whiteSpace: "nowrap",
                      border: 0,
                    }}
                    role='status'
                    aria-live='polite'
                    aria-atomic='true'
                  >
                    {searchResults.length} result
                    {searchResults.length !== 1 ? "s" : ""} found
                  </Box>
                  <List dense>
                    {searchResults.map((r, idx) => (
                      <ListItem key={r.id} disablePadding>
                        <ListItemButton
                          selected={idx === activeIndex}
                          onMouseEnter={() => setActiveIndex(idx)}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery("");
                            navigate(r.url);
                          }}
                          aria-label={`${r.title}, ${r.type}, ${
                            r.matchText || r.excerpt || ""
                          }`}
                        >
                          <ListItemIcon>
                            {r.type === "event" ? (
                              <EventIcon fontSize='small' />
                            ) : r.type === "resource" ? (
                              <DescriptionIcon fontSize='small' />
                            ) : (
                              <MenuBookIcon fontSize='small' />
                            )}
                          </ListItemIcon>
                          <ListItemText
                            primary={r.title}
                            secondary={
                              <>
                                <Box
                                  component='span'
                                  sx={{
                                    display: "block",
                                    fontSize: "0.75rem",
                                    color: "text.secondary",
                                    textTransform: "uppercase",
                                    fontWeight: 600,
                                    mb: 0.5,
                                  }}
                                >
                                  {r.type === "page"
                                    ? "Page"
                                    : r.type === "resource"
                                    ? "Resource"
                                    : "Event"}
                                </Box>
                                {r.matchText && (
                                  <Box
                                    component='span'
                                    sx={{
                                      display: "block",
                                      fontSize: "0.875rem",
                                      color: "text.primary",
                                      lineHeight: 1.5,
                                    }}
                                  >
                                    {r.matchText}
                                  </Box>
                                )}
                              </>
                            }
                            primaryTypographyProps={{
                              sx: { fontWeight: 600, mb: 0.5 },
                            }}
                            secondaryTypographyProps={{
                              component: "div",
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Box>
            )}

            <MobileMenuButton
              edge='end'
              aria-label={t("aria.navigation_menu")}
              onClick={toggleMobileMenu}
            >
              <MenuIcon titleAccess='Navigation Menu' />
            </MobileMenuButton>
          </TopBarRight>
        </TopBar>

        {/* Mobile Navigation Bar */}
        <MobileNavBar>
          <MobileMenuButton
            edge='start'
            aria-label={t("aria.navigation_menu")}
            onClick={toggleMobileMenu}
          >
            <MenuIcon />
          </MobileMenuButton>

          <LogoLink to='/'>
            <MobileLogo
              src={desnLogo}
              alt='Disability Empowerment Society Nepal (DESN), established in the year 2060 Bikram Sambat (2003 AD)'
            />
          </LogoLink>

          <MobileDonateButton
            onClick={() =>
              window.open("https://www.paypal.com/us/home", "_blank")
            }
            aria-label={t("aria.donate_header")}
          >
            {t("header.donate")}
          </MobileDonateButton>
        </MobileNavBar>

        {/* Main Navigation Bar - Hidden on mobile/tablet */}
        <AppBar
          position='static'
          elevation={1}
          component='nav'
          sx={{
            display: { xs: "none", lg: "block" },
          }}
        >
          <NavBar>
            <NavLinks>
              {navItems.map((item) => (
                <NavLink key={item.path} to={item.path} aria-label={item.label}>
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
              <DonateButton
                onClick={() =>
                  window.open("https://www.paypal.com/us/home", "_blank")
                }
                aria-label={t("aria.donate_header")}
              >
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
            <IconButton
              onClick={toggleMobileMenu}
              sx={{ color: "white" }}
              aria-label={t("aria.close")}
            >
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
                <ListItemText primary={lang === "en" ? "English" : "नेपाली"} />
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
                      <ListItemText primary={t("header.my_events")} />
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
                      <ListItemText primary={t("header.admin_dashboard")} />
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
                    <ListItemText primary={t("header.logout")} />
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
                  <ListItemText primary={t("header.login")} />
                </ListItemButton>
              </ListItem>
            )}
          </List>
          <Box sx={{ p: 2 }}>
            <DonateButton
              fullWidth
              onClick={() => {
                window.open("https://www.paypal.com/us/home", "_blank");
                setMobileMenuOpen(false);
              }}
            >
              {t("header.donate")}
            </DonateButton>
          </Box>
        </DrawerContent>
      </Drawer>

      {/* Donation modal removed; header donate buttons open PayPal directly */}
    </Box>
  );
};

export default Header;
