var model = require('../model');
var User = model.User;

const APIError = require('../rest').APIError;

module.exports = {
    'GET /api/users' : async (ctx, next) => {
        ctx.rest({
            users : await User.findAll()
        });
    },

    'POST /api/user' : async (ctx, next) => {
        var req = ctx.request.body;
        
        ctx.rest ({
            user : await User.create({
                email : req.email,
                passwd : req.passwd,
                name : req.name,
                gender : req.gender
            })
        });
    },

    'DELETE /api/user/:id' : async (ctx, next) => {
        console.log(`delete user ${ctx.params.id}...`);
        var p = await User.find({
            where : {
                id : ctx.params.id
            }
        });
        if (p) {
            ctx.rest({
                user : await p.destroy()
            });
        } else {
            throw new APIError('product:not_found', 'product not found by id.');
        }
    },
     
    'GET /api/user/:id' : async (ctx, next) => {
        ctx.rest({
            user : await User.find({
                where : {
                    id : ctx.params.id
                }
            })
        });
    },

    'PUT /api/user' : async (ctx, next) => {
        var req = ctx.request.body;
        var user = await User.find({id:req.id});
        user = await Object.assign(user, req);
        user.updatedAt = Date.now();
        user.version ++;
        ctx.rest({
            user : await user.save()
        });
    }
};