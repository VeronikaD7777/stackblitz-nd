import Router from '@koa/router';
import ItemController from './item-controller.js';

const router = new Router({
  prefix: '/items',
}); //Роутер который будет добавлять н поинты

const controller = new ItemController();

router.get('/', controller.getItems.bind(controller));
router.get('/:id', controller.getItem.bind(controller));
router.putch('/:id', controller.updateItem.bind(controller));
router.post('/', controller.createItem.bind(controller));
router.delete('/:id', controller.deleteItem.bind(controller));

export default router;
