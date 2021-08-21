import express from 'express';
import type {TMiddlewareRow} from './models';

const mwBodyParser: TMiddlewareRow = [express.urlencoded({extended: false}), express.json()];

export default mwBodyParser;
