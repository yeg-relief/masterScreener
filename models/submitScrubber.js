module.exports = {
  scrub
}

/**
    The current frontend solution is an adapted project from an opensourced
    repository. As a result, the generated response does not fit the data model
    as well as I would like. So, we need to 'massage' the data into a more
    appropriate form.
    @param {Object} userResponse - An object representing the client answers from a screener
    @return {Object}
 */
function scrub(userResponse) {
  let output = Object.create(Object.prototype);
  for(const prop in userResponse) {
    if(userResponse.hasOwnProperty(prop)){
      if (userResponse[prop] === 'checked'){
        output[prop] = true;
      } else if (userResponse[prop] === ''){
        continue;
      }
      else if (!isNaN(userResponse[prop])) {
        output[prop] = parseInt(userResponse[prop], 10);
      }
    }
  }
  return output;
}
