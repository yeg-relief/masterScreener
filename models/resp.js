exports.matcher = buildMatcher();
function buildMatcher() {
  const description = {
    "type": "info",
    "id": "resp",
    "text":
            `
              <div class="response">
              <b>RESP: Canadian Learning Bond</b>
              <br>
              <a href="https://www.smartsaver.org/">More Details</a>
              </div>
            `
  }

  let baseObject = Object.create({});
  baseObject['resp'] = function(items){ return description;}
  return baseObject;
}
