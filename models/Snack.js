import mongoose from "mongoose";

const snackSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Snack = mongoose.models.snack || mongoose.model("snack", snackSchema);

export default Snack;
