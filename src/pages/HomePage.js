import React, { useEffect, useState } from "react";
import TopRatedGames from "../components/TopRatedGames";
import CurrentYearGames from "../components/CurrentYearGames";

export default function HomePage() {
  document.title = `GameZone | Home`;

  const [ratedGames, setRatedGames] = useState({
    games: [],
    loaded: false,
  });

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&metacritic=80,100`
    )
      .then((res) => res.json())
      .then((data) =>
        setRatedGames({
          games: data.results.slice(0, 12),
          loaded: true,
        })
      );
  }, []);

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const currentMonth = month.toString().length === 1 ? "0" + month : month;
  const dd = date.getDate();
  const currentDD = dd.toString().length === 1 ? "0" + dd : dd;

  const currentDate = date.getFullYear() + "-" + currentMonth + "-" + currentDD;

  const [trendingGames, setTrendingGames] = useState({
    games: [],
    loaded: false,
  });
  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&dates=${year},${currentDate}`
    )
      .then((res) => res.json())
      .then((data) =>
        setTrendingGames({
          games: data.results.slice(0, 12),
          loaded: true,
        })
      );
  }, [year, currentDate]);

  return (
    <section className="bg-dark w-full h-full">
      {ratedGames.loaded && trendingGames.loaded ? (
        <main className="p-8 gap-12 flex flex-col max-sm:py-16 max-md:gap-16 overflow-hidden">
          <TopRatedGames ratedGames={ratedGames} />
          <CurrentYearGames trendingGames={trendingGames} year={year} />{" "}
        </main>
      ) : (
        <div className="w-full flex justify-center items-center pt-24">
          <button type="button" className="bg-indigo-500" disabled>
            <svg
              class="animate-spin -ml-1 mr-3 h-8 w-8 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
