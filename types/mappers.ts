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
