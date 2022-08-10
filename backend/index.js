import db from "./dbConnection.js"
import express from 'express'
import cors from 'cors'


const app = express()
const port = 4000
app.use(cors())
app.use(express.json())
app.get('/api/top3', (req, res) => {
    
    db.collection("movies").find()
    .sort({vote_average:-1})
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
  db.collection("movies").find()
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
app.post('/api/login', (req, res)=>{
  const mail = req.body._id;
  const password = req.body.password;
  db.collection('users').find({_id:mail, 
    password:password})
  .toArray(function(err, result){
    res.send(result);
  })

});
app.post("/api/register", (req, res)=>{
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
app.get('/api/comingSoon', (req, res) => {
    
  db.collection("movies").find()
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