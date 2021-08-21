import {Router} from "express";
import {ROUTE} from "../../../const/routeConst";
import {authorizationController} from "../controller";

const authorizationRouter = Router();

authorizationRouter.get(ROUTE.API.AUTHORIZATION.CHECK.PATH, authorizationController.check);
authorizationRouter.post(ROUTE.API.AUTHORIZATION.SIGN_UP.PATH, authorizationController.register);
authorizationRouter.post(ROUTE.API.AUTHORIZATION.VERIFY.PATH, authorizationController.verify);
authorizationRouter.post(ROUTE.API.AUTHORIZATION.SIGN_IN.PATH, authorizationController.login);
authorizationRouter.get(ROUTE.API.AUTHORIZATION.REFRESH.PATH, authorizationController.refresh);

export {authorizationRouter};
