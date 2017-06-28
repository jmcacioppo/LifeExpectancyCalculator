define('app',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'jquery', 'bootstrap'], function (exports, _aureliaFramework, _aureliaFetchClient, _jquery) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function App(httpClient) {
      _classCallCheck(this, App);

      this.httpClient = httpClient;
      this.message = 'Life Expectancy Calculator';
    }

    App.prototype.activate = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.httpClient.fetch('/api/life-expectancy/get.json');

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function activate() {
        return _ref.apply(this, arguments);
      }

      return activate;
    }();

    App.prototype.configureRouter = function configureRouter(config, router) {

      this.router = router;
      config.title = "Life Expectancy Calculator";
      config.map([{ route: ['', 'personalinfo'], moduleId: 'aboutyou/personalinfo',
        name: 'personalinfo', title: 'Personal Info', nav: true }, { route: 'myhealth', moduleId: 'health/myhealth',
        name: 'myhealth', title: 'My Health', nav: true }, { route: 'familyhealth', moduleId: 'health/familyhealth',
        name: 'familyhealth', title: 'Family Health', nav: true }, { route: 'occupation', moduleId: 'occupation/occupation',
        name: 'occupation', title: 'Occupation', nav: true }, { route: 'results', moduleId: 'results/results',
        name: 'results', title: 'Results', nav: true }, { route: 'jsonfile', moduleId: 'services/lifeExpectancy.json!json',
        name: 'jsonfile', title: 'Json File', nav: true }]);
    };

    return App;
  }()) || _class);
});
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
define('health/familyhealth',['exports', 'aurelia-framework', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.familyhealth = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var familyhealth = exports.familyhealth = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function () {
        function familyhealth(router) {
            _classCallCheck(this, familyhealth);

            this.router = router;
        }

        familyhealth.prototype.back = function back() {
            this.router.navigate('#/personalinfo');
        };

        return familyhealth;
    }()) || _class);
});
define('health/myhealth',['exports', 'aurelia-framework', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.myhealth = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var myhealth = exports.myhealth = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function () {
        function myhealth(router) {
            _classCallCheck(this, myhealth);

            this.router = router;
        }

        myhealth.prototype.back = function back() {
            this.router.navigate('#/personalinfo');
        };

        return myhealth;
    }()) || _class);
});
define('occupation/occupation',['exports', 'aurelia-framework', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.occupation = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var occupation = exports.occupation = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function () {
        function occupation(router) {
            _classCallCheck(this, occupation);

            this.router = router;
        }

        occupation.prototype.back = function back() {
            this.router.navigate('#/personalinfo');
        };

        return occupation;
    }()) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('aboutyou/personalinfo',['exports', 'aurelia-framework', 'aurelia-router', '../services/user'], function (exports, _aureliaFramework, _aureliaRouter, _user) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.personalinfo = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var personalinfo = exports.personalinfo = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User), _dec(_class = function () {
        function personalinfo(router, user) {
            _classCallCheck(this, personalinfo);

            this.router = router;
            this.user = user;
        }

        personalinfo.prototype.gender = function gender() {
            this.user.clientPersonalInfo.checkgender = !this.user.clientPersonalInfo.checkgender;
            if (this.user.clientPersonalInfo.checkgender) this.user.clientPersonalInfo.gender = 'Male';else this.user.clientPersonalInfo.gender = 'Female';
            console.log(this.user.clientPersonalInfo);
        };

        personalinfo.prototype.checkspouse = function checkspouse() {
            this.user.clientPersonalInfo.checkspouse = !this.user.clientPersonalInfo.checkspouse;
        };

        personalinfo.prototype.myhealth = function myhealth() {
            this.router.navigate('#/myhealth');
        };

        personalinfo.prototype.familyhealth = function familyhealth() {
            this.router.navigate('#/familyhealth');
        };

        personalinfo.prototype.occupation = function occupation() {
            this.router.navigate('#/occupation');
        };

        personalinfo.prototype.submit = function submit() {
            this.router.navigate('#/results');
        };

        return personalinfo;
    }()) || _class);
});
define('results/results',['exports', 'aurelia-framework', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.results = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var results = exports.results = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function () {
        function results(router) {
            _classCallCheck(this, results);

            this.router = router;
        }

        results.prototype.back = function back() {
            this.router.navigate('#/personalinfo');
        };

        return results;
    }()) || _class);
});
define('services/familyHealthData',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var FamilyHealthData = exports.FamilyHealthData = function FamilyHealthData() {
        _classCallCheck(this, FamilyHealthData);

        this.motherHealthCheck = false;
        this.fatherHealthCheck = false;
    };
});
define('services/myHealthData',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var MyHealthData = exports.MyHealthData = function MyHealthData() {
        _classCallCheck(this, MyHealthData);

        this.height;
        this.weight;
    };
});
define('services/occupationData',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var OccupationData = exports.OccupationData = function OccupationData() {
        _classCallCheck(this, OccupationData);

        this.job;
    };
});
define('services/personalInfoData',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var PersonalInfoData = exports.PersonalInfoData = function PersonalInfoData() {
        _classCallCheck(this, PersonalInfoData);

        this.age;
        this.checkgender = true;
        this.gender;
        this.race;
        this.checkspouse = false;
    };
});
define('services/user',['exports', 'aurelia-framework', '../services/personalInfoData', '../services/myHealthData', '../services/familyHealthData', '../services/occupationData'], function (exports, _aureliaFramework, _personalInfoData, _myHealthData, _familyHealthData, _occupationData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.User = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var User = exports.User = (_dec = (0, _aureliaFramework.singleton)(), _dec(_class = function User() {
        _classCallCheck(this, User);

        this.clientPersonalInfo = new _personalInfoData.PersonalInfoData();
        this.spousePersonalInfo = new _personalInfoData.PersonalInfoData();

        this.clientMyHealth = new _myHealthData.MyHealthData();
        this.spouseMyHealth = new _myHealthData.MyHealthData();

        this.clientFamilyHealth = new _familyHealthData.FamilyHealthData();
        this.spouseFamilyHealth = new _familyHealthData.FamilyHealthData();

        this.clientOccupation = new _occupationData.OccupationData();
        this.spouseOccupation = new _occupationData.OccupationData();
    }) || _class);
});
define('utilities/chart',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Chart = exports.Chart = function Chart() {
        _classCallCheck(this, Chart);
    };
});
define('utilities/readFile',['exports', 'aurelia-fetch-client'], function (exports, _aureliaFetchClient) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ReadFile = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ReadFile = exports.ReadFile = function () {
        function ReadFile() {
            _classCallCheck(this, ReadFile);
        }

        ReadFile.prototype.getCountyList = function getCountyList(state) {
            var httpClient = new _aureliaFetchClient.HttpClient();

            httpClient.fetch('IHME_USA_EXPECTANCY_1985_2010.csv').then(function (response) {
                return console.log(response.json());
            }).then(function (data) {
                console.log(data);
            });
        };

        ReadFile.prototype.getCountyLifeExpectancy = function getCountyLifeExpectancy(county) {};

        return ReadFile;
    }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"css/styles.css\"></require><br><div id=\"home\"><h1>Life Expectancy Calculator</h1></div><hr><router-view></router-view></template>"; });
