import axios from "axios";
import { useEffect, useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { Property } from "../types";
import { Link } from "react-router-dom";
import DownArrow from "../icons/ArrowDown";
import { useRegions } from "../hooks/useRegions";
import { useFilterOpen } from "../hooks/useFilterOpen";
import { price } from "../data/filterData";
import Tooltip from "../components/Tooltip";

const bedroomsQuantity = [1, 2, 3, 4];

const Listings = ({
  setOpenAddAgent,
}: {
  setOpenAddAgent: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [realEstate, setRealEstate] = useState<Property[]>([]);

  const { regions } = useRegions();

  const {
    openDropDown,
    toggleDropdown,
    regionRef,
    priceRef,
    areaRef,
    bedroomsRef,
  } = useFilterOpen();

  const getAllRealestate = async () => {
    const token = import.meta.env.VITE_API_TOKEN;

    try {
      const response = await axios.get(
        "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(55);
      console.log(response.data);
      setRealEstate(response.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  useEffect(() => {
    getAllRealestate();
  }, []);
  return (
    <main className="firago-regular">
      <section className="flex flex-col items-center">
        <div className="w-[1596px] flex justify-between text-base leading-[19.2px] pt-[77px] pb-8">
          <nav className="flex space-x-6 border border-[#DBDBDB] rounded-[10px] p-[6px]">
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
                        //onChange={() => handleServiceChange(service.id)}
                        className="w-full flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          name=""
                          id={region.name.toString()}
                        />
                        {region.name}
                      </label>
                    </li>
                  ))}
                </ul>

                <button className="block firago-medium text-[14px] text-white leading-[17px] bg-[#F93B1D] rounded-lg px-3 py-2 ml-auto">
                  არჩევა
                </button>
              </div>
            </div>

            <div ref={priceRef} className="relative">
              <button
                onClick={() => toggleDropdown("price")}
                //className="flex items-center gap-1 firago-medium text-[#021526] px-[14px] py-2"
                className={`flex items-center gap-1 firago-medium text-[#021526] px-[14px] py-2 ${
                  openDropDown === "price" && "bg-[#F3F3F3] rounded-md"
                }`}
              >
                საფასო კატეგორია{" "}
                <span className={`${openDropDown === "price" && "rotate-180"}`}>
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
                    />
                    ₾
                  </div>
                  <div className="w-1/2 flex items-center border border-[#808A93] px-3 py-2.5 rounded-md">
                    <input
                      type="text"
                      placeholder="დან"
                      className="w-full outline-none"
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
                          {" "}
                          {price.price} ₾
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="firago-medium mb-4">მაქს. ფასი</h4>
                    <ul className="space-y-2">
                      {price.map((price) => (
                        <li key={`max${String(price.price)}`}>
                          {" "}
                          {price.price} ₾
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button className="block firago-medium text-[14px] text-white leading-[17px] bg-[#F93B1D] rounded-lg px-3 py-2 ml-auto">
                  არჩევა
                </button>
              </div>
            </div>

            <div ref={areaRef} className="relative">
              <button
                onClick={() => toggleDropdown("area")}
                //className="flex items-center gap-1 firago-medium text-[#021526] px-[14px] py-2"
                className={`flex items-center gap-1 firago-medium text-[#021526] px-[14px] py-2 ${
                  openDropDown === "area" && "bg-[#F3F3F3] rounded-md"
                }`}
              >
                ფართობი{" "}
                <span className={`${openDropDown === "area" && "rotate-180"}`}>
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
                    />
                    <span>მ&sup2;</span>
                  </div>
                  <div className="w-1/2 flex items-center border border-[#808A93] px-3 py-2.5 rounded-md">
                    <input
                      type="text"
                      placeholder="დან"
                      className="w-full outline-none"
                    />{" "}
                    <span>მ&sup2;</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-y-4 text-[14px] leading-[17px] mt-6 mb-8">
                  <div>
                    <h4 className="firago-medium mb-4">მინ. ფასი</h4>
                    <ul className="space-y-2">
                      {price.map((price) => (
                        <li key={`minarea${String(price.price)}`}>
                          {" "}
                          {price.price} <span>მ&sup2;</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="firago-medium mb-4">მაქს. ფასი</h4>
                    <ul className="space-y-2">
                      {price.map((price) => (
                        <li key={`maxarea${String(price.price)}`}>
                          {" "}
                          {price.price} <span>მ&sup2;</span>{" "}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button className="block firago-medium text-[14px] text-white leading-[17px] bg-[#F93B1D] rounded-lg px-3 py-2 ml-auto">
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
                    <li key={`room${String(room)}`}>
                      <button className="w-[41px] border border-[#808A93] rounded-md p-2.5">
                        {room}
                      </button>
                    </li>
                  ))}
                </ul>
                <button className="block firago-medium text-[14px] text-white leading-[17px] bg-[#F93B1D] rounded-lg px-3 py-2 ml-auto">
                  არჩევა
                </button>
              </div>
            </div>
          </nav>
          <div>
            <Link
              to={"/addListing"}
              className="text-center items-center text-white hover:text-[#F93B1D] bg-[#F93B1D] hover:bg-white outline outline-1 hover:outline-[#F93B1D] rounded-[10px] px-4 py-[14px] mr-4"
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
        <div className="max-w-[1596px] grid grid-cols-4 gap-5">
          {realEstate.map((property) => (
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
