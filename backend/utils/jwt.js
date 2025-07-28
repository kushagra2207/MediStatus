const jwt = require('jsonwebtoken')

exports.createToken = ({ id, role, hospital }) => {
    return jwt.sign(
        { id, role, hospital },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
}