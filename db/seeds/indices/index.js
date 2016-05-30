module.exports = {
  items: [
    {
      index: "master_screener",
      mappings:{
        master: {
          properties: {
            income: {type: "integer"},
            commonLaw: {type: "boolean"},
            numChildren: {type: "integer"},
            children: {type: "boolean"},
            disablityTaxCredit: {type: "boolean"},
            bornAfterDate: {type: "boolean"}
          }
        }
      }
    },
    {
      index: "response",
      /*
      this represents the typename for the document index method
      TODO: this is not uniform and a more elegant solution should be discovered
      */
      type: "html_response",
      mappings: {
        html_response: {
          properties: {
            type: {type: "string"},
            id: {type: "string"},
            text: {type: "string"}
          }
        }
      }
    }
  ]
}
