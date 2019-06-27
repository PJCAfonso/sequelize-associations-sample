const Sequelize = require('sequelize');

const path = 'mysql://myuser:mypass@localhost:3306/dbtest';
const sequelize = new Sequelize(path, {
    logging: false
});

let Dummy = sequelize.define('dummy', {
    description: Sequelize.STRING
});

Dummy.drop().then(() => {
    console.log('table deleted');
}).finally(() => {
    sequelize.close();
});