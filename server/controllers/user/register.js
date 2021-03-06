import User from "../../models/User"
import nodemailer from "nodemailer"
import "@babel/polyfill"
import dotenv from "dotenv"

dotenv.config()

export const register = async (req, res) => {
  const {
    body: { name, email, password },
  } = req
  try {
    const user = new User({ name, email, password })
    await user.save()
    return res.status(200).json({ success: true })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}

export const registerCheck = async (req, res) => {
  const {
    query: { email },
  } = req
  let isExisted = false
  try {
    const user = await User.findOne({ email })
    if (user) {
      isExisted = true
      return res.status(200).json({ success: true, isExisted })
    } else {
      return res.status(200).json({ success: true, isExisted })
    }
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}

//이메일 인증
export const registerEmail = async (req, res) => {
  const {
    body: { email, randomNum },
  } = req
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
    await transporter.sendMail({
      from: "B/Gyeong ☕ <sineun5501@gmail.com>",
      to: email,
      subject: "B/Gyeong 이메일 인증번호 입니다.",
      html: `<h3>🍀B/Gyeong 에 오신걸 환영합니다!🍀</h3><h2>${randomNum}</h2><h4>위 인증번호를 인증 번호창에 적어주시기 바랍니다.</h4>`,
    })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}
