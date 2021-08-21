import {appConfig} from '../../config/appConfig';

/** Настройки подключения к базе данных. */
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};

export default {
    host: appConfig.mongo.host,
    options,
};
