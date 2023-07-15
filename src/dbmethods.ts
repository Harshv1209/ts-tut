import { Router } from 'express';
import userSchema from "./models/users";
// import user from "./models/users";
const router = Router();
// Get  request method
// if 401 error generates then the there is error in GET request method
router.get("/", async (req, res) => {
  try {
    const records = await userSchema.find({});
    res.json(records);
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
});
export default router;
