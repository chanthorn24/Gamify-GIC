const jwt = require("jsonwebtoken");

const decode = (token) => {
    let res = "";

    jwt.verify(token, process.env.JWT_SECRET, async(err, decodedToken) => {
        if (err) {
            res = { success: false, error: err };
        } else {
            res = { success: true, data: decodedToken };
        }
    });

    return res;
};

module.exports = decode;