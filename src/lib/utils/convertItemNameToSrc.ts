export function converItemNameToSrc(itemName: string) {
  return `assets/items/${itemName}.webp`.replace(':', '-');
}
