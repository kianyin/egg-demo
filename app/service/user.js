'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');

class UserService extends Service {
    // 获取用户，不传username则查询所有
    async getUser(username) {
        const { ctx } = this;

        if (username) {
            return await ctx.model.User.findOne({ nick_name: username });
        }
        return await ctx.model.User.find({});
    }
    // 专门对数据进行md5加密的方法，输入明文返回密文
    getMd5Data(data) {
        return crypto.createHash('md5').update(data).digest('hex');
    }

    async hasUser(nickname) {
        const data = await this.getUser(nickname);
        if (data) {
            return true;
        }
        return false
    }

    async registerUser(nickname, password) {
        let md5pwd = crypto.createHash('md5').update(password).digest('hex');
        const user = new this.ctx.model.User();
        user.nick_name = nickname;
        user.password = md5pwd;
        user.save()

        return true;
    }

    async login(username, password) {
        const { ctx } = this;
        let md5pwd = crypto.createHash('md5').update(password).digest('hex');
        let user = await ctx.model.User.findOne({ nick_name: username, password: md5pwd });
        if (!user) {
            return false
        }
        return user
    }

    async getUserById(id) {
        if (!id) {
            return null;
        }

        return this.ctx.model.User.findOne({ _id: id }).exec();
    }

    async getCurrentUser() {
        const { ctx, config } = this;
        const token = ctx.request.header.authorization;
        let decode;
        if (token) {
            decode = ctx.app.jwt.verify(token, config.jwt.secret);
            return await this.ctx.model.User.findOne({ _id: decode.id }).exec();
        }
        return null
    }

}
module.exports = UserService;
