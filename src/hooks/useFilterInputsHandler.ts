import { useState } from "react";
import { priceSchema, areaSchema } from "../schemas/filterSchema";

export const usePriceInput = (
  initialPriceSelector: [number, number] | null = null
) => {
  const [priceSelector, setPriceSelector] = useState<[number, number] | null>(
    initialPriceSelector
  );
  const [error, setError] = useState("");
  const [priceValidError, setPriceValidError] = useState("");

  const handlePriceInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    const value = e.target.value;
    const [min, max] = priceSelector || [0, 300000];

    const newPriceSelector: [number, number] =
      type === "min"
        ? [parseFloat(value) || 0, max]
        : [min, parseFloat(value) || 0];

    const [newMin, newMax] = newPriceSelector;

    if (newMin === newMax) {
      setPriceValidError("მინ და მაქს მნიშვნელობა არ უნდა იყოს ტოლი");
    }

    if (newMax < newMin) {
      setPriceValidError(
        "მინ მნიშვნელობა არ უნდა იყოს მეტი მაქს მნიშვნელობაზე"
      );
    }

    const result = priceSchema.safeParse({
      minPrice: newPriceSelector[0].toString(),
      maxPrice: newPriceSelector[1].toString(),
    });

    if (!result.success) {
      const errorMessages = result.error.errors
        .map((err) => err.message)
        .join(", ");
      setError(errorMessages);
    } else {
      if (newMin !== newMax && newMax > newMin) {
        setPriceValidError("");
      }
      setError("");
      setPriceSelector(newPriceSelector);
    }
  };

  return {
    priceSelector,
    error,
    priceValidError,
    setPriceValidError,
    setError,
    handlePriceInput,
    setPriceSelector,
  };
};

export const useAreaInput = (
  initialAreaSelector: [number, number] | null = null
) => {
  const [areaSelector, setAreaSelector] = useState<[number, number] | null>(
    initialAreaSelector
  );
  const [areaError, setAreaError] = useState("");
  const [chekError, setCheckError] = useState("");

  const handleAreaInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    const value = e.target.value;
    const [min, max] = areaSelector || [0, 300];

    const newAreaSelector: [number, number] =
      type === "min"
        ? [parseFloat(value) || 0, max]
        : [min, parseFloat(value) || 0];

    const [newMin, newMax] = newAreaSelector; // Destructure the updated values

    //Custom validation: Check if min equals max or if max is less than min
    if (newMin === newMax) {
      setCheckError("მინ და მაქს მნიშვნელობა არ უნდა იყოს ტოლი");
    }

    if (newMax < newMin) {
      setCheckError("მინ მნიშვნელობა არ უნდა იყოს მეტი მაქს მნიშვნელობაზე");
    }

    const result = areaSchema.safeParse({
      minArea: newAreaSelector[0].toString(),
      maxArea: newAreaSelector[1].toString(),
    });

    if (!result.success) {
      const errorMessages = result.error.errors
        .map((err) => err.message)
        .join(", ");
      setAreaError(errorMessages);
    } else {
      if (newMin !== newMax && newMax > newMin) {
        setCheckError("");
      }

      setAreaError("");
      setAreaSelector(newAreaSelector);
    }
  };

  return {
    areaSelector,
    areaError,
    chekError,
    setCheckError,
    setAreaError,
    handleAreaInput,
    setAreaSelector,
  };
};

export const useBedroomsInput = (
  initialBedroomsSelector: number | null = null
) => {
  const [bedroomsSelector, setBedroomsSelector] = useState<number | null>(
    initialBedroomsSelector
  );
  //const [bedroomsError, setBedroomsError] = useState("");

  const handleBedroomsSelect = (region: number) => {
    setBedroomsSelector(
      (prevBedrooms) =>
        prevBedrooms === region
          ? null // Remove if already selected
          : region // Add if not selected
    );
  };
  return { bedroomsSelector, setBedroomsSelector, handleBedroomsSelect };
};
