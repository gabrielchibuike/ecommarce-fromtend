import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

const EmblaCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const slides = [
    {
      src: "/fashion.png",
      alt: "Image 1",
    },
    // {
    //   src: "https://res.cloudinary.com/dcsdg29se/image/upload/v1739591911/GabbySoft/Ecommerce%20store/Static%20Images/jbfxi1jncue6gyfvlh7v.webp",
    //   alt: "Image 2",
    // },
    // {
    //   src: "http://res.cloudinary.com/dcsdg29se/image/upload/v1739591911/GabbySoft/Ecommerce%20store/Static%20Images/z4nv5ki2ssnlglvzmwtz.webp",
    //   alt: "Image 3",
    // },
  ];

  // Auto-play effect
  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = () => {
      emblaApi.scrollNext();
    };

    const interval = setInterval(autoplay, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [emblaApi]);

  return (
    <div className="w-full  mx-auto ">
      {/* Carousel Container */}
      <div className="overflow-hidden rounded-lg " ref={emblaRef}>
        <div className="flex w-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] text-center text-xl w-full"
            >
              <Image
                src={slide.src}
                width={500}
                height={500}
                alt={slide.alt}
                className="w-full h-[500px]  max-lg:h-[200px]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
