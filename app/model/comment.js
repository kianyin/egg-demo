'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const CommentSchema = new Schema({
        content: { type: String },
        topic_id: { type: ObjectId },
        author_id: { type: ObjectId },
        create_at: { type: Date, default: Date.now },
        update_at: { type: Date, default: Date.now },
        ups: [Schema.Types.ObjectId],
        deleted: { type: Boolean, default: false },
    });

    return mongoose.model('Comment', CommentSchema);
};
