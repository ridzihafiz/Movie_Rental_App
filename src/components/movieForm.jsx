import React from "react";
import { Link, useParams } from "react-router-dom";

const MovieForm = () => {
  const { id } = useParams();
  // console.log(id);
  return (
    <div>
      <h1>Movie Form {id} </h1>
      <Link className="btn btn-primary" to="/movies">
        Save
      </Link>
    </div>
  );
};

export default MovieForm;
