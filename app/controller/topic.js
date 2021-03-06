'use strict';

const Controller = require('egg').Controller;

class TopicController extends Controller {
    async getList() {
        const { ctx } = this;
        const { query } = ctx.request
        let page = parseInt(query.page, 10) || 1;
        page = page > 0 ? page : 1;

        const limit = 10;
        const options = {
            skip: (page - 1) * limit,
            limit,
            sort: '-top -last_reply_at',
        };

        const result = await ctx.service.topic.query(query, options);
        ctx.body = {
            status: 'ok',
            ...result
        };
    }

    async create() {
        const { ctx } = this;
        const { body } = ctx.request;
        const user = await ctx.service.user.getCurrentUser()
        const result = await ctx.service.topic.create({ ...body, author_id: user._id });
        if (result) {
            ctx.body = {
                status: 'ok',
            };
        }
    }

    async detail() {
        const { ctx } = this;
        const { id } = ctx.params;
        const topic_detail = await ctx.service.topic.getById(id)
        ctx.body = {
            status: 'ok',
            ...topic_detail
        }
    }

    async update() {
        const { ctx } = this;
        const { id } = ctx.params;
        const { body } = ctx.request;
        const topic_detail = await ctx.service.topic.getById(id)
        const user = await ctx.service.user.getCurrentUser()
        if (user.id !== topic_detail.author_id) {
            ctx.body = {
                status: 'no authority',
            }
            return
        }

        const result = await ctx.service.topic.update(id, body)
        if (result) {
            ctx.body = {
                status: 'ok',
            }
        }
    }
}


module.exports = TopicController;
