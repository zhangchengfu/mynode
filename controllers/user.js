module.exports = {
    'GET /user' : async (ctx, next) => {
        ctx.vue('user.html');
    }
};