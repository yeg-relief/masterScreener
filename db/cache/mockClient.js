const hits = {
  hits: {
    hits: [
      {
        _index: 'response',
        _type: 'html_response',
        _id: 'resp',
        _score: 1,
        _source: {
          doc: {
            type: 'info',
            id: 'resp',
            text: '<a href="https://www.smartsaver.org/">More Details</a>'
          }
        }
      },
      {
        _index: 'response',
        _type: 'html_response',
        _id: 'rdsp',
        _score: 1,
        _source: {
          doc: {
            type: 'info',
            id: 'rdsp',
            text: '<a href="http://www.rdsp.com/calculator/">More Details</a>'
          }

        }
      }
    ]
  }}
const mockClient = {
  search: (arg1, arg2,arg3,arg4) => {
    return Promise.resolve(hits);
  }
}

const expectedCache = new Map();
expectedCache['rdsp'] = {
  "type": 'info',
  "id": 'rdsp',
  "text": '<a href="http://www.rdsp.com/calculator/">More Details</a>'
};
expectedCache['resp'] = {
  "type": 'info',
  "id": 'resp',
  "text": '<a href="https://www.smartsaver.org/">More Details</a>'
};

module.exports = {
  mockClient,
  expectedCache
}
