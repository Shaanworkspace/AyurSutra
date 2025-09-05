const NormalizeName = (raw) => {
  const guess = raw.replace(/([a-z])([A-Z])/g, '$1 $2');
  const [first, ...rest] = guess.trim().split(/\s+/);
  return [first, rest.join(' ')].filter(Boolean).join(' ');
};

export { NormalizeName };