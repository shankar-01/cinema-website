import fetch from "node-fetch";
import cheerio from 'cheerio'
import mysql from 'mysql'
const url = 'https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm'
const movieDetail = 'https://www.imdb.com/title/'
async function getMovies(){
const response = await fetch(`${url}`)
const body = await response.text()
const getMoviesList = body=>{
        const movies = [];
        const $ = cheerio.load(body)
        $('.lister-list tr').each(
            function(index, e){
                const $e = $(e)
                
                const name = 
                $e.find('.titleColumn a').text();
                const realseYear = 
                $e.find('.titleColumn .secondaryInfo')
                .text().match("[0-9]+")[0]
                const imdbRating = 
                $e.find('.imdbRating strong').text()
                const imgUrl =
                $e.find('.posterColumn a img')
                .attr('src')
                const moviePageUrl =
                $e.find('.posterColumn a')
                .attr('href')
                let i = moviePageUrl.indexOf('/', 1)+1
                let j = moviePageUrl.indexOf('/', i)
                let movieId = moviePageUrl
                .substring(i, j)
                const movie = 
                {name, realseYear, imdbRating,
                     imgUrl, movieId}
                movies.push(movie)
            })
        return movies;
    }
const moviesList = (async ()=>{
    const r = await getMoviesList(body)
    return r
})()
    return moviesList;
}
async function getDetails(movieId){
    const response = await fetch(`${movieDetail}${movieId}`)
    const body = response.text()
    const detail = body=>{
        const $ = cheerio.load(body)
        let description;
        $('.sc-16ede01-0').each(function(index, e){
            const $e = $(e);
            description = $e.text()
        })
        
        return ({description});
    }
    return await detail(body)
}
(async ()=>{
    const data = await getMovies();
    
    var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root"
    });

    con.connect(function(err) {
     if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE cinema", function (err, result) {
        if (err) throw err;
        console.log("Database created");
      });
    con.query('Use cinema', function (err, result) {
        if (err) throw err;
        console.log("Database selected");
      });
    const tab = 'CREATE TABLE movies (name varchar(255), realseYear int, imdbRating double,imgUrl nvarchar(1000), movieId varchar(255) primary key)'
    con.query(tab, function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });
    data.forEach(function(obj){
        const ins = `Insert into movies (name, realseYear, imdbRating,imgUrl, movieId) values ("${obj.name}", ${obj.realseYear}, ${Number(obj.imdbRating)}, '${obj.imgUrl}', '${obj.movieId}')`
        con.query(ins, function (err, result) {
            if (err) throw err;
            console.log("movie added: ", obj.movieId);
          });
    })
    
    });
    console.log(data)
    
})()
