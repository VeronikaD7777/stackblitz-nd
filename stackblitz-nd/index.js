import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import itemRouter from './item/item-router.js';

const app = new Koa(); //HTTP сервер

app.use(bodyParser());
app.use(itemRouter.routes());
app.use(itemRouter.allowedMethods());

app.listen(3000);
