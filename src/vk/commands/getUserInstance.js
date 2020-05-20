import { vk } from "../auth.js";

export const getUserInstance = async (short_link) => {
  try {
    const users = await vk.api.users.get({ user_ids: short_link });
    return users[0];
  } catch (error) {
    return { error: "Пользователя не существует или неверно указана ссылка." };
  }
};
