var chai = require('chai'),
    should = chai.should,
    expect = chai.expect,
    Promise = require('bluebird'),
    request = require('superagent-promise')(require('superagent'), Promise),
    chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var url = process.env.URL || 'http://localhost:8000';



describe('Test connectivity', function() {
  var result;

  before(function() {
    result = get(url);
  });

  it('should return a 200 CREATED response', function() {
    return assert(result, "status").to.equal(200);
  });

});


describe('Test admin connectivity', function() {
  var result;
  
  before(function() {
    result = get(url + '/admin');
  });
  
  it('should return a 200 CREATED response', function() {
    return assert(result, "status").to.equal(200);
  });
  
});

/*
 * Convenience functions
 */

// POST request with data and return promise
function post(url, data) {
  return request.post(url)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send(data)
    .end();
}

// GET request and return promise
function get(url) {
  return request.get(url)
    .set('Accept', 'application/json')
    .end();
}

// DELETE request and return promise
function del(url) {
  return request.del(url).end();
}

// UPDATE request with data and return promise
function update(url, method, data) {
  return request(method, url)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send(data)
    .end();
}

// Resolve promise for property and return expectation
function assert(result, prop) {
  return expect(result).to.eventually.have.deep.property(prop)
}