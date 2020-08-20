// @ts-ignore
export const sum = (array: any[], key: string) => {
  return array.reduce((a, b) => a + (b[key] || 0), 0)
}
