import React from "react";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

const ExampleButton: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Button variant='contained' color='primary'>
      {t("click_me", "Click me")}
    </Button>
  );
};

export default ExampleButton;
