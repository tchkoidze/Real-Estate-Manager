import axios from "axios";
import { useEffect, useState } from "react";
import { HiLocationMarker } from "react-icons/hi";

const Listing = () => {
  const [realEstate, setRealEstate] = useState();

  const getAllRealestate = async () => {
    const token = "9cfde15a-548d-475d-ad3e-eb8aa3a94ec5";

    try {
      const response = await axios.get(
        "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(55);
      console.log(response.data.data);
      setRealEstate(response.data.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  useEffect(() => {
    getAllRealestate();
  }, []);
  return (
    <main className="firago-regular">
      <section>
        <div className="rounded-[14px] shadow[_5px_5px_12px_0px_rgba(2,21,38,0.08)]">
          <img src="/realEstate1.jpg" alt="real estate img" />
          <div className="text-base leading-[19.2px] bg-white border-x border-b border-[#DBDBDB] rounded-b-[14px] px-6 py-5">
            <p className="text-start firago-bold text-[28px] leading-[34px]">
              80 <span>₾</span>
            </p>
            <div className="flex items-center gap-1 mt-4 mb-5">
              <HiLocationMarker /> <span>თბილისი, ი. ჭავჭავაძის 53</span>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-1">
                <img src="/bed.svg" alt="bed" /> <span>2</span>
              </div>

              <div className="flex items-center gap-1">
                <img src="/area.svg" alt="area" /> <span>55 </span>{" "}
                <span>მ&sup2;</span>
              </div>

              <div className="flex items-center gap-1">
                <img src="/direction.svg" alt="zip code" /> <span>0160</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Listing;
