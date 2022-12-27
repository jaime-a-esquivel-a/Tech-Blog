const sequelize = require('../config/connection');
const seedUsers = require('./seeds-user');
const seedPostHeaders = require('./seeds-postheader');
const seedPostComment = require('./seed-postcomment');

const seedAll = async () => {

    await sequelize.sync({ force: true });
    console.log('\n----- TECHBLOG DATABASE SYNCED -----\n');

    await seedUsers();
    console.log('\n----- TECHBLOG USERS CREATED -----\n');

    await seedPostHeaders();
    console.log('\n----- TECHBLOG POST HEADERS CREATED -----\n');

    await seedPostComment();
    console.log('\n----- TECHBLOG POST COMMENTS CREATED -----\n');

    process.exit(0);

};

seedAll();
