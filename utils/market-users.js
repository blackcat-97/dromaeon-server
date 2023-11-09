export let users = [];

export const addUser = (user) => {
  if (users.find((item) => item.id === user.id)) {
    users = users.map((item) => (item.id === user.id ? user : item));
    return null;
  }
  users.push(user);
};

export const removeUser = (userId) => {
  users = users.filter((item) => item.id !== userId);
};

export const getUser = (userId) => {
  return users.find((item) => item.id === userId);
};
