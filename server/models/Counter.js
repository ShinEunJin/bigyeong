import mongoose from "mongoose"

//게시판 목록 번호 같은 곳에서 쓰이도록 만든 DB
const CounterSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    default: 0,
    required: true,
  },
})

const Counter = mongoose.model("Counter", CounterSchema)

export default Counter
