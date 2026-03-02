import { useState } from "react";
import { LuNewspaper, LuSparkles, LuEarth, LuBookmark } from "react-icons/lu";

const navItems = [
  { label: "Feed", icon: LuNewspaper },
  { label: "My Posts", icon: LuSparkles },
  { label: "Community", icon: LuEarth },
  { label: "Saved", icon: LuBookmark },
];

export default function LeftSidebar() {
  const [active, setActive] = useState("Feed");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="grid grid-cols-2 gap-1 lg:flex lg:flex-col lg:gap-0">
        {navItems.map(({ label, icon: Icon }) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={`cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition
                ${
                  isActive
                    ? "bg-[#e7f3ff] text-[#1877f2]"
                    : "text-slate-700 hover:bg-slate-100"
                }
                lg:mt-1 first:mt-0`}
            >
              <Icon size={17} aria-hidden="true" />
              {label}
            </button>
          );
        })}
    
      </div>
    </div>
  );
}
