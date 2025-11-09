import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "react-i18next";
import type { SelectChangeEvent } from "@mui/material";

const Header: React.FC = () => {
  const { lang, setLang } = useLanguage();
  const { i18n } = useTranslation();

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newLang = event.target.value as "en" | "ne";
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant='h6'>My App</Typography>
        </Box>
        <Select
          value={lang}
          onChange={handleChange}
          size='small'
          sx={{ color: "white" }}
        >
          <MenuItem value='en'>EN</MenuItem>
          <MenuItem value='ne'>NE</MenuItem>
        </Select>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
