import React, { useState } from "react";

export default function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = React.useCallback(() => {
    setValue((v) => !v);
  }, []);
  return [value, toggle];
}
