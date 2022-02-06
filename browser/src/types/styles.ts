export function ButtonClass(background?: string) {
  return `${
    background ? `bg-${background}-200 hover:bg-${background}-100  ` : ""
  }${ButtonDefaultClass}`;
}

const ButtonDefaultClass = "glass-button md:px-6";
