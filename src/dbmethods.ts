import { Router } from 'express';
import userSchema from "./models/users";
import { createHash,verifyHash,createAccessToken,checkAccessToken } from './auth';
// import { verifyHash } from './auth';
// import user from "./models/users";
const router = Router();
interface LoginInput{
  username:string;
  password:string;
}
interface UserInput extends LoginInput {
 name:string;
  email: string;
  password: string;
  phone: string;
}
// Get  request method
// if 401 error generates then the there is error in GET request method
router.get("/", async (req, res) => {
  try {
    const records = await userSchema.find({});
    return res.json(records);
  } catch (error) {
    return res
      .status(401)
      .json({ message: error.message || "GET method error" });
  }
});
// POST request method
// if 402,403,404 error generates then the there is error in POST request method for particular syntax
router.post("/", async (req, res) => {
  try {
    const { name, password, email, username } = req.body;

    if (!password || !username) {
      return res
        .status(402)
        .json({ message: "password and username are required" });
    }

    const user = await userSchema.findOne({ username });

    if (user) {
      return res.status(403).json({ message: "username already exists" });
    }

    const newuser = await userSchema.create({
      name,
      password,
      email,
      username,
    });

    return res.json(newuser.toObject());
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: error.message || "POST method error" });
  }
});
// PUT request method
// if 405,406 error generates then the there is error in PUT request method for particular syntax

router.patch("/:id", async (req, res) => {
  try {
    // const {username,password,email,phone}=req.body as user
    const user = await userSchema.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
      return res.status(405).send();
    }
    console.log("database updated successfully");
    res.send(user);
  } catch (error) {
    return res
      .status(406)
      .json({ message: error.message || "PUT method error" });
  }
});
//DELETE request method
// if 405 error generates then the there is error in DELETE request method for particular syntax
router.delete("/:id", async (req, res) => {
  try {
    const user = await userSchema.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(407).send();
    }
    console.log("database deleted successfully");
    return res.send(user);
  } catch (error) {
    res.status(408).json({ message: "interval server error" });
  }
})
router.post('/signup', async(req, res)=>{
    try {
      const formData =req.body as UserInput
      // username and password are required fields
      if(!formData.username) return res.status(410).json({message:'username is required'})
      if(!formData.password) return res.status(420).json({message:'password is required'})
      // username should  be unique
      const user = await userSchema.findOne({username:formData.username})
      if(user) return res.status(430).json({message:'username already exists'})
      // password should be 8 chracters long
      if(formData.password.length<8) return res.status(440).json({message:'password should be 8 chracters long'})
      // hash the password
      const hashedPassword=await createHash(formData.password)
      // save the user in database 
      const newUser= await userSchema.create({
        username:formData.username,
        password:hashedPassword,
        name:formData.name,
        email:formData.email,
        phone:formData.phone
      })
      // return the user
      return res.json({
        message:'user created successfully',
        payload:{
        name:newUser.name,
        username:newUser.username,
        email:newUser.email,
        phone:newUser.phone
        },
        accessToken: createAccessToken({
          username: newUser.username,
        }),
      })
      
    } catch (error) {
      console.log(error)
      res.status(520).json({ message: "interval server error" });
    }
})
router.post('/login',async(req,res)=>{
  try {
    // username and password are required fields
    const { username, password } = req.body as LoginInput
		if (!username)
			return res.status(400).json({ message: 'username is required' })

		if (!password)
			return res.status(400).json({ message: 'password is required' })
    // username does exist in the database
    const user = await userSchema.findOne({ username })
    // if not user then return 404
    if (!user) return res.status(404).json({ message: 'user not found' })
    // verify the password 
    const result = await verifyHash(password, user.password)
    // if password is wrong then return 400 error
    if (!result) return res.status(400).json({ message: 'wrong password' })
    // return the user and accesstoken 
    return res.json({
			message: 'user logged in successfully',
			payload: {
				username: user.username,
				fullname: user.name,
				email: user.email,
				phone: user.phone,
				accessToken: createAccessToken({username: user.username,}),
			},
		})
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "interval server error" });
  }
})
router.get('/verifyToken', async (req, res) => {
	try {
		const authorization = req.headers.authorization
		if (!authorization)
			return res
				.status(401)
				.json({ message: 'authorization header is required' })

		const result = checkAccessToken(authorization)

		if (!result.success)
			return res.status(401).json({ message: result.message })

		console.log(result)
		return res.json({ message: 'hello from verifyToken route' })
	} catch (error) {
		return res.status(500).json({ message: 'Internal Server Error' })
	}
})
export default router;
