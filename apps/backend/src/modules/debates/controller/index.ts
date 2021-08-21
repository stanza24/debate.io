import {Request, Response} from 'express';
import {EHttpResponseStatus} from '../../../Core/Enum/httpEnum';
import {logger} from '../../../services/logger';
import BookSchema from '../schema/Book';
import {EAuthorizationControllerFailureMessages} from '../../authorization/enum/authorization.enum';

const NAMESPACE = 'DebatesController';

class DebatesController {
    /** Метод обработки запроса списка дебатов. */
    getList = async (req: Request, res: Response) => {
        logger.info(NAMESPACE, 'getList', req.cookies);

        try {
            const books = await BookSchema.find({});

            return res.status(200).json(books);
        } catch (error) {
            logger.error(NAMESPACE, error.message, error);

            return res.status(EHttpResponseStatus.INTERNAL_SERVER_ERROR).json({
                message: EAuthorizationControllerFailureMessages.INTERNAL_SERVER_ERROR,
            });
        }
    };
}

export const debatesController = new DebatesController();
