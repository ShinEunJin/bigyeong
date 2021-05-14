import nodemailer from "nodemailer"

export const registerEmail = async (req, res) => {
  const {
    body: { email, randomNum },
  } = req
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "sineun5501@gmail.com",
        pass: "tjdrhd5501!",
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
