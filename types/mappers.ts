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
