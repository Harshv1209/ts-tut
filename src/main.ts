import express from 'express';
import userRoute from './user';
 const app = express();
 const port=4040;
 app.use(express.json())
 app.use('/user', userRoute);
 app.route('/').get((req, res)=>{
    //  res.send('hello');
    res.json({message:'Hello '})
 })
// app.get('/', (req, res) => {
//     res.json({message:'Hello '})
//   })

 function main(){
    app.listen(port, () => {
        console.log(` listening at ${port}`)
    })
 }
 main()