import mongoose from "mongoose";
import config from './db.config';

/** Функция подключения к базе данных. */
export const connectDataBase = () =>
    mongoose.connect(config.host, config.options);
