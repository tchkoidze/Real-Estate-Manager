import { useEffect, useState } from "react";
import { useGetAllRealestate } from "../hooks/useGetAllRealestate";
import Tooltip from "./Tooltip";
import { Link, useParams } from "react-router-dom";
import { HiLocationMarker } from "react-icons/hi";
import { Property } from "../types";

const Scroll = ({ filterRegion }: { filterRegion: string }) => {
  const { realEstates } = useGetAllRealestate();
  const { id } = useParams<{ id: string }>();
  const [cardData, setCardData] = useState<Property[]>([]);

  useEffect(() => {
    // if (realEstates) {
    //   // Filter realEstates based on filterRegion
    //   const filteredData = realEstates.filter(
    //     (estate) => estate.city.region.name === filterRegion
    //   );
    //   setCardData(filteredData);
    // }
    if (realEstates) {
      // Filter realEstates based on filterRegion and exclude estate with the given id
      const filteredData = realEstates.filter(
        (estate) =>
          estate.city.region.name === filterRegion &&
          estate.id.toString() !== id
      );
      setCardData(filteredData);
    }
  }, [realEstates, filterRegion]); // Re-run when realEstates or filterRegion changes

  const visibleProperty = cardData?.slice(0, 4);

  const scroll = (direction: "forward" | "backward") => {
    const updatedCards = [...cardData]; // Create a shallow copy to avoid mutating state directly

    if (direction === "forward") {
      const firstCard = updatedCards.shift(); // Remove first element
      console.log("foeward is clicked");
      console.log(firstCard);
      if (firstCard) {
        console.log(55);
        setCardData([...updatedCards, firstCard]); // Append to the end
      }
    } else {
      const lastCard = updatedCards.pop(); // Remove last element
      if (lastCard) {
        setCardData([lastCard, ...updatedCards]); // Prepend to the start
      }
    }
  };

  if (cardData.length === 0) {
    return <p>ბინები მსგავსი ლოკაციით ვერ მოიძებნა!</p>;
  }

  return (
    <div className="relative max-w-[1596px]  flex items-center justify-center gap-2 md:gap-4">
      {
        <button
          onClick={() => scroll("backward")}
          className="absolute top-1/2 -left-20 -translate-y-1/2 "
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8839 24.6339C15.3957 25.122 14.6043 25.122 14.1161 24.6339L5.36612 15.8839C4.87796 15.3957 4.87796 14.6043 5.36612 14.1161L14.1161 5.36612C14.6043 4.87796 15.3957 4.87796 15.8839 5.36612C16.372 5.85427 16.372 6.64573 15.8839 7.13388L9.26777 13.75L23.75 13.75C24.4404 13.75 25 14.3096 25 15C25 15.6904 24.4404 16.25 23.75 16.25H9.26777L15.8839 22.8661C16.372 23.3543 16.372 24.1457 15.8839 24.6339Z"
              fill="#021526"
            />
          </svg>
        </button>
      }
      <div
        className="w-full flex items-start justify-between gap-5 overflow-x-auto scroll-smooth scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {visibleProperty?.map((property, index) => (
          <div key={index}>
            <div
              key={property.id}
              className="relative w-[384px] rounded-[14px] shadow[_5px_5px_12px_0px_rgba(2,21,38,0.08)]"
            >
              <Tooltip text="დააჭირე სანახავად">
                <Link to={`/property/${property.id}`}>
                  <img
                    src={property.image}
                    alt="real estate img"
                    className="w-full h-[307px] object-cover rounded-t-[14px]"
                  />
                </Link>
              </Tooltip>

              <div className="text-base leading-[19.2px] bg-white border-x border-b border-[#DBDBDB] rounded-b-[14px] px-6 py-5">
                <p className="text-start firago-bold text-[28px] leading-[34px]">
                  {property.price} <span>₾</span>
                </p>
                <div className="flex items-center gap-1 mt-4 mb-5">
                  <HiLocationMarker />{" "}
                  <span>
                    {property.city.name}, {property.address}
                  </span>
                </div>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-1">
                    <img src="/bed.svg" alt="bed" />{" "}
                    <span>{property.bedrooms}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <img src="/area.svg" alt="area" />{" "}
                    <span>{property.area} </span> <span>მ&sup2;</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <img src="/direction.svg" alt="zip code" />{" "}
                    <span>{property.zip_code}</span>
                  </div>
                </div>
              </div>
              <p className="absolute top-[23px] left-[23px] rounded-[15px] firago-medium text-xs leading-[14px] text-white bg-[#02152680] px-2.5 py-[6px]">
                {property.is_rental === 1 ? "ქირავდება" : "იყიდება"}
              </p>
            </div>
          </div>
        ))}
      </div>
      {
        <button
          onClick={() => scroll("forward")}
          className="absolute top-1/2 -right-20 -translate-y-1/2"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.1161 5.36612C14.6043 4.87796 15.3957 4.87796 15.8839 5.36612L24.6339 14.1161C25.122 14.6043 25.122 15.3957 24.6339 15.8839L15.8839 24.6339C15.3957 25.122 14.6043 25.122 14.1161 24.6339C13.628 24.1457 13.628 23.3543 14.1161 22.8661L20.7322 16.25H6.25C5.55964 16.25 5 15.6904 5 15C5 14.3096 5.55964 13.75 6.25 13.75H20.7322L14.1161 7.13388C13.628 6.64573 13.628 5.85427 14.1161 5.36612Z"
              fill="#021526"
            />
          </svg>
        </button>
      }
    </div>
  );
};

export default Scroll;
