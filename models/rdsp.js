exports.matcher = buildMatcher();
function buildMatcher() {
  const description = {
    "type": "info",
    "id": "rdsp",
    "text":
            `
              <div class="response">
              <b>RDSP: Registered Disablity Savings Plan</b>
              <br>
              <a href="http://www.rdsp.com/calculator/">More Details</a>
              </div>
            `
  }

  let baseObject = Object.create({});
  baseObject['rdsp'] = function(items){ return description;}
  return baseObject;
}
