const mongoose = require("mongoose");

const { Schema } = mongoose;

const noteSchema = new Schema({
  text: String,
  completed: { type: Boolean, default: false },
  dateCreated: Date,
  _user: { type: Schema.Types.ObjectId, ref: "User" },
});

mongoose.model("Note", noteSchema);
