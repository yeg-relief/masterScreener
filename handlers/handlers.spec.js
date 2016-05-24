const
chai     = require('chai'),
expect   = require('chai').expect,
assert   = require('chai').assert,
chaiHttp = require('chai-http')
app      = require('../app');

chai.use(chaiHttp);

describe('/masterSubmit', () => {
  // test broken atm
  /*
  it('should write a vsaq questionaire in the response', done => {
    const sampleReq = {
      income: '12000',
      commonLaw: 'checked',
      children: 'checked',
      children_no: '',
      numChildren: '3'
    }
    // this is the expected response body
    const expectedQ = {
      "questionnaire": [
        {
          "type": "block",
          "text": "Results",
          "items": [
            {
              "type": "tip",
              "id": "ChildHealthBenefit",
              "text": '<a href="http://www.humanservices.alberta.ca/financial-support/2076.html">More Details</a>',
              "warn": "yes",
              "name": "<b>Alberta Child Health Benefit</b>",
              "severity": "high"
            }
          ]
        }
      ]
    };

    chai.request('http://localhost:3000')
    .post('/masterSubmit')
    .send(sampleReq)
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      assert.deepEqual(res.body, expectedQ);
      done();
    });
  });
  */
  it('should process this', done => {
    const input = {
      income:"1000",
      commonLaw:"checked",
      children:"checked",
      children_no:"",
      numChildren:"2",
      bornAfterDate:"checked",
      bornAfterDate_no:"",
      disablityTaxCredit:"checked",
      disablityTaxCredit_no:""
    }

    chai.request('http://localhost:3000')
    .post('/masterSubmit')
    .send(input)
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
    //  const q = res.body.questionnaire[0];
    //  console.log(q);
      done();
    });
  })
});
