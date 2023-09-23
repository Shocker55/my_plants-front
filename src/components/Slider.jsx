import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination } from "swiper/modules";

import Image from "next/image";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axios";
import Link from "next/link";

export default function Slider() {
  const [sliderItems, setSliderItems] = useState([]);

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const res = await axiosInstance.get("/records?q=random_image_records");
        const sliderData = await res.data;
        setSliderItems(sliderData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSliderData();
  }, []);

  return (
    <div className="mx-5 my-2 h-[250px] rounded-lg bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 outline outline-2 outline-slate-300 sm:min-w-[418px] lg:w-[844px]">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="w-full pb-[50px] pt-[50px]"
      >
        {sliderItems?.map((record) => {
          return (
            <SwiperSlide key={record.id} className="max-h-[250px] max-w-[250px] bg-cover bg-center">
              <Link href={`/records/${record.id}`}>
                <Image
                  src={record.image.url}
                  alt=""
                  width={250}
                  height={250}
                  className="block  h-[250px] w-full"
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
