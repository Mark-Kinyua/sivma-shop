import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    // Create the json Web Token 
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: '20d' });

    // Set it to a cookie on the Server
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 Days,
    });
};

export default generateToken;
