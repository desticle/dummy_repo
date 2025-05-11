/**
 * Checks if a given string is a valid phone number in formats like 123-456-7890 or (123) 456-7890.
 *
 * @export
 * @param {string} phoneNumber - The phone number to validate.
 * @returns {boolean} True if the input is a valid phone number, otherwise false.
 */
export function isPhoneNumber(phoneNumber) {
  const phoneRegex = /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/;
  return phoneRegex.test(phoneNumber);
}

/**
 * Checks if a given string is a valid email address.
 *
 * @export
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the input is a valid email, otherwise false.
 */
export function isEmail(email) {
  const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return emailRegex.test(email);
}

/**
 * Checks if a given password is strong based on these rules:
 * - First character must be a letter
 * - Must be 4 to 15 characters long
 * - Can only contain letters, numbers, and underscores
 *
 * @export
 * @param {string} password - The password to validate.
 * @returns {boolean} True if the password is strong, otherwise false.
 */
export function isStrongPassword(password) {
  const pwRegex = /^[a-zA-Z]\w{3,14}$/;
  return pwRegex.test(password);
}

/**
 * Checks if a given string is a valid date in the format MM/DD/YYYY or similar.
 *
 * @export
 * @param {string} date - The date string to validate.
 * @returns {boolean} True if the input is a valid date, otherwise false.
 */
export function isDate(date) {
  const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  return dateRegex.test(date);
}

/**
 * Checks if a given string is a valid 3- or 6-digit hex color code (with or without a leading #).
 *
 * @export
 * @param {string} color - The color string to validate.
 * @returns {boolean} True if the input is a valid hex color, otherwise false.
 */
export function isHexColor(color) {
  const colorRegex = /^#?[A-Fa-f0-9]{3}([A-Fa-f0-9]{3})?$/;
  return colorRegex.test(color);
}
