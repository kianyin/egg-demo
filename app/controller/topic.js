'use strict';

const Controller = require('egg').Controller;

class TopicController extends Controller {
    async topicList() {
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

        let queryData = {}
        if (query.title) {
            queryData.title = query.title
        }

        const result = await ctx.service.topic.queryTopic(queryData, options);
        ctx.body = {
            status: 'ok',
            ...result
        };
    }

    async addTopic() {
        const { ctx } = this;
        const { body } = ctx.request;
        const user = await ctx.service.user.getCurrentUser()
        const result = await ctx.service.topic.addTopic({ ...body, author_id: user._id });
        if (result) {
            ctx.body = {
                status: 'ok',
            };
        }
    }

    async detail() {
        const { ctx } = this;
        const { id } = ctx.params;
        const topic_detail = await ctx.service.topic.getTopicById(id)
        ctx.body = {
            status: 'ok',
            ...topic_detail
        }
    }

    async commentList() {
        const { ctx } = this;
        const { id } = ctx.params;
        const comments = await ctx.service.topic.showCommentsByTopicId(id)

        ctx.body = {
            status: 'ok',
            data_list: comments
        }
    }

    async postComment() {
        const { ctx } = this;
        const { id } = ctx.params;
        const { body } = ctx.request;
        const result = await ctx.service.topic.makeComment(id, body)
        if (result) {
            ctx.body = {
                status: 'ok'
            }
        }
    }
}


module.exports = TopicController;
