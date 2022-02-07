export function ButtonClass(fields?: string) {
  if (fields?.includes("wide")) {
    return `${ButtonDefaultClass} w-1/2`;
  }
  return `${ButtonDefaultClass} ${fields}`;
}

const ButtonDefaultClass =
  "glass-button md:px-6 disabled:bg-gray-700 disabled:text-gray-300 disabled:shadow-none disabled:cursor-not-allowed";
