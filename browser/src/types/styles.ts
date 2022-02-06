export function ButtonClass(fields?: string) {
  if (fields?.includes("wide")) {
    return `${ButtonDefaultClass} w-1/2`;
  }
  return `${ButtonDefaultClass} ${fields}`;
}

const ButtonDefaultClass = "glass-button md:px-6";
