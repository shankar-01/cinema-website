import { useEffect, useState } from "react"
import axios from "axios"
import DateFormater from "./DateFormater"
import { Link } from "react-router-dom"
export default function Account(){
    const [account, setAccount] = useState(()=>{
        return JSON.parse(localStorage
            .getItem("cinema-account"))
    })
    const [history, setHistory] = useState([])
    useEffect(()=>{
        let ignore = false;
        async function fetchData(){
const {data} = await axios
.put('http://localhost:4000/api/transaction',
{ email:account._id})
            if(!ignore)
                setHistory(data)
        }
        fetchData()
        return ()=>{ignore=true}
    }, [account, history, setHistory])
    return (
        <div className="container" style={{color:"white"}}>
            <div className="row">
                <div className="col">
                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <table width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <h2>Name:</h2>
                                </td>
                                <td>
                                    <h2>{
                                        account.name
                                    }</h2>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h2>Email:</h2>
                                </td>
                                <td>
                                    <h2>{
                                        account._id
                                    }</h2>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <h2>History</h2>
                {
                    history.map(function(e, i){
                        return (<div className="col" 
                        key={i}>
                        <Link to={`/details/${e.movieId}`}
                        key={i}
                        >
                        <History movie={e}
                        key={i}
                        />
                        </Link>
                        
                        </div>)
                    })
                }
                
            </div>

        </div>
    )
}
function History(prop){
    return (
        
        <div className="container"
        style={{backgroundColor:"aliceblue",
                color:"black",
                border:"0.2em solid blue",
                borderRadius:"1em",
                marginBottom:"1em"
    }}
        >
            <div className="row">
                <div className="col-md-4">
        <img src={"https://image.tmdb.org/t/p/w500" +prop.movie.image_url}
        style={{width:"15%"}}
        />
                </div>
        <div className="col-md-4">
        <h4>Title: {prop.movie.title}</h4>
        <h4>Schedule: {DateFormater(prop.movie.schedule)}</h4>
        </div>
        <div className="col-md-4">
        <h4>Seats: {prop.movie.count}</h4>
        </div>
        </div>
        </div>
        
    )
}