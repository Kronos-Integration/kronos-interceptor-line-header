/* global describe, it, xit */
/* jslint node: true, esnext: true */

"use strict";

/*
 * Just test if the message will be passed through the interceptor
 */

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should(),
  MockReceiveInterceptor = require('kronos-test-interceptor').MockReceiveInterceptor,
  InterceptorUnderTest = require('../dist/module').LineHeaderInterceptor;


const stepMock = {
  "name": "dummy step name",
  "type": "dummy step type"
};

const checkProperties = {
  "type": "line-header",
  "config": {
    "expectedHeader": ["col_1", "col_2", "col_3", ["col_4", "col 4", "c4"], "col_5", "col_6"],
    "fieldNames": ["c1", "c2", "c3", "c4", "c5", "c6"],
    "caseSensitive": true,
    "strict": {
      "val": true,
      "severity": "skip_record"
    },
    "additionalColumns": false,
    "missingColumns": false,
    "mandatoryColumns": ["gum"],
    "severity": "abort_file"
  }
};


describe('Interceptor test', function () {

  it('Create', function () {
    const endpoint = {
      "owner": stepMock,
      "name": "gumboIn"
    };
    const messageHandler = new InterceptorUnderTest(checkProperties, endpoint);
    assert.ok(messageHandler);
  });

  it('Send message', function (done) {
    const endpoint = {
      "owner": stepMock,
      "name": "gumboIn"
    };

    const sendMessage = {
      "info": "first message"
    };

    const messageHandler = new InterceptorUnderTest(checkProperties, endpoint);
    const mockReceive = new MockReceiveInterceptor(function (request, oldRequest) {

      assert.ok(request);

      assert.deepEqual(request, {
        "info": "first message"
      });
      done();
    });

    messageHandler.connected = mockReceive;

    messageHandler.receive(sendMessage);

  });
});
