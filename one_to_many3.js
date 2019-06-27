const Sequelize = require('sequelize');

const path = 'mysql://myuser:mypass@localhost:3306/dbtest';

const sequelize = new Sequelize(path, {
    logging: false
});

let User = sequelize.define('user', {
    name: Sequelize.STRING
});

let Task = sequelize.define('task', {
    description: Sequelize.STRING,
});

User.hasMany(Task);

async function showUsersTasks() {

    let users = await User.findAll({ include: [Task] });

    users.forEach(user => {

        console.log(`${user.name} has tasks: `);

        let tasks = user.tasks;

        tasks.forEach(task => {
            console.log(`  * ${task.description}`);
        })
    });

    console.log('done');
    sequelize.close();
}

showUsersTasks();