export let users = [];

export const addUser = ({ userId, x, y, _id }) => {
  if (users.find((item) => item.id === userId)) {
    return;
  }
  users.push({ id: userId, x, y, _id });
};

export const updateUser = (user) => {
  users = users.map((item) =>
    item.id === user.id ? { ...item, x: user.x, y: user.y } : item
  );
};

export const removeUser = (id) => {
  users = users.filter((item) => item._id !== id);
};

export const removeUserByID = (id) => {
  users = users.filter((item) => item.id !== id)
}
