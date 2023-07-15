import express from 'express';
import userRoute from './dbmethods';
import mongoose from 'mongoose';
const app = express();
const port=4040;
app.use(express.json())
//mongodb password
// const secret='gJUQJCfLaMTcVe2x';
// mongodb url
// const mongoURI='mongodb+srv://harshvaidya345:gJUQJCfLaMTcVe2x@cluster0.zygfpsa.mongodb.net/?retryWrites=true&w=majority'
const mongoURI = process.env.MONGO_URI
 app.use('/dbmethods', userRoute);
 app.route('/').get((req, res)=>{
    //  res.send('hello');
    res.json({message:'Hello '})
 })
// app.get('/', (req, res) => {
//     res.json({message:'Hello '})
//   })

 function main(){
//connecting to mongoose
mongoose
        .connect(mongoURI)
        .then(()=>{
         console.log("database connected successfully")
         app.listen(port, () => {
            console.log(` listening at ${port}`)
        })
        })
        .catch((err)=>{
         console.log(err)
        })

   
 }
 main()