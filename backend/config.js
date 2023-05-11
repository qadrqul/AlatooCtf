const path = require('path');

const dbHost = process.env.DB_HOST || '127.0.0.1';
let dbUrl = 'mongodb://' + 'mongo:rZbKGUZvCwXJXirnu2Ju@containers-us-west-156.railway.app:5483' + '/ctf'

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: dbUrl,
        options: {useNewUrlParser: true},
    },
};