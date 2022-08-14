import db from "./dbConnection.js"
import express from 'express'
import cors from 'cors'
import { ObjectId } from "mongodb"

const app = express()
const port = 4000
app.use(cors())
app.use(express.json())
app.get('/api/top3', (req, res) => {
    
    db.collection("movies").find()
    .sort({vote_average:-1})
    .project({
      _id:1,
      title:1,
      image_url:1,
      overview:1,
      schedule:1
    })
    .toArray(function(err, result){
      const result1 = result.filter(function(movie){
        const diff = new Date(movie.schedule)
        .getTime()-new Date().getTime();
        const days = diff/(1000*3600*24)
        return days>0 && days < 7;
      })
      res.send(result1.slice(0, 3))
    })
    
})


app.get('/api/weekly', (req, res) => {
  db.collection("movies").find().project({
    _id:1,
    title:1,
    release_date:1,
    vote_average:1,
    image_url:1,
    schedule:1
  })
  .toArray(function(err, result){
    result = result.filter(function(movie){
      const diff = new Date(movie.schedule)
      .getTime()-new Date().getTime();
      const days = diff/(1000*3600*24)
      return days>0 && days <= 7;
    })
    res.send(result)
  })
  
})
app.put('/api/login', (req, res)=>{
  const mail = req.body._id;
  const password = req.body.password;
  db.collection('users').find({_id:mail, 
    password:password})
  .toArray(function(err, result){
    res.send(result);
  })

});
app.put("/api/register", (req, res)=>{
  db.collection("users")
  .insertOne(req.body, function(err, respo){
    if(err){
      console.log("error")
      res.send(false)
    }
    else{
      console.log('added')
      res.send(true)
    }
    
  })
})
app.put('/api/movieDetail', (req, res)=>{
  const id = req.body._id
  
  db.collection("movies").find()
  .toArray(function(err, result){
    result = result.find((movie)=>{
      return movie._id == id;
    })
    res.send(result);
  })
})
app.get('/api/comingSoon', (req, res) => {
    
  db.collection("movies").find().project({
    _id:1,
    title:1,
    release_date:1,
    vote_average:1,
    image_url:1,
    schedule:1
  })
  .sort({vote_average:-1})
  .toArray(function(err, result){
    const result1 = result.filter(function(movie){
      const diff = new Date(movie.schedule)
      .getTime()-new Date().getTime();
      const days = diff/(1000*3600*24)
      return days>7;
    })
    res.send(result1.slice(0, 8))
  })
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})