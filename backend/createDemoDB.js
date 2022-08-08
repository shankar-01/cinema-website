import axios from 'axios'
import mongodb from 'mongodb'




const MOVIE_API = "https://api.themoviedb.org/3/"
const DISCOVER_API = MOVIE_API + "discover/movie"
const API_KEY = "25c0c5cab022c3c047961e6495a39fc0"
const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"
const genreIds = {
    "28":"Action",
"12":"Adventure",
"16":"Animation",
"35":"Comedy",
"80":"Crime",
"99":"Documentary",
"18":"Drama",
"10751":"Family",
"14":"Fantasy",
"36":"History",
"27":"Horror",
"10402":"Music",
"9648":"Mystery",
"10749":"Romance",
"878":"Science Fiction",
"10770":"TV Movie",
"53":"Thriller",
"10752":"War",
"37":"Western"
}
const create = async () => {
    
    const movies = []
    for(let i=1; i<=5; i++){
        const {data} = 
    await axios
    .get(`${DISCOVER_API}`, {
        params: {
            api_key: API_KEY,
            page:i
        }
    })
    movies.push(...data.results)
    }
    const dayTime1 = new Date();
    dayTime1.setHours(13);
    dayTime1.setMinutes(0);
    dayTime1.setSeconds(0);
    const dayTime2 = new Date(dayTime1);
    dayTime2.setHours(17);
    
    for(let i=0; i<movies.length; i++){
        const video = await fetchMovie(movies[i].id);
        
        movies[i] = ({
            title:movies[i].title,
            overview:movies[i].overview,
            genre:movies[i].genre_ids.map(
                function(id1){
                    return genreIds[id1];
                }),
            original_language:movies[i].original_language,
            vote_average:movies[i].vote_average,
            vote_count:movies[i].vote_count,
            release_date:movies[i].release_date,
            image_url:movies[i].poster_path? 
            IMAGE_PATH+movies[i].poster_path:IMAGE_PATH+movies[i].backdrop_path,
            key:video?video.key:"",
            size:video?video.size:0,
            schedule: (()=>{
                const d = i%2?new Date(dayTime1):
                new Date(dayTime2);
                d.setDate(d.getDate()+
                Math.floor(i/2));
                
                return d;
            })(),
        })
        
        
    }
    
const connectionURI ="mongodb://127.0.0.1:27017/";
const client = mongodb.MongoClient;
client.connect(connectionURI, (err, db) => {
    if (err) console.log(err)
    else{
        console.log("Connected to database");
        const dbo = db.db("cinema");
        
        dbo.collection("movies").insertMany(
            movies, function(err, res){
                if(err)throw err
                console.log("added")
                db.close();
            })
        
    }
})

}
const fetchMovie = async (id) => {
    const {data} = await axios
    .get(`${MOVIE_API}movie/${id}`, {
        params: {
            api_key: API_KEY,
            append_to_response: "videos"
        }
    })

    if (data.videos && data.videos.results) {
        const trailer = data.videos
        .results
        .find(vid => vid.name === "Official Trailer")
        return trailer ? trailer : data.videos.results[0];
    }
}
create()