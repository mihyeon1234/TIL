function replaceParam(keyword) {
  let returnValue = keyword;
  returnValue = returnValue.replace(/&/g, '%26');
  returnValue = returnValue.replace(/\+/g, '%2B');
  returnValue = returnValue.replace(/=/g, '%3D');

  return returnValue;
}

export default replaceParam;
