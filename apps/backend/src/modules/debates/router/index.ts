import {Router} from "express";
import {ROUTE} from "core/const/routeConst";
import {debatesController} from "../controller";

const debatesRouter = Router();

debatesRouter.get(ROUTE.API.DEBATES.ALL.PATH, debatesController.getList);

export {debatesRouter};
