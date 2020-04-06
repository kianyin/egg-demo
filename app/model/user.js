'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    nick_name: { type: String },
    password: { type: String },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    is_admin: { type: Boolean, default: false },
  });

  return mongoose.model('User', UserSchema);
};
