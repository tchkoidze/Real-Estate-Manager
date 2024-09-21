import axios from "axios";
import { useEffect, useState } from "react";
import { PropertyId } from "../types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HiLocationMarker } from "react-icons/hi";
import { BiEnvelope } from "react-icons/bi";
import { PiPhoneCall } from "react-icons/pi";
import Scroll from "../components/Scroll";

const PropertPage = () => {
  const [property, setProperty] = useState<PropertyId | null>(null);
  const [openDeletion, setOpenDeletion] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const getProperty = async (propertyId: string) => {
    const token = import.meta.env.VITE_API_TOKEN;

    setLoading(true);
    setFetchError(null);
    try {
      const response = await axios.get(
        `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${propertyId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      setProperty(response.data);
    } catch (error) {
      console.error("Error fetching listing:", error);
      setFetchError(`Error fetching listing- ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          },
        }
      );

      // Handle success
      if (response.status >= 200 && response.status < 300) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete");
    }
  };

  useEffect(() => {
    if (id) {
      getProperty(id);
    }
  }, [id]);

  // Format the date to MM/DD/YY
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  };

  if (loading) {
    return <div className="firago-medium text-xl">იტვირთება მონაცემები...</div>;
  }

  if (fetchError) {
    return <div className="firago-medium text-xl">{fetchError}</div>;
  }

  return (
    <>
      <main className="flex flex-col items-center">
        <div className="w-[1591px] pt-16 pb-7">
          <Link to={"/"} className="inline-block">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.9428 26.2765C16.4221 26.7972 15.5779 26.7972 15.0572 26.2765L5.72385 16.9431C5.20315 16.4224 5.20315 15.5782 5.72385 15.0575L15.0572 5.72418C15.5779 5.20349 16.4221 5.20349 16.9428 5.72418C17.4635 6.24488 17.4635 7.0891 16.9428 7.6098L9.88561 14.667H25.3333C26.0697 14.667 26.6667 15.2639 26.6667 16.0003C26.6667 16.7367 26.0697 17.3337 25.3333 17.3337H9.88561L16.9428 24.3909C17.4635 24.9115 17.4635 25.7558 16.9428 26.2765Z"
                fill="#021526"
              />
            </svg>
          </Link>
        </div>
        <section className="flex gap-[68px]">
          <div className="relative">
            <div className="w-[839px] h-[670px]">
              <img
                src={property?.image}
                alt="property"
                className="w-full h-full object-cover rounded-t-[14px]"
              />
            </div>
            <p className="absolute top-[41px] left-[41px] rounded-[20px] firago-medium text-xl leading-6 tracking-widest text-white bg-[#02152680] py-2.5 px-[26px]">
              {property?.is_rental === 1 ? "ქირავდება" : "იყიდება"}
            </p>
            <p className="text-[#808A93] text-right mt-2.5">
              გამოქვეყნების თარიღი {property && formatDate(property.created_at)}
            </p>
          </div>
          <div className="w-[684px]">
            <div className="text-base leading-[19.2px] bg-white ">
              <p className="text-start firago-bold text-5xl leading-[57.6px] mb-6">
                {property?.price} <span>₾</span>
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-1 ">
                  <HiLocationMarker color="#808A93" />{" "}
                  <span>
                    {property?.city.name}, {property?.address}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <img src="/area.svg" alt="area" />{" "}
                  <span>ფართი {property?.area} </span> <span>მ&sup2;</span>
                </div>

                <div className="flex items-center gap-1">
                  <img src="/bed.svg" alt="bed" />{" "}
                  <span>საძინებელი {property?.bedrooms}</span>
                </div>

                <div className="flex items-center gap-1">
                  <img src="/direction.svg" alt="zip code" />{" "}
                  <span>საფოსტო ინდექსი {property?.zip_code}</span>
                </div>
              </div>
              <p className="text-[#808A93] mt-10 mb-[50px]">
                {property?.description}
              </p>
              <div className="max-w-[503px] border border-[#DBDBDB] rounded-lg px-5 py-6 mb-5">
                <div className="flex items-center gap-4">
                  <div className="w-[72px] h-[72px] ">
                    <img
                      src={property?.agent.avatar}
                      alt="avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  <div>
                    <p className="firago-regular text-[#021526] text-[16px] leading-[19px]">
                      {property?.agent.name} {property?.agent.surname}
                    </p>
                    <p className="text-[14px] leading-[17px] text-[#676E76] mt-1">
                      აგენტი
                    </p>
                  </div>
                </div>
                <div className="text-[#808A93] text-[14px] lea[17px] mt-4">
                  <p className="flex items-center gap-1 mb-1">
                    <BiEnvelope /> {property?.agent.email}
                  </p>
                  <p className="flex items-center gap-1">
                    <PiPhoneCall />
                    {property?.agent.phone}
                  </p>
                </div>
              </div>
              <div>
                <button
                  onClick={() => setOpenDeletion(true)}
                  className="firago-medium text-xs leading-[14px] text-[#808A93] hover:text-white border border-[#808A93] hover:bg-[#808A93] rounded-lg p-2.5"
                >
                  ლისტინგის წაშლა
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* slider */}
        <section className="mt-[53px]">
          <h2 className="firago-medium text-[32px] leading-[38px] text-[#021526] mb-[52px]">
            ბინები მსგავს ლოკაციაზე
          </h2>
          <Scroll filterRegion={property?.city?.region?.name || ""} />
        </section>
      </main>

      {/* property delete section */}

      {openDeletion && (
        <section
          onClick={() => setOpenDeletion(false)}
          className="fixed top-0 w-full h-full flex items-center justify-center bg-[#02152657]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[623px] h-[222px] flex flex-col items-center justify-center bg-white rounded-[20px] shadow-[_5px_5px_12px_0px_rgba(2,21,38,0.08)]"
          >
            <h3 className="text-xl girago-regular leading-6 text-[#2D3648] mb-9">
              გსურთ წაშალოთ ლისტინგი?
            </h3>
            <div>
              <button
                onClick={() => setOpenDeletion(false)}
                className="text-[#F93B1D] hover:text-white border border-[#F93B1D] hover:bg-[#F93B1D] rounded-[10px] px-4 py-[13px] mr-4"
              >
                გაუქმება
              </button>
              <button
                onClick={handleDelete}
                className="bg-[#F93B1D] hover:bg-[#DF3014] text-white rounded-[10px] px-4 py-[14px]"
              >
                დადასტურება
              </button>
            </div>
            <button
              onClick={() => {
                setOpenDeletion(false);
              }}
              className="absolute top-0 right-0 group"
            >
              <svg
                width="47"
                height="47"
                viewBox="0 0 47 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.5011 23.4999L29.0401 29.0389M17.9622 29.0389L23.5011 23.4999L17.9622 29.0389ZM29.0401 17.9609L23.5011 23.4999L29.0401 17.9609ZM23.5011 23.4999L17.9622 17.9609L23.5011 23.4999Z"
                  stroke="#354451"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:stroke-[#021526]"
                />
              </svg>
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default PropertPage;
