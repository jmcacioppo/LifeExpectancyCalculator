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
define('aboutyou/personalinfo',['exports', 'aurelia-framework', 'aurelia-router', '../services/user', '../services/stateData', 'ion-rangeslider', '../utilities/slider'], function (exports, _aureliaFramework, _aureliaRouter, _user, _stateData, _ionRangeslider, _slider) {
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

    var personalinfo = exports.personalinfo = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User, _stateData.StateData, _slider.Slider), _dec(_class = function () {
        function personalinfo(router, user, stateData, slider) {
            _classCallCheck(this, personalinfo);

            this.currentCountyArray = [];

            this.slider = slider;
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

        personalinfo.prototype.spousegender = function spousegender() {
            this.user.spousePersonalInfo.checkgender = !this.user.spousePersonalInfo.checkgender;
            this.user.spousePersonalInfo.gender = this.user.spousePersonalInfo.checkgender ? 'Male' : 'Female';
            console.log(this.user.clientPersonalInfo);
            console.log(this.user.spousePersonalInfo);
        };

        personalinfo.prototype.checkspouse = function checkspouse() {
            this.user.clientPersonalInfo.checkspouse = !this.user.clientPersonalInfo.checkspouse;
        };

        personalinfo.prototype.checkState = function checkState() {
            var state = this.user.clientPersonalInfo.state;
            var self = this;
            this.currentCountyArray = [];
            var countyWithLifeArrays = this.stateData.stateToCountyMap.get(state).split(',');
            countyWithLifeArrays.forEach(function (data) {
                var currentCountyInfo = data.split(":");
                self.currentCountyArray.push(currentCountyInfo[0]);
            });
            this.currentCountyArray.pop();
        };

        personalinfo.prototype.checkLifeExpectancy = function checkLifeExpectancy() {
            var self = this;
            var state = this.user.clientPersonalInfo.state;
            var countyWithLifeArrays = this.stateData.stateToCountyMap.get(state).split(',');
            countyWithLifeArrays.forEach(function (data) {
                var currentCountyInfo = data.split(":");

                var lifeExpectancy = self.user.clientPersonalInfo.checkgender ? currentCountyInfo[2] : currentCountyInfo[1];

                if (currentCountyInfo[0].indexOf(self.user.clientPersonalInfo.county) != -1) {
                    self.user.clientPersonalInfo.lifeExpectancy = self.user.clientPersonalInfo.checkgender ? currentCountyInfo[1] : currentCountyInfo[2];
                }
            });
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
            this.slider.createAgeSlider();
        };

        return personalinfo;
    }()) || _class);
});
define('health/familyhealth',['exports', 'aurelia-framework', 'aurelia-router', '../services/user', '../utilities/calculateFamilyHealth'], function (exports, _aureliaFramework, _aureliaRouter, _user, _calculateFamilyHealth) {
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

    var familyhealth = exports.familyhealth = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User, _calculateFamilyHealth.CalculateFamilyHealth), _dec(_class = function () {
        function familyhealth(router, user, calculateFamilyHealth) {
            _classCallCheck(this, familyhealth);

            this.router = router;
            this.user = user;
            this.calculateFamilyHealth = calculateFamilyHealth;
        }

        familyhealth.prototype.back = function back() {
            this.router.navigate('#/personalinfo');
        };

        familyhealth.prototype.submit = function submit() {
            this.router.navigate('#/personalinfo');
        };

        return familyhealth;
    }()) || _class);
});
define('health/myhealth',['exports', 'aurelia-framework', 'aurelia-router', '../services/user', '../utilities/calculateMyHealth'], function (exports, _aureliaFramework, _aureliaRouter, _user, _calculateMyHealth) {
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

    var myhealth = exports.myhealth = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User, _calculateMyHealth.CalculateMyHealth), _dec(_class = function () {
        function myhealth(router, user, calculateMyHealth) {
            _classCallCheck(this, myhealth);

            this.heightError = "";
            this.validHeight = false;

            this.calculateMyHealth = calculateMyHealth;
            this.router = router;
            this.user = user;
        }

        myhealth.prototype.checkHeight = function checkHeight() {
            console.log(this.user.clientMyHealth.height);
            var valid = /^[2-9]' ?(?:\d|1[0-1])"?$/.test(this.user.clientMyHealth.height);
            this.validHeight = !valid;
            this.heightError = valid ? "" : "has-error";
        };

        myhealth.prototype.back = function back() {
            console.log(this.user.clientMyHealth);
            this.router.navigate('#/personalinfo');
        };

        myhealth.prototype.submit = function submit() {
            this.calculateMyHealth.calculateBMI();
            console.log(this.user.clientMyHealth);
            this.router.navigate('#/personalinfo');
        };

        return myhealth;
    }()) || _class);
});
define('occupation/occupation',['exports', 'aurelia-framework', 'aurelia-router', '../services/user', '../utilities/calculateOccupation'], function (exports, _aureliaFramework, _aureliaRouter, _user, _calculateOccupation) {
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

    var occupation = exports.occupation = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User, _calculateOccupation.CalculateOccupation), _dec(_class = function () {
        function occupation(router, user, calculateOccupation) {
            _classCallCheck(this, occupation);

            this.router = router;
            this.user = user;
            this.calculateOccupation = calculateOccupation;
        }

        occupation.prototype.back = function back() {
            this.router.navigate('#/personalinfo');
        };

        occupation.prototype.submit = function submit() {
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
        this.bmi;
        this.healthRank;
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
define('services/personalInfoData',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.PersonalInfoData = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var PersonalInfoData = exports.PersonalInfoData = (_dec = (0, _aureliaFramework.transient)(), _dec(_class = function PersonalInfoData() {
        _classCallCheck(this, PersonalInfoData);

        this.age;
        this.checkgender = true;
        this.gender;
        this.race;
        this.checkspouse = false;
        this.state = 'alabama';
        this.county = 'autauga county';
        this.countyLifeExpectancy;
    }) || _class);
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
define('utilities/calculateFamilyHealth',['exports', 'aurelia-framework', '../services/user'], function (exports, _aureliaFramework, _user) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.CalculateFamilyHealth = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var CalculateFamilyHealth = exports.CalculateFamilyHealth = (_dec = (0, _aureliaFramework.inject)(_user.User), _dec(_class = function CalculateFamilyHealth(user) {
        _classCallCheck(this, CalculateFamilyHealth);

        this.user = user;
    }) || _class);
});
define('utilities/calculateMyHealth',['exports', 'aurelia-framework', '../services/user'], function (exports, _aureliaFramework, _user) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.CalculateMyHealth = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var CalculateMyHealth = exports.CalculateMyHealth = (_dec = (0, _aureliaFramework.inject)(_user.User), _dec(_class = function () {
        function CalculateMyHealth(user) {
            _classCallCheck(this, CalculateMyHealth);

            this.user = user;
        }

        CalculateMyHealth.prototype.calculateBMI = function calculateBMI() {
            var metricWeight = this.user.clientMyHealth.weight * 0.45;
            var metricHeight = this.user.clientMyHealth.height * 0.025;
            var metricHeightSquared = metricHeight * metricHeight;
            this.user.clientMyHealth.bmi = metricWeight / metricHeightSquared;
        };

        return CalculateMyHealth;
    }()) || _class);
});
define('utilities/calculateOccupation',['exports', 'aurelia-framework', '../services/user'], function (exports, _aureliaFramework, _user) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.CalculateOccupation = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var CalculateOccupation = exports.CalculateOccupation = (_dec = (0, _aureliaFramework.inject)(_user.User), _dec(_class = function CalculateOccupation(user) {
        _classCallCheck(this, CalculateOccupation);

        this.user = user;
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

                    existingValues += " " + stateObject.County.toLowerCase() + ":" + stateObject.Male + ":" + stateObject.Female + ",";
                    self.stateData.stateToCountyMap.set(stateObject.State.toLowerCase(), existingValues);
                } else self.stateData.stateToCountyMap.set(stateObject.State.toLowerCase(), stateObject.County.toLowerCase() + ":" + stateObject.Male + ":" + stateObject.Female + ",");
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
define('utilities/slider',['exports', 'aurelia-framework', '../services/user', 'ion-rangeslider'], function (exports, _aureliaFramework, _user, _ionRangeslider) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Slider = undefined;

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

    var Slider = exports.Slider = (_dec = (0, _aureliaFramework.inject)(_user.User), _dec(_class = function () {
        function Slider(user) {
            _classCallCheck(this, Slider);

            this.user = user;
        }

        Slider.prototype.createAgeSlider = function createAgeSlider() {
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

            $("#spouseage").ionRangeSlider({
                grid: true,
                min: 0,
                max: 100,
                from: 30,
                step: 1,
                onFinish: function onFinish(data) {
                    _this.user.spousePersonalInfo.age = data.from;
                }
            });
        };

        return Slider;
    }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"css/styles.css\"></require><div id=\"app\"><div id=\"content\"><div id=\"home\"><h1 style=\"font-size:36px;text-align:center\"><b>Life Expectancy Calculator<b></b></b></h1></div><hr><router-view></router-view></div><br><br><br><footer id=\"footer\"><div class=\"footer-copyright\"><div class=\"container-fluid\"><br>©2017, PIEtech, Inc. All rights reserved.</div></div></footer></div></template>"; });
define('text!css/styles.css', ['module'], function(module) { module.exports = ".hasSpouse {\r\n\twidth: 45%;\r\n\tfloat: left;\r\n}\r\n\r\n.noSpouse {\r\n\twidth: 100%;\r\n\tfloat: none;\r\n}\r\n\r\n.additional-information-container {\r\n\tclear: both;\r\n\tmargin: 0 auto;\r\n\twidth: 600px;\r\n}\r\n\r\n/*========================BACK BUTTON========================*/\r\n#back-button-div {\r\n\tmargin: 0 auto;\r\n    bottom: 0;\r\n}\r\n\r\n#back {\r\n\tmargin: 0 auto;\r\n    bottom: 0;\r\n}\r\n\r\n/*========================SUBMIT BUTTON========================*/\r\n#submit-button-div-home {\r\n\tmargin: 0 auto;\r\n    bottom: 0;\r\n\tmargin-left: 46%;\r\n}\r\n\r\n#submit-button-div {\r\n\tmargin: 0 auto;\r\n    bottom: 0;\r\n}\r\n\r\n#submit {\r\n\tmargin: 0 auto;\r\n    bottom: 0;\r\n}\r\n\r\n#personalinfo, #myhealth, #familyhealth, #occupation, #results {    \r\n    margin: 0 auto;\r\n    width: 1000px;\r\n}\r\n\r\n/*===========================FOOTER STYLING==========================*/\r\nhtml, body {\r\n\tmargin:0;\r\n\tpadding:0;\r\n\theight:100%;\r\n}\r\n\r\n#app {\r\n\tmin-height:100%;\r\n\tposition:relative;\r\n}\r\n\r\n#content {\r\n\tpadding-bottom:100px; /* Height of the footer element */\r\n}\r\n\r\n#footer {\r\n\tclear: both;\r\n\tbackground:#ededed;\r\n\twidth:100%;\r\n\theight:60px;\r\n\tposition:absolute;\r\n\tbottom:0;\r\n\tleft:0;\r\n    text-align: center;\r\n}\r\n/*============================END FOOTER STYLING===========================*/"; });
define('text!aboutyou/personalinfo.html', ['module'], function(module) { module.exports = "<template><require from=\"ion-rangeslider/css/ion.rangeSlider.css\"></require><require from=\"ion-rangeslider/css/ion.rangeSlider.skinHTML5.css\"></require><require from=\"ion-rangeslider/css/normalize.css\"></require><form id=\"personalinfo\" submit.delegate=\"submit()\"><div style=\"margin-left:38.5%\"><label style=\"padding-right:10px\" for=\"checkspouse\">Do you have a spouse?</label><div class=\"btn-group\" click.delegate=\"checkspouse()\" data-toggle=\"buttons\"><label class=\"btn ${user.clientPersonalInfo.checkspouse ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientPersonalInfo.checkspouse ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><div id=\"client-spouse-container\"><div id=\"client\" class=\"${user.clientPersonalInfo.checkspouse ? 'hasSpouse' : 'noSpouse'}\"><h2 id=\"clientorspouse\" style=\"text-align:center\">Client</h2><div class=\"form-group\"><label for=\"age\">Age:</label><input style=\"width:400px\" id=\"age\"></div><label style=\"padding-right:10px\" for=\"gender\">Gender:</label><div class=\"btn-group\" click.delegate=\"gender()\" data-toggle=\"buttons\"><label class=\"btn ${user.clientPersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Male</label><label class=\"btn ${!user.clientPersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Female</label></div><br><br><br><div class=\"form-group\"><label for=\"race\">Race</label><select class=\"form-control\" value.bind=\"user.clientPersonalInfo.race\"><option data-hidden=\"true\">Please Select</option><option>White</option><option>Black</option><option>Hispanic</option><option>Asian</option></select></div><div class=\"form-group\"><label for=\"state\">State</label><select class=\"form-control\" change.delegate=\"checkState()\" value.bind=\"user.clientPersonalInfo.state\"><option repeat.for=\"state of stateData.stateSet\">${state}</option></select></div><div class=\"form-group\"><label for=\"county\">County</label><select class=\"form-control\" change.delegate=\"checkLifeExpectancy()\" value.bind=\"user.clientPersonalInfo.county\"><option repeat.for=\"county of currentCountyArray\">${county}</option></select></div></div><div id=\"spouse\" style=\"width:45%;float:right;text-align:center\" show.bind=\"user.clientPersonalInfo.checkspouse\"><h2 id=\"clientorspouse\">Co-Client</h2><div class=\"form-group\"><label for=\"age\">Age:</label><input style=\"width:400px\" id=\"spouseage\"></div><label style=\"padding-right:10px\" for=\"gender\">Gender:</label><div class=\"btn-group\" click.delegate=\"spousegender()\" data-toggle=\"buttons\"><label class=\"btn ${user.spousePersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Male</label><label class=\"btn ${!user.spousePersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Female</label></div><br><br><br><div class=\"form-group\"><label for=\"race\">Race</label><select class=\"form-control\" value.bind=\"user.spousePersonalInfo.race\"><option data-hidden=\"true\">Please Select</option><option>White</option><option>Black</option><option>Hispanic</option><option>Asian</option></select></div><div class=\"form-group\"><label for=\"state\">State</label><select class=\"form-control\" change.delegate=\"checkState()\" value.bind=\"user.spousePersonalInfo.state\"><option repeat.for=\"state of stateData.stateSet\">${state}</option></select></div><div class=\"form-group\"><label for=\"county\">County</label><select class=\"form-control\" change.delegate=\"checkLifeExpectancy()\" value.bind=\"user.spousePersonalInfo.county\"><option repeat.for=\"county of currentCountyArray\">${county}</option></select></div></div></div><hr style=\"clear:both\"><div class=\"additional-information-container\"><h1 style=\"text-align:center\">Input More Information:</h1><div style=\"margin:0 auto\"><button style=\"float:left\" class=\"btn btn-primary col-md-3\" click.delegate=\"myhealth()\">My Health</button> <button style=\"margin-left:12.5%\" class=\"btn btn-primary col-md-3\" click.delegate=\"familyhealth()\">My Family Health</button> <button style=\"float:right\" class=\"btn btn-primary col-md-3\" click.delegate=\"occupation()\">My Occupation</button></div></div><br><br><hr style=\"clear:both\"><div id=\"submit-button-div-home\"><button id=\"submit\" type=\"submit\" class=\"btn btn-primary\">Submit</button></div></form></template>"; });
define('text!health/familyhealth.html', ['module'], function(module) { module.exports = "<template><form id=\"familyhealth\" submit.delegate=\"submit()\"><h1>Family Health</h1><button class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button> <button class=\"btn btn-primary\" type=\"submit\">Submit</button></form></template>"; });
define('text!health/myhealth.html', ['module'], function(module) { module.exports = "<template><form id=\"myhealth\" submit.delegate=\"submit()\"><div class=\"${user.clientPersonalInfo.checkspouse ? 'hasSpouse' : 'noSpouse'}\"><h1>My Health - Client</h1><div show.bind=\"validHeight\" class=\"alert alert-danger\" role=\"alert\"><strong>Uh oh!</strong> Please be sure to enter a valid height in the format: feet ' inches.</div><div class=\"form-group ${heightError}\"><label for=\"height\">Height</label><input type=\"text\" value.bind=\"user.clientMyHealth.height\" class=\"form-control\" placeholder=\"5'7\" change.trigger=\"checkHeight()\"></div><div class=\"form-group\"><label for=\"weight\">Weight</label><input type=\"text\" value.bind=\"user.clientMyHealth.weight\" class=\"form-control\" placeholder=\"155\"></div><div class=\"form-group\"><label for=\"healthRank\">How would you rank your health?</label><select class=\"form-control\" value.bind=\"user.clientMyHealth.healthRank\"><option data-hidden=\"true\">Please Select</option><option>Excellent</option><option>Good</option><option>Average</option><option>Bad</option><option>Terrible</option></select></div></div><div id=\"spouse\" style=\"width:45%;float:right;text-align:center\" show.bind=\"user.clientPersonalInfo.checkspouse\"><h1>My Health - Co-Client</h1><div class=\"form-group\"><label for=\"height\">Height</label><input type=\"text\" value.bind=\"user.spouseMyHealth.height\" class=\"form-control\" placeholder=\"5'7\"></div><div class=\"form-group\"><label for=\"weight\">Weight</label><input type=\"text\" value.bind=\"user.spouseMyHealth.weight\" class=\"form-control\" placeholder=\"155\"></div><div class=\"form-group\"><label for=\"healthRank\">How would you rank your health?</label><select class=\"form-control\" value.bind=\"user.spouseMyHealth.healthRank\"><option data-hidden=\"true\">Please Select</option><option>Excellent</option><option>Good</option><option>Average</option><option>Bad</option><option>Terrible</option></select></div></div><hr style=\"clear:both\"><div id=\"back-button-div\" class=\"col-md-10\"><button id=\"back\" class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div><div id=\"submit-button-div\" class=\"col-md-2\"><button id=\"submit\" type=\"submit\" class=\"btn btn-primary\">Submit</button></div></form></template>"; });
define('text!occupation/occupation.html', ['module'], function(module) { module.exports = "<template><form id=\"occupation\" submit.delegate=\"submit()\"><h1>Occupation</h1><button class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button> <button class=\"btn btn-primary\" type=\"submit\">Submit</button></form></template>"; });
define('text!results/results.html', ['module'], function(module) { module.exports = "<template><div id=\"results\"><h1>Results</h1><button class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div></template>"; });
//# sourceMappingURL=app-bundle.js.map