import {config} from 'config/app.config';

/**
 * Database connection settings.
 */
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};

export default {
    host: config.mongo.host,
    options,
};
