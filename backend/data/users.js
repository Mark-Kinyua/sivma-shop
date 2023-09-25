import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin',
        email: 'admin@email.com',
        password: bcrypt.hashSync('1234', 10),
        isAdmin: true,
    },
    {
        name: 'John',
        email: 'john@email.com',
        password: bcrypt.hashSync('1234', 10),
    },
    {
        name: 'Mark',
        email: 'mark@email.com',
        password: bcrypt.hashSync('1234', 10),
    },
];


export default users;