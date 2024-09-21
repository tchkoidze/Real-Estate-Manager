import { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { Region } from "../types";

export const useRegions = () => {
  const [regions, setRegions] = useState<Region[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = import.meta.env.VITE_API_TOKEN;

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get(
          "https://api.real-estate-manager.redberryinternship.ge/api/regions",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRegions(response.data);
      } catch (error) {
        setError("Error fetching regions");
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  return { regions, loading, error };
};
