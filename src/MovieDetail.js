import { useParams } from 'react-router-dom'
import YouTube from 'react-youtube'
import DateFormater from './DateFormater'
import axios from 'axios'
import './movieDetail.css'
import { useEffect, useState } from 'react'
export default function MovieDetail() {

    const { i } = useParams()
    const [movie, setMovie] = useState({})
    useEffect(()=>{
        let ignore = false;
        async function fetchData(){
            const {data} = await axios.put('http://localhost:4000/api/movieDetail',{ _id: i})
            if(!ignore)
                setMovie(data)
        }
        fetchData()
        return ()=>{ignore=true}
    }, [i, movie, setMovie])
    
    if(movie.genre)
        return (<>

            <div className="container">
                <div className='row'>
                    <div className='col-12 col-md-12'
                        id="youtubeCenter"
                    >
                        <YouTube videoId={movie.key} />
                    </div>
                </div>

                <div className='row'>
                    <div
                        className='col-12'>
                        <h1 className='text-primary'>
                            {movie.title}
                        </h1>

                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6 col-sm-12'>
                        <img src={"https://image.tmdb.org/t/p/w500" +
                            movie.image_url} id="dp" />
                    </div>
                    <div className='col-md-6 col-sm-12'>
                        <table>
                            <tbody
                                id="detail">
                                <tr>
                                    <td colSpan="2">
                                        <h4>
                                            {movie.overview}
                                        </h4>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h4>Genre</h4>
                                    </td>
                                    <td>
                                        {
                        movie.genre.map(
                                                (g) => {
                                                    return (<span className='badge bage-pill' >
                                                        {g}
                                                    </span>)
                                                }
                                            )
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h4>Language</h4>
                                    </td>
                                    <td>
                                        <span className='badge badge-pill'>{movie.original_language
                                        }</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h4>Release Date</h4>
                                    </td>
                                    <td>
                                        <h4>{movie.release_date}</h4>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h4>Rating</h4>
                                    </td>
                                    <td>
                                        <span className=' badge badge-pill vote'>
                                            {movie.vote_average + "/10      (" + movie.vote_count + ")"} </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h4>Schedule</h4>
                                    </td>
                                    <td>
                                        <h4>{DateFormater(movie.schedule)}
                                            <button className='btn btn-primary'
                                                style={{ float: "right" }}
                                            >Book</button>
                                        </h4>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>

        )
        return<h1>Loading...</h1>
    
}