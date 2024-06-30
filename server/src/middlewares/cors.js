function cors(){
    return function (req, res, next){
        res.setHeader('Access-Control-Allow-Origin', '*'); // instead * you may write localhost:3000
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET,  POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Authorization');

        next();
    }
}

module.exports = { cors };