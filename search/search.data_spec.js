// inputs and expected outputs for seach.spec.js
exports.input = [
  {
    "income": "1000",
    "commonLaw": "checked",
    "commonLaw_no": "",
    "children": "checked",
    "children_no": "",
    "numChildren": "3",
    "bornAfterDate": "",
    "bornAfterDate_no": "checked",
    "disablityTaxCredit": "",
    "disablityTaxCredit_no": "checked"
  }
]

exports.expected = [
  {
    income: 1000,
    commonLaw: true,
    children: true,
    numChildren: 3,
    bornAfterDate: false,
    disablityTaxCredit: false
  },
  ['adult_health_benefit_c', 'child_health_benefit_c3']
]
