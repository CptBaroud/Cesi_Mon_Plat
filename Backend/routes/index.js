const { Router } = require('express')
const userRouter = require('./User')
const deliveryRouter = require('./Delivery')
const authRouter = require('./Authenticate')
const articleRouter = require('./Article')
const menuRouter = require('./Menu')
const categoryRouter = require('./Category')
const notificationRouter = require('./Notifications')
const restaurantRouter = require('./Restaurant')
const orderRouter = require('./Order')
const componentRouter = require('./Component')
const logRouter = require('./Log')

const routes = Router();

routes.use('/users', userRouter);
routes.use('/delivery', deliveryRouter);
routes.use('/auth', authRouter);
routes.use('/article', articleRouter);
routes.use('/menu', menuRouter);
routes.use('/category', categoryRouter);
routes.use('/notification', notificationRouter);
routes.use('/restaurant', restaurantRouter);
routes.use('/order', orderRouter);
routes.use('/component', componentRouter);
routes.use('/log', logRouter);

module.exports = routes;
