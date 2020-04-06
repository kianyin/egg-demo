module.exports = options => {
    return async function jwt(ctx, next) {
        const token = ctx.request.header.authorization;
        let decode;
        if (token) {
            try {
                // 解码token
                decode = ctx.app.jwt.verify(token, options.secret);
                if (decode.exp > parseInt(new Date().getTime() / 1000)) {
                    ctx.request.user = decode.id
                    await next(decode.id);
                } else {
                    ctx.status = 401;
                    ctx.body = {
                        message: error.message,
                    };
                    return;
                }
            } catch (error) {
                ctx.status = 401;
                ctx.body = {
                    message: error.message,
                };
                return;
            }
        } else {
            ctx.status = 401;
            ctx.body = {
                message: '没有token',
            };
            return;
        }
    };
};