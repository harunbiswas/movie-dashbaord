import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

// Define interfaces for Movie and Details
interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface MovieDetails {
  Poster: string;
  Title: string;
  Genre: string;
  Language: string;
  Country: string;
  Awards: string;
  imdbID: string;
  Type: string;
  BoxOffice: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
}

export default function AddMovie() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchItem, setSearchItem] = useState<string>("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [details, setDetails] = useState<MovieDetails | null>(null);

  useEffect(() => {
    if (searchItem) {
      axios
        .get(`http://www.omdbapi.com/?apikey=bf4beae2&s=${searchItem}&page=1`)
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
              <div className="form-group">
                <label htmlFor="download">Download Link</label>
                <input
                  type="text"
                  name="download"
                  id="download"
                  placeholder="https://example.com/download/"
                />
              </div>
              <button className="btn">Publish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
