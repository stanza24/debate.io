export {config} from 'config/app.config';

export interface IRefreshToken {
    type: 'refresh',
    id: string,
}

export interface IActivateToken {
    type: 'activate',
    userId: string;
}
