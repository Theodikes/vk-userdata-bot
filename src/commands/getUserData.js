import fs from "fs-extra";
import path from "path";
import { getLink } from "../utils.js";
import {
  getSubscriptions,
  getFollowers,
  getFriends,
  getUserInstance,
} from "../vk/commands/index.js";

const getPath = (fileName) =>
  path.join(path.resolve(), "src", "files", fileName);

const formatDataToWriteInFile = (data) =>
  data.reduce((acc, current) => {
    if (current.type === "page")
      return acc + `https://vk.com/id${current.id} | ${current.name}\n`;

    return (
      acc +
      `https://vk.com/id${current.id} | ${current.first_name} ${current.last_name}\n`
    );
  }, "") || "По запрашиваемому методу ничего не нашлось";

export const getUserData = async (ctx, next) => {
  const vkLink = getLink(ctx);
  if (!vkLink) {
    await ctx.reply("Не указана ссылка");
    return;
  }

  const formattedLink = new URL(vkLink).pathname.slice(1);
  const { id, is_closed, deactivated, error } = await getUserInstance(
    formattedLink
  );
  if (error) {
    await ctx.reply(error);
    return;
  }
  if (is_closed || deactivated) {
    await ctx.reply("Профиль закрыт или удалён, данные недоступны.");
    return;
  }

  const followers = await getFollowers(id);
  const friends = await getFriends(id);
  const subscriptions = await getSubscriptions(id);

  const followersFile = getPath(`followers${id}`);
  const friendsFile = getPath(`friends${id}`);
  const subscriptionsFile = getPath(`subscriptions${id}`);

  await fs.writeFile(followersFile, formatDataToWriteInFile(followers));
  await fs.writeFile(friendsFile, formatDataToWriteInFile(friends));
  await fs.writeFile(subscriptionsFile, formatDataToWriteInFile(subscriptions));

  await ctx.replyWithDocument({ source: friendsFile });
  await ctx.replyWithDocument({ source: followersFile });
  await ctx.replyWithDocument({ source: subscriptionsFile });

  await fs.unlink(followersFile);
  await fs.unlink(friendsFile);
  await fs.unlink(subscriptionsFile);

  await next();
};
