module.exports = {
  "questionnaire": [
    {
      "type": "block",
      "text": "Master Screener",
      "items": [
        {
          "type": "line",
          "id": "age",
          "text": "age"
        },
        {
          "type": "line",
          "id": "income",
          "text": "income"
        },
        {
          "type": "radiogroup",
          "id": "has_children",
          "text": "Do you have children under the age of 18?",
          "defaultChoice": false,
          "choices": [
            {"has_children_yes": "Yes"},
            {"has_children_no": "No"}
          ]
        },
        {
          "type": "radiogroup",
          "cond": "has_children_yes",
          "id": "single_parent",
          "text": "Are you a single parent?",
          "defaultChoice": false,
          "choices": [
            {"single_parent_yes": "Yes"},
            {"single_parent_no": "No"}
          ]
        },checkgroup
        {
          "type": "checkgroup",
          "cond": "has_children_yes",
          "text": "How many children under 18 do you have?",
          "defaultChoice": false,
          "choices": [
            {"one_child": "1"},
            {"two_children": "2"},
            {"three_children": "3"},
            {"four_children": "4"},
            {"five_children": "5"}
          ]
        },
        {
          "type": "radiogroup",
          "cond": "has_children_yes",
          "text": "Do you recieve the National Child Benefit Supplement?",
          "defaultChoice": false,
          "choices": [
            {"national_child_benefit_yes": "yes"},
            {"national_child_benefit_no": "no"}
          ]
        },
        {
          "type": "radiogroup",
          "cond": "has_children_yes",
          "text": "Are your children born January 1, 2004 or later?",
          "defaultChoice": false,
          "choices": [
            {"born_after_yes": "yes"},
            {"born_after_no": "no"}
          ]
        },
        {
          "type": "radiogroup",
          "text": "Are you between the ages of 60 and 64?",
          "defaultChoice": false,
          "choices": [
            {"sixty_sixtyFour_yes": "yes"},
            {"sixty_sixtyFour_no": "no"}
          ]
        },
        {
          "type": "radiogroup",
          "text": "hase your spouse or common-law partner has died and you have not remarried or entered into a common-law relationship?",
          "cond": "sixty_sixtyFour_yes",
          "defaultChoice": false,
          "choices": [
            {"survived_spouse_yes": "yes"},
            {"survived_spouse_no": "no"}
          ]
        }
      ]
    }
  ]
}
