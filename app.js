//导入koa
const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const templating = require('./templating');

const rest = require('./rest');

//创建一个Koa对象表示web app本身
const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';

//log request URL
app.use(async (ctx, next) => {
    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;
    console.log(`${ctx.request.method} ${ctx.request.url}: ${ms}ms`);
    ctx.response.set('X-Response-Time', `${ms}ms`);
});

// static file support
if (!isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/',__dirname + '/static'));
    app.use(staticFiles('/views/',__dirname + '/views'));//vue模板渲染
}

// parse request body
app.use(bodyParser());

// add nunjucks as view
app.use(templating('views',{
    noCache : !isProduction,
    watch : !isProduction
}))

// bind .rest() for ctx
app.use(rest.restify());

// add controllers
app.use(controller());



//在端口3000监听
app.listen(3000);
console.log('app started at port 3000 ...');

