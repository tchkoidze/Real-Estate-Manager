import { useRef } from "react";
import Check from "../icons/check";

const AddAgent = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="h-full w-[1200px] fixed flex items-center justify-center bg-[rgba(38,12,2,0.41)]">
      <form className="w-[1009px] bg-white rounded-[10px] px-[105px] py-[87px]">
        <h2 className="firago-medium text-[32px] leading-[38px]">
          აგენტის დამატება
        </h2>

        <div className="flex flex-wrap gap-5 mt-[61px] mb-[90px]">
          <div className="w-[48%] flex flex-col">
            <label htmlFor="address" className="firago-medium">
              სახელი *
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
              გვარი *
            </label>
            <input
              id="index"
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
              ელფოსტა *
            </label>
            <input
              id="index"
              type="text"
              className="border border-[#808A93] outline-none rounded-md p-2.5 my-1"
            />
            <p className="flex items-center gap-2">
              <Check />
              გამოიყენეთ @redberry.ge ფოსტა
            </p>
          </div>
          <div className="w-[48%] flex flex-col">
            <label htmlFor="index" className="firago-medium">
              ტელეფონის ნომერი *
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

          <div className="w-full">
            <p className="firago-medium">ატვირთეთ ფოტო *</p>
            <div className="w-full h-32 flex items-center justify-center outline-1 outline-dashed rounded-lg my-1">
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

        <div className="flex justify-end gap-4">
          <button
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
