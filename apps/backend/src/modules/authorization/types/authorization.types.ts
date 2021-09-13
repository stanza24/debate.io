import type {IUser} from "common/types/user.types";

export interface IGenerateRefreshTokenResponse {
    id: string;
    token: string;
}

export interface IIssueTokenPairResponse {
    accessToken: string;
    refreshToken: string;
}

export interface ILoginServiceResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

