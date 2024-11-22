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

// export function levelTotheme(level: number): string {
//   switch (level) {
//     case 1: {
//       return "dark";
//     }
//     default: {
//       return "light";
//     }
//   }
// }
// export function levelToLanguage(level: number): string {
//   switch (level) {
//     case 1: {
//       return "Español";
//     }
//     default: {
//       return "Inglés";
//     }
//   }
// }
// export function levelTotheme(level: theme): string {
//   if (level === theme.LIGHT) {
//     return "light";
//   } else {
//     return "dark";
//   }
// switch (level) {
//   case 1: {
//     return "light";
//   }
//   default: {
//     return "dark";
//   }
// }
// }
export const levelTotheme = (theme: THEME): "light" | "dark" => {
  return theme === THEME.LIGHT ? "light" : "dark";
};

export const levelToLanguage = (language: LANGUAGE): "Español" | "Inglés" => {
  return language === LANGUAGE.SPANISH ? "Español" : "Inglés";
};
