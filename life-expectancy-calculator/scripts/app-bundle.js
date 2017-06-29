define('app',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'utilities/readFile', 'jquery', 'bootstrap'], function (exports, _aureliaFramework, _aureliaFetchClient, _readFile, _jquery) {
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

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _readFile.ReadFile), _dec(_class = function () {
    function App(httpClient, readFile) {
      _classCallCheck(this, App);

      this.httpClient = httpClient;
      this.readFile = readFile;
      this.message = 'Life Expectancy Calculator';
    }

    App.prototype.activate = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var data, data2;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.httpClient.fetch('/api/life-expectancy/get.json');

              case 2:
                data = _context.sent;
                _context.next = 5;
                return data.json();

              case 5:
                data2 = _context.sent;

                this.readFile.getStateList(data2);

              case 7:
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
      config.map([{
        route: ['', 'personalinfo'], moduleId: 'aboutyou/personalinfo',
        name: 'personalinfo', title: 'Personal Info', nav: true
      }, {
        route: 'myhealth', moduleId: 'health/myhealth',
        name: 'myhealth', title: 'My Health', nav: true
      }, {
        route: 'familyhealth', moduleId: 'health/familyhealth',
        name: 'familyhealth', title: 'Family Health', nav: true
      }, {
        route: 'occupation', moduleId: 'occupation/occupation',
        name: 'occupation', title: 'Occupation', nav: true
      }, {
        route: 'results', moduleId: 'results/results',
        name: 'results', title: 'Results', nav: true
      }, {
        route: 'jsonfile', moduleId: 'services/lifeExpectancy.json!json',
        name: 'jsonfile', title: 'Json File', nav: true
      }]);
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
define('aboutyou/personalinfo',['exports', 'aurelia-framework', 'aurelia-router', '../services/user', '../services/stateData', 'ion-rangeslider'], function (exports, _aureliaFramework, _aureliaRouter, _user, _stateData, _ionRangeslider) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.personalinfo = undefined;

    var ionRangeSlider = _interopRequireWildcard(_ionRangeslider);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var personalinfo = exports.personalinfo = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User, _stateData.StateData), _dec(_class = function () {
        function personalinfo(router, user, stateData) {
            _classCallCheck(this, personalinfo);

            this.currentCountyArray = [];

            this.router = router;
            this.user = user;
            this.stateData = stateData;
            this.checkState();
        }

        personalinfo.prototype.gender = function gender() {
            this.user.clientPersonalInfo.checkgender = !this.user.clientPersonalInfo.checkgender;
            this.user.clientPersonalInfo.gender = this.user.clientPersonalInfo.checkgender ? 'Male' : 'Female';

            console.log(this.user.clientPersonalInfo);
        };

        personalinfo.prototype.checkspouse = function checkspouse() {
            this.user.clientPersonalInfo.checkspouse = !this.user.clientPersonalInfo.checkspouse;
        };

        personalinfo.prototype.checkState = function checkState() {
            var state = this.user.clientPersonalInfo.state;
            this.currentCountyArray = [];
            this.currentCountyArray = this.stateData.stateToCountyMap.get(state).split(',');
            this.currentCountyArray.pop();
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

        personalinfo.prototype.attached = function attached() {
            var _this = this;

            $("#age").ionRangeSlider({
                grid: true,
                min: 0,
                max: 100,
                from: 30,
                step: 1,
                onFinish: function onFinish(data) {
                    _this.user.clientPersonalInfo.age = data.from;
                }
            });
        };

        return personalinfo;
    }()) || _class);
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
define('utilities/readFile',['exports', 'aurelia-framework', '../services/stateData'], function (exports, _aureliaFramework, _stateData) {
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

    var _dec, _class;

    var ReadFile = exports.ReadFile = (_dec = (0, _aureliaFramework.inject)(_stateData.StateData), _dec(_class = function () {
        function ReadFile(stateData) {
            _classCallCheck(this, ReadFile);

            this.stateData = stateData;
        }

        ReadFile.prototype.getStateList = function getStateList(jsonData) {
            var self = this;
            jsonData.forEach(function (stateObject) {
                self.stateData.stateSet.add(stateObject.State.toLowerCase());
            });
            this.getCountyList(jsonData);
        };

        ReadFile.prototype.getCountyList = function getCountyList(jsonData) {
            var self = this;
            jsonData.forEach(function (stateObject) {
                if (self.stateData.stateToCountyMap.has(stateObject.State.toLowerCase())) {
                    var existingValues = self.stateData.stateToCountyMap.get(stateObject.State.toLowerCase());
                    existingValues += " " + stateObject.County.toLowerCase() + ",";
                    self.stateData.stateToCountyMap.set(stateObject.State.toLowerCase(), existingValues);
                } else self.stateData.stateToCountyMap.set(stateObject.State.toLowerCase(), stateObject.County.toLowerCase() + ",");
            });
        };

        ReadFile.prototype.getCountyLifeExpectancy = function getCountyLifeExpectancy(jsonData) {
            var self = this;
            jsonData.forEach(function (stateObject) {
                if (self.stateData.countyToLifeExpectancy.has(stateObject.County.toLowerCase())) {}
            });
        };

        return ReadFile;
    }()) || _class);
});
define('utilities/slider',["exports", "ion-rangeslider"], function (exports, _ionRangeslider) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.slider = undefined;

    var ionRangeSlider = _interopRequireWildcard(_ionRangeslider);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var slider = exports.slider = function () {
        function slider() {
            _classCallCheck(this, slider);
        }

        slider.prototype.createAgeSlider = function createAgeSlider() {
            $("#age").ionRangeSlider({
                grid: true,
                type: "double",
                min: 0,
                max: 100,
                from: 5,
                to: 95,
                step: 1,
                onFinish: function onFinish(data) {}
            });
        };

        return slider;
    }();
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
define('services/personalInfoData',['exports'], function (exports) {
    'use strict';

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
        this.state = 'alabama';
        this.county = 'autauga county';
    };
});
define('services/stateData',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var StateData = exports.StateData = function StateData() {
        _classCallCheck(this, StateData);

        this.stateSet = new Set();
        this.stateToCountyMap = new Map();
        this.countyToLifeExpectancy = new Map();
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
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"css/styles.css\"></require><br><div id=\"home\"><h1>Life Expectancy Calculator</h1></div><hr><router-view></router-view></template>"; });
define('text!css/styles.css', ['module'], function(module) { module.exports = "#home, h1, #clientorspouse, #submit {\r\n    text-align: center;\r\n    margin: 0 auto;\r\n    width: 500px;\r\n}\r\n    \r\n#personalinfo, #myhealth, #familyhealth, #occupation, #results {    \r\n    text-align: left;\r\n    margin: 0 auto;\r\n    width: 500px;\r\n}\r\n"; });
define('text!aboutyou/personalinfo.html', ['module'], function(module) { module.exports = "<template><require from=\"ion-rangeslider/css/ion.rangeSlider.css\"></require><require from=\"ion-rangeslider/css/ion.rangeSlider.skinHTML5.css\"></require><require from=\"ion-rangeslider/css/normalize.css\"></require><br><h1>Personal Information</h1><br><hr><form id=\"personalinfo\" submit.delegate=\"submit()\"><div id=\"client\"><h2 id=\"clientorspouse\">Client</h2><br><div class=\"form-group\"><label class=\"col-sm-4\" for=\"age\">Age:</label><input style=\"width:400px\" id=\"age\" class=\"col-sm-6\"></div><br><br><br><label class=\"col-sm-2\" for=\"gender\">Gender:</label><span id=\"space\"></span><div class=\"btn-group col-sm-6\" click.delegate=\"gender()\" data-toggle=\"buttons\"><label class=\"btn ${user.clientPersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Male</label><label class=\"btn ${!user.clientPersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Female</label></div><br><br><br><label class=\"col-sm-6\" for=\"checkspouse\">Do you have a spouse?</label><span id=\"space\"></span><div class=\"btn-group col-sm-4\" click.delegate=\"checkspouse()\" data-toggle=\"buttons\"><label class=\"btn ${user.clientPersonalInfo.checkspouse ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientPersonalInfo.checkspouse ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><div class=\"form-group\"><label for=\"state\">State</label><select class=\"form-control\" change.delegate=\"checkState()\" value.bind=\"user.clientPersonalInfo.state\"><option repeat.for=\"state of stateData.stateSet\">${state}</option></select></div><div class=\"form-group\"><label for=\"county\">County</label><select class=\"form-control\" value.bind=\"user.clientPersonalInfo.county\"><option repeat.for=\"county of currentCountyArray\">${county}</option></select></div><br><br><div class=\"form-group\"><label class=\"col-sm-2\" for=\"race\">Race:</label><select class=\"form-control col-sm-6\" style=\"width:400px\" value.bind=\"user.clientPersonalInfo.race\"><option data-hidden=\"true\">Please Select</option><option>White</option><option>Black</option><option>Hispanic</option><option>Asian</option></select></div><br><br><hr><div><h2 style=\"margin-top:50px\" class=\"col-sm-6\">Other Factors:</h2><div style=\"text-align:center\"><button class=\"btn btn-primary\" click.delegate=\"myhealth()\">My Health</button><br><br><button class=\"btn btn-primary\" click.delegate=\"familyhealth()\">My Family Health</button><br><br><button class=\"btn btn-primary\" click.delegate=\"occupation()\">My Occupation</button></div></div></div><hr><div id=\"spouse\" show.bind=\"user.clientPersonalInfo.checkspouse\"><h2 id=\"clientorspouse\">Co-Client</h2><hr></div><button id=\"submit\" type=\"submit\" class=\"btn btn-primary\">Submit</button></form></template>"; });
define('text!health/familyhealth.html', ['module'], function(module) { module.exports = "<template><div id=\"familyhealth\"><h1>Family Health</h1><button class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div></template>"; });
define('text!health/myhealth.html', ['module'], function(module) { module.exports = "<template><div id=\"myhealth\"><h1>My Health</h1><button class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div></template>"; });
define('text!occupation/occupation.html', ['module'], function(module) { module.exports = "<template><div id=\"occupation\"><h1>Occupation</h1><button class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div></template>"; });
define('text!results/results.html', ['module'], function(module) { module.exports = "<template><div id=\"results\"><h1>Results</h1><button class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div></template>"; });
//# sourceMappingURL=app-bundle.js.map