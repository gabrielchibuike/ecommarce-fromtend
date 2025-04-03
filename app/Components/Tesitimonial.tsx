import useEmblaCarousel from "embla-carousel-react";
import React, { useEffect } from "react";
import { AiFillStar } from "react-icons/ai";

function Tesitimonial() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const slides = [
    {
      img: "/cloth.png",
      name: "Leslie Alexander",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores consequuntur fuga dolores inventore neque culpa laboriosam, facere accusantium, nostrum.",
      rating: 5,
    },
    {
      img: "/cloth.png",
      name: "Leslie Alexander",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores consequuntur fuga dolores inventore neque culpa laboriosam, facere accusantium, nostrum.",
      rating: 5,
    },
    {
      img: "/cloth.png",
      name: "Leslie Alexander",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores consequuntur fuga dolores inventore neque culpa laboriosam, facere accusantium, nostrum.",
      rating: 5,
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
    <>
      <div className="w-full px-11 max-lg:px-2 my-16 max-lg:my-2">
        <div className="space-y-2 max-lg:space-y-1 py-10 max-lg:py-1">
          <h2 className="text-lg font-semibold max-lg:text-xs">Tesitimonial</h2>
          <h1 className="text-3xl font-semibold max-lg:text-base">
            What Our Clients Say
          </h1>
        </div>

        <div className="w-full overflow-hidden" ref={emblaRef}>
          <div className=" p-4 flex gap-1">
            {slides.map((ele, i) => (
              <div
                className="w-full bg-zinc-200/50 flex max-lg:flex-col flex-shrink-0 gap-2 items-center p-20 max-lg:p-4 "
                key={i}
              >
                <div className="w-[50%] h-[350px] max-lg:w-full bg-black"></div>
                <div className="w-full px-10 max-lg:px-0 text-2xl">
                  <div className="flex gap-2 items-center">
                    <div className="flex gap-2">
                      <AiFillStar className="text-yellow-600 " />
                      <AiFillStar className="text-yellow-600 " />
                      <AiFillStar className="text-yellow-600 " />
                      <AiFillStar className="text-yellow-600 " />
                    </div>
                    <p>5.0</p>
                  </div>

                  <div className="py-2">
                    <p className="text-base  py-2 text-zinc-600">
                      {ele.description}
                    </p>
                  </div>

                  <div>
                    <h1 className="text-base  py-2 text-zinc-600">
                      {ele.name}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Tesitimonial;
