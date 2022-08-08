import mongoose from 'mongoose'
import mongodb from 'mongodb'
const connectionURI ="mongodb://127.0.0.1:27017/";
const client = mongodb.MongoClient;
const db = client.connect(connectionURI)
export default (await db).db("cinema");
// const connectDatabase = () => {
//     mongoose.createConnection(connectionURI, (err) => {
//         if (err) console.log(err)
//         else{
//         console.log("Connected to database");
//         } 
//     })
// }
// connectDatabase()
// const {Schema} = mongoose
// const D1Schema = new Schema({
//     title:{
//         type:String,
//         required:true
//     }
// })
// const D1 = mongoose.model('d1', D1Schema)
// const m = new D1({title:"My title"});
//         m.save()
// export default connectDatabase;
