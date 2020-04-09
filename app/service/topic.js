'use strict';

const Service = require('egg').Service;

class TopicService extends Service {
    async query(query = {}, querySelector = {}) {
        const { ctx } = this
        const total = await ctx.model.Topic.find({ ...query, deleted: false }).count();
        const data = await ctx.model.Topic.find({ ...query, deleted: false }, '', querySelector);
        const data_list = [];
        for (let i = 0; i < data.length; i++) {
            let author = await this.service.user.getUserById(data[i].author_id)
            data_list.push({
                title: data[i].title,
                reply_count: data[i].reply_count,
                author_name: author ? author.nick_name : null,
                id: data[i]._id
            })
        }
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
