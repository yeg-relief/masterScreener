module.exports = {
  items: [
    {
      id: "adultHealthBenefit",
      mappings: [
        income: {type: "integer"},
        commonLaw: {type: "boolean"}
      ]
    },
    {
      id: "childHealthBenefit",
      mappings: [
        income: {type: "integer"},
        commonLaw: {type: "boolean"},
        numChildren: {type: "integer"},
        children: {type: "boolean"}
      ]
    },
    {
      id: "rdsp",
      mappings: [
        disablityTaxCredit: {type: "boolean"}
      ]
    },
    {
      id: "resp",
      mappings: [
        income: {type: "integer"},
        bornAfterDate: {type: "boolean"},
        children: {type: "boolean"}
      ]
    }
  ]
}
