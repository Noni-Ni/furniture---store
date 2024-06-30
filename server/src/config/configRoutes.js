// TODO import routers

const { catalogRouter } = require("../controllers/catalog");
const { userRouter } = require("../controllers/user");

function configRoutes(app){
     app.use( '/data/catalog',catalogRouter);
     app.use('/users', userRouter);
     //TODO register routers
}

module.exports = { configRoutes };
