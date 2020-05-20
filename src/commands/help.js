export const help = async (ctx, next) => {
  const instructions = `Доступные команды:
    
1. Получение списка друзей, подписчиков и подписок (на кого подписан) пользователя в виде трех файлов.

Команда - */get user_link*, ссылка на пользователя в формате id (пример - https://vk.com/id1) или в формате шортлинка (пример - https://vk.com/ramzan)`;

  ctx.replyWithMarkdown(instructions);
  await next();
};
