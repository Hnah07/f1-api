import mongoose from "mongoose";

const raceSchema = new mongoose.Schema({
  round: {
    type: Number,
    required: true,
  },
  circuit_id: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  sprint_race: {
    type: Boolean,
    default: false,
  },
  fastest_lap: {
    type: String,
    default: "",
  },
  race_results: [
    {
      position: {
        type: Number,
        required: true,
      },
      driver_id: {
        type: String,
        required: true,
        trim: true,
      },
      time: {
        type: Number,
        required: true,
      },
      points: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Race = mongoose.model("Race", raceSchema);
export default Race;
