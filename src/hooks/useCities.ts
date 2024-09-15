import { useState, useEffect } from "react";
import axios from "axios";
import { City } from "../types";

export const useCities = () => {
  const [cities, setCities] = useState<City[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = import.meta.env.VITE_API_TOKEN;

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          "https://api.real-estate-manager.redberryinternship.ge/api/regions",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCities(response.data);
      } catch (error) {
        setError("Error fetching regions");
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  return { cities, loading, error };
};
