const { assert } = require('chai');
const chaii = require('chai');
const chaiHttp = require('chai-http');
const { it, describe, after } = require('mocha');
const nock = require('nock');
const app = require('../app');
const sinon = require('sinon');
const tourController = require('../controllers/toursController');
const should = chaii.should();
const { expect } = chaii;
chaii.use(chaiHttp);

describe.only('Welcome Get api', () => {
  it('Welcome API', () => {
    chaii.request(app)
      .get('/api/welcome')
      .end((err: any, res: any) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        const actualValue = res.body.message;
        expect(actualValue).to.be.equal('Hello');
      });
  });
});

describe.only('Get tour', () => {
  const getTour = { _id: '61d7f569dde3580e22646022', name: 'AHI 1 4', price: 5570, __v: 0 };
  it('Should Get tour object with status 200.', async () => {
    const nockedData = nock('/api/v1/tours')
      .get('/61d8076399ca242c9001a5e1')
      .reply(200, getTour);
    console.log(nockedData);
  });
});

describe.only('Get tours', () => {
  it('Should return tours as array with status 200.', async () => {
    const toursObj = {
      tours: [
        {
          _id: '61d7f569dde3580e22646022', name: 'AHI 1 4', price: 5570, __v: 0,
        },
        {
          _id: '61d7f569dde3580e22646022', name: 'AHI 1 4', price: 5570, __v: 0,
        },
      ]
    }
    const scope = nock('/api/v1/tours')
      .get('/')
      .reply(200, toursObj);
  })
});

describe.only('Create tour', () => {
  it('Return a valid tour with status 200.', async () => {
    const newTourObje = { name: 'A101', price: 5570 };
    const scope = nock('/api/v1/tours')
      .post('/', newTourObje)
      .reply(200, newTourObje);
  })
});

describe.only('Update the tour', () => {
  it('Should return updated tour object with status 200.', async () => {
    const newTourObje = { name: 'A101', price: 5570 };
    const scope = nock('/api/v1/tours')
      .post('/61d7f569dde3580e22646022', newTourObje)
      .reply(200, newTourObje);
  })
});

// with chai
// describe.skip('Create Tour', () => {
//   it('Should POST valid tour', () => {
//     let newtour = {
//       name: "Toodo",
//       price: 5555,
//     }
//     chaii.request(app)
//       .post('/api/v1/tours')
//       .send(newtour)
//       .end((err, res) => {
//         console.log(res.body, 'error');
//         res.should.have.status(200.);
//       });
//   });
// });

// describe.skip('Task list api', () => {
//   it('Get tours', () => {
//     chaii.request(app)
//       .get('/api/v1/tours')
//       .end((err, res) => {
//         console.log(res.body);
//         assert.equal(res.status, 200.);
//         console.log(res.body);
//       });
//   });
// });
