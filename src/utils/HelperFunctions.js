
export function OLDarrayEquals(a, b) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    )
  }

export const isSSR = () => {
  return typeof window === "undefined"
}