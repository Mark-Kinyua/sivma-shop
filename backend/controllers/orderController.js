import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @ desc Add Order Items
//@route POST /api/orders
//@access Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    } = req.body;

    // Check if there is an order items array in existence
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        // Create the order and place it in this variable
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined,
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});

// @ desc Get Logged in user's orders
//@route GET /api/orders/myorders
//@access Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
});

// @ desc Get Order by ID
//@route GET /api/orders/:id
//@access Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    // Check for the order
    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404);
        throw new Error('Order Not Found');
    }
});

// @ desc Update Order to Paid
//@route PUT /api/orders/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send('Update Order to Paid');
});

// @ desc Update to Delvired
//@route Get /api/orders/:id/deliver
//@access Private / Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send('Update Order to delivered');
});

// @ desc Get All Order
//@route GET /api/orders
//@access Private / Admin
const getOrders = asyncHandler(async (req, res) => {
    res.send('Get all orders');
});

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
};



