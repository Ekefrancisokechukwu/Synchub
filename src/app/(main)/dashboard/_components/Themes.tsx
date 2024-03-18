"use client";

import { useState } from "react";
import Theme from "./Theme";
import { themesCards } from "./data/themesCard";

const Themes = () => {
  const [currrentTheme, setCurrentTheme] = useState("default");

  return (
    <div className="mt-6 ">
      <h1 className="text-[1.1rem] text-neutral-900 font-semibold">Themes</h1>
      <div className="mt-3 bg-white rounded-lg p-5">
        <div className="grid gap-2 grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))]">
          {themesCards.map((theme, i) => {
            return (
              <Theme
                currrentTheme={currrentTheme}
                setCurrentTheme={setCurrentTheme}
                key={i}
                theme={theme}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Themes;
