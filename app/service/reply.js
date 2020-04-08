'use strict';

const Service = require('egg').Service;

class ReplyService extends Service {

    async create(comment_id, author_id, content) {
        let reply = this.ctx.model.Reply()
        reply.comment_id = comment_id
        reply.author_id = author_id
        reply.content = content;
        return await reply.save()
    }

}
module.exports = ReplyService;
