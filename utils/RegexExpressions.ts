export function isEmailValid(email?: string): boolean {
  return !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isPasswordValid(pass?: string): boolean {
  // Regular expression for validating password (at least 6 characters and one special character)
  return !!pass && /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(pass);
}

export function isStringWithNoSpaces(value?: string): boolean {
  return !!value && /^\S+$/.test(value);
}
export function isEmpty(value: any): boolean {
  return (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "")
  );
}
