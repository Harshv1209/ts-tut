import { Router } from 'express';
import { parseInt } from 'lodash';
const router = Router();
type user={
    name:string
    age:number
}
const users:user[]=[
    {
        name:'john',
        age:20
    },
    {
        name:'joe',
        age:22
    }
]
//get method
router.route('/').get((req, res) => {
    return res.json ({users})
})
//post method
router.route('/').post((req, res) => {
    const {name,age}=req.body as user
    // console.log(name,age); 
    users.push({name,age});
    console.log(users);
    return res.json ({ message: 'this is users route from post method' })
})
//put method
router.put("/:name",(req,res)=>{
    console.log(req.body)
    return res.json({message:'Hello from put!'})
   })
//    delete method
router.delete('/:name',(req,res)=>{
 const name=req.params.name;
 const index= users.findIndex((user)=>user.name === name)
 if(index === -1)
 return res.status(404).json({message:'user not found'})
 users.splice(index, 1)
 return res.json({message:'user deleted'})
//  const age=parseInt(req.params.age)

//  return res.json({name,age})
})
export default router