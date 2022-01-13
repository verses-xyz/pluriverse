export function ButtonClass(background?: string) {
  return `${
    background ? `bg-${background}-200 hover:bg-${background}-100  ` : ""
  }${ButtonDefaultClass}`;
}

export const ButtonLinkStyling = "underline font-light text-gray-300";

const ButtonDefaultClass =
  "hover:bg-gray-500 font-semibold py-2 px-4 border border-gray-400 rounded shadow disabled:bg-gray-700 disabled:text-gray-300  disabled:shadow-none";
