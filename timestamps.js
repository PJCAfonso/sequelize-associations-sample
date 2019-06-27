const Sequelize = require('sequelize');

const path = 'mysql://myuser:mypass@localhost:3306/dbtest';
const sequelize = new Sequelize(path, {
    logging: false,
    define: {
        timestamps: false
    }
});

let Dummy = sequelize.define('dummy', {
    description: Sequelize.STRING
});

sequelize.sync({force: true}).then(() => {

    Dummy.create({ description: 'test 1' }).then(() => {
        console.log('table created');
    }).finally(() => {
        sequelize.close();
    });
});