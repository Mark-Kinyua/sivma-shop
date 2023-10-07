import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

//@ desc Login User 
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    // Deconstruct the data received
    const { email, password } = req.body;

    // Confirrm is theres a user with the email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password')
    }

});

//@ desc Register User
//@route POST /api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    // From Body, get the name, email and password 
    const { name, email, password } = req.body;

    // Check if the user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists')
    }

    // Create the new user
    const user = await User.create({
        name,
        email,
        password,
    });

    // Check for the user
    if (user) {
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

//@ desc Logout User / clear cookie
//@route POST /api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: 'Logged Out successfully' });
});

//@ desc Get User Profile 
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User bot found.')
    }
});

//@ desc Update User profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found.')
    }
});

//@ desc Get Users
//@route GET /api/users/
//@access Private / Admin
const getUsers = asyncHandler(async (req, res) => {
    res.json('get users')
});

//@ desc Get User by Id
//@route GET /api/users/:id/
//@access Private / Admin
const getUserById = asyncHandler(async (req, res) => {
    res.json('get user by id')
});


//@ desc Delete Users
//@route DELETE /api/users/:id
//@access Private / Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.json('delete user')
});

//@ desc Update User
//@route PUT /api/users/:id
//@access Private / Admin
const updateUser = asyncHandler(async (req, res) => {
    res.json('update user')
});


export {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
};






