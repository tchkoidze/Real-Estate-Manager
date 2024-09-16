import { useEffect, useRef, useState } from "react";

export const useFilterOpen = () => {
  const [openDropDown, setOpenDropDown] = useState<string | null>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const bedroomsRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      (openDropDown === "region" &&
        regionRef.current &&
        !regionRef.current.contains(event.target as Node)) ||
      (openDropDown === "price" &&
        priceRef.current &&
        !priceRef.current.contains(event.target as Node)) ||
      (openDropDown === "area" &&
        areaRef.current &&
        !areaRef.current.contains(event.target as Node)) ||
      (openDropDown === "bedrooms" &&
        bedroomsRef.current &&
        !bedroomsRef.current.contains(event.target as Node))
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
    priceRef,
    areaRef,
    bedroomsRef,
  };
};
