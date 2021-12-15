const mongoose = require('mongoose')

const followSchema = new mongoose.Schema(
  {
    idToFollow: {
      type: String,
      required: true,
    },
    idIsFollowing: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true
  }
)

const FollowModel = mongoose.model('follow', followSchema)
module.exports = FollowModel