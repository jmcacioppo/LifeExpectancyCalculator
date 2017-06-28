define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"css/styles.css\"></require><div id=\"home\"><h1>Life Expectancy Calculator</h1></div><router-view></router-view></template>"; });
define('text!css/styles.css', ['module'], function(module) { module.exports = "#home, #personalinfo, #myhealth, #familyhealth, #occupation, #results {    \r\n    text-align: center;\r\n    margin: 0 auto;\r\n    width: 500px;\r\n}"; });
define('text!aboutyou/personalinfo.html', ['module'], function(module) { module.exports = "<template><form id=\"personalinfo\" submit.delegate=\"submit()\"><h1>Personal Info</h1><div class=\"form-group\"><label for=\"age\">Age</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.age\" class=\"form-control\" placeholder=\"30\"></div><div click.delegate=\"gender()\" class=\"btn-group\" data-toggle=\"buttons\"><label class=\"btn ${user.clientPersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Male</label><label class=\"btn ${!user.clientPersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Female</label></div><br><br><div class=\"form-group\"><label for=\"race\">Race</label><select class=\"form-control\" value.bind=\"user.clientPersonalInfo.race\"><option data-hidden=\"true\">Please Select</option><option>White</option><option>Black</option><option>Hispanic</option><option>Asian</option></select></div><br><button class=\"btn btn-primary\" click.delegate=\"myhealth()\">My Health</button> <button class=\"btn btn-primary\" click.delegate=\"familyhealth()\">My Family Health</button> <button class=\"btn btn-primary\" click.delegate=\"occupation()\">My Occupation</button> <button type=\"submit\" class=\"btn btn-primary\">Submit</button></form></template>"; });
define('text!health/familyhealth.html', ['module'], function(module) { module.exports = "<template><div id=\"familyhealth\"><h1>Family Health</h1><button class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div></template>"; });
define('text!health/myhealth.html', ['module'], function(module) { module.exports = "<template><div id=\"myhealth\"><h1>My Health</h1><button class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div></template>"; });
define('text!occupation/occupation.html', ['module'], function(module) { module.exports = "<template><div id=\"occupation\"><h1>Occupation</h1><button class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div></template>"; });
define('text!results/results.html', ['module'], function(module) { module.exports = "<template><div id=\"results\"><h1>Results</h1><button class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div></template>"; });
//# sourceMappingURL=app-bundle.js.map