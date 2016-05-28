exports.questionaire = {
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
