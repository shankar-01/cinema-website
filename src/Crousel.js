import "./homepage.css";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
export default function Crousel() {
  const [movies, setMovies]= useState([]);
  useEffect(()=>{
    axios
    .get('http://localhost:4000/api/top3')
    .then((res)=>{
      setMovies(res.data)
    })
    
  })
  return (
    <div
      id="myCarousel"
      className="container carousel slide"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        <li data-target="#myCarousel" 
        data-slide-to="0" className="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>

      <div className="carousel-inner">
        {/* <CrouselItem classNames="item active" 
        src="https://cutacut.com/wp-content/uploads/2021/08/money-heist.jpg"
        movieName="Money Heist"
        desc='A criminal mastermind who goes by "The Professor" has a plan to
        pull off the biggest heist in recorded history -- to print
        billions of euros in the Royal Mint of Spain. To help him carry
        out the ambitious plan, he recruits eight people with certain
        abilities and who have nothing to lose. The group of thieves take
        hostages to aid in their negotiations with the authorities, who
        strategize to come up with a way to capture The Professor. As more
        time elapses, the robbers prepare for a showdown with the police.'
        /> */}
        {/* <div className="item active">
          <img
            src="https://cutacut.com/wp-content/uploads/2021/08/money-heist.jpg"
            alt="Money Heist"
            style={{ width: "100%" }}
          />
          <div className="carousel-caption">
            <h3>Money Heist</h3>
            <p>
              A criminal mastermind who goes by "The Professor" has a plan to
              pull off the biggest heist in recorded history -- to print
              billions of euros in the Royal Mint of Spain. To help him carry
              out the ambitious plan, he recruits eight people with certain
              abilities and who have nothing to lose. The group of thieves take
              hostages to aid in their negotiations with the authorities, who
              strategize to come up with a way to capture The Professor. As more
              time elapses, the robbers prepare for a showdown with the police.
            </p>
          </div>
        </div> */}
        {/* <CrouselItem classNames="item"
        src="https://i0.wp.com/dailyresearchplot.com/wp-content/uploads/2022/04/Peaky-Blinders-Season-6-Release-Date.jpg?fit=1920%2C1080&ssl=1"
        movieName="Peaky Blinders"
        desc="Tommy Shelby, a dangerous man, leads the Peaky Blinders, a gang
        based in Birmingham. Soon, Chester Campbell, an inspector, decides
        to nab him and put an end to the criminal activities."
        /> */}
        {/* <div className="item">
          <img
            src="https://i0.wp.com/dailyresearchplot.com/wp-content/uploads/2022/04/Peaky-Blinders-Season-6-Release-Date.jpg?fit=1920%2C1080&ssl=1"
            alt="Peaky Blinders"
            style={{ width: "100%" }}
          />
          <div className="carousel-caption">
            <h3>Peaky Blinders</h3>
            <p>
              Tommy Shelby, a dangerous man, leads the Peaky Blinders, a gang
              based in Birmingham. Soon, Chester Campbell, an inspector, decides
              to nab him and put an end to the criminal activities.
            </p>
          </div>
        </div> */}
        {/* <CrouselItem classNames="item"
        src="https://images.thedirect.com/media/article_full/moon-knight-eternals.jpg"
        movieName="Moon Knight"
        desc="Steven Grant and mercenary Marc Spector investigate the mysteries
        of the Egyptian gods from inside the same body."
        /> */}
        {/* <div className="item">
          <img
            src="https://images.thedirect.com/media/article_full/moon-knight-eternals.jpg"
            alt="Moon Knight"
            style={{ width: "100%" }}
          />
          <div className="carousel-caption">
            <h3>Moon Knight</h3>
            <p>
              Steven Grant and mercenary Marc Spector investigate the mysteries
              of the Egyptian gods from inside the same body.
            </p>
          </div>
        </div> */}
        {
          movies.map((movie, i)=>{
      sessionStorage.setItem("t"+i,JSON.stringify(movie))
          return( 
            
          <CrouselItem 
          classNames={i==0?"item active":"item"}
          src={"https://image.tmdb.org/t/p/w500"
          +movie.image_url}
          movieName={movie.title}
          desc={movie.overview}
          key={i}
          index={i}
          />
          
          )
        })
        }
      </div>

      <a className="left carousel-control" href="#myCarousel" data-slide="prev">
        <span className="glyphicon glyphicon-chevron-left"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="right carousel-control"
        href="#myCarousel"
        data-slide="next"
      >
        <span className="glyphicon glyphicon-chevron-right"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}
function CrouselItem(prop){
  return(
    
    <div className={prop.classNames}>
          <Link to={`/details/t${prop.index}`}>
          <img
            src={prop.src}
            alt={prop.movieName}
            style={{ 
              height: "50em",
              width:"100%",
              objectFit:"cover"
            }}
          />
          <div className="carousel-caption">
            <h3>{prop.movieName}</h3>
            <p>
              {prop.desc}
            </p>
          </div>
          </Link>
        </div>
  );
}