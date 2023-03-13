export const toJS = (elementToConvert) => {
  return JSON.parse(JSON.stringify(elementToConvert))
}
