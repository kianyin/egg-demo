'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {
    async getList() {
        const { ctx } = this;
        const { id } = ctx.params;
        const comments = await ctx.service.comment.getById(id)

        ctx.body = {
            status: 'ok',
            data_list: comments
        }
    }

    async create() {
        const { ctx } = this;
        const { id } = ctx.params;
        const { body } = ctx.request;
        const result = await ctx.service.comment.create(id, body)
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
        const result = await ctx.service.comment.like();
        if (result) {
            ctx.body = {
                status: 'ok'
            }
        }
    }

    async delete() {
        const { ctx } = this;
        const { id } = ctx.params;
        const result = await ctx.service.comment.delete(id);
        if (result) {
            ctx.body = {
                status: 'ok'
            }
        }
    }
}


module.exports = CommentController;
