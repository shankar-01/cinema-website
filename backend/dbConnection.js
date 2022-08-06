import mongoose from 'mongoose'
const connectionURI = "mongodb://localhost:27017";
const connectDatabase = ()=>{
    mongoose.connect(connectionURI, ()=>{
        console.log("Connected to database");
    })
}
export default connectDatabase;
