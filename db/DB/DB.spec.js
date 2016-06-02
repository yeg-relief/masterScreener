'use strict';
const
assert  = require('chai').assert,
DB      = require('./index').Class,
utils   = require('../utils');

const elasticsearch = require('elasticsearch'),
      client        = new elasticsearch.Client({host: 'localhost:9200'});

describe('DB class', () => {

  it('is able to be initialized with data', () => {
    const db = new DB(client)
    return db.loadInitial()
          .then( db => assert.equal(db.memory.size > 0, true))
  });

  // this test requires that there is a program called 'resp' to be in the database
  it('returns an array with the responses in memory', () => {
    const db = new DB(client);
    return db.loadInitial()
           .then(db => db.get(['resp']))
           .then( res => assert.deepEqual(res, [db.memory.get('resp')]))
  });

  it('returns an empty array when all are missed', () => {
    const db = new DB(client);
    return db.get(['miss'])
           .then( resp => assert.deepEqual(resp, []))
  });

  it('will fetch missed gets', () => {
    const db = new DB(client);
    let expected;
    return db.loadInitial()
           .then(db => {
             expected = db.memory.get('resp');
             db.delete('resp');
             return Promise.resolve(db);
           })
           .then(db => {return Promise.resolve(db.get(['resp']))})
           .then(res => assert.deepEqual([expected], res))
  });

  it('will combine values in memory with fetched values', () => {
    const db = new DB(client);
    const expected = [];
    return db.loadInitial()
           .then(db => {
             expected.push(db.memory.get('rdsp'));
             expected.push(db.memory.get('resp'));
             db.delete('resp');
             return Promise.resolve(db);
           })
           .then(db => {return Promise.resolve(db.get(['resp', 'rdsp']))})
           .then(res => {
             // fetched values will be saved in memory notice the delete on line 72
             assert.deepEqual(db.memory.get('resp'), expected[1])
             return Promise.all(res);
           })
           .then(res => assert.deepEqual(expected, res))
  });

  it('can upload a response', () => {
    const db = new DB(client);
    const newResponse = {
      type: "info",
      id: "test",
      text:`stuff`
    }
    return db.uploadResponse(newResponse)
           .then( response => {
             assert.equal(response, true);
             return Promise.resolve()
           })
           .then(utils.deleteDoc(client, 'response', 'html_response', newResponse.id))
  })

  it('can delete a response', () => {
    const db = new DB(client);
    const newResponse = {
      type: "info",
      id: "test",
      text:`stuff`
    }

    return utils.indexDoc(client, 'response', newResponse.id, newResponse, 'html_response')
           .then(() => {return db.deleteResponse(newResponse.id)})
           .then( resp => assert.equal(resp, true))
  });
  /*
  works but I have to think of an assertion besides importing questionnaire from db/seeds/responses
  it('has a copy of the masterQuestionnaire', () => {
    const db = new DB(client);
    return db.loadInitial()
           .then( db => {
             return db.get(['questionnaire'])
           })
           .then( content => console.log(JSON.stringify(content[0].questionnaire)));

  })
  */
})
