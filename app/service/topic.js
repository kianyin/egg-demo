'use strict';

const Service = require('egg').Service;

class TopicService extends Service {
    async query(query = {}, pageSelector = {}) {
        const { ctx } = this
        const querySelector = { deleted: false }
        if (query.title) { querySelector.title = { '$regex': query.title } }
        const total = await ctx.model.Topic.find(querySelector).count();
        const data_list = await ctx.model.Topic.find(querySelector, '', pageSelector);
        return { total, data_list }
    }

    async create(body) {
        const topic = new this.ctx.model.Topic();
        topic.title = body.title
        topic.content = body.content
        topic.author_id = body.author_id
        topic.save()

        return true
    }

    async getById(id) {
        const topic = await this.ctx.model.Topic.findOne({ _id: id, deleted: false }).exec();
        if (!topic) {
            return {
                topic: null,
                author: null,
            };
        }

        const author = await this.service.user.getUserById(topic.author_id);

        return {
            topic,
            author,
        };
    }

    async update(id, body) {
        const { title, content } = body
        const topic = await this.ctx.model.Topic.findOne({ _id: id, deleted: false }).exec();
        topic.title = title
        topic.content = content
        topic.update_at = Date.now
        topic.save()

        return true
    }
}
module.exports = TopicService;
