import React, { memo, useState } from "react";
import { motion } from "framer-motion";

const NewToggler = memo(function Toggler({ value, items = [], onChange }) {
  const [active, setActive] = useState("");
  console.log(items);
  return (
    <>
      <div className="border border-gray-300 rounded-2xl flex items-center overflow-hidden h-fit">
        {items.map((item) => (
          <button
            key={item.key}
            value={item.key}
            className="relative h-full text-xs px-2 py-0.5"
            onClick={(e) => setActive(e.target.value)}
          >
            {item.label}
            {active === item.key && (
              <motion.div
                layoutId="pill"
                className="absolute inset-0 h-full w-full rounded-full mix-blend-exclusion"
                style={{
                  background:
                    "linear-gradient(90deg, #90cea1, #3cbec9, #01b4e4)",
                }}
              />
            )}
          </button>
        ))}
      </div>
    </>
  );
});

export default NewToggler;
