import { useState, useEffect } from "react";
import axios from "axios";
import { Property } from "../types";

export const useGetAllRealestate = () => {
  const [realEstates, setRealEstates] = useState<Property[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = import.meta.env.VITE_API_TOKEN;

  useEffect(() => {
    const fetchRealEstates = async () => {
      try {
        const response = await axios.get(
          "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRealEstates(response.data);
        console.log("Real estate listings:", response.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setError("Error fetching real estate listings");
      } finally {
        setLoading(false);
      }
    };

    fetchRealEstates();
  }, []); // Empty dependency array ensures it only runs once when the component mounts

  return { realEstates, loading, error };
};
