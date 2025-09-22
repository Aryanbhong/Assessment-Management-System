
let users = [
  {
    id: '1',
    email: 'demo@example.com',
    password: '$2b$12$.bH7oIuh1ibwAYe1ziIDquPA9/CD0zB2C75KBfpJgYnL1OCiUFA3y', // password: demo123
    name: 'Demo User',
    createdAt: new Date().toISOString()
  }
];

const findUserByEmail = (email) => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

const findUserById = (id) => {
  return users.find(user => user.id === id);
};

const createUser = (userData) => {
  const newUser = {
    id: (users.length + 1).toString(),
    ...userData,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  return newUser;
};

const getAllUsers = () => {
  return users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
};



module.exports ={
    findUserByEmail,
    findUserById,
    createUser,
    getAllUsers
}