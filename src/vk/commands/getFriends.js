import { vk } from "../auth.js";

export const getFriends = async (id) => {
  const data = await vk.api.friends.get({
    user_id: id,
    fields: ["first_name", "last_name"],
  });

  return [...data.items];
};
