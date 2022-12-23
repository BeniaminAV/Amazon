import Image from "next/image";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CarouselOne, CarouselThree, CarouselTwo } from "../assets";

function Banner() {
  return (
    <div className="relative">
      <div className="absolute bottom-0 z-20 h-32 w-full bg-gradient-to-t from-gray-100 to-transparent" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <Image src={CarouselOne} loading="lazy" />
        </div>

        <div>
          <Image src={CarouselTwo} loading="lazy" />
        </div>

        <div>
          <Image src={CarouselThree} loading="lazy" />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
