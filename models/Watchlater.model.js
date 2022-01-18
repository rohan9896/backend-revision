const mongoose = require("mongoose");
const { Schema } = mongoose;

const WatchlaterSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Watchlater", WatchlaterSchema);
