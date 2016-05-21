exports.questionaire = {
  "questionnaire": [
    {
      "type": "block",
      "text": "Master Screener Test",
      "items": [
        {
          "type": "line",
          "id": "income",
          "text": "income"
        },
        {
          "type": "radiogroup",
          "id": "commonLaw",
          "text": "Are you a partner in a common law relationship?",
          "defaultChoice": false,
          "choices": [
            {"commonLaw": "Yes"},
            {"commonLaw": "No"}
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
        }
      ]
    }
  ]
}
