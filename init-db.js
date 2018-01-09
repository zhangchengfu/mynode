/* require('babel-core/register')({
    presets: ['stage-3']
}); */

const model = require('./model.js');
model.sync();

console.log('init db ok.');
process.exit(0);//初始化脚本，注释此行，运行:node init-db.js