import { useEffect, useRef, useState } from "react";

export const useClickOutsideDropdown = () => {
  const [openDropDown, setOpenDropDown] = useState<string | null>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);
  const agentRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      (openDropDown === "agent" &&
        agentRef.current &&
        !agentRef.current.contains(event.target as Node)) ||
      (openDropDown === "region" &&
        regionRef.current &&
        !regionRef.current.contains(event.target as Node)) ||
      (openDropDown === "city" &&
        cityRef.current &&
        !cityRef.current.contains(event.target as Node))
    ) {
      setOpenDropDown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropDown]);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropDown(openDropDown === dropdown ? null : dropdown);
  };

  return {
    openDropDown,
    toggleDropdown,
    regionRef,
    cityRef,
    agentRef,
  };
};
