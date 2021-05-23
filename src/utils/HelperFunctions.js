
export function arrayEquals(a, b) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    )
  }

export const minifyCSSString = (css) => css.replace(/\n/g, '').replace(/\s\s+/g, ' ')