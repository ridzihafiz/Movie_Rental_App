import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { Link, useParams, Navigate } from "react-router-dom";
import { render } from "@testing-library/react";

class MovieForm extends Form {
  // const { id } = useParams();
  // console.log(id);

  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    console.log(movieId);
    const movieId = this.props.match.params.id;
    // const { movieId } = useParams();
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    // if (!movie) return this.props.history.replace("/not/found");
    if (!movie) return <Navigate to="/not/found" />;

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);

    // this.props.history.push("/movies");
    <Navigate to="/movies" />;
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

// import React from "react";
// import { Link, useParams } from "react-router-dom";
// const MovieForm = () => {
//   const { id } = useParams();
//   // console.log(id);
//   return (
//     <div>
//       <h1>Movie Form {id} </h1>
//       <Link className="btn btn-primary" to="/movies">
//         Save
//       </Link>
//     </div>
//   );
// };

export default MovieForm;
