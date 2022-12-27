const bcrypt = require('bcrypt');
const { User } = require('../models');

const userData = [

    {
        user_name: 'jaalesac',
        email: 'jaalesac@gmail.com',
        password:   bcrypt.hashSync('12345678', 10),
    },
    {
        user_name: 'jaime.esquivel',
        email: 'jaime.a.esquivel.a@gmail.com',
        password:   bcrypt.hashSync('12345678', 10),
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;