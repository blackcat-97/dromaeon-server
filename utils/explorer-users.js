export let users = [];

export const addUser = ({ userId, x, y, _id, name }) => {
  if (users.find((item) => item.id === userId)) {
    users.map((item) =>
      item.id === userId ? { id: userId, x, y, _id } : item
    );
    return;
  }
  users.push({ id: userId, x, y, _id, name });
};

export const updateUser = (user) => {
  users = users.map((item) =>
    item.id === user.id
      ? { ...item, x: user.position.x, y: user.position.y }
      : item
  );
};

export const removeUser = (id) => {
  users = users.filter((item) => item._id !== id);
};

export const removeUserByID = (id) => {
  users = users.filter((item) => item.id !== id);
};
