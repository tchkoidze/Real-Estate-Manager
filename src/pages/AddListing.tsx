import axios from "axios";
import DownArrow from "../icons/ArrowDown";
import Check from "../icons/check";
import { IoIosCheckmark } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { AddProperty, Agent, City } from "../types";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addListingSchema } from "../schemas/addListingSchema";
import { useRegions } from "../hooks/useRegions";
import { useClickOutsideDropdown } from "../hooks/useClickOutsideDropdown";
import { useNavigate } from "react-router-dom";

const initialState = {
  price: null,
  zip_code: "",
  description: "",
  area: null,
  city: { name: "", city_id: null },
  address: "",
  agent: { name: "", surname: "", agent_id: null },
  bedrooms: null,
  is_rental: 1,
  image: "",
  region: { name: "", region_id: null },
};

const AddListing = ({
  setOpenAddAgent,
}: {
  setOpenAddAgent: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [agents, setAgents] = useState<Agent[] | null>();

  const [cities, setCities] = useState<City[] | null>();

  const navigate = useNavigate();

  const [imageUploadError, setImageUploadError] = useState("");

  const { regions } = useRegions();
  const { openDropDown, toggleDropdown, regionRef, cityRef, agentRef } =
    useClickOutsideDropdown();

  const {
    register,
    trigger,
    handleSubmit,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm<AddProperty>({
    resolver: zodResolver(addListingSchema),
    mode: "onChange",
  });

  const [data, setData] = useState<AddProperty>(initialState);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const getAgents = async () => {
    const token = import.meta.env.VITE_API_TOKEN;

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

  useEffect(() => {
    getAgents();
    // getRegions();
    getCities();
  }, []);

  const handleRegionChange = (region_id: number, region_name: string) => {
    setData((prevData) => ({
      ...prevData,
      region: { name: region_name, region_id },
      city: { name: "", city_id: null }, // Reset city when region changes
    }));

    // Manually update the region in RHF's form state
    setValue("region", { region_id, name: region_name });
    // Trigger validation for region
    trigger("region");
  };

  const handleCityChange = (city_id: number, city_name: string) => {
    setData((prevData) => ({
      ...prevData,
      city: { name: city_name, city_id },
    }));

    // Manually update the city in RHF's form state
    setValue("city", { city_id, name: city_name });
    // Trigger validation for city
    trigger("city");
  };

  const handleAgentChange = (
    agent_id: number,
    agent_name: string,
    agent_surname: string
  ) => {
    setData((prevData) => ({
      ...prevData,
      agent: {
        name: agent_name,
        surname: agent_surname,
        agent_id: prevData.agent.agent_id === agent_id ? null : agent_id,
      },
    }));

    // Manually update the agent in RHF's form state
    setValue("agent", { agent_id, name: agent_name, surname: agent_surname });

    // Trigger validation for agent
    trigger("agent");
  };

  // Register the region field manually
  useEffect(() => {
    register("region", {
      validate: {
        required: (value) => value.region_id !== null || "Region is required",
      },
    });

    register("city", {
      validate: {
        required: (value) => value.city_id !== null || "City is required",
      },
    });

    register("city", {
      validate: {
        required: (value) => value.city_id !== null || "City is required",
      },
    });
  }, [register]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("file size ", file?.size);

    if (file) {
      // Check if file size is less than 5MB (5 * 1024 * 1024 bytes)
      if (file.size > 5 * 1024 * 1024) {
        //alert("File size exceeds 5MB limit.");
        setImageUploadError("სურათის ზომა არ უნდა აღემატებოდეს 5 მეგაბაიტს");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("uploadedImage", reader.result as string);

        //setImageDataUri(reader.result as string);
        handleInputChange("image", reader.result as string);
      };
      reader.readAsDataURL(file);

      console.log("Selected file:", file);
    }
  };

  function dataURLtoFile(dataurl: any, filename: any) {
    if (data.image !== null) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    }
  }

  const onSubmit: SubmitHandler<AddProperty> = async () => {
    console.log("data.area before submit:", data.image);
    if (data.image === "") {
      setImageUploadError("ატვირთე სურათი");
      console.log("errored");
      return;
    }

    const file =
      typeof data.image === "string"
        ? dataURLtoFile(data.image, "property_image") || ""
        : data.image;

    console.log(file);

    const formData = new FormData();
    formData.append("address", data.address);
    formData.append("image", file);
    formData.append(
      "region_id",
      data.region.region_id !== null ? data.region.region_id.toString() : ""
    );
    formData.append("description", data.description || "");
    formData.append(
      "city_id",
      data.city.city_id !== null ? data.city.city_id.toString() : ""
    );
    formData.append("zip_code", data.zip_code || "");
    formData.append("price", data.price !== null ? data.price.toString() : "");
    formData.append("area", data.area !== null ? data.area.toString() : "");
    formData.append(
      "bedrooms",
      data.bedrooms !== null ? data.bedrooms.toString() : ""
    );
    formData.append(
      "is_rental",
      data.is_rental !== null ? data.is_rental.toString() : ""
    );
    formData.append(
      "agent_id",
      data.agent.agent_id !== null ? data.agent.agent_id.toString() : ""
    );

    try {
      const res = await axios.post(
        "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
        formData,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 201) {
        console.log(res.data);
        // Clear localStorage and reset form state
        localStorage.removeItem("addListData");
        //setData(initialState);
        navigate("/");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    return console.log(777);
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleRentalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value); // Convert the string value '0' or '1' to a number
    setData((prevData) => ({
      ...prevData,
      is_rental: value, // Directly set the value as either 0 or 1
    }));
  };

  const storedData = JSON.parse(localStorage.getItem("addListData")!);
  useEffect(() => {
    if (storedData) {
      setData(storedData);
      setValue("address", storedData.address);
      setValue("zip_code", storedData.zip_code);
      setValue("price", storedData.price);
      setValue("area", storedData.area);
      setValue("bedrooms", storedData.bedrooms);
      setValue("description", storedData.description);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("addListData", JSON.stringify(data));
  }, [data]);

  return (
    <main className="w-[790px] flex flex-col firago-regular text-[14px] leading-[17px] mx-auto">
      <h1 className="firago-medium text-center text-[2rem] leading-9 my-16">
        ლისტინგის დამატება
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-20 pb-20"
      >
        <div className="w-[226px]">
          <h3 className="firago-medium text-base leading-[20px] text-[#1A1A1F] mb-2  ">
            გარიგების ტიპი
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                value={0}
                type="radio"
                id="sale"
                name="propertyStatus"
                className="mr-2"
                onChange={handleRentalChange}
                checked={data.is_rental === 0}
              />
              <label htmlFor="sale">იყიდება</label>
            </div>

            <div className="flex items-center">
              <input
                value={1}
                type="radio"
                id="rent"
                name="propertyStatus"
                className="mr-2"
                onChange={handleRentalChange}
                checked={data.is_rental === 1}
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
                {...register("address", {
                  onChange: (e) => handleInputChange("address", e.target.value),
                })}
              />
              <p
                className={`flex items-center ${
                  dirtyFields.address && errors.address
                    ? "text-[#F93B1D]"
                    : dirtyFields.address
                    ? "text-[#45A849]"
                    : ""
                }`}
              >
                <IoIosCheckmark
                  size={24}
                  //color={errors.address ? "text-[#F93B1D]" : ""}
                />
                მინიმუმ ორი სიმბოლო
              </p>
            </div>
            <div className="w-[48%] flex flex-col">
              <label htmlFor="zipCode" className="firago-medium">
                საფოსტო ინდექსი *
              </label>
              <input
                id="zipCode"
                className="border border-[#808A93] outline-none rounded-md p-2.5 my-1"
                {...register("zip_code", {
                  onChange: (e) =>
                    handleInputChange("zip_code", e.target.value),
                })}
              />
              <p
                className={`flex items-center ${
                  dirtyFields.zip_code && errors.zip_code
                    ? "text-[#F93B1D]"
                    : dirtyFields.zip_code
                    ? "text-[#45A849]"
                    : ""
                }`}
              >
                <IoIosCheckmark size={24} />
                მხოლოდ რიცხვები
              </p>
            </div>

            <div className="w-[48%] flex flex-col">
              <p className="firago-medium">რეგიონი</p>
              <div ref={regionRef} className="relative my-1">
                <button
                  type="button"
                  className={`w-full flex items-center justify-between border border-[#808A93] rounded-md ${
                    openDropDown === "region" ? "rounded-b-none" : ""
                  } p-2.5`}
                  onClick={() => toggleDropdown("region")}
                >
                  <span>
                    {data.region.name.length > 0
                      ? data.region.name
                      : "აირჩიე რეგიონი"}
                  </span>
                  <DownArrow />
                </button>
                <ul
                  className={`${
                    openDropDown === "region" ? "block" : "hidden"
                  } w-full max-h-[184px] overflow-y-auto absolute z-10 bg-white border-x border-[#808A93] border-b rounded-b-md no-scrollbar`}
                >
                  {regions?.map((region) => (
                    <li key={region.id}>
                      <label
                        htmlFor={`${region.id}`}
                        className="w-full block border-t border-[#808A93] px-2.5 py-3.5"
                      >
                        <input
                          type="radio"
                          name="region"
                          id={`${region.id}`}
                          // checked={filters.degree === degree}
                          // onChange={() =>
                          //   setData((prevData) => ({
                          //     ...prevData,
                          //     region: {
                          //       name: region.name,
                          //       region_id:
                          //         prevData.region.region_id === region.id
                          //           ? null
                          //           : region.id,
                          //     },
                          //     city: {
                          //       // Reset city values when region is changed
                          //       name: "",
                          //       city_id: null,
                          //     },
                          //   }))
                          // }
                          onChange={() =>
                            handleRegionChange(region.id, region.name)
                          }
                          className="hidden"
                        />
                        {region.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              {errors.region && (
                <span className="text-red-500">მიუთითე რეგიონი</span>
              )}
            </div>
            {data.region.region_id !== null && (
              <div className="w-[48%] flex flex-col">
                <p className="firago-medium">ქალაქი</p>
                <div ref={cityRef} className="relative my-1">
                  <button
                    type="button"
                    className={`w-full flex items-center justify-between border border-[#808A93] rounded-md ${
                      // openCities ? "rounded-b-none" : ""
                      openDropDown === "city" ? "rounded-b-none" : ""
                    } p-2.5`}
                    // onClick={() => setOpenCities(!openCities)}
                    onClick={() => toggleDropdown("city")}
                  >
                    <span>
                      {data.city.name.length > 0
                        ? data.city.name
                        : "აირჩიე ქალაქი"}{" "}
                    </span>{" "}
                    <DownArrow />
                  </button>
                  <ul
                    className={`${
                      // openCities ? "block" : "hidden"
                      openDropDown === "city" ? "block" : "hidden"
                    } w-full max-h-[184px] overflow-y-auto absolute z-10 bg-white border-x border-[#808A93] border-b rounded-b-md no-scrollbar`}
                  >
                    {cities
                      ?.filter(
                        (city) => city.region_id === data.region.region_id
                      )
                      .map((city) => (
                        <li key={city.name}>
                          <label
                            htmlFor={`${city.name}`}
                            className="w-full block border-t border-[#808A93] px-2.5 py-3.5"
                          >
                            <input
                              type="radio"
                              name="city"
                              id={`${city.name}`}
                              // checked={filters.degree === degree}
                              // onChange={() =>
                              //   setData((prevData) => ({
                              //     ...prevData,
                              //     city: {
                              //       name: city.name,
                              //       city_id:
                              //         prevData.city.city_id === city.id
                              //           ? null
                              //           : city.id,
                              //     },
                              //   }))
                              // }
                              onChange={() =>
                                handleCityChange(city.id, city.name)
                              }
                              className="hidden"
                            />
                            {city.name}
                          </label>
                        </li>
                      ))}
                  </ul>
                </div>
                {/* Display error for city_id */}
                {errors.city && (
                  <span className="text-red-500">მიუთითე ქალაქი</span>
                )}
              </div>
            )}
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
                {...register("price", {
                  onChange: (e) => handleInputChange("price", e.target.value),
                })}
              />
              <p
                className={`flex items-center ${
                  dirtyFields.price && errors.price
                    ? "text-[#F93B1D]"
                    : dirtyFields.price
                    ? "text-[#45A849]"
                    : ""
                }`}
              >
                <IoIosCheckmark size={24} />
                მხოლოდ რიცხვები
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
                {...register("area", {
                  onChange: (e) => handleInputChange("area", e.target.value),
                })}
              />
              <p
                className={`flex items-center ${
                  dirtyFields.area && errors.area
                    ? "text-[#F93B1D]"
                    : dirtyFields.area
                    ? "text-[#45A849]"
                    : ""
                }`}
              >
                <IoIosCheckmark size={24} /> მხოლოდ რიცხვები
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
                {...register("bedrooms", {
                  onChange: (e) =>
                    handleInputChange("bedrooms", e.target.value),
                })}
              />
              <p
                className={`flex items-center ${
                  dirtyFields.bedrooms && errors.bedrooms
                    ? "text-[#F93B1D]"
                    : dirtyFields.bedrooms
                    ? "text-[#45A849]"
                    : ""
                }`}
              >
                <IoIosCheckmark size={24} /> მხოლოდ რიცხვები
              </p>
            </div>

            <div className="w-full flex flex-col">
              <label htmlFor="description" className="firago-medium">
                აღწერა *
              </label>
              <textarea
                id="description"
                rows={6}
                className="resize-none outline-none border border-[#808A93] rounded-md p-2.5 my-1"
                {...register("description", {
                  onChange: (e) =>
                    handleInputChange("description", e.target.value),
                })}
              ></textarea>
              <p
                className={`flex items-center ${
                  dirtyFields.description && errors.description
                    ? "text-[#F93B1D]"
                    : dirtyFields.description
                    ? "text-[#45A849]"
                    : ""
                }`}
              >
                <IoIosCheckmark size={24} /> მინიმუმ ხუთი სიტყვა
              </p>
            </div>

            <div className="w-full">
              <p className="firago-medium">ატვირთეთ ფოტო *</p>
              <div className="w-full h-32 flex items-center justify-center outline-1 outline-dashed rounded-lg my-1">
                <div //className="h-full flex items-center justify-center"
                >
                  <input
                    type="file"
                    id="myphoto"
                    accept=".jpg,.jpeg,.png"
                    {...register("image")}
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                  />

                  {data.image ? (
                    <div className="relative">
                      <img
                        src={data.image}
                        alt="Uploaded"
                        className="w-[92px] h-[82px]"
                      />
                      <button
                        type="button"
                        //onClick={() => setImageDataUri("")}
                        onClick={() =>
                          setData((prevData) => ({
                            ...prevData,
                            ["image"]: "",
                          }))
                        }
                        className="absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/3 "
                      >
                        <img
                          alt="trashbin icon"
                          src="/trashbin.svg"
                          className="hover:scale-[1.1]"
                        />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <img src="/plus-circle.svg" alt="plus image" />
                    </button>
                  )}
                </div>
              </div>
              {imageUploadError.length > 0 && (
                <p
                  className={`flex items-center gap-2 ${
                    imageUploadError.length > 0 ? "text-[#F93B1D]" : ""
                  }`}
                >
                  <Check /> {imageUploadError}
                </p>
              )}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <h3 className="firago-medium text-base leading-[20px] text-[#1A1A1F] mb-4">
            აგენტი
          </h3>
          <div ref={agentRef} className="w-1/2">
            <p className="firago-medium mb-1">აირჩიე</p>
            <div className="relative">
              <button
                type="button"
                className={`w-full flex items-center justify-between border border-[#808A93] rounded-md p-2.5 ${
                  openDropDown && "rounded-b-none"
                }`}
                onClick={() => toggleDropdown("agent")}
                //onClick={() => setOpenDropDown(!openDropDown)}
              >
                <span>
                  {data.agent.agent_id
                    ? `${data.agent.name} ${data.agent.surname}`
                    : "აირჩიე აგენტი"}
                </span>
                <DownArrow />
              </button>
              <div
                className={`${
                  openDropDown ? "block" : "hidden"
                } w-full max-h-[184px] overflow-y-auto absolute z-10 bg-white border-x border-[#808A93] border-b rounded-b-md no-scrollbar`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpenAddAgent(true);
                    toggleDropdown("agent");
                  }}
                  className="w-full flex items-center gap-2 border-t border-[#808A93] px-2.5 py-2.5"
                >
                  <img src="/plus-circle.svg" alt="plus image" />
                  დაამატე აგენტი
                </button>
                <ul>
                  {agents?.map((agent) => (
                    <li
                      key={agent.id}
                      // className="border-t border-[#808A93] px-2.5 py-3.5"
                    >
                      <label
                        htmlFor={`${agent.id}`}
                        className="block w-full border-t border-[#808A93] px-2.5 py-3.5"
                      >
                        <input
                          type="radio"
                          name="degree"
                          id={`${agent.id}`}
                          // checked={filters.degree === degree}
                          // onChange={() =>
                          //   setData((prevData) => ({
                          //     ...prevData,
                          //     agent: {
                          //       name: agent.name,
                          //       surname: agent.surname,
                          //       agent_id:
                          //         prevData.agent.agent_id === agent.id
                          //           ? null
                          //           : agent.id,
                          //     },
                          //   }))
                          // }
                          onChange={() =>
                            handleAgentChange(
                              agent.id,
                              agent.name,
                              agent.surname
                            )
                          }
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
          {errors.agent && <p className="text-red-500 mt-1">მიუთითე აგენტი</p>}
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => {
              localStorage.removeItem("addListData");
              navigate("/");
            }}
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
