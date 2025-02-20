import mongoose from "mongoose";

const teamsSchema = new mongoose.Schema({
  team_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  principal: { type: String, required: true },
  base: { type: String, required: true },
  founded_year: { type: Number, required: true },
  engine: { type: String, required: true },
  drivers: [
    { driver_id: { type: String, required: true } },
    { postition: { type: Number, required: true } },
  ],
  image: { type: String, required: true },
});

const Team = mongoose.model("Team", teamsSchema);

export default Team;
