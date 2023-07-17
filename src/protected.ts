import { Router } from 'express'
const router = Router()

router.get('/', (req, res) => {
	return res.json({ message: 'hello from protected route' })
})
export default router