const format_datetime = (dt) => {
  const date = new Date(dt);
  return date.toLocaleString([],{year: 'numeric', month: 'numeric', day: 'numeric',hour:'numeric',minute:'2-digit'});
};



module.exports = {
  format_datetime
};