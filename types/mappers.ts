import { Gender } from "./apiContracts";
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
    case "es": {
      return "SPANISH";
    }
    case "en": {
      return "ENGLISH";
    }
    default: {
      return "ENGLISH";
    }
  }
}

export function genderToString(gender: string): string {
  switch (gender) {
    case "MEN": {
      return "Hombre";
    }
    case "WOMAN": {
      return "Mujer";
    }
    case "NON_BINARY": {
      return "No binario";
    }
    default: {
      return "Prefiero no decirlo";
    }
  }
}
export function genderToStringEN(gender: string): string {
  switch (gender) {
    case "MEN": {
      return "Men";
    }
    case "WOMAN": {
      return "Women";
    }
    case "NON_BINARY": {
      return "Non binary";
    }
    default: {
      return "Prefer not to answer";
    }
  }
}

export function stringToGender(gender: string): Gender {
  switch (gender) {
    case "Mujer": {
      return Gender.WOMAN;
    }
    case "Hombre": {
      return Gender.MEN;
    }
    case "No binario": {
      return Gender.NON_BINARY;
    }
    default: {
      return Gender.PREFER_NOT_TO_ANSWER;
    }
  }
}
export function stringToGenderEN(gender: string): Gender {
  switch (gender) {
    case "Women": {
      return Gender.WOMAN;
    }
    case "Men": {
      return Gender.MEN;
    }
    case "Non binary": {
      return Gender.NON_BINARY;
    }
    default: {
      return Gender.PREFER_NOT_TO_ANSWER;
    }
  }
}
