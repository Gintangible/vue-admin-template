/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor', 'insurance-claim-admin'];
  return valid_map.indexOf(str.trim()) >= 0;
}

const CHINESE_NAME_REGEXP = /^[\u{4E00}-\u{9FEF}\u{3400}-\u{4DBF}\u{20000}-\u{2A6D6}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}\u{F900}-\u{FAD9}\u{2F800}-\u{2FA1F}][\u{4E00}-\u{9FEF}\u{3400}-\u{4DBF}\u{20000}-\u{2A6D6}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}\u{F900}-\u{FAD9}\u{2F800}-\u{2FA1F}·.]{0,28}[\u{4E00}-\u{9FEF}\u{3400}-\u{4DBF}\u{20000}-\u{2A6D6}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}\u{F900}-\u{FAD9}\u{2F800}-\u{2FA1F}]$/u;
const ENGLISH_NAME_REGEXP = /^[a-zA-Z][a-zA-Z .]{0,58}[a-zA-Z]$/;

export function validName(name) {
  return CHINESE_NAME_REGEXP.test(name) || ENGLISH_NAME_REGEXP.test(name);
}

const MOBILE_REGEXP = /^(0|86|17951)?(13[0-9]|14[5-9]|15[0-35-9]|16[5-6]|17[0-8]|18[0-9]|19[89])[0-9]{8}$/;

export function validMobile(mobile) {
  return MOBILE_REGEXP.test(mobile);
}
