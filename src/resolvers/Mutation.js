const { getUserId } = require('../utils');
const { signup, login, deleteUser } = require('./Mutations/UserMutation');

const createLink = (root, args, context, info) => {
  const userId = getUserId(context);
  const { url, description } = args;

  return context.db.mutation.createLink({
      data: {
          url,
          description,
          createdBy: { connect: { id: userId } }
      }
  }, info)
}

const updateLink = (root, args) => {
  const { id, url, description } = args;

  let link = links.find(i => {
      return i.id == id;
  });

  link.url = url;
  link.description = description;
}

const deleteLink = (root, args) => {
  const { id } = args;
  
}

module.exports = {
  createLink,
  updateLink,
  deleteLink,
  signup,
  login,
  deleteUser
}