define('text!css/styles.css', ['module'], function(module) { module.exports = "#home, h1, #clientorspouse {\r\n    text-align: center;\r\n    margin: 0 auto;\r\n    width: 500px;\r\n}\r\n\r\n#personalinfo, #myhealth, #familyhealth, #occupation, #results {    \r\n    text-align: left;\r\n    margin: 0 auto;\r\n    width: 500px;\r\n}\r\n"; });
define('text!aboutyou/personalinfo.html', ['module'], function(module) { module.exports = "<template><br><h1>Personal Information</h1><br><hr><form id=\"personalinfo\" submit.delegate=\"submit()\"><div id=\"client\"><h2 id=\"clientorspouse\">Client</h2><br><div class=\"form-group\"><label class=\"col-sm-2\" for=\"age\">Age:</label><input cladd=\"col-sm-6\" style=\"width:400px\" type=\"text\" value.bind=\"user.clientPersonalInfo.age\" class=\"form-control\" placeholder=\"30\"></div><label class=\"col-sm-2\" for=\"gender\">Gender:</label><span id=\"space\"></span><div class=\"btn-group col-sm-6\" click.delegate=\"gender()\" data-toggle=\"buttons\"><label class=\"btn ${user.clientPersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Male</label><label class=\"btn ${!user.clientPersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Female</label></div><br><br><div class=\"form-group\"><label class=\"col-sm-2\" for=\"race\">Race:</label><select class=\"form-control col-sm-6\" style=\"width:400px\" value.bind=\"user.clientPersonalInfo.race\"><option data-hidden=\"true\">Please Select</option><option>White</option><option>Black</option><option>Hispanic</option><option>Asian</option></select></div><br><br><label class=\"col-sm-6\" for=\"checkspouse\">Do you have a spouse?</label><span id=\"space\"></span><div class=\"btn-group col-sm-6\" click.delegate=\"checkspouse()\" data-toggle=\"buttons\"><label class=\"btn ${user.clientPersonalInfo.checkspouse ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientPersonalInfo.checkspouse ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><hr><div><h2 style=\"margin-top:50px\" class=\"col-sm-6\">Other Factors:</h2><div style=\"text-align:center\"><button class=\"btn btn-primary\" click.delegate=\"myhealth()\">My Health</button><br><br><button class=\"btn btn-primary\" click.delegate=\"familyhealth()\">My Family Health</button><br><br><button class=\"btn btn-primary\" click.delegate=\"occupation()\">My Occupation</button></div></div></div><hr><div id=\"spouse\" show.bind=\"user.clientPersonalInfo.checkspouse\"><h2 id=\"clientorspouse\">Co-Client</h2><hr></div><button id=\"submit\" type=\"submit\" class=\"btn btn-primary\">Submit</button></form></template>"; });
define('text!health/familyhealth.html', ['module'], function(module) { module.exports = "<template><div id=\"familyhealth\"><h1>Family Health</h1><button class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div></template>"; });
define('text!health/myhealth.html', ['module'], function(module) { module.exports = "<template><div id=\"myhealth\"><h1>My Health</h1><button class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div></template>"; });
define('text!occupation/occupation.html', ['module'], function(module) { module.exports = "<template><div id=\"occupation\"><h1>Occupation</h1><button class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div></template>"; });
define('text!results/results.html', ['module'], function(module) { module.exports = "<template><div id=\"results\"><h1>Results</h1><button class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div></template>"; });
//# sourceMappingURL=app-bundle.js.map