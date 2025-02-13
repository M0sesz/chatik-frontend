import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "./Lang.jsx"; //

const LanguageSelector = () => {
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => changeLanguage("en")}
        className="flex items-center p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/800px-Flag_of_the_United_Kingdom_%283-5%29.svg.png"
          alt="English"
          className="w-5 h-5 mr-2"
        />
        {t("English")}
      </button>
      <button
        onClick={() => changeLanguage("uk")}
        className="flex items-center p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg"
          alt="Ukrainian"
          className="w-5 h-5 mr-2"
        />
        {t("Українська")}
      </button>
    </div>
  );
};

export default LanguageSelector;
