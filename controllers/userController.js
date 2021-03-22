import User from "../models/User"

export const register = async (req, res) => {
    const user = await User.create(req.body)
    user.save(err => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
}