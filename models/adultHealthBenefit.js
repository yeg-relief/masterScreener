exports.matcher = buildMatcher();
function buildMatcher() {
  const style = `
                 background: #E6E2E2;
                 border: 1px solid rgba(0,0,0,0.1);
                 box-shadow:
                  inset 0 2px 3px rgba(255,255,255,0.3),
                  inset 0 -2px 3px rgba(0,0,0,0.3),
                  0 1px 1px rgba(255,255,255,0.9);
                 padding-left: 10px;
                 pointer-events: none;
                 cursor: default;`;

  const description = {
    "type": "info",
    "id": "AdultHealthBenefit",
    "text":
            `
              <div style="${style}">
              <b>Alberta Adult Health Benefit</b>
              <br>
              <a href="http://www.humanservices.alberta.ca/financial-support/2076.html" class="not-active">
                No More Details</a>
              </div>
            `
  }

  const ids = ['s', 'c'];
  let baseObject = Object.create({});
  ids.forEach( e => {
    baseObject[`adult_health_benefit_${e}`] = function(items){ return description;}
  });
  return baseObject;
}
