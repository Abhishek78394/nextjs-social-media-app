const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  chat_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
  },
  message: String,
  is_seen: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);

module.exports = Message;
