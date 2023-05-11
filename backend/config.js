const path = require('path');

const dbHost = process.env.DB_HOST || '127.0.0.1';
let dbUrl = 'mongodb://' + dbHost + '/ctf'

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: dbUrl,
        options: {useNewUrlParser: true},
    },
};