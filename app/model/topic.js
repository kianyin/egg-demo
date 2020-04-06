'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const TopicSchema = new Schema({
        title: { type: String },
        author_id: { type: ObjectId },
        create_at: { type: Date, default: Date.now },
        update_at: { type: Date, default: Date.now },
        content: { type: String },
        reply_count: { type: Number, default: 0 },
        visit_count: { type: Number, default: 0 },
        last_reply_at: { type: Date, default: Date.now },
        deleted: { type: Boolean, default: false },
    });

    return mongoose.model('Topic', TopicSchema);
};
