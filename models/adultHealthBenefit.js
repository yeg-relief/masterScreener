exports.matcher = buildMatcher();
function buildMatcher() {
  const description = {
    "type": "info",
    "id": "AdultHealthBenefit",
    "text":
            `
              <div class="response deactivated">
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
