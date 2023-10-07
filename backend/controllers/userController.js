import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js'

//@ desc Login User 
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    // Deconstruct the data received
    const { email, password } = req.body;

    // Confirrm is theres a user with the email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
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
    res.json('register user')
});

//@ desc Logout User / clear cookie
//@route POST /api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
    res.json('logout user')
});

//@ desc Get User Profile 
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.json('Get user profile')
});

//@ desc Update User profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.json('update user profile')
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






