import type {IServerErrorsResult} from '@utils-npm/async-utils/src/Models';
import type {AxiosError} from 'axios';

/**
 * Сгенерировать ручную ошибку.
 *
 * @param errorBody Тело ошибки.
 * @param errorCode Код ошибки.
 */
export const generateMockError = (errorBody: IServerErrorsResult, errorCode = 400): void => {
    const errorObject: AxiosError<IServerErrorsResult> = {
        response: {
            data: errorBody,
            status: errorCode,
            statusText: 'Mock error',
            headers: null,
            config: {},
        },
        name: '',
        message: `message: "Request failed with status code ${errorCode}`,
        isAxiosError: true,
        config: {},
        toJSON: () => errorBody,
    };

    throw errorObject;
};
