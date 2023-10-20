import { Router } from 'express';
import ViewsController from '../controllers/viewsController.js';

const viewRouter = Router();
const viewsController = new ViewsController();

viewRouter.get('/', viewsController.getOverview);
viewRouter.get('/tour/:slug', viewsController.getTour);

export default viewRouter;
