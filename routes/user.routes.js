module.exports = app => {
    const user = require("../controllers/user.controller");
    require('dotenv').config();

    
    const router = require("express").Router();

    router.post('/login', user.createUser);
    router.post('/checklogincode', user.checkCode);

    app.use(`/api/user`, router);
};