
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./en.json";
import ar from "./ar.json"

const resources = {
   en: { "common": en },
   ar: { "common": ar },
};

export const availableLanguages = Object.keys(resources);

i18n.use(initReactI18next)
   .use(LanguageDetector)
   .init({
      resources,
      defaultNS: "common",
      fallbackLng: "en",
   });

export default i18n;