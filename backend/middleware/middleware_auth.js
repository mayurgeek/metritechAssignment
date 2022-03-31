var jwt = require('jsonwebtoken');
const Secret_jwt_key = 'mayur$Yadav';

const jwtauth = (req, res, next) => {
    const token = req.header('authtoken');
    if (!token) {
        res.status(600).send({ error: "invalid credintials" })
    }
        //console.log(token)
        const data = jwt.verify(token, Secret_jwt_key);
        req.user = data.user;
        next();
    

}


module.exports = jwtauth;