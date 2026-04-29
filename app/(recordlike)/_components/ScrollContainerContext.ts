import React from "react";

export const ScrollContainerContext = React.createContext<
  React.RefObject<HTMLDivElement | null>
>({ current: null });
