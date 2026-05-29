"use client";

import { useState } from "react";

export default function Chips({
  options,
  defaultActive = 0,
}: {
  options: string[];
  defaultActive?: number;
}) {
  const [active, setActive] = useState(defaultActive);
  return (
    <div className="chips">
      {options.map((label, i) => (
        <span
          key={label}
          className={`chip${i === active ? " active" : ""}`}
          onClick={() => setActive(i)}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
