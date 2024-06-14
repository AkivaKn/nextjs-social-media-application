exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
    if (!created_at) return { ...otherProperties };
    return { created_at: new Date(created_at), ...otherProperties };
};
  
exports.checkIfCurrentUserLiked = (user_id, likes) => {
  const liked = likes.some((like) => {
    return like.user_id === user_id
  })
  return liked
}