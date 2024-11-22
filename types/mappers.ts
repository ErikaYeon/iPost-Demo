import { language as LANGUAGE, theme as THEME } from "./apiContracts";
import { Crown } from "./models";

export function levelToCrown(level: number): Crown {
  switch (level) {
    case 1: {
      return Crown.GREY;
    }
    case 2: {
      return Crown.BRONCE;
    }
    case 3: {
      return Crown.SILVER;
    }
    default: {
      return Crown.GOLD;
    }
  }
}
// export function levelToLanguage(level: language): string {
//   if (level === language.ENGLISH) {
//     return "Inglés";
//   } else {
//     return "Español";
//   }
// switch (level) {
//   case lavel === 'ENGLISH': {
//     return "Inglés";
//   }
//   default: {
//     return "Español";
//   }
// }
// }

// export function levelTotheme(level: THEME): string {
//   switch (level) {
//     case THEME.DARK: {
//       return "dark";
//     }
//     default: {
//       return "light";
//     }
//   }
// }
export function levelToLanguage(level: LANGUAGE): string {
  switch (level) {
    case LANGUAGE.SPANISH: {
      return "Español";
    }
    default: {
      return "Inglés";
    }
  }
}
export function themeToLevel(level: string): string {
  switch (level) {
    case "dark": {
      return "DARK";
    }
    default: {
      return "LIGHT";
    }
  }
}
export function languageToLevel(level: string): string {
  switch (level) {
    case "Español": {
      return "SPANISH";
    }
    default: {
      return "ENGLISH";
    }
  }
}
export function levelTotheme(level: THEME): string {
  if (level === THEME.DARK) {
    return "dark";
  } else {
    return "light";
  }
}
// switch (level) {
//   case 1: {
//     return "light";
//   }
//   default: {
//     return "dark";
//   }
// }
// }
// export const levelTotheme = (theme: THEME): "light" | "dark" => {
//   return theme === THEME.LIGHT ? "light" : "dark";
// };

// export const levelToLanguage = (language: LANGUAGE): "Español" | "Inglés" => {
//   return language === LANGUAGE.SPANISH ? "Español" : "Inglés";
// };
