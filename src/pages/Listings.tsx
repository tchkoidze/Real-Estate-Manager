import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { Filters, Property } from "../types";
import { Link } from "react-router-dom";
import DownArrow from "../icons/ArrowDown";
import { useRegions } from "../hooks/useRegions";
import { useFilterOpen } from "../hooks/useFilterOpen";
import { price, area } from "../data/filterData";
import Tooltip from "../components/Tooltip";
import { IoIosClose } from "react-icons/io";
import {
  useAreaInput,
  useBedroomsInput,
  usePriceInput,
} from "../hooks/useFilterInputsHandler";

const bedroomsQuantity = [1, 2, 3, 4];
const initialFilters: Filters = {
  region: [],
  price: null,
  area: null,
  bedrooms: null,
};

const Listings = ({
  setOpenAddAgent,
}: {
  setOpenAddAgent: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [realEstate, setRealEstate] = useState<Property[]>([]);

  const { regions } = useRegions();

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [regionselector, setRegionSelector] = useState<string[]>([]);
  const [filteredRealEstate, setFilteredRealEstate] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const {
    openDropDown,
    toggleDropdown,
    regionRef,
    priceRef,
    areaRef,
    bedroomsRef,
  } = useFilterOpen();

  // Handle region select
  const handleRegionSelect = (region: string) => {
    setRegionSelector(
      (prevRegions) =>
        prevRegions.includes(region)
          ? prevRegions.filter((reg) => reg !== region) // Remove if already selected
          : [...prevRegions, region] // Add if not selected
    );
  };

  const {
    priceSelector,
    error,
    priceValidError,
    setPriceValidError,
    handlePriceInput,
    setPriceSelector,
  } = usePriceInput();

  const {
    areaSelector,
    areaError,
    chekError,
    setCheckError,
    handleAreaInput,
    setAreaSelector,
  } = useAreaInput();

  const { bedroomsSelector, setBedroomsSelector, handleBedroomsSelect } =
    useBedroomsInput();

  // Fetch real estate data
  const fetchRealEstate = useCallback(async () => {
    const token = import.meta.env.VITE_API_TOKEN;
    setLoading(true); // Set loading to true when the request starts
    setFetchError(null);
    try {
      const response = await axios.get(
        "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRealEstate(response.data);
      // Apply filters if any are active
      filterRealEstate(response.data, initialFilters);
    } catch (error) {
      setFetchError(`Error fetching listings- ${error}`);
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRealEstate();
  }, [fetchRealEstate]);

  useEffect(() => {
    console.log("Real Estate Data:", realEstate);
  }, [realEstate]);

  // Apply filters to the real estate data
  const filterRealEstate = (data: Property[], filters: Filters) => {
    console.log("Applying Filters:", filters); // Check filters being applied
    const filteredData = data.filter((property: Property) => {
      const matchesRegion =
        filters.region.length === 0 ||
        filters.region.includes(property.city.region.name);
      const matchesPrice =
        !filters.price ||
        (property.price >= filters.price[0] &&
          property.price <= filters.price[1]);
      const matchesArea =
        !filters.area ||
        (property.area >= filters.area[0] && property.area <= filters.area[1]);
      const matchesBedrooms =
        filters.bedrooms === null || property.bedrooms === filters.bedrooms;

      return matchesRegion && matchesPrice && matchesArea && matchesBedrooms;
    });
    console.log("Filtered Data:", filteredData); // Check filtered data
    setFilteredRealEstate(filteredData);
  };

  useEffect(() => {
    if (JSON.stringify(filters) !== JSON.stringify(initialFilters)) {
      filterRealEstate(realEstate, filters);
    } else {
      setFilteredRealEstate(realEstate); // Show all data when filters are in initial state
    }
  }, [filters, realEstate]);

  const storedFilters = JSON.parse(localStorage.getItem("filtersData")!);
  useEffect(() => {
    if (storedFilters) {
      setFilters(storedFilters);
      setPriceSelector(storedFilters.price || [0, 300000]);
      setRegionSelector(storedFilters.region);
      setAreaSelector(storedFilters.area || [0, 300]);
      setBedroomsSelector(storedFilters.bedrooms || null);
      console.log(storedFilters.bedrooms);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("filtersData", JSON.stringify(filters));
  }, [filters]);

  if (loading) {
    return <div className="firago-medium text-xl">იტვირთება მონაცემები...</div>;
  }

  if (fetchError) {
    return <div className="firago-medium text-xl">{fetchError}</div>;
  }

  return (
    <main className="firago-regular">
      <section className="flex flex-col items-center">
        <div className="w-[1596px] flex justify-between text-base leading-[19.2px] pt-[77px] pb-8">
          {/* filter component */}

          <div>
            <div className="flex space-x-6 border border-[#DBDBDB] rounded-[10px] p-[6px]">
              <div ref={regionRef} className="relative">
                <button
                  onClick={() => toggleDropdown("region")}
                  className={`flex items-center gap-1 firago-medium text-[#021526] px-[14px] py-2 ${
                    openDropDown === "region" && "bg-[#F3F3F3] rounded-md"
                  }`}
                >
                  რეგიონი{" "}
                  <span
                    className={`${openDropDown === "region" && "rotate-180"}`}
                  >
                    <DownArrow />
                  </span>
                </button>
                <div
                  className={`${
                    openDropDown === "region" ? "block" : "hidden"
                  } absolute top-12 -left-2 z-10 min-w-[731px] bg-white border border-[#DBDBDB] rounded-[10px] p-6 shadow-[_5px_5px_12px_0px_rgba(2,21,38,0.08)]`}
                >
                  <h3 className="firago-medium">რეგიონის მიხედვით</h3>
                  <ul className="grid grid-cols-3 gap-y-4 text-[14px] leading-[17px] mt-6 mb-8">
                    {regions?.map((region) => (
                      <li key={region.name}>
                        <label
                          htmlFor={region.name.toString()}
                          className="w-full flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            name="region"
                            onChange={() => handleRegionSelect(region.name)}
                            checked={
                              //filters.region.includes(region.name) ||
                              regionselector.includes(region.name)
                            }
                            id={region.name.toString()}
                          />
                          {region.name}
                        </label>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        region: regionselector,
                      }));
                      toggleDropdown("region");
                    }}
                    className="block firago-medium text-[14px] text-white leading-[17px] bg-[#F93B1D] hover:bg-[#DF3014] focus:bg-[#DF3014] rounded-lg px-3 py-2 ml-auto"
                  >
                    არჩევა
                  </button>
                </div>
              </div>

              <div ref={priceRef} className="relative">
                <button
                  onClick={() => toggleDropdown("price")}
                  className={`flex items-center gap-1 firago-medium text-[#021526] px-[14px] py-2 ${
                    openDropDown === "price" && "bg-[#F3F3F3] rounded-md"
                  }`}
                >
                  საფასო კატეგორია{" "}
                  <span
                    className={`${openDropDown === "price" && "rotate-180"}`}
                  >
                    <DownArrow />
                  </span>
                </button>

                <div
                  className={`${
                    openDropDown === "price" ? "block" : "hidden"
                  } absolute top-12 -left-2 z-10 w-[382px] bg-white border border-[#DBDBDB] rounded-[10px] p-6 shadow-[_5px_5px_12px_0px_rgba(2,21,38,0.08)]`}
                >
                  <h3 className="firago-medium mb-6">ფასის მიხედვით</h3>
                  <div className="flex gap-[15px]">
                    <div className="w-1/2 flex items-center border border-[#808A93] px-3 py-2.5 rounded-md">
                      <input
                        type="text"
                        placeholder="დან"
                        className="w-full outline-none"
                        value={
                          priceSelector !== null && priceSelector[0] !== null
                            ? priceSelector[0]
                            : filters.price && filters.price[0]
                            ? filters.price[0]
                            : ""
                        }
                        onChange={(e) => handlePriceInput(e, "min")}
                      />
                      ₾
                    </div>
                    <div className="w-1/2 flex items-center border border-[#808A93] px-3 py-2.5 rounded-md">
                      <input
                        type="text"
                        placeholder="დან"
                        className="w-full outline-none"
                        value={
                          priceSelector !== null && priceSelector[1] !== null
                            ? priceSelector[1]
                            : filters.price && filters.price[1]
                            ? filters.price[1]
                            : ""
                        }
                        onChange={(e) => handlePriceInput(e, "max")}
                      />{" "}
                      ₾
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-y-4 text-[14px] leading-[17px] mt-6 mb-8">
                    <div>
                      <h4 className="firago-medium mb-4">მინ. ფასი</h4>
                      <ul className="space-y-2">
                        {price.map((price) => (
                          <li key={`min${String(price.price)}`}>
                            <label htmlFor={`minPrice${price.price}`}>
                              {price.price} ₾
                              <input
                                type="radio"
                                id={`minPrice${price.price}`}
                                onClick={() =>
                                  setPriceSelector((prevPrice) =>
                                    prevPrice
                                      ? [price.price, prevPrice[1]]
                                      : [price.price, 300000]
                                  )
                                }
                                className="hidden"
                              />
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="firago-medium mb-4">მაქს. ფასი</h4>
                      <ul className="space-y-2">
                        {price.map((price) => (
                          <li key={`max${String(price.price)}`}>
                            <label htmlFor={`maxPrice${price.price}`}>
                              {price.price} ₾
                              <input
                                type="radio"
                                id={`maxPrice${price.price}`}
                                onClick={() =>
                                  setPriceSelector((prevPrice) =>
                                    prevPrice
                                      ? [prevPrice[0], price.price]
                                      : [0, price.price]
                                  )
                                }
                                className="hidden"
                              />
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <p className="text-red-400">
                    {error}
                    {priceValidError}
                  </p>

                  <button
                    onClick={() => {
                      if (priceSelector?.[0] === priceSelector?.[1]) {
                        setPriceValidError(
                          "მინ და მაქს მნიშვნელობა არ უნდა იყოს ტოლი"
                        );
                        return;
                      } else if (
                        priceSelector &&
                        priceSelector?.[0] > priceSelector?.[1]
                      ) {
                        setPriceValidError(
                          "მინ მნიშვნელობა არ უნდა იყოს მეტი მაქს მნიშვნელობაზე"
                        );
                        return;
                      } else {
                        setPriceValidError("");
                      }
                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        price: priceSelector,
                      }));
                      toggleDropdown("price");
                    }}
                    className="block firago-medium text-[14px] text-white leading-[17px] bg-[#F93B1D] hover:bg-[#DF3014] focus:bg-[#DF3014] rounded-lg px-3 py-2 ml-auto"
                  >
                    არჩევა
                  </button>
                </div>
              </div>

              <div ref={areaRef} className="relative">
                <button
                  onClick={() => toggleDropdown("area")}
                  className={`flex items-center gap-1 firago-medium text-[#021526] px-[14px] py-2 ${
                    openDropDown === "area" && "bg-[#F3F3F3] rounded-md"
                  }`}
                >
                  ფართობი{" "}
                  <span
                    className={`${openDropDown === "area" && "rotate-180"}`}
                  >
                    <DownArrow />
                  </span>
                </button>

                <div
                  className={`${
                    openDropDown === "area" ? "block" : "hidden"
                  } absolute top-12 -left-2 z-10 w-[382px] bg-white border border-[#DBDBDB] rounded-[10px] p-6 shadow-[_5px_5px_12px_0px_rgba(2,21,38,0.08)]`}
                >
                  <h3 className="firago-medium mb-6">ფართობის მიხედვით</h3>
                  <div className="flex gap-[15px]">
                    <div className="w-1/2 flex items-center border border-[#808A93] px-3 py-2.5 rounded-md">
                      <input
                        type="text"
                        placeholder="დან"
                        className="w-full outline-none"
                        value={
                          // areaSelector !== null && areaSelector[0] !== null
                          //   ? areaSelector[0]
                          //   : filters.area && filters.area[0]
                          //   ? filters.area[0]
                          //   : ""
                          areaSelector !== null && areaSelector[0] !== null
                            ? areaSelector[0]
                            : ""
                        }
                        onChange={(e) => handleAreaInput(e, "min")}
                      />
                      <span>მ&sup2;</span>
                    </div>
                    <div className="w-1/2 flex items-center border border-[#808A93] px-3 py-2.5 rounded-md">
                      <input
                        type="text"
                        placeholder="დან"
                        className="w-full outline-none"
                        value={
                          areaSelector !== null && areaSelector[1] !== null
                            ? areaSelector[1]
                            : ""
                        }
                        onChange={(e) => handleAreaInput(e, "max")}
                      />{" "}
                      <span>მ&sup2;</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-y-4 text-[14px] leading-[17px] mt-6 mb-8">
                    <div>
                      <h4 className="firago-medium mb-4">მინ. ფასი</h4>
                      <ul className="space-y-2">
                        {area.map((area) => (
                          <li key={`minarea${String(area.area)}`}>
                            <label htmlFor={`minArea${area.area}`}>
                              {area.area} <span>მ&sup2;</span>
                              <input
                                type="radio"
                                id={`minArea${area.area}`}
                                onClick={() =>
                                  setAreaSelector((prevArea) =>
                                    prevArea
                                      ? [area.area, prevArea[1]]
                                      : [area.area, 300]
                                  )
                                }
                                className="hidden"
                              />
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="firago-medium mb-4">მაქს. ფასი</h4>
                      <ul className="space-y-2">
                        {area.map((area) => (
                          <li key={`maxarea${String(area.area)}`}>
                            <label htmlFor={`maxArea${area.area}`}>
                              {area.area} <span>მ&sup2;</span>{" "}
                              <input
                                type="radio"
                                id={`maxArea${area.area}`}
                                onClick={() =>
                                  setAreaSelector((prevArea) =>
                                    prevArea
                                      ? [prevArea[0], area.area]
                                      : [0, area.area]
                                  )
                                }
                                className="hidden"
                              />
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="text-red-400">
                    {areaError} {chekError}
                  </p>
                  <button
                    onClick={() => {
                      if (areaSelector?.[0] === areaSelector?.[1]) {
                        setCheckError(
                          "მინ და მაქს მნიშვნელობა არ უნდა იყოს ტოლი"
                        );
                        return;
                      } else if (
                        areaSelector &&
                        areaSelector?.[0] > areaSelector?.[1]
                      ) {
                        setCheckError(
                          "მინ მნიშვნელობა არ უნდა იყოს მეტი მაქს მნიშვნელობაზე"
                        );
                        return;
                      } else {
                        setCheckError("");
                      }
                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        area: areaSelector,
                      }));
                      toggleDropdown("area");
                    }}
                    className="block firago-medium text-[14px] text-white leading-[17px] bg-[#F93B1D] hover:bg-[#DF3014] focus:bg-[#DF3014] rounded-lg px-3 py-2 ml-auto"
                  >
                    არჩევა
                  </button>
                </div>
              </div>

              <div ref={bedroomsRef} className="relative">
                <button
                  onClick={() => toggleDropdown("bedrooms")}
                  className={`flex items-center gap-1 firago-medium text-[#021526] px-[14px] py-2 ${
                    openDropDown === "bedrooms" && "bg-[#F3F3F3] rounded-md"
                  }`}
                >
                  საძინებლების რაოდენობა{" "}
                  <span
                    className={`${openDropDown === "bedrooms" && "rotate-180"}`}
                  >
                    <DownArrow />
                  </span>
                </button>
                <div
                  className={`${
                    openDropDown === "bedrooms" ? "block" : "hidden"
                  } absolute top-12 -left-2 z-10 w-[282px] bg-white border border-[#DBDBDB] rounded-[10px] p-6 shadow-[_5px_5px_12px_0px_rgba(2,21,38,0.08)]`}
                >
                  <h3>საძინებლების რაოდენობა</h3>
                  <ul className="flex justify-between text-[14px] leading-[17px] mt-6 mb-8">
                    {bedroomsQuantity.map((room) => (
                      <li key={`room${String(room)}`} className="block">
                        <label
                          htmlFor={`room${String(room)}`}
                          className={`flex items-center justify-center w-[41px] border border-[#808A93] rounded-md p-2.5 ${
                            bedroomsSelector === room &&
                            "bg-[#808A93] text-white"
                          }`}
                        >
                          {room}
                          <input
                            type="radio"
                            id={`room${String(room)}`}
                            onChange={() =>
                              // setFilters((prevFilters) => ({
                              //   ...prevFilters,
                              //   bedrooms: room,
                              // }))
                              handleBedroomsSelect(room)
                            }
                            checked={bedroomsSelector === room}
                            className="hidden"
                          />
                        </label>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        bedrooms: bedroomsSelector,
                      }));
                      toggleDropdown("bedrooms");
                    }}
                    className="block firago-medium text-[14px] text-white leading-[17px] bg-[#F93B1D] hover:bg-[#DF3014] focus:bg-[#DF3014] rounded-lg px-3 py-2 ml-auto"
                  >
                    არჩევა
                  </button>
                </div>
              </div>
            </div>
            {/* selected values */}

            <div className="flex items-center gap-2 text-[14px] leading-[17px] mt-4">
              <ul className="flex flex-wrap gap-2">
                {filters.region.map((region, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        setFilters((prevFilters) => ({
                          ...prevFilters,
                          region: prevFilters.region.filter(
                            (r) => r !== region
                          ),
                        }));
                        setRegionSelector([]);
                      }}
                      className="flex items-center gap-1 text-[#021526CC] px-2.5 py-[6px] border border-[#DBDBDB] rounded-[43px]"
                    >
                      <span>{region}</span>
                      <IoIosClose size={16} className="shrink-0 " />
                    </button>
                  </li>
                ))}
              </ul>
              {filters.price &&
                filters.price[0] >= 0 &&
                filters.price[1] >= 0 && (
                  <button
                    onClick={() => {
                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        price: null,
                      }));
                      setPriceSelector(null);
                    }}
                    className="flex items-center gap-1 text-[#021526CC] px-2.5 py-[6px] border border-[#DBDBDB] rounded-[43px]"
                  >
                    <p>
                      <span> {filters.price[0]}₾ </span> -{" "}
                      <span>{filters.price[1]}₾</span>
                    </p>
                    <IoIosClose size={16} className="shrink-0 " />
                  </button>
                )}
              {filters.area && filters.area[0] >= 0 && filters.area[1] >= 0 && (
                <button
                  onClick={() => {
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      area: null,
                    }));
                    setAreaSelector(null);
                  }}
                  className="flex items-center gap-1 text-[#021526CC] px-2.5 py-[6px] border border-[#DBDBDB] rounded-[43px]"
                >
                  <p>
                    <span>{filters.area[0]} მ&sup2;</span> -{" "}
                    <span>{filters.area[1]} მ&sup2;</span>
                  </p>
                  <IoIosClose size={16} className="shrink-0 " />
                </button>
              )}

              {filters.bedrooms && (
                <button
                  onClick={() => {
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      bedrooms: null,
                    }));
                    setBedroomsSelector(null);
                  }}
                  className="flex items-center gap-1 text-[#021526CC] px-2.5 py-[6px] border border-[#DBDBDB] rounded-[43px]"
                >
                  <span>{filters.bedrooms}</span>
                  <IoIosClose size={16} className="shrink-0 " />
                </button>
              )}

              {(filters.region.length > 0 ||
                (filters.price &&
                  filters.price[0] >= 0 &&
                  filters.price[1] >= 0) ||
                filters.bedrooms !== null ||
                //(filters.area[0] > 0 && filters.area[1] > 0))
                (filters.area &&
                  filters.area[0] >= 0 &&
                  filters.area[1] >= 0)) && (
                <button
                  onClick={() => setFilters(initialFilters)}
                  className="firago-medium text-[#021526]"
                >
                  გასუფთავება
                </button>
              )}
            </div>
          </div>

          {/* button for add agent and list */}
          <div>
            <Link
              to={"/addListing"}
              className="text-center items-center text-white bg-[#F93B1D] hover:bg-[#DF3014] rounded-[10px] px-4 py-[14px] mr-4"
            >
              <span className="text-[22px]">+</span> ლისტინგის დამატება
            </Link>
            <button
              onClick={() => setOpenAddAgent(true)}
              className="text-center text-[#F93B1D] hover:text-white hover:bg-[#F93B1D] outline outline-1 outline-[#F93B1D] rounded-[10px] px-4 py-[14px]"
            >
              + აგენტის დამატება
            </button>
          </div>
        </div>

        {/* property cards */}

        <div className="max-w-[1596px] grid grid-cols-4 gap-5">
          {filteredRealEstate.length === 0 && (
            <p className="col-span-2 firago-medium text-[#F93B1D]">
              აღნიშნნული ფილტრით ინფორმაცია ვერ მოოიძებნა
            </p>
          )}

          {filteredRealEstate.map((property) => (
            <div
              key={property.id}
              className="relative max-w-[384px] rounded-[14px] shadow[_5px_5px_12px_0px_rgba(2,21,38,0.08)]"
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
          ))}
        </div>
      </section>
    </main>
  );
};

export default Listings;
