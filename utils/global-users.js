export let users = [];

export const addUser = (user) => {
  if (users.find((item) => item.id === user.id)) {
    users = users.map((item) => (item.id === user.id ? user : item));
    return;
  }
  users.push(user);
};

export const removeUser = (userId) => {
  users = users.filter((item) => item.id !== userId);
};

export const removeUserBySocketID = (socketId) => {
  users = users.filter(item => item.socket === socketId)
}

export const getUser = (userId) => {
  return users.find((item) => item.id === userId);
};
