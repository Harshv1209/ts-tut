import { RequestHandler } from 'express'
import userSchema from '../models/users'
import { checkAccessToken } from '../auth'

const tokenRequired: RequestHandler = async (req, res, next) => {
	try {
		const authorization = req.headers.authorization
		if (!authorization)
			return res
				.status(401)
				.json({ message: 'authorization header is required' })

		const result = checkAccessToken<{ username: string }>(authorization)
            console.log(result);
		// check if the user is in the database
		const user = await userSchema.findOne({
			username: result.decoded.username,
		})

		if (!user) return res.status(404).json({ message: 'User not found' })

		if (!result.success)
			return res.status(401).json({ message: result.message })

		console.log(result)
		next()
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'Internal Server Error' })
	}
}

export default tokenRequired