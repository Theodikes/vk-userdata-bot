export const getLink = (ctx) => {
  const ent = ctx.message.entities;
  if (!ent) return null;

  const { offset, length } = ent.find((entity) => entity.type === "url");

  return ctx.message.text.slice(offset, length + offset);
};
