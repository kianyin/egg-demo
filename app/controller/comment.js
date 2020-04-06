'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {
    async commentList() {
        const { ctx } = this;
        const { id } = ctx.params;
        const comments = await ctx.service.comment.showCommentsByTopicId(id)

        ctx.body = {
            status: 'ok',
            data_list: comments
        }
    }

    async postComment() {
        const { ctx } = this;
        const { id } = ctx.params;
        const { body } = ctx.request;
        const result = await ctx.service.comment.makeComment(id, body)
        if (result) {
            ctx.body = {
                status: 'ok'
            }
        }
    }

    async like() {
        const { ctx } = this;
        const { id } = ctx.params;
        const user = await ctx.service.user.getCurrentUser();
        let comment = this.ctx.model.Comment.findOne({ _id: id })
        if (comment.author_id === user._id) {
            ctx.body = {
                status: 'error',
                msg: 'you do not like yourself'
            }
        }
        const result = await ctx.service.comment.likeComment();
        if (result) {
            ctx.body = {
                status: 'ok'
            }
        }
    }

    async reply() {
        const { ctx } = this;
        const { id } = ctx.params;
        const { body } = ctx.request;
        const { content } = body
        const user = await ctx.service.user.getCurrentUser();
        const result = await ctx.service.comment.reply(id, user._id, content);
        if (result) {
            ctx.body = {
                status: 'ok'
            }
        }
    }
}


module.exports = CommentController;
