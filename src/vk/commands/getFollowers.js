import { vk } from "../auth.js";

export const getFollowers = async (id) => {
  const data = await vk.api.users.getFollowers({
    user_id: id,
    count: 1000,
    fields: ["first_name", "last_name"],
  });

  return [...data.items];
};
