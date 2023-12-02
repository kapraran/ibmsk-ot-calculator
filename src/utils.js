export function toRGB(str, alpha) {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  const colors = [];
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 255;
    colors.push(value);
  }

  return alpha
    ? `rgba(${colors.join(", ")}, ${alpha})`
    : `rgb(${colors.join(", ")})`;
}
