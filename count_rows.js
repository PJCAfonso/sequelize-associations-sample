const Sequelize = require('sequelize');

const path = 'mysql://myuser:mypass@localhost:3306/dbtest';

const sequelize = new Sequelize(path, {
    logging: false
});

let Note = sequelize.define('notes', {
    description: Sequelize.STRING
});

async function countRows() {

    let n = await Note.count();
    console.log(`There are ${n} rows`);
    
    sequelize.close();
}

countRows();