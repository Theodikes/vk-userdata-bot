import { vk } from "../auth.js";

export const getSubscriptions = async (id) => {
  const data = await vk.api.users.getSubscriptions({
    user_id: id,
    count: 200,
    extended: 1,
  });

  return [...data.items];
};
