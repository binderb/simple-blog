const format_datetime = (dt) => {
  const date = new Date(dt);
  return date.toLocaleString([],{year: 'numeric', month: 'numeric', day: 'numeric'});
};

const is_equal = (val1, val2) => {
  return val1 == val2;
}


module.exports = {
  format_datetime,
  is_equal
};