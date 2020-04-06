'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    const jwt = app.middleware.jwt(app.config.jwt);
    // 注册 Done
    router.post('/register', controller.user.register);
    // 登录 Done
    router.post('/login', controller.user.signin);
    // 文章列表 Done
    router.get('/topics', controller.topic.topicList);
    // 文章详情 Done
    router.get('/topics/:id', jwt, controller.topic.detail);
    // 评论列表 Done 
    router.get('/topics/:id/comments', jwt, controller.comment.commentList);
    // 评论点赞 Done
    router.post('/topics/:id/comments/like', jwt, controller.comment.like);
    // 发表评论 Done
    router.post('/topics/:id/comments', jwt, controller.comment.postComment);
    // 评论回复 Done
    router.post('/comments/:id/reply', jwt, controller.comment.reply);
    // 添加文章 Done
    router.post('/topics', jwt, controller.topic.addTopic);
    // 修改文章
    router.post('/topic/:id', jwt, controller.home.index);
    // 删除评论
    router.delete('/comments/:id', jwt, controller.home.index);
};
