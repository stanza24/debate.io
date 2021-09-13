import {Router} from "express";
import {authorizationController} from "../controller";
import {ROUTE} from "core/const/routeConst";

const authorizationRouter = Router();

authorizationRouter.post(ROUTE.API.AUTHORIZATION.SIGN_UP.PATH, authorizationController.registration);
authorizationRouter.get(ROUTE.API.AUTHORIZATION.ACTIVATE.PATH, authorizationController.activate);
authorizationRouter.post(ROUTE.API.AUTHORIZATION.SIGN_IN.PATH, authorizationController.login);
authorizationRouter.get(ROUTE.API.AUTHORIZATION.REFRESH.PATH, authorizationController.refresh);

export {authorizationRouter};
