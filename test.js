'use strict';
const expect = require('chai').expect;
const Plugin = require('./');
const fs = require('fs');

describe('Plugin', () => {
  const plugin = new Plugin({
    paths: {public: 'build'}
  });

  it('should be an object', () => {
    expect(plugin).to.be.an('object');
  });

  it('should has #compile method', () => {
    expect(plugin.compile).to.be.a('function');
  });

  it('should compile and produce a build file', function (done) {
    plugin.htmlMin = {
      removeComments: true
    };

    var content = '<!-- some comment --><p>blah</p>';

    plugin.compile(content, '', function (error) {
      expect(error).not.to.be.ok;
      var path = "./build";
      expect(fs.existsSync(path)).to.be.ok;
      fs.unlinkSync(path);
      done();
    });
  });
});
