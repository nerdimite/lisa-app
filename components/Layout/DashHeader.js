import React, { useState, useEffect } from "react";
import Link from "next/link";
// Import react scroll
import { Link as LinkScroll } from "react-scroll";
import ButtonOutline from "../misc/ButtonOutline.";
import ButtonPrimary from "../misc/ButtonPrimary";
import Image from "next/image";
import LogoVPN from "../../public/assets/Logo.svg";
import { useRouter } from "next/router";

const DashHeader = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [scrollActive, setScrollActive] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 20);
    });
  }, []);
  const router = useRouter();

  return (
    <>
      <header
        className={"fixed top-0 w-full z-30 bg-white-500 transition-all pt-0"}
      >
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
          <div className="col-start-1 col-end-2 flex items-center">
            {/* <div className="w-auto h-1"> */}
            {/* <LogoVPN className="h-8 w-auto" /> */}
            <a href="/">
              <Image src="/assets/LisaLogo.png" height={50} width={100} />
            </a>
            {/* </div> */}
          </div>

          <div className="col-start-10 col-end-12 font-medium flex justify-end items-center">
            {/* <Link href="/">
              <a className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-orange-500 transition-all">
                  Sign In
              </a>
            </Link> */}
            <ButtonOutline
              handleClick={() => router.reload(window.location.pathname)}
            >
              Create a New Job
            </ButtonOutline>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation */}
      {/* <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-4 sm:px-8 shadow-t ">
        <div className="bg-white-500 sm:px-3">
          <ul className="flex w-full justify-between items-center text-black-500">
            <a
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "about"
                  ? "  border-orange-500 text-orange-500"
                  : " border-transparent")
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create New Job
            </a>
          </ul>
        </div>
      </nav> */}
      {/* End Mobile Navigation */}
    </>
  );
};

export default DashHeader;
