import axios from "axios";
import DownArrow from "../icons/ArrowDown";
import Check from "../icons/check";
import { useEffect, useRef, useState } from "react";
import { Agent, City, Region } from "../types";

const AddListing = () => {
  const [agents, setAgents] = useState<Agent[] | null>();
  const [openDropDown, setOpenDropDown] = useState(false);
  const [openRegions, setOpenRegions] = useState(false);
  const [openCities, setOpenCities] = useState(false);
  const [cities, setCities] = useState<City[] | null>();
  const [regions, setRegions] = useState<Region[] | null>();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const getAgents = async () => {
    const token = "9cfde15a-548d-475d-ad3e-eb8aa3a94ec5";

    try {
      const response = await axios.get(
        "https://api.real-estate-manager.redberryinternship.ge/api/agents",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(55);
      console.log(response.data);
      setAgents(response.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  const getCities = async () => {
    try {
      const response = await axios.get(
        "https://api.real-estate-manager.redberryinternship.ge/api/cities"
      );
      console.log(55);
      console.log(response.data);
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  const getRegions = async () => {
    try {
      const response = await axios.get(
        "https://api.real-estate-manager.redberryinternship.ge/api/regions"
      );
      console.log(55);
      console.log("regions", response.data);
      setRegions(response.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  useEffect(() => {
    getAgents();
    getRegions();
    getCities();
  }, []);

  return (
    <main className="w-[790px] flex flex-col firago-regular text-[14px] leading-[17px] mx-auto">
      <h1 className="firago-medium text-center text-[2rem] leading-9 my-16">
        ლისტინგის დამატება
      </h1>
      <form className="w-full space-y-20 pb-20">
        <div className="w-[226px]">
          <h3 className="firago-medium text-base leading-[20px] text-[#1A1A1F] mb-2  ">
            გარიგების ტიპი
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <input
                type="radio"
                id="sale"
                name="propertyStatus"
                className="mr-2"
              />
              <label htmlFor="sale">იყიდება</label>
            </div>
            <div>
              <input
                type="radio"
                id="rent"
                name="propertyStatus"
                className="mr-2"
              />
              <label htmlFor="rent">ქირავდება</label>
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <h3 className="firago-medium text-base leading-[20px] text-[#1A1A1F] mb-5">
            მდებარეობა
          </h3>
          <div className="flex flex-wrap gap-5">
            <div className="w-[48%] flex flex-col">
              <label htmlFor="address" className="firago-medium">
                მისამართი *
              </label>
              <input
                id="address"
                type="text"
                className="border border-[#808A93] outline-none rounded-md p-2.5 my-1"
              />
              <p className="flex items-center gap-2">
                <Check />
                მინიმუმ ორი სიმბოლო
              </p>
            </div>
            <div className="w-[48%] flex flex-col">
              <label htmlFor="index" className="firago-medium">
                საფოსტო ინდექსი *
              </label>
              <input
                id="index"
                type="text"
                className="border border-[#808A93] outline-none rounded-md p-2.5 my-1"
              />
              <p className="flex items-center gap-2">
                <Check />
                მხოლოდ რიცხვები
              </p>
            </div>
            <div className="w-[48%] flex flex-col">
              <label htmlFor="" className="firago-medium">
                რეგიონი
              </label>
              <div className="relative">
                <button
                  type="button"
                  className={`w-full flex items-center justify-between border border-[#808A93] rounded-md ${
                    openRegions ? "rounded-b-none" : ""
                  } p-2.5`}
                  onClick={() => setOpenRegions(!openRegions)}
                >
                  <span>აირჩიე რეგიონი</span> <DownArrow />
                </button>
                <ul
                  className={`${
                    openRegions ? "block" : "hidden"
                  } w-full max-h-[184px] overflow-y-auto absolute z-10 bg-white border-x border-[#808A93] border-b rounded-b-md no-scrollbar`}
                >
                  {regions?.map((region) => (
                    <li
                      key={region.id}
                      className="border-t border-[#808A93] px-2.5 py-3.5"
                    >
                      <label htmlFor={`${region.id}`}>
                        <input
                          type="radio"
                          name="degree"
                          id={`${region.id}`}
                          // checked={filters.degree === degree}
                          // onChange={() =>
                          //   setFilters((prevFilters) => ({
                          //     ...prevFilters,
                          //     degree:
                          //       prevFilters.degree === degree ? "" : degree,
                          //   }))
                          // }
                          className="hidden"
                        />
                        {region.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <p></p>
            </div>
            <div className="w-[48%] flex flex-col">
              <label htmlFor="" className="firago-medium">
                ქალაქი
              </label>
              <div className="relative">
                <button
                  type="button"
                  className={`w-full flex items-center justify-between border border-[#808A93] rounded-md ${
                    openCities ? "rounded-b-none" : ""
                  } p-2.5`}
                  onClick={() => setOpenCities(!openCities)}
                >
                  <span>აირჩიე ქალაქი</span> <DownArrow />
                </button>
                <ul
                  className={`${
                    openCities ? "block" : "hidden"
                  } w-full max-h-[184px] overflow-y-auto absolute z-10 bg-white border-x border-[#808A93] border-b rounded-b-md no-scrollbar`}
                >
                  {cities?.map((city) => (
                    <li
                      key={city.id}
                      className="border-t border-[#808A93] px-2.5 py-3.5"
                    >
                      <label htmlFor={`${city.id}`}>
                        <input
                          type="radio"
                          name="degree"
                          id={`${city.id}`}
                          // checked={filters.degree === degree}
                          // onChange={() =>
                          //   setFilters((prevFilters) => ({
                          //     ...prevFilters,
                          //     degree:
                          //       prevFilters.degree === degree ? "" : degree,
                          //   }))
                          // }
                          className="hidden"
                        />
                        {city.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <p></p>
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <h3 className="firago-medium text-base leading-[20px] text-[#1A1A1F] mb-5">
            ბინის დეტალები
          </h3>
          <div className="flex flex-wrap justify-between gap-y-5">
            <div className="w-[48%] flex flex-col">
              <label htmlFor="price" className="firago-medium">
                ფასი
              </label>
              <input
                id="price"
                type="text"
                className="border border-[#808A93] outline-none rounded-md p-2.5 my-1"
              />
              <p className="flex items-center gap-2">
                <Check /> მხოლოდ რიცხვები
              </p>
            </div>

            <div className="w-[48%] flex flex-col">
              <label htmlFor="area" className="firago-medium">
                ფართობი
              </label>
              <input
                id="area"
                type="text"
                className="border border-[#808A93] outline-none rounded-md p-2.5 my-1"
              />
              <p className="flex items-center gap-2">
                <Check /> მხოლოდ რიცხვები
              </p>
            </div>

            <div className="w-[48%] flex flex-col">
              <label htmlFor="bedroom" className="firago-medium">
                საძინებლების რაოდენობა*
              </label>
              <input
                id="bedroom"
                type="text"
                className="border border-[#808A93] outline-none rounded-md p-2.5 my-1"
              />
              <p className="flex items-center gap-2">
                <Check /> მხოლოდ რიცხვები
              </p>
            </div>

            <div className="w-full flex flex-col">
              <label htmlFor="description" className="firago-medium">
                აღწერა *
              </label>
              <textarea
                name=""
                id="description"
                rows={6}
                className="resize-none outline-none border border-[#808A93] rounded-md p-2.5 my-1"
              ></textarea>
              <p className="flex items-center gap-2">
                <Check /> მინიმუმ ხუთი სიტყვა
              </p>
            </div>

            <div className="w-full">
              <p>ატვირთეთ ფოტო *</p>
              <div className="w-full h-32 flex items-center justify-center outline-1 outline-dashed rounded-lg">
                <div //className="h-full flex items-center justify-center"
                >
                  <input
                    type="file"
                    id="myphoto"
                    accept=".jpg,.jpeg,.png"
                    //{...register(name, { required: true })}
                    //onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <img src="/plus-circle.svg" alt="plus image" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <h3 className="firago-medium text-base leading-[20px] text-[#1A1A1F] mb-4">
            აგენტი
          </h3>
          <div className="w-1/2">
            <p className="firago-medium mb-1">აირჩიე</p>
            <div className="relative">
              <button
                type="button"
                className={`w-full flex items-center justify-between border border-[#808A93] rounded-md p-2.5 ${
                  openDropDown && "rounded-b-none"
                }`}
                onClick={() => setOpenDropDown(!openDropDown)}
              >
                <span>აირჩიე აგენტი</span> <DownArrow />
              </button>
              <div
                className={`${
                  openDropDown ? "block" : "hidden"
                } w-full max-h-[184px] overflow-y-auto absolute z-10 bg-white border-x border-[#808A93] border-b rounded-b-md no-scrollbar`}
              >
                <button
                  type="button"
                  className="w-full flex items-center gap-2 border-t border-[#808A93] px-2.5 py-2.5"
                >
                  <img src="/plus-circle.svg" alt="plus image" />
                  დაამატე აგენტი
                </button>
                <ul>
                  {agents?.map((agent) => (
                    <li
                      key={agent.id}
                      className="border-t border-[#808A93] px-2.5 py-3.5"
                    >
                      <label htmlFor={`${agent.id}`}>
                        <input
                          type="radio"
                          name="degree"
                          id={`${agent.id}`}
                          // checked={filters.degree === degree}
                          // onChange={() =>
                          //   setFilters((prevFilters) => ({
                          //     ...prevFilters,
                          //     degree:
                          //       prevFilters.degree === degree ? "" : degree,
                          //   }))
                          // }
                          className="hidden"
                        />
                        {agent.name} {agent.surname}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="text-[#F93B1D] hover:text-white border border-[#F93B1D] hover:bg-[#DF3014] rounded-[10px] px-4 py-[13px]"
          >
            გაუქმება
          </button>
          <button className="bg-[#F93B1D] hover:bg-[#DF3014] text-white rounded-[10px] px-4 py-[14px]">
            დაამატე ლისტინგი
          </button>
        </div>
      </form>
    </main>
  );
};
export default AddListing;

{
  /* <div className="border border-[#808A93] rounded-md">
  <button
    type="button"
    className="w-full flex items-center justify-between p-2.5"
    onClick={() => setOpenDropDown(!openDropDown)}
  >
    <span>აირჩიე აგენტი</span> <DownArrow />
  </button>
  <div className={`${openDropDown ? "block" : "hidden"}`}>
    <button
      type="button"
      className="w-full flex items-center gap-2 border-t border-[#808A93] px-2.5 py-2.5"
    >
      <img src="/plus-circle.svg" alt="plus image" />
      დაამატე აგენტი
    </button>
    <ul>
      {agents?.map((agent) => (
        <li key={agent.id} className="border-t border-[#808A93] px-2.5 py-3.5">
          <label htmlFor={`${agent.id}`}>
            <input
              type="radio"
              name="degree"
              id={`${agent.id}`}
              // checked={filters.degree === degree}
              // onChange={() =>
              //   setFilters((prevFilters) => ({
              //     ...prevFilters,
              //     degree:
              //       prevFilters.degree === degree ? "" : degree,
              //   }))
              // }
              className="hidden"
            />
            {agent.name} {agent.surname}
          </label>
        </li>
      ))}
    </ul>
  </div>
</div>; */
}
