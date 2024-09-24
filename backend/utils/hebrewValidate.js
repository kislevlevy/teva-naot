export const hebAlphaNumericPar = (val) =>
  /^[\u0590-\u05FFa-zA-Z,\'\".\n\s-]+$/.test(val);
export const hebAlphaPar = (val) =>
  /^[\u0590-\u05FFa-zA-Z0-9,\'\".\n\s-]+$/.test(val);

export const hebAlphaNumericLine = (val) =>
  /^[\u0590-\u05FFa-zA-Z0-9,\'\s.-]+$/.test(val);
export const hebAlphaLine = (val) => /^[\u0590-\u05FFa-zA-Z,\'\s.-]+$/.test(val);
