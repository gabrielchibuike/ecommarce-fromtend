import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

const EmblaCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const slides = [
    {
      src: "/cloth.png",
      alt: "Image 1",
    },
    {
      src: "/enhanced_hero_image.png",
      alt: "Image 2",
    },
    // {
    //   src: "/img1.png",
    //   alt: "Image 3",
    // },
    // {
    //   src: "/img3.png",
    //   alt: "Image 3",
    // },
    {
      src: "/img4.png",
      alt: "Image 3",
    },
    {
      src: "/img5.png",
      alt: "Image 3",
    },
  ];

  // Auto-play effect
  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = () => {
      emblaApi.scrollNext();
    };

    const interval = setInterval(autoplay, 7000); // Change slide every 3 seconds

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
                className="w-full h-auto max-lg:object-cover crisp-edges"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
