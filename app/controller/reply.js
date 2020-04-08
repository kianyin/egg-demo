'use strict';

const Controller = require('egg').Controller;

class ReplyController extends Controller {
    async create() {
        const { ctx } = this;
        const { id } = ctx.params;
        const { content } = ctx.request.body
        const user = await ctx.service.user.getCurrentUser();
        const result = await ctx.service.reply.create(id, user._id, content);
        if (result) {
            ctx.body = {
                status: 'ok'
            }
        }
    }
}


module.exports = ReplyController;
