const Sequelize = require('sequelize');
const Model = Sequelize.Model

const path = 'mysql://myuser:mypass@localhost:3306/dbtest';

const sequelize = new Sequelize(path, {
  logging: false
});

class PostTag extends Model { }

/*
PostTag.init({
  postId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: "postTagConstraint"
  },
  tagId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: "postTagConstraint"
  }
}, { sequelize, modelName: 'post_tag' });
*/

class Post extends Model { }
Post.init({
  title: Sequelize.STRING,
  text: Sequelize.STRING
}, { sequelize, modelName: 'post' });

class Tag extends Model { }
Tag.init({
  name: Sequelize.STRING,
  status: Sequelize.STRING
}, { sequelize, modelName: 'tag' });

/*
Post.belongsToMany(Tag, {
  through: {
    model: PostTag
  },
  foreignKey: 'postId'
});

Tag.belongsToMany(Post, {
  through: {
    model: PostTag
  },
  foreignKey: 'tagId'
});
*/

Post.belongsToMany(Tag, { through : 'PostTag' });
Tag.belongsToMany(Post, { through : 'PostTag' });

async function Add() {
  let tag1 = await Tag.create({ name: 'Nice', status: 'Funcional' });
  let tag2 = await Tag.create({ name: 'Bad', status: 'Not working' });

  //console.log(tag1.name);
  //console.log(tag2.name);

  let post1 = await Post.create({ title: 'A very nice post', text: 'This is post1' });
  let post2 = await Post.create({ title: 'Toxic post', text: 'This is post2' });

  //console.log(`${post1.title} - ${post1.text}`);
  //console.log(`${post2.title} - ${post2.text}`);

  await post1.addTags([tag1, tag2]);
  await post2.addTags([tag2]);

  let res1 = await Post.findAll({ where: { id: 1 }, include: [Tag] });

  res1.forEach(p => {
    console.log(`${p.title} - ${p.text}`)

    p.tags.forEach(t => console.log(`${t.name} - ${t.status}`));
  });

  await post2.setTags([tag2]);
}

sequelize.sync({ force: true }).then(() => {
  Add();

  console.log('It shall be one!');
});