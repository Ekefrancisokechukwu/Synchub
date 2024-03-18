import React from "react";

export const useTheme = (containerRef: React.Ref<HTMLDivElement>) => {
  const ref = containerRef;
  return {
    ref,
  };
};
