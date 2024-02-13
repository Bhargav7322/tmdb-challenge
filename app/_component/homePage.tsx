"use client";

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  media_type: string;
  release_date: string;
  vote_average: number;
  genres: Genre[];
  popularity: number; 
}

const settings = {
  dots: false,
  infinite: false,
  autoplay: false,
  speed: 500,
  arrows: true,
  slidesToShow: 4,
  slidesToScroll: 1,
};

interface Person {
  id: number;
  name: string;
  profile_path: string;
  known_for_department: string;
  popularity: number; 
}
interface Genre {
  id: number;
  name: string;
}

const HomePage = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [cast, setcast] = useState<Person[]>([]);

  const fetchcast = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/person/popular?api_key=9602cbb3f1d8d00ebf651066bba18aa6&language=en-US&page=1"
      );
      if (response.ok) {
        const data = await response.json();
        setcast(data.results);
      } else {
        console.error("Failed To Fetch Data");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  useEffect(() => {
    fetchcast();
  }, []);

  const fetchNowPlayingMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=9602cbb3f1d8d00ebf651066bba18aa6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2024-01-03&primary_release_date.lte=2024-02-14"
      );
      if (response.ok) {
        const data = await response.json();
        setNowPlayingMovies(data.results);
      } else {
        console.error("Fail To Get Data");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);


  return (
    <>
      <div className="heroImage">
        <div className="container m-auto">
          <div className="flex justify-between pt-4">
            <div className="flex">
              <Image src={"/images/tv.png"} width={50} height={50} alt="tv" />
              <h2 className="text-2xl font-bold text-white self-center ml-4">
                MovieBox
              </h2>
            </div>
            <div className="relative self-center">
              <input
                type="text"
                name=""
                id=""
                placeholder="What do you want to watch?"
                className="w-[525px] bg-transparent border-2 border-[#D1D5DB] py-[6px] px-[10px] rounded-md"
              />
              <Image
                src={"/images/Search.png"}
                width={16}
                height={16}
                alt="tv"
                className="absolute top-2.5 right-4"
              />
            </div>
            <div className="flex">
              <h2 className="text-base font-bold text-white self-center mr-4">
                Sign in
              </h2>
              <Image
                src={"/images/Menu.png"}
                width={50}
                height={50}
                alt="menu"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[404px] mt-40">
              <h2 className="text-5xl font-bold text-white">
                John Wick 3 : Parabellum
              </h2>
              <div className="flex my-3">
                <div className="flex">
                  <Image
                    src={"/images/imdb.png"}
                    width={35}
                    height={17}
                    alt="imdb"
                  />
                  <p className="text-xs font-normal text-white self-center ml-2">
                    86.0 / 100
                  </p>
                </div>
                <div className="flex">
                  <Image
                    src={"/images/tomato.png"}
                    width={16}
                    height={17}
                    alt="tomato"
                  />
                  <p className="text-xs font-normal text-white self-center ml-2">
                    97%
                  </p>
                </div>
              </div>
              <p className="text-white">
                John Wick is on the run after killing a member of the
                international assassins&apos; guild, and with a $14 million
                price tag on his head, he is the target of hit men and women
                everywhere.
              </p>
              <div className="mt-3">
                <button className="flex bg-[#BE123C] rounded-md py-1.5 px-4">
                  <Image
                    src={"/images/Play.png"}
                    width={20}
                    height={20}
                    alt="play"
                  />
                  <p className="text-sm font-bold ml-2 self-center">
                    Watch trailer
                  </p>
                </button>
              </div>
            </div>
            <div className="mt-56">
              <p className="text-white">1</p>
              <p className="text-white">2</p>
              <p className="text-white">3</p>
              <p className="text-white">4</p>
              <p className="text-white">5</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container m-auto">
        <div className="flex justify-between p-8">
          <h2 className="text-4xl font-bold">Featured Movie</h2>
          <p className="text-lg font-normal text-[#BE123C]">See more {">"}</p>
        </div>
        <div>
          {nowPlayingMovies.length > 0 && (
            <Slider {...settings}>
              {nowPlayingMovies.map((movie: Movie, index: number) => (
                <div key={index}>
                  <div className="relative">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      width={250}
                      height={370}
                      alt={movie.title}
                    />
                    <div className="absolute flex gap-32 top-4 px-5">
                      <h2 className="text-xs font-bold bg-[#F3F4F680]/[50%] px-1 w-[70px] rounded-md h-[16px]">
                        {movie.media_type}
                      </h2>
                      <Image
                        src={"/images/heart.png"}
                        width={20}
                        height={20}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs font-bold text-[#9CA3AF]">
                      {movie.release_date}, {movie.vote_average}
                    </p>
                    <p className="text-lg font-bold">{movie.title}</p>
                    <div className="flex my-1 gap-4">
                      <div className="flex">
                        <Image
                          src={"/images/imdb.png"}
                          width={35}
                          height={17}
                          alt="imdb"
                        />
                        <p className="text-xs font-normal self-center ml-2">
                          popularity:{movie.popularity}
                        </p>
                      </div>
                      {/* <h2 className="text-lg font-bold mt-2">{movie.title}</h2> */}
                      {/* <p className="text-sm text-gray-600">{movie.release_date}</p>
                 <p className="text-sm text-gray-600">
                   Rating: {movie.vote_average}
                 </p>
                 <p className="text-sm text-gray-600">
                Popularity: {movie.popularity}
                </p> */}
                    </div>
                    <p className="text-xs font-bold text-[#9CA3AF]">
                      {movie.genres
                        ? movie.genres.map((genre) => genre.name).join(", ")
                        : "Genre not available"}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
      <div className="container mx-auto">
      <div className="flex justify-between p-8">
      <h2 className="text-4xl font-bold">Featured Casts</h2>
      <p className="text-lg font-normal text-[#BE123C]">See more {">"}</p>
      </div>
        <Slider {...settings}>
          {cast.map((person) => (
            <div key={person.id} className="px-2 mt-8">
              {person.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                  alt={person.name}
                  className="w-full rounded-lg shadow-md"
                />
              ) : (
                <div className="w-full h-64 bg-gray-300 rounded-lg shadow-md"></div>
              )}
              <h2 className="text-lg font-bold mt-2">{person.name}</h2>
              <p className="text-sm text-gray-600">
                {person.known_for_department}
              </p>
              <p className="text-sm text-gray-600">
                Popularity:{person.popularity}
              </p>
            </div>
          ))}
        </Slider>
      </div>

      <div className="text-center">
        <div className="flex justify-center gap-4 mt-4">
          <Image
            src="/images/facebook.png"
            alt="Facebook"
            width={30}
            height={30}
          />
          <Image
            src="/images/instagram.png"
            alt="Instagram"
            width={30}
            height={30}
          />
          <Image
            src="/images/twitter.png"
            alt="Twitter"
            width={30}
            height={30}
          />
          <Image
            src="/images/youtube.png"
            alt="YouTube"
            width={30}
            height={30}
          />
        </div>

        <div className="flex justify-center gap-4 font-bold mt-4">
          <p>Conditions of Use</p>
          <p>Privacy & Policy</p>
          <p>Press Room</p>
        </div>

        <div className="flex justify-center mt-4">
          <p>@ 2021 MovieBox by Adriana Eka Prayudha</p>
        </div>
      </div>
    </>
  );
};
export default HomePage;
