import { Router } from 'express';
import { parseInt } from 'lodash';
const router = Router();
type User={
    name:string
    age:number
}
const users:User[]=[
    {
        name:'john',
        age:20
    },
    {
        name:'joe',
        age:22
    }
]
router.route('/').get((req, res) => {
    return res.json ({users})
})
router.route('/').post((req, res) => {
    const {name,age}=req.body as User
    // console.log(name,age); 
    users.push({name,age});
    console.log(users);
    return res.json ({ message: 'this is users route from post method' })
})
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