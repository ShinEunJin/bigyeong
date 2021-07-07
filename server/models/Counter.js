import mongoose from "mongoose"

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
