exports.matcher = buildMatcher();
function buildMatcher() {
  const description = {
    "type": "info",
    "id": "ChildHealthBenefit",
    "text":
            `
              <div class="response">
              <b>Alberta Child Health Benefit</b>
              <br>
              <a href="http://www.humanservices.alberta.ca/financial-support/2076.html">More Details</a>
              </div>
            `
  }

  const ids = ['s1', 's2', 's3', 's4', 'c1', 'c2', 'c3', 'c4'];
  let baseObject = Object.create({});
  ids.forEach( e => {
    baseObject[`child_health_benefit_${e}`] = function(items){ return description;}
  });
  return baseObject;
}
