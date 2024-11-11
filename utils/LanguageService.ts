interface Translations {
  welcome_message: string;
  error_message: string;
}

class LanguageService {
  private translations: Translations;

  constructor(private language: string) {
    this.translations = this.loadTranslations(language);
  }

  private loadTranslations(language: string): Translations {
    if (language === "es") {
      return require("./translations/messages.es.json");
    } else {
      return require("./translations/messages.en.json");
    }
  }

  public getMessage(key: keyof Translations): string {
    return this.translations[key];
  }
}

export default LanguageService;
