'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = 'hi, egg';
    }

    async post() {
        const { ctx } = this;
        ctx.body = 'hi, egg';
    }

    async register() {
        const { ctx } = this;
        let { username, password } = ctx.request.body
        let hasUser = await ctx.service.user.hasUser(username);
        if (hasUser) {
            ctx.body = {
                status: 'userExsist'
            };
            return
        }
        let adduser = await ctx.service.user.registerUser(username, password);
        if (!adduser) {
            ctx.body = {
                status: 'error'
            };
            return
        }
        ctx.body = {
            status: 'ok'
        };
    }

    async signin() {
        const { ctx } = this;
        const { username, password } = ctx.request.body
        const user = await ctx.service.user.login(username, password);
        if (user) {
            const token = await ctx.app.jwt.sign({ username: user.nick_name, id: user._id }, this.config.jwt.secret, { expiresIn: 7200 })
            ctx.body = {
                status: 'ok',
                token
            };
        } else {
            ctx.body = {
                status: 'error'
            };
        }
    }
}


module.exports = HomeController;
