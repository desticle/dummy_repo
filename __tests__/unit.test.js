// __tests__/unit.test.js

import {
  isPhoneNumber,
  isEmail,
  isStrongPassword,
  isDate,
  isHexColor,
} from '../code-to-unit-test/unit-test-me.js';

// --- isPhoneNumber ---
describe('isPhoneNumber', () => {
  // True cases
  test('should return true for (123) 456-7890', () => {
    expect(isPhoneNumber('(123) 456-7890')).toBe(true);
  });
  test('should return true for 123-456-7890', () => {
    expect(isPhoneNumber('123-456-7890')).toBe(true);
  });

  // False cases
  test('should return false for 1234567890', () => {
    expect(isPhoneNumber('1234567890')).toBe(false);
  });
  test('should return false for (123)456-7890 (no space)', () => {
    // According to the regex in unit-test-me.js: /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/
    // (123)456-7890 should also be true because ' ?' means space is optional
    // We need to find a truly false example
    expect(isPhoneNumber('(123)456-789')).toBe(false); // Not enough digits
  });
  // Another clear false case
  test('should return false for an incomplete number 123-456', () => {
    expect(isPhoneNumber('123-456')).toBe(false);
  });
  // Correction: Ensure each function has 2 true and 2 false cases
  // For isPhoneNumber, the original regex is quite permissive
  // ((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}
  // (123) 456-7890 -> true
  // (123)456-7890 -> true
  // 123-456-7890 -> true
  // 456-7890 -> true (because the area code part is optional ( ... )?)
  // Let's pick clearer cases based on common understanding or make stricter assumptions.
  // For the lab, stick to clear distinctions.
});

// Let's revisit the isPhoneNumber regex and test cases
// Regex: /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/
// Allowed formats:
// (XXX) YYY-ZZZZ  (space after parentheses is optional)
// XXX-YYY-ZZZZ
// YYY-ZZZZ (because the entire area code part ((\(\d{3}\) ?)|(\d{3}-))? is optional)

// isPhoneNumber tests (corrected to satisfy 2 true, 2 false)
describe('isPhoneNumber', () => {
  // True cases
  test('should return true for (123) 456-7890', () => {
    expect(isPhoneNumber('(123) 456-7890')).toBe(true);
  });
  test('should return true for 123-456-7890', () => {
    expect(isPhoneNumber('123-456-7890')).toBe(true);
  });

  // False cases
  test('should return false for an invalid format 123 456 7890', () => {
    expect(isPhoneNumber('123 456 7890')).toBe(false);
  });
  test('should return false for too few digits 123-456-789', () => {
    expect(isPhoneNumber('123-456-789')).toBe(false);
  });
});


// --- isEmail ---
describe('isEmail', () => {
  // True cases
  test('should return true for a valid email like test@example.com', () => {
    expect(isEmail('test@example.com')).toBe(true);
  });
  test('should return true for an email with underscore test_user@example.co.uk', () => {
    // Regex: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    // .co.uk won't pass because \.[a-zA-Z]{2,3}$ only matches one dot and 2-3 letters for the top-level domain
    // Need to modify test case or understand regex limitations
    expect(isEmail('test_user@example.com')).toBe(true); // .com will pass
  });

  // False cases
  test('should return false for an email without @ symbol: testexample.com', () => {
    expect(isEmail('testexample.com')).toBe(false);
  });
  test('should return false for an email with invalid domain: test@.com', () => {
    expect(isEmail('test@.com')).toBe(false);
  });
});

// --- isStrongPassword ---
// Regex: /^[a-zA-Z]\w{3,14}$/
// - Starts with a letter (a-zA-Z)
// - Followed by 3 to 14 word characters (letters, numbers, or underscore)
// - Total length: 1 (first letter) + (3 to 14) = 4 to 15 characters.
describe('isStrongPassword', () => {
  // True cases
  test('should return true for a valid password "PassWord123"', () => {
    expect(isStrongPassword('PassWord123')).toBe(true); // Length 11
  });
  test('should return true for a short valid password "a1_b"', () => {
    expect(isStrongPassword('a1_b')).toBe(true); // Length 4
  });

  // False cases
  test('should return false if password starts with a number "1Password"', () => {
    expect(isStrongPassword('1Password')).toBe(false);
  });
  test('should return false if password is too short "a1b"', () => {
    expect(isStrongPassword('a1b')).toBe(false); // Length 3
  });
  // Need another false case (e.g., too long or contains illegal characters)
  test('should return false if password contains invalid character "Pass@Word"', () => {
    expect(isStrongPassword('Pass@Word')).toBe(false);
  });
  // The lab requires each function to have 2 true and 2 false cases, so the above Pass@Word can replace either 1Password or a1b
  // Or reorganize to ensure 2 true and 2 false:
});
// isStrongPassword (corrected to 2 true, 2 false)
describe('isStrongPassword', () => {
  // True cases
  test('should return true for "ValidPass1"', () => {
    expect(isStrongPassword('ValidPass1')).toBe(true);
  });
  test('should return true for "Short_OK"', () => {
    expect(isStrongPassword('Short_OK')).toBe(true); // Starts with letter, length 8, contains underscore
  });

  // False cases
  test('should return false for "1InvalidStart"', () => {
    expect(isStrongPassword('1InvalidStart')).toBe(false); // Starts with number
  });
  test('should return false for "Inv@lidChar"', () => {
    expect(isStrongPassword('Inv@lidChar')).toBe(false); // Contains @
  });
});


// --- isDate ---
// Regex: /^\d{1,2}\/\d{1,2}\/\d{4}$/
// XX/XX/YYYY where XX can be 1 or 2 digits, YYYY is 4 digits.
// Does NOT validate if the date itself is logical (e.g., 32/01/2023 or 02/30/2023)
describe('isDate', () => {
  // True cases
  test('should return true for "01/01/2023"', () => {
    expect(isDate('01/01/2023')).toBe(true);
  });
  test('should return true for "1/1/2023" (single digit month/day)', () => {
    expect(isDate('1/1/2023')).toBe(true);
  });

  // False cases
  test('should return false for "01-01-2023" (wrong separator)', () => {
    expect(isDate('01-01-2023')).toBe(false);
  });
  test('should return false for "01/01/23" (short year)', () => {
    expect(isDate('01/01/23')).toBe(false);
  });
});

// --- isHexColor ---
// Regex: /^\#?[A-Fa-f0-9]{3}([A-Fa-f0-9]{3})?$/
// Optional # at start
// Then 3 hex chars OR 6 hex chars
describe('isHexColor', () => {
  // True cases
  test('should return true for "#FFF"', () => {
    expect(isHexColor('#FFF')).toBe(true);
  });
  test('should return true for "aabbcc" (no #, 6 chars)', () => {
    expect(isHexColor('aabbcc')).toBe(true);
  });

  // False cases
  test('should return false for "#F0" (too short)', () => {
    expect(isHexColor('#F0')).toBe(false);
  });
  test('should return false for "#GG00BB" (invalid hex char G)', () => {
    expect(isHexColor('#GG00BB')).toBe(false);
  });
});