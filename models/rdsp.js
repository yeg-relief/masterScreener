exports.matcher = buildMatcher();
function buildMatcher() {
  const style = `
                 background: #E6E2E2;
                 border: 1px solid rgba(0,0,0,0.1);
                 box-shadow:
                  inset 0 2px 3px rgba(255,255,255,0.3),
                  inset 0 -2px 3px rgba(0,0,0,0.3),
                  0 1px 1px rgba(255,255,255,0.9);
                 padding-left: 10px;`;

  const description = {
    "type": "info",
    "id": "rdsp",
    "text":
            `
              <div style="${style}">
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
