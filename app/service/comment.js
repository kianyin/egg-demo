'use strict';

const Service = require('egg').Service;

class CommentService extends Service {
    async showCommentsByTopicId(id) {
        const comments = await this.ctx.model.Comment.find({ topic_id: id, deleted: false }, "", { sort: '-top -create_at', }).exec();
        for (let i = 0; i < comments.length; i++) {
            comments[i].reply = this.ctx.model.Reply.find({ comment_id: comments[i]._id, deleted: false }, "", { sort: '-top -create_at', }).exec();
        }
        return comments
    }

    async makeComment(id, body) {
        const author = await this.service.user.getCurrentUser();
        let comment = this.ctx.model.Comment()
        comment.author_id = author._id;
        comment.content = body.content;
        comment.topic_id = id;
        return comment.save();
    }

    async likeComment(author_id, comment_id) {
        let comment = await this.ctx.model.Comment.findOne({ _id: comment_id, deleted: false });
        let list = comment.ups
        let index
        for (let i = 0; i < list.length; i++) {
            if (list[i] === author_id) {
                index = i
            }
        }
        if (index) {
            list = list.splice(index, 1)
        } else {
            list.push(author_id)
        }
        comment.ups = list;
        return await comment.save()
    }

    async reply(comment_id, author_id, content) {
        let reply = this.ctx.model.Reply()
        reply.comment_id = comment_id
        reply.author_id = author_id
        reply.content = content;
        return await reply.save()
    }

}
module.exports = CommentService;
