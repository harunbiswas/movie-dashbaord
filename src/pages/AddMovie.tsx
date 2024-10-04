import axios, { AxiosError } from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import values from "../values";

// Define interfaces for Movie and Details
interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface MovieDetails {
  Poster?: string;
  Title?: string;
  Genre?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  imdbID?: string;
  Type?: string;
  BoxOffice?: string;
  Year?: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  HdUrl?: string;
  FullHdUrl?: string;
  QhdUrl?: string;
}

export default function AddMovie() {
  const authenticated = localStorage.getItem("authToken");

  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchItem, setSearchItem] = useState<string>("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [details, setDetails] = useState<MovieDetails | null>(null);

  useEffect(() => {
    if (searchItem) {
      axios
        .get(`https://www.omdbapi.com/?apikey=bf4beae2&s=${searchItem}&page=1`)
        .then((d) => {
          setMovies(d.data?.Search || []);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [searchItem]);

  useEffect(() => {
    if (selectedMovie?.imdbID) {
      axios
        .get(
          `http://www.omdbapi.com/?apikey=bf4beae2&i=${selectedMovie?.imdbID}`
        )
        .then((d) => {
          setDetails(d.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [selectedMovie]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };

  const submitHandler = async () => {
    try {
      const result = await axios.post(`${values.url}/movie/add`, details, {
        headers: {
          Authorization: authenticated,
        },
      });
      console.log(result.data);
      navigate("/dashboard/movies");
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="movie-add">
      <h1>Add Movie</h1>

      <div className="movie-add-search">
        <div className="form-group">
          <label htmlFor="search">Search movies</label>
          <input
            value={searchItem}
            placeholder="Search movies"
            onChange={handleSearchChange}
            type="text"
            id="search"
          />
        </div>

        {searchItem && (
          <ul>
            {movies.length > 0 ? (
              movies.map((movie, i) => (
                <li key={i}>
                  <button
                    onClick={() => {
                      setSelectedMovie(movie);
                      setSearchItem("");
                      setDetails(null);
                    }}
                  >
                    <img src={movie?.Poster} alt="movie" />
                    <div className="content">
                      <strong>{movie?.Title}</strong>
                      <span>{movie?.Year}</span>
                    </div>
                  </button>
                </li>
              ))
            ) : (
              <li>Movie not found</li>
            )}
          </ul>
        )}
      </div>

      {details && (
        <div className="movie-add-body">
          <div className="left">
            <img src={details?.Poster} alt="Poster" />
          </div>
          <div className="right">
            <div className="right-top">
              <h4>{details?.Title}</h4>
              <span className="genre">{details?.Genre}</span>
              <span>{details?.Language}</span>
            </div>
            <div className="right-mid">
              <span>
                <b>Country:</b> {details?.Country}
              </span>
              <span>
                <b>Awards:</b> {details?.Awards}
              </span>
              <span>
                <b>imdbID:</b> {details?.imdbID}
              </span>
              <span>
                <b>Type:</b> {details?.Type}
              </span>
              <span>
                <b>BoxOffice:</b> {details?.BoxOffice}
              </span>
              <span>
                <b>Year:</b> {details?.Year}
              </span>
              <span>
                <b>Rated:</b> {details?.Rated}
              </span>
              <span>
                <b>Released:</b> {details?.Released}
              </span>
              <span>
                <b>Runtime:</b> {details?.Runtime}
              </span>
              <span>
                <b>Director:</b> {details?.Director}
              </span>
              <span>
                <b>Writer:</b> {details?.Writer}
              </span>
              <span>
                <b>Actors:</b> {details?.Actors}
              </span>
              <span>
                <b>Plot:</b> {details?.Plot}
              </span>
            </div>
            <div className="right-bottom">
              <h3>Download Links</h3>
              <div className="form-group">
                <label htmlFor="download">HD URL</label>
                <input
                  type="text"
                  name="download"
                  value={details?.HdUrl || ""} // Ensure details is not null
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setDetails((prev) => ({
                      ...(prev || {}), // Handle potential null state
                      HdUrl: e.target.value,
                    }));
                  }}
                  id="download"
                  placeholder="https://example.com/download/"
                />
              </div>
              <div className="form-group">
                <label htmlFor="download">Full HD URL</label>
                <input
                  type="text"
                  name="download"
                  value={details?.FullHdUrl || ""} // Ensure details is not null
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setDetails((prev) => ({
                      ...(prev || {}), // Handle potential null state
                      FullHdUrl: e.target.value,
                    }));
                  }}
                  id="download"
                  placeholder="https://example.com/download/"
                />
              </div>
              <div className="form-group">
                <label htmlFor="download">QHD URL</label>
                <input
                  type="text"
                  name="download"
                  value={details?.QhdUrl || ""} // Ensure details is not null
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setDetails((prev) => ({
                      ...(prev || {}),
                      QhdUrl: e.target.value,
                    }));
                  }}
                  id="download"
                  placeholder="https://example.com/download/"
                />
              </div>
              <button onClick={submitHandler} className="btn">
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
