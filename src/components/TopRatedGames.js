import React from "react";
import GameCard from "./GameCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

export default function TopRatedGames({ ratedGames }) {
  return (
    <section>
      <div className="flex items-center justify-between overflow-hidden">
        <h3 className="font-semibold text-[2.1rem] text-white tracking-wide pb-4">
          Top Rated
        </h3>
        <Link
          to="/top-rated"
          className="font-medium relative text-xl after:transition-all text-white flex items-start after:h-[2px] after:w-10 after:absolute after:bg-primary after:bottom-0 hover:after:w-full active:text-light max-sm:hidden"
        >
          See More
          <i className="bx bx-chevron-right text-2xl"></i>
        </Link>
      </div>
      <main className="flex items-center">
        <Swiper
          className="w-full"
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            390: {
              slidesPerView: 1.25,
            },
            576: {
              slidesPerView: 1.8,
            },
            768: {
              slidesPerView: 2.5,
            },
            1080: {
              slidesPerView: 3,
            },
            1440: {
              slidesPerView: 3.5,
            },
          }}
          modules={[Navigation]}
          spaceBetween={30}
          loop={true}
          navigation={true}
          style={{
            "--swiper-navigation-color": "#ddd",
            "--swiper-navigation-size": "2rem",
          }}
        >
          {ratedGames.games.map((game, index) => {
            return (
              <SwiperSlide key={index}>
                <GameCard
                  name={game.name}
                  image={game.background_image}
                  releaseDate={game.released}
                  metacritic={game.metacritic}
                  id={game.id}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </main>
    </section>
  );
}
