import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import { Link } from "react-router-dom";
import values from "../values";

type Movie = {
  Poster: string;
  Title: string;
  Genre: string;
  Language: string;
  Country: string;
  imdbID: string;
  Year: string;
};

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await axios.get(`${values.url}/movie/gets`, {
        headers: {
          Authorization: localStorage.getItem("authToken"),
        },
      });
      setMovies(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="movie">
      <h1>Movies</h1>
      <table className="movie-table">
        <thead>
          <tr>
            <th>no</th>
            <th>Photo</th>
            <th>name</th>
            <th>Genre</th>
            <th>Language</th>
            <th>Country</th>
            <th>imdbID</th>
            <th>Year</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies?.map((movie, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                <img src={movie?.Poster} alt="" />
              </td>
              <td>{movie?.Title}</td>
              <td>{movie?.Genre}</td>
              <td>{movie?.Language}</td>
              <td>{movie?.Country}</td>
              <td>{movie?.imdbID}</td>
              <td>{movie?.Year}</td>
              <td>
                <Link to="view">
                  <GrFormView />
                </Link>{" "}
                <Link to="edit">
                  <FaRegEdit />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
