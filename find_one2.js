
const Sequelize = require('sequelize');

const path = 'mysql://myuser:mypass@localhost:3306/dbtest';

const sequelize = new Sequelize(path, {
    logging: false
});

let Note = sequelize.define('notes', {
    description: Sequelize.STRING
});

async function getOneNote() {

    let user = await Note.findOne();

    console.log(user.get('description'));
    sequelize.close();
}

getOneNote();