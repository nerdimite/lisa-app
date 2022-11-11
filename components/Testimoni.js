import React, { useState } from "react";

// import react slick
import Slider from "react-slick";
import Image from "next/image";
import Stars from "../public/assets/Icon/stars.svg";
import ArrowBack from "../public/assets/Icon/eva_arrow-back-fill.svg";
import ArrowNext from "../public/assets/Icon/eva_arrow-next-fill.svg";

const Testimoni = ({
  listTestimoni = [
    {
      name: "Aastha Gupta",
      image: "/assets/Bhavya.png",
      city: "Shipra Riviera",
      country: "India",
      rating: "4.9",
      testimoni:
        "Wow... I am very happy to use this tool, it turned out to be more than my expectations and so far there have been no problems. LISA always the best.",
    },
    {
      name: "Bhavya Gupta",
      image: "/assets/Bhavya.png",
      city: "Kaveri Lane",
      country: "India",
      rating: "4.8",
      testimoni:
        "This tool has helped in my work, LISA is very easy to use and in the application there are many features that are very useful for me. Thank you for making it.",
    },
    {
      name: "Ria Gupta",
      image: "/assets/Ria.png",
      city: "Vaishali",
      country: "India",
      rating: "5.0",
      testimoni:
        "Now I can sleep without worrying about the meetings I may miss. Thanks a ton LISA! You saved me from attending those long boring meetings!",
    },
    {
      name: "Meemansa Gupta",
      image: "/assets/Meemansa.png",
      city: "Chandigarh",
      country: "India",
      rating: "4.7",
      testimoni:
        "One of the best tools one can use to manage their meetings. It is very easy to use and has a lot of features. I would recommend it to everyone.",
    },
    {
      name: "Tanvi Gupta",
      image: "/assets/Tanvi.png",
      city: "New Delhi",
      country: "India",
      rating: "4.8",
      testimoni:
        "This app is very useful for me, I can manage my meetings easily and I can also search specific parts of the meeting. Thank you LISA for making my life easier.",
    },

  ],
}) => {
  const settings = {
    dots: true,
    customPaging: function (i) {
      return (
        <a className="">
          <span className="mx-2 rounded-l-full rounded-r-full h-4 w-4 block cursor-pointer transition-all "></span>
        </a>
      );
    },
    dotsClass: "slick-dots w-max absolute mt-20  ",
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [sliderRef, setSliderRef] = useState(null);

  return (
    <>
      <Slider
        {...settings}
        arrows={false}
        ref={setSliderRef}
        className="flex items-stretch justify-items-stretch"
      >
        {listTestimoni.map((listTestimonis, index) => (
          <div className="px-3 flex items-stretch" key={index}>
            <div className="border-2 border-gray-500 hover:border-orange-500 transition-all rounded-lg p-8 flex flex-col">
              <div className="flex flex-col xl:flex-row w-full items-stretch xl:items-center">
                <div className="flex order-2 xl:order-1">
                  <Image
                    src={listTestimonis.image}
                    height="70px"
                    width="70px"
                    alt="Icon People"
                  />
                  <div className="flex flex-col ml-5 text-left">
                    <p className="text-lg text-black-600 capitalize">
                      {listTestimonis.name}
                    </p>
                    <p className="text-sm text-black-500 capitalize">
                      {listTestimonis.city}, {listTestimonis.country}
                    </p>
                  </div>
                </div>
                <div className="flex flex-none items-center ml-auto order-1 xl:order-2">
                  <p className="text-sm">{listTestimonis.rating}</p>
                  <span className="flex ml-4">
                    <Stars className="h-4 w-4" />
                  </span>
                </div>
              </div>
              <p className="mt-5 text-left">“{listTestimonis.testimoni}”</p>
            </div>
          </div>
        ))}
      </Slider>
      <div className="flex w-full items-center justify-end">
        <div className="flex flex-none justify-between w-auto mt-14">
          <div
            className="mx-4 flex items-center justify-center h-14 w-14 rounded-full bg-white border-orange-500 border hover:bg-orange-500 hover:text-white-500 transition-all text-orange-500 cursor-pointer"
            onClick={sliderRef?.slickPrev}
          >
            <ArrowBack className="h-6 w-6 " />
          </div>
          <div
            className="flex items-center justify-center h-14 w-14 rounded-full bg-white border-orange-500 border hover:bg-orange-500 hover:text-white-500 transition-all text-orange-500 cursor-pointer"
            onClick={sliderRef?.slickNext}
          >
            <ArrowNext className="h-6 w-6" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimoni;
