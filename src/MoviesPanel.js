import React, { useEffect, useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";
import DateFormater from "./DateFormater";
export default function MoviesPanel() {
    const [movies, setMovies] = useState([]);
    const [comingSoon, setComingSoon] = useState([]);
    useEffect(()=>{
      axios
      .get('http://localhost:4000/api/weekly')
      .then((res)=>{
        setMovies(res.data)
      })
      axios
      .get('http://localhost:4000/api/comingSoon')
      .then((res)=>{
        setComingSoon(res.data)
      })
    })
    return (
      <div className="container" id="panel">
        <span
          style={{
            borderBottom: "2px solid blue",
            fontSize: "5em"
          }}
        >
          This Week
        </span>
        <br />
        <br />
        <div className="row">
          {movies.map((movie, i) => {
            const m = JSON.stringify(movie)
            sessionStorage.setItem(i, m);
            return (
              <Link to={`/details/${i}`}>
            <MovieCard
              key={i}
              movie = {movie}
            />
            </Link>
          )})}
        </div>
        <span
          style={{
            borderBottom: "2px solid blue",
            fontSize: "5em"
          }}
        >
          Coming Soon
        </span>
        <br />
        <br />
        <div className="row">
          {comingSoon.map((movie, i) => {
            const m = JSON.stringify(movie)
            sessionStorage.setItem('c'+i, m);
            return (
              <Link to={`/details/c${i}`}>
            <MovieCard
              key={i}
              movie = {movie}
            />
            </Link>
          )})}
        </div>
      </div>
    );
  }
  function MovieCard(prop) {
    const [movie, setMovie] = useState(prop.movie)
    
    return (
      <div className="card col-md-3 col-sm-4"
      style={{height:"40rem"}}
      >
        <img className="card-img-top" src=
        {"https://image.tmdb.org/t/p/w500" + movie.image_url}
         alt={movie.title}
        style={{width:"60%"}}
        
         />
        <div className="card-body">
          <h5 className="card-title">
            {movie.title}</h5>
          <div className="card-text">
            <p>
              Release Date-{" "}
              <span className="badge badge-primary">
                {movie.release_date}</span>
            </p>
            <p>
              Vote Average-{" "}
              <span className="badge badge-primary">
                {movie.vote_average}</span>
            </p>
            <p>
              Schedule-{" "}
              <span className="badge badge-primary">
                {DateFormater(movie.schedule)}</span>
            </p>
          </div>
        </div>
        
      </div>
      
    );
  }
  function MoviesDetail(prop){
    const [movie, setMovie] = useState(prop.movie)
    return (<div className="modal fade" 
    id="movieDetail" role="dialog">
    <div className="modal-dialog">
  
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title"
           align="center">{movie.title}</h4>
        </div>
        <div className="modal-body">
          <table align="center" width="80%">
            <tbody>
            <tr>
              <td align="center"  colSpan="2">
                <h4>Trailer</h4>
                </td>
            </tr>
            <tr>
              <td colSpan="2">
                <YouTube videoId={movie.key} />
              </td>
            </tr>
            <tr>
              <td>Overview</td>
              <td>{movie.overview}</td>
            </tr>
            <tr>
              <td>Schedule</td>
              <td>{movie.schedule}</td>
            </tr>
            <tr>
              <td><input className="btn btn-info btn-block" type="button"
              value="Book"/></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className="modal-footer">
          <p>Not a member yet? <a></a></p>
        </div>
      </div>
      
    </div>
  </div>);
  }