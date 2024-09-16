import { useEffect, useRef, useState } from "react";
import Check from "../icons/check";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAgentSchema } from "../schemas/addAgentSchema";
import { AddAgentData } from "../types";
import axios from "axios";

const initialAgentData = {
  name: "",
  surname: "",
  email: "",
  phone: null,
  avatar: "",
};

const AddAgent = ({
  setOpenAddAgent,
}: {
  setOpenAddAgent: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [agentData, setAgentData] = useState<AddAgentData>(initialAgentData);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ resolver: zodResolver(addAgentSchema) });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const storedData = JSON.parse(localStorage.getItem("addAgentData")!);
  useEffect(() => {
    if (storedData) {
      setAgentData(storedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("addAgentData", JSON.stringify(agentData));
  }, [agentData]);

  const handleInputChange = (fieldName: string, value: string) => {
    setAgentData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first selected file
    if (file) {
      console.log("File selected:", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("File reader result:", reader.result);
        //setImageDataUri(reader.result as string);
        handleInputChange("avatar", reader.result as string);
      };
      reader.readAsDataURL(file);

      //setSelectedFile(reader.result as string); // Save the file to state
      // You can now process the file (e.g., upload it to a server or display a preview)
      console.log("Selected file:", file);
    }
  };

  const cancell = () => {
    setAgentData(initialAgentData);
    // Clear localStorage and reset form state
    localStorage.removeItem("addAgentData");
    setOpenAddAgent(false);
  };
  const handleParentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // This ensures clicks on the parent div trigger the cancell function
    if (e.target === e.currentTarget) {
      cancell();
    }
  };

  function dataURLtoFile(dataurl: any, filename: any) {
    if (agentData.avatar !== null) {
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

  const onSubmit = async () => {
    if (!agentData.avatar) {
      console.log("error");
      return;
    }

    const file =
      typeof agentData.avatar === "string"
        ? dataURLtoFile(agentData.avatar, "avatar_image") || ""
        : agentData.avatar;

    const formData = new FormData();
    formData.append("name", agentData.name);
    formData.append("surname", agentData.surname);
    formData.append("email", agentData.email);
    formData.append(
      "phone",
      agentData.phone !== null ? agentData.phone.toString() : ""
    );
    formData.append("avatar", file);

    try {
      const res = await axios.post(
        "https://api.real-estate-manager.redberryinternship.ge/api/agents",
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
        setAgentData(initialAgentData);
        // Clear localStorage and reset form state
        localStorage.removeItem("addAgentData");

        console.log(res);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    console.log(45);
  };

  return (
    <div
      onClick={handleParentClick}
      className="h-full w-full fixed top-0 flex items-center justify-center bg-[rgba(38,12,2,0.41)]"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[1009px] bg-white rounded-[10px] px-[105px] py-[87px]"
      >
        <h2 className="firago-medium text-[32px] leading-[38px]">
          აგენტის დამატება
        </h2>

        <div className="flex flex-wrap gap-5 mt-[61px] mb-[90px]">
          <div className="w-[48%] flex flex-col">
            <label htmlFor="name" className="firago-medium">
              სახელი *
            </label>
            <input
              id="name"
              type="text"
              className="border border-[#808A93] outline-none rounded-md p-2.5 my-1"
              {...register("name", {
                onChange: (e) => handleInputChange("name", e.target.value),
              })}
            />
            <p
              className={`flex items-center gap-2 ${
                errors.name && "text-[#F93B1D]"
              }`}
            >
              <Check />
              მინიმუმ ორი სიმბოლო
            </p>
          </div>
          <div className="w-[48%] flex flex-col">
            <label htmlFor="surname" className="firago-medium">
              გვარი *
            </label>
            <input
              id="surname"
              type="text"
              className="border border-[#808A93] outline-none rounded-md p-2.5 my-1"
              {...register("surname", {
                onChange: (e) => handleInputChange("surname", e.target.value),
              })}
            />
            <p
              className={`flex items-center gap-2 ${
                errors.surname && "text-[#F93B1D]"
              }`}
            >
              <Check />
              მინიმუმ ორი სიმბოლო
            </p>
          </div>
          <div className="w-[48%] flex flex-col">
            <label htmlFor="email" className="firago-medium">
              ელფოსტა *
            </label>
            <input
              id="email"
              type="text"
              className="border border-[#808A93] outline-none rounded-md p-2.5 my-1"
              {...register("email", {
                onChange: (e) => handleInputChange("email", e.target.value),
              })}
            />
            <p
              className={`flex items-center gap-2 ${
                errors.email && "text-[#F93B1D]"
              }`}
            >
              <Check />
              გამოიყენეთ @redberry.ge ფოსტა
            </p>
          </div>
          <div className="w-[48%] flex flex-col">
            <label htmlFor="phone" className="firago-medium">
              ტელეფონის ნომერი *
            </label>
            <input
              id="phone"
              type="text"
              className="border border-[#808A93] outline-none rounded-md p-2.5 my-1"
              {...register("phone", {
                onChange: (e) => handleInputChange("phone", e.target.value),
              })}
            />
            <p
              className={`flex items-center gap-2 ${
                errors.phone && "text-[#F93B1D]"
              }`}
            >
              <Check />
              მხოლოდ რიცხვები
            </p>
          </div>

          <div className="w-full">
            <p className="firago-medium">ატვირთეთ ფოტო *</p>
            <div className="w-full h-32 flex items-center justify-center outline-1 outline-dashed rounded-lg my-1">
              <div //className="h-full flex items-center justify-center"
              >
                <input
                  {...register("avatar", { required: true })}
                  type="file"
                  id="avatar"
                  accept=".jpg,.jpeg,.png"
                  //{...register(name, { required: true })}
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  //className="hidden"
                />
                {/* <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <img src="/plus-circle.svg" alt="plus image" />
                </button> */}
                {agentData.avatar ? (
                  <div className="relative">
                    <img
                      src={agentData.avatar}
                      alt="Uploaded"
                      className="w-[92px] h-[82px]"
                    />
                    <button
                      type="button"
                      //onClick={() => setImageDataUri("")}
                      onClick={() =>
                        setAgentData((prevData) => ({
                          ...prevData,
                          ["avatar"]: "",
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
            <p className={`${errors.avatar ? "text-[#F93B1D]" : ""}`}>
              ატვირთეთ ფოტო{" "}
              {typeof errors.avatar?.message === "string"
                ? errors.avatar.message
                : ""}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => cancell()}
            type="button"
            className="text-[#F93B1D] hover:text-white border border-[#F93B1D] hover:bg-[#DF3014] rounded-[10px] px-4 py-[13px]"
          >
            გაუქმება
          </button>
          <button className="bg-[#F93B1D] hover:bg-[#DF3014] text-white rounded-[10px] px-4 py-[14px]">
            დაამატე აგენტი
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAgent;
