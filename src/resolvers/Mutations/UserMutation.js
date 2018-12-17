const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (root, args, context, info) => {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.db.mutation.createUser({
    data: { ...args, password },
  }, `{ id }`);

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)

  return {
    token,
    user,
  }
}

const login = async (root, args, context, info) => {
  const user = await context.db.query.user({ where: { email: args.email } }, ` { id password } `)
  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)

  context.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  return {
    token,
    user,
  }
}

const deleteUser = async (root, args, context, info) => {
  console.log('user id', args);
  const user = await context.db.mutation.deleteUser({ where: { id: args.id }}, info);

  if(!user) {
    throw new Error(`No such user found: ${user}`);
  }

  return user;
}

module.exports = {
  signup,
  login,
  deleteUser
}