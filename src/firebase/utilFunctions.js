export const formatObj = (id, data) => {
  return { id, ...data, createdAt: data.createdAt.toMillis() }
}
