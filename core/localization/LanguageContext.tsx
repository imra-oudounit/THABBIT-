// Re-export the existing LanguageContext so that new feature code can
// import from the core layer while legacy imports keep working.
export { LanguageProvider, useLanguage, type Locale } from "../../i18n/LanguageContext";
