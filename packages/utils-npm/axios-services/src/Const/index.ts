import type {IServiceMockDelay} from '../Models';

/**
 * Стандартное время ожидания для .
 */
export const DEFAULT_SERVICE_MOCK_DELAY: IServiceMockDelay = {
    minDelay: 500,
    maxDelay: 1500,
};
