exports.items = {
  items: [
    {
      type: "info",
      id: "adult_health_benefit_c",
      text:`
            <div class="response deactivated">
              <b>Alberta Adult Health Benefit</b>
              <br>
                <a href="http://www.humanservices.alberta.ca/financial-support/2076.html" class="not-active">
                  No More Details</a>
            </div>`
    },
    {
      type: "info",
      id: "adult_health_benefit_s",
      text:`
            <div class="response deactivated">
              <b>Alberta Adult Health Benefit</b>
              <br>
                <a href="http://www.humanservices.alberta.ca/financial-support/2076.html" class="not-active">
                  No More Details</a>
            </div>`
    },
    {
      type: "info",
      id: "child_health_benefit_s1",
      text:`
            <div class="response">
              <b>Alberta Child Health Benefit</b>
              <br>
                <a href="http://www.humanservices.alberta.ca/financial-support/2076.html">More Details</a>
            </div>`
    },
    {
      type: "info",
      id: "child_health_benefit_s2",
      text:`
            <div class="response">
              <b>Alberta Child Health Benefit</b>
              <br>
                <a href="http://www.humanservices.alberta.ca/financial-support/2076.html">More Details</a>
            </div>`
    },
    {
      type: "info",
      id: "child_health_benefit_s3",
      text:`
            <div class="response">
              <b>Alberta Child Health Benefit</b>
              <br>
                <a href="http://www.humanservices.alberta.ca/financial-support/2076.html">More Details</a>
            </div>`
    },
    {
      type: "info",
      id: "child_health_benefit_s4",
      text:`
            <div class="response">
              <b>Alberta Child Health Benefit</b>
              <br>
                <a href="http://www.humanservices.alberta.ca/financial-support/2076.html">More Details</a>
            </div>`
    },
    {
      type: "info",
      id: "child_health_benefit_c1",
      text:`
            <div class="response">
              <b>Alberta Child Health Benefit</b>
              <br>
                <a href="http://www.humanservices.alberta.ca/financial-support/2076.html">More Details</a>
            </div>`
    },
    {
      type: "info",
      id: "child_health_benefit_c2",
      text:`
            <div class="response">
              <b>Alberta Child Health Benefit</b>
              <br>
                <a href="http://www.humanservices.alberta.ca/financial-support/2076.html">More Details</a>
            </div>`
    },
    {
      type: "info",
      id: "child_health_benefit_c3",
      text:`
            <div class="response">
              <b>Alberta Child Health Benefit</b>
              <br>
                <a href="http://www.humanservices.alberta.ca/financial-support/2076.html">More Details</a>
            </div>`
    },
    {
      type: "info",
      id: "child_health_benefit_c4",
      text:`
            <div class="response">
              <b>Alberta Child Health Benefit</b>
              <br>
                <a href="http://www.humanservices.alberta.ca/financial-support/2076.html">More Details</a>
            </div>`
    },
    {
      type: "info",
      id: "rdsp",
      text:`
            <div class="response">
              <b>RDSP: Registered Disablity Savings Plan</b>
              <br>
              <a href="http://www.rdsp.com/calculator/">More Details</a>
            </div>`
    },
    {
      type: "info",
      id: "resp",
      text:
              `
                <div class="response">
                <b>RESP: Canadian Learning Bond</b>
                <br>
                <a href="https://www.smartsaver.org/">More Details</a>
                </div>
              `
    }
  ]
}

exports.masterQuestionnaire = {
  "questionnaire": [
    {
      "type": "block",
      "text": "Master Screener Test",
      "items": [
        {
          "type": "line",
          "id": "income",
          "text": "family income"
        },
        {
          "type": "radiogroup",
          "id": "commonLaw",
          "text": "Are you a partner in a common law relationship?",
          "defaultChoice": false,
          "choices": [
            {"commonLaw": "Yes"},
            {"commonLaw_no": "No"}
          ]
        },
        {
          "type": "radiogroup",
          "id": "has_children",
          "text": "Do you have children under the age of 18?",
          "defaultChoice": false,
          "choices": [
            {"children": "Yes"},
            {"children_no": "No"}
          ]
        },
        {
          "cond": "children",
          "text": "How many children under 18 do you have?",
          "type": "line",
          "id": "numChildren"
        },
        {
          "id": "afterDate",
          "cond": "children",
          "text": "Were any of your children born after January 1st 2004?",
          "type": "radiogroup",
          "defaultChoice": false,
          "choices": [
            {"bornAfterDate": "Yes"},
            {"bornAfterDate_no": "No"}
          ]
        },
        {
          "id": "disabled",
          "text": "Do you qualify for the disablity tax credit?",
          "type": "radiogroup",
          "defaultChoice": false,
          "choices": [
            {"disablityTaxCredit": "Yes"},
            {"disablityTaxCredit_no": "No"}
          ]
        }
      ]
    }
  ]
}
