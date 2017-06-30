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
define('aboutyou/personalinfo',['exports', 'aurelia-framework', 'aurelia-router', '../services/user', '../services/stateData', 'ion-rangeslider', '../utilities/slider', '../utilities/calculateResults'], function (exports, _aureliaFramework, _aureliaRouter, _user, _stateData, _ionRangeslider, _slider, _calculateResults) {
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

    var personalinfo = exports.personalinfo = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User, _stateData.StateData, _slider.Slider, _calculateResults.CalculateResults), _dec(_class = function () {
        function personalinfo(router, user, stateData, slider, calculateResults) {
            _classCallCheck(this, personalinfo);

            this.currentCountyArray = [];

            this.slider = slider;
            this.router = router;
            this.user = user;
            this.stateData = stateData;
            this.calculateResults = calculateResults;
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
            if (state != "Please Select") {
                var self = this;
                this.currentCountyArray = [];
                var countyWithLifeArrays = this.stateData.stateToCountyMap.get(state).split(',');
                countyWithLifeArrays.forEach(function (data) {
                    var currentCountyInfo = data.split(":");
                    self.currentCountyArray.push(currentCountyInfo[0]);
                });
                this.currentCountyArray.pop();
            } else this.user.clientPersonalInfo.county = "Please Select";
        };

        personalinfo.prototype.checkLifeExpectancy = function checkLifeExpectancy() {
            if (this.user.clientPersonalInfo.county != "Please Select") {
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
            }
        };

        personalinfo.prototype.checkStateSpouse = function checkStateSpouse() {
            var state = this.user.spousePersonalInfo.state;
            if (state != "Please Select") {
                var self = this;
                this.currentCountyArray = [];
                var countyWithLifeArrays = this.stateData.stateToCountyMap.get(state).split(',');
                countyWithLifeArrays.forEach(function (data) {
                    var currentCountyInfo = data.split(":");
                    self.currentCountyArray.push(currentCountyInfo[0]);
                });
                this.currentCountyArray.pop();
            } else this.user.spousePersonalInfo.county = "Please Select";
        };

        personalinfo.prototype.checkLifeExpectancySpouse = function checkLifeExpectancySpouse() {
            if (this.user.spousePersonalInfo.county != "Please Select") {
                var self = this;
                var state = this.user.spousePersonalInfo.state;
                var countyWithLifeArrays = this.stateData.stateToCountyMap.get(state).split(',');
                countyWithLifeArrays.forEach(function (data) {
                    var currentCountyInfo = data.split(":");

                    var lifeExpectancy = self.user.spousePersonalInfo.checkgender ? currentCountyInfo[2] : currentCountyInfo[1];

                    if (currentCountyInfo[0].indexOf(self.user.spousePersonalInfo.county) != -1) {
                        self.user.spousePersonalInfo.lifeExpectancy = self.user.spousePersonalInfo.checkgender ? currentCountyInfo[1] : currentCountyInfo[2];
                    }
                });
            }
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
            this.calculateResults.getLifeTableData(this.user);
            this.router.navigate('#/results');
        };

        personalinfo.prototype.attached = function attached() {
            this.slider.createAgeSlider();
        };

        return personalinfo;
    }()) || _class);
});
<<<<<<< HEAD
define('health/familyhealth',['exports', 'aurelia-framework', 'aurelia-router', '../services/user', '../utilities/calculateFamilyHealth', '../utilities/slider'], function (exports, _aureliaFramework, _aureliaRouter, _user, _calculateFamilyHealth, _slider) {
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

    var familyhealth = exports.familyhealth = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User, _calculateFamilyHealth.CalculateFamilyHealth, _slider.Slider), _dec(_class = function () {
        function familyhealth(router, user, calculateFamilyHealth, slider) {
            _classCallCheck(this, familyhealth);

            this.router = router;
            this.user = user;
            this.calculateFamilyHealth = calculateFamilyHealth;
            this.slider = slider;
        }

        familyhealth.prototype.heartdisease = function heartdisease() {
            this.user.clientFamilyHealth.checkHeartDisease = !this.user.clientFamilyHealth.checkHeartDisease;
        };

        familyhealth.prototype.spouseheartdisease = function spouseheartdisease() {
            this.user.spouseFamilyHealth.checkHeartDisease = !this.user.spouseFamilyHealth.checkHeartDisease;
        };

        familyhealth.prototype.cancer = function cancer() {
            this.user.clientFamilyHealth.checkCancer = !this.user.clientFamilyHealth.checkCancer;
        };
=======
define('health/familyhealth',['exports', 'aurelia-framework', 'aurelia-router', '../services/user', '../utilities/calculateFamilyHealth'], function (exports, _aureliaFramework, _aureliaRouter, _user, _calculateFamilyHealth) {
    'use strict';
>>>>>>> b80daee133f0e03f1582f8afc4a42c0d70b195eb

        familyhealth.prototype.spousecancer = function spousecancer() {
            this.user.spouseFamilyHealth.checkCancer = !this.user.spouseFamilyHealth.checkCancer;
        };

        familyhealth.prototype.mentalhealth = function mentalhealth() {
            this.user.clientFamilyHealth.checkMentalHealth = !this.user.clientFamilyHealth.checkMentalHealth;
        };

        familyhealth.prototype.spousementalhealth = function spousementalhealth() {
            this.user.spouseFamilyHealth.checkMentalHealth = !this.user.spouseFamilyHealth.checkMentalHealth;
        };

        familyhealth.prototype.diabetes = function diabetes() {
            this.user.clientFamilyHealth.checkDiabetes = !this.user.clientFamilyHealth.checkDiabetes;
        };

        familyhealth.prototype.spousediabetes = function spousediabetes() {
            this.user.spouseFamilyHealth.checkDiabetes = !this.user.spouseFamilyHealth.checkDiabetes;
        };

        familyhealth.prototype.back = function back() {
            this.router.navigate('#/personalinfo');
        };

        familyhealth.prototype.submit = function submit() {
            this.router.navigate('#/personalinfo');
        };

        familyhealth.prototype.attached = function attached() {
            this.slider.createLifeExpectancySlider();
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
            this.validHeightSpouse = false;

            this.calculateMyHealth = calculateMyHealth;
            this.router = router;
            this.user = user;
        }

        myhealth.prototype.checkHeight = function checkHeight() {
            var valid = /^[2-9]' ?(?:\d|1[0-1])"?$/.test(this.user.clientMyHealth.height);
            this.validHeight = !valid;
            this.heightError = valid ? "" : "has-error";
            if (valid) {
                var feetAndInches = this.user.clientMyHealth.height.split("'");
                this.user.clientMyHealth.heightInInches = parseInt(feetAndInches[0]) * 12 + parseInt(feetAndInches[1]);
            }
            console.log(this.user.clientMyHealth.heightInInches);
        };

        myhealth.prototype.checkHeightSpouse = function checkHeightSpouse() {
            console.log(this.user.spouseMyHealth.height);
            var valid = /^[2-9]' ?(?:\d|1[0-1])"?$/.test(this.user.spouseMyHealth.height);
            this.validHeightSpouse = !valid;
            this.heightErrorSpouse = valid ? "" : "has-error";
            if (valid) {
                var feetAndInches = this.user.spouseMyHealth.height.split("'");
                this.user.spouseMyHealth.heightInInches = parseInt(feetAndInches[0]) * 12 + parseInt(feetAndInches[1]);
            }
            console.log(this.user.spouseMyHealth.heightInInches);
        };

        myhealth.prototype.smoking = function smoking() {
            this.user.clientMyHealth.checksmoking = !this.user.clientMyHealth.checksmoking;
        };

        myhealth.prototype.smokingSpouse = function smokingSpouse() {
            this.user.spouseMyHealth.checksmoking = !this.user.spouseMyHealth.checksmoking;
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

<<<<<<< HEAD
        occupation.prototype.education = function education() {
            this.user.clientOccupation.checkEducation = !this.user.clientOccupation.checkEducation;
        };

        occupation.prototype.spouseeducation = function spouseeducation() {
            this.user.spouseOccupation.checkEducation = !this.user.spouseOccupation.checkEducation;
        };

        occupation.prototype.construction = function construction() {
            this.user.clientOccupation.checkConstruction = !this.user.clientOccupation.checkConstruction;
        };

        occupation.prototype.spouseconstruction = function spouseconstruction() {
            this.user.spouseOccupation.checkConstruction = !this.user.spouseOccupation.checkConstruction;
        };

        occupation.prototype.emergencyResponding = function emergencyResponding() {
            this.user.clientOccupation.checkEmergencyResponding = !this.user.clientOccupation.checkEmergencyResponding;
        };

        occupation.prototype.spouseemergencyResponding = function spouseemergencyResponding() {
            this.user.spouseOccupation.checkEmergencyResponding = !this.user.spouseOccupation.checkEmergencyResponding;
        };

=======
>>>>>>> b80daee133f0e03f1582f8afc4a42c0d70b195eb
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
<<<<<<< HEAD
define('results/results',['exports', 'aurelia-framework', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaRouter) {
=======
define('results/results',['exports', 'aurelia-framework', 'aurelia-router', '../services/user', '../utilities/chart'], function (exports, _aureliaFramework, _aureliaRouter, _user, _chart) {
>>>>>>> b80daee133f0e03f1582f8afc4a42c0d70b195eb
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

<<<<<<< HEAD
    var results = exports.results = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function () {
        function results(router) {
            _classCallCheck(this, results);

            this.router = router;
        }

=======
    var results = exports.results = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User, _chart.Chart), _dec(_class = function () {
        function results(router, user, chart) {
            _classCallCheck(this, results);

            this.router = router;
            this.user = user;
            this.chart = chart;
        }

        results.prototype.attached = function attached() {
            this.chart.createChart('chart-container');
        };

>>>>>>> b80daee133f0e03f1582f8afc4a42c0d70b195eb
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

        this.familyLifeExpectancy = 70;
        this.checkHeartDisease = false;
        this.checkCancer = false;
        this.checkMentalHealth = false;
        this.checkDiabetes = false;
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
        this.heightInInches;
        this.weight;
        this.bmi;

        this.exercisePerWeek;
        this.sleepPerWeek;
        this.healthRank;

        this.alcoholPerWeek;
        this.checksmoking;
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

        this.checkEducation = false;
        this.checkConstruction = false;
        this.checkEmergencyResponding = false;
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

        this.checkspouse = false;

        this.age = 30;
        this.checkgender = true;
        this.gender = 'male';
        this.race = 'white';
        this.maritalStatus;

        this.state = "Please Select";
        this.county = 'Please Select';
        this.countyLifeExpectancy;
        this.expectedYearsLeft;
        this.testTuples = [];
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
            var metricHeight = this.user.clientMyHealth.heightInInches * 0.025;
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
define('utilities/chart',['exports', 'aurelia-framework', 'highcharts', '../services/user'], function (exports, _aureliaFramework, _highcharts, _user) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Chart = undefined;

    var HighCharts = _interopRequireWildcard(_highcharts);

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

    var Chart = exports.Chart = (_dec = (0, _aureliaFramework.inject)(_user.User), _dec(_class = function () {
        function Chart(user) {
            _classCallCheck(this, Chart);

            this.user = user;
        }

        Chart.prototype.createChart = function createChart(containerID) {
            console.log(this.user.clientPersonalInfo.testTuples);
            Highcharts.chart(containerID, {
                title: {
                    text: 'Life Expectancy'
                },
                xAxis: {
                    title: {
                        text: 'Age'
                    }
                },
                plotOptions: {
                    series: {
                        pointStart: this.user.clientPersonalInfo.age
                    }
                },
                yAxis: {
                    title: {
                        text: 'Probability'
                    }
                },
                series: [{
                    name: 'Client',
                    data: this.user.clientPersonalInfo.testTuples
                }, {
                    name: 'Co-client',
                    data: this.user.clientPersonalInfo.testTuples
                }, {
                    name: 'Average',
                    data: this.user.clientPersonalInfo.testTuples
                }]
            });
        };

        return Chart;
    }()) || _class);
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

        Slider.prototype.createLifeExpectancySlider = function createLifeExpectancySlider() {
            var _this2 = this;

            $('#familyLifeExpectancy').ionRangeSlider({
                grid: true,
                min: 0,
                max: 100,
                from: 70,
                step: 1,
                onFinish: function onFinish(data) {
                    _this2.user.clientFamilyHealth.familyLifeExpectancy = data.from;
                }
            });

            $('#spousefamilyLifeExpectancy').ionRangeSlider({
                grid: true,
                min: 0,
                max: 100,
                from: 70,
                step: 1,
                onFinish: function onFinish(data) {
                    _this2.user.spouseFamilyHealth.familyLifeExpectancy = data.from;
                }
            });
        };

        return Slider;
    }()) || _class);
});
define('utilities/calculateResults',['exports', 'aurelia-framework', 'aurelia-fetch-client', '../services/user'], function (exports, _aureliaFramework, _aureliaFetchClient, _user) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.CalculateResults = undefined;

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

    var CalculateResults = exports.CalculateResults = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _user.User), _dec(_class = function () {
        function CalculateResults(httpClient, user) {
            _classCallCheck(this, CalculateResults);

            this.httpClient = httpClient;
            this.user = user;
        }

        CalculateResults.prototype.getLifeTableData = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user) {
                var data, data2;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.httpClient.fetch('/api/life-table/' + user.clientPersonalInfo.race.toLowerCase() + '-' + user.clientPersonalInfo.gender.toLowerCase() + '.json');

                            case 2:
                                data = _context.sent;
                                _context.next = 5;
                                return data.json();

                            case 5:
                                data2 = _context.sent;

                                this.setUserExpectedAge(data2, user);
                                this.getTestTuples(data2);

                            case 8:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getLifeTableData(_x) {
                return _ref.apply(this, arguments);
            }

            return getLifeTableData;
        }();

        CalculateResults.prototype.setUserExpectedAge = function setUserExpectedAge(data, user) {
            data.forEach(function (value) {
                var currentAgeArray = [];
                currentAgeArray[0] = parseInt(value.Age.slice(0, 2));
                currentAgeArray[1] = parseInt(value.Age.slice(3, 5));
                if (currentAgeArray[0] === user.clientPersonalInfo.age || currentAgeArray[1] === user.clientPersonalInfo.age) {
                    user.clientPersonalInfo.expectedYearsLeft = parseInt(value.ExpectedAge);
                }
            });
        };

        CalculateResults.prototype.averageLifeExpectancy = function averageLifeExpectancy() {
            var averagedLifeExpectancy = (this.user.clientPersonalInfo.expectedYearsLeft + this.user.clientPersonalInfo.age + this.user.clientPersonalInfo.ageAndRaceLifeExpectancy) / 2;
        };

        CalculateResults.prototype.getTestTuples = function getTestTuples(jsonData) {
            var self = this;
            var tempArr = [];
            jsonData.forEach(function (value) {
                tempArr.push([value.Age, 1 - value.Probability]);
            });
            this.user.clientPersonalInfo.testTuples = tempArr;
        };

        return CalculateResults;
    }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"css/styles.css\"></require><div id=\"app\"><div id=\"content\"><div id=\"home\"><h1 style=\"font-size:36px;text-align:center\"><b>Life Expectancy Calculator<b></b></b></h1></div><hr><router-view></router-view></div><br><br><br><footer id=\"footer\"><div class=\"footer-copyright\"><div class=\"container-fluid\"><br>©2017, PIEtech, Inc. All rights reserved.</div></div></footer></div></template>"; });
define('text!css/styles.css', ['module'], function(module) { module.exports = ".hasSpouse {\r\n\twidth: 45%;\r\n\tfloat: left;\r\n}\r\n\r\n.noSpouse {\r\n\twidth: 100%;\r\n\tfloat: none;\r\n}\r\n\r\n.additional-information-container {\r\n\tclear: both;\r\n\tmargin: 0 auto;\r\n\twidth: 600px;\r\n}\r\n\r\n/*========================BACK BUTTON========================*/\r\n#back-button-div {\r\n\tmargin: 0 auto;\r\n    bottom: 0;\r\n}\r\n\r\n#back {\r\n\tmargin: 0 auto;\r\n    bottom: 0;\r\n}\r\n\r\n/*========================SUBMIT BUTTON========================*/\r\n#submit-button-div-home {\r\n\tmargin: 0 auto;\r\n    bottom: 0;\r\n\tmargin-left: 46%;\r\n}\r\n\r\n#submit-button-div {\r\n\tmargin: 0 auto;\r\n    bottom: 0;\r\n}\r\n\r\n#submit {\r\n\tmargin: 0 auto;\r\n    bottom: 0;\r\n}\r\n\r\n#personalinfo, #myhealth, #familyhealth, #occupation, #results {    \r\n    margin: 0 auto;\r\n    width: 1000px;\r\n}\r\n\r\n/*===========================FOOTER STYLING==========================*/\r\nhtml, body {\r\n\tmargin:0;\r\n\tpadding:0;\r\n\theight:100%;\r\n}\r\n\r\n#app {\r\n\tmin-height:100%;\r\n\tposition:relative;\r\n}\r\n\r\n#content {\r\n\tpadding-bottom:100px; /* Height of the footer element */\r\n}\r\n\r\n#footer {\r\n\tclear: both;\r\n\tbackground:#ededed;\r\n\twidth:100%;\r\n\theight:60px;\r\n\tposition:absolute;\r\n\tbottom:0;\r\n\tleft:0;\r\n    text-align: center;\r\n}\r\n/*============================END FOOTER STYLING===========================*/"; });
<<<<<<< HEAD
define('text!aboutyou/personalinfo.html', ['module'], function(module) { module.exports = "<template><require from=\"ion-rangeslider/css/ion.rangeSlider.css\"></require><require from=\"ion-rangeslider/css/ion.rangeSlider.skinHTML5.css\"></require><require from=\"ion-rangeslider/css/normalize.css\"></require><form id=\"personalinfo\" submit.delegate=\"submit()\"><div style=\"margin-left:38.5%\"><label style=\"padding-right:10px\" for=\"checkspouse\">Do you have a spouse?</label><div class=\"btn-group\" click.delegate=\"checkspouse()\" data-toggle=\"buttons\"><label class=\"btn ${user.clientPersonalInfo.checkspouse ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientPersonalInfo.checkspouse ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><div id=\"client-spouse-container\"><div id=\"client\" class=\"${user.clientPersonalInfo.checkspouse ? 'hasSpouse' : 'noSpouse'}\"><h2 id=\"clientorspouse\" style=\"text-align:center\">Client</h2><div class=\"form-group\"><label for=\"age\">Age:</label><input style=\"width:400px\" id=\"age\"></div><label style=\"padding-right:10px\" for=\"gender\">Gender:</label><div class=\"btn-group\" click.delegate=\"gender()\" data-toggle=\"buttons\"><label class=\"btn ${user.clientPersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Male</label><label class=\"btn ${!user.clientPersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Female</label></div><br><br><br><div class=\"form-group\"><label for=\"race\">Race</label><select class=\"form-control\" value.bind=\"user.clientPersonalInfo.race\"><option>White</option><option>Black</option><option>Hispanic</option><option>Asian</option></select></div><div class=\"form-group\"><label for=\"race\">Marital Status</label><select class=\"form-control\" value.bind=\"user.clientPersonalInfo.maritalStatus\"><option>Please Select</option><option>Never Married</option><option>Cohabitated</option><option>Married</option><option>Divorced</option></select></div><div class=\"form-group\"><label for=\"state\">State</label><select class=\"form-control\" change.delegate=\"checkState()\" value.bind=\"user.clientPersonalInfo.state\"><option>Please Select</option><option repeat.for=\"state of stateData.stateSet\">${state}</option></select></div><div class=\"form-group\"><label for=\"county\">County</label><select class=\"form-control\" change.delegate=\"checkLifeExpectancy()\" value.bind=\"user.clientPersonalInfo.county\"><option>Please Select</option><option repeat.for=\"county of currentCountyArray\">${county}</option></select></div></div><div id=\"spouse\" style=\"width:45%;float:right\" show.bind=\"user.clientPersonalInfo.checkspouse\"><h2 style=\"text-align:center\">Co-Client</h2><div class=\"form-group\"><label for=\"age\">Age:</label><input style=\"width:400px\" id=\"spouseage\"></div><label style=\"padding-right:10px\" for=\"gender\">Gender:</label><div class=\"btn-group\" click.delegate=\"spousegender()\" data-toggle=\"buttons\"><label class=\"btn ${user.spousePersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Male</label><label class=\"btn ${!user.spousePersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Female</label></div><br><br><br><div class=\"form-group\"><label for=\"race\">Race</label><select class=\"form-control\" value.bind=\"user.spousePersonalInfo.race\"><option>White</option><option>Black</option><option>Hispanic</option><option>Asian</option></select></div><div class=\"form-group\"><label for=\"race\">Marital Status</label><select class=\"form-control\" value.bind=\"user.spousePersonalInfo.maritalStatus\"><option>Please Select</option><option>Never Married</option><option>Cohabitated</option><option>Married</option><option>Divorced</option></select></div><div class=\"form-group\"><label for=\"state\">State</label><select class=\"form-control\" change.delegate=\"checkStateSpouse()\" value.bind=\"user.spousePersonalInfo.state\"><option>Please Select</option><option repeat.for=\"state of stateData.stateSet\">${state}</option></select></div><div class=\"form-group\"><label for=\"county\">County</label><select class=\"form-control\" change.delegate=\"checkLifeExpectancySpouse()\" value.bind=\"user.spousePersonalInfo.county\"><option>Please Select</option><option repeat.for=\"county of currentCountyArray\">${county}</option></select></div></div></div><hr style=\"clear:both\"><div class=\"additional-information-container\"><h1 style=\"text-align:center\">Input More Information:</h1><div style=\"margin:0 auto\"><button style=\"float:left\" class=\"btn btn-primary col-md-3\" click.delegate=\"myhealth()\">My Health</button> <button style=\"margin-left:12.5%\" class=\"btn btn-primary col-md-3\" click.delegate=\"familyhealth()\">My Family Health</button> <button style=\"float:right\" class=\"btn btn-primary col-md-3\" click.delegate=\"occupation()\">My Occupation</button></div></div><br><br><hr style=\"clear:both\"><div id=\"submit-button-div-home\"><button id=\"submit\" type=\"submit\" class=\"btn btn-primary\">Submit</button></div></form></template>"; });
define('text!health/familyhealth.html', ['module'], function(module) { module.exports = "<template><require from=\"ion-rangeslider/css/ion.rangeSlider.css\"></require><require from=\"ion-rangeslider/css/ion.rangeSlider.skinHTML5.css\"></require><require from=\"ion-rangeslider/css/normalize.css\"></require><form id=\"familyhealth\" submit.delegate=\"submit()\"><div id=\"client\" class=\"${user.clientPersonalInfo.checkspouse ? 'hasSpouse' : 'noSpouse'}\"><h1 style=\"text-align:center\">Family Health - Client</h1><div class=\"form-group\"><label for=\"ageOfFam\">Average Family Life Expectancy:</label><input style=\"width:400px\" id=\"familyLifeExpectancy\"></div><hr><h4><b>Does your family have a history of...</b></h4><label style=\"padding-right:10px\" for=\"heartdisease\">Heart Disease?</label><div class=\"btn-group\" click.delegate=\"heartdisease()\" data-toggle=\"buttons\"><label class=\"btn ${user.clientFamilyHealth.checkHeartDisease ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientFamilyHealth.checkHeartDisease ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><label style=\"padding-right:10px\" for=\"cancer\">Cancer?</label><div class=\"btn-group\" click.delegate=\"cancer()\" data-toggle=\"buttons\"><label class=\"btn ${user.clientFamilyHealth.checkCancer ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientFamilyHealth.checkCancer ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><label style=\"padding-right:10px\" for=\"mentalhealth\">Mental Illness?</label><div class=\"btn-group\" click.delegate=\"mentalhealth()\" data-toggle=\"buttons\"><label class=\"btn ${user.clientFamilyHealth.checkMentalHealth ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientFamilyHealth.checkMentalHealth ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><label style=\"padding-right:10px\" for=\"diabetes\">Diabetes?</label><div class=\"btn-group\" click.delegate=\"diabetes()\" data-toggle=\"buttons\"><label class=\"btn ${user.clientFamilyHealth.checkDiabetes ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientFamilyHealth.checkDiabetes ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><div id=\"spouse\" style=\"width:45%;float:right\" show.bind=\"user.clientPersonalInfo.checkspouse\"><h1 style=\"text-align:center\">Family Health - Co-Client</h1><div class=\"form-group\"><label for=\"ageOfFam\">Average Family Life Expectancy:</label><input style=\"width:400px\" id=\"spousefamilyLifeExpectancy\"></div><hr><h4><b>Does your family have a history of...</b></h4><label style=\"padding-right:10px\" for=\"heartdisease\">Heart Disease?</label><div class=\"btn-group\" click.delegate=\"spouseheartdisease()\" data-toggle=\"buttons\"><label class=\"btn ${user.spouseFamilyHealth.checkHeartDisease ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.spouseFamilyHealth.checkHeartDisease ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><label style=\"padding-right:10px\" for=\"cancer\">Cancer?</label><div class=\"btn-group\" click.delegate=\"spousecancer()\" data-toggle=\"buttons\"><label class=\"btn ${user.spouseFamilyHealth.checkCancer ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.spouseFamilyHealth.checkCancer ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><label style=\"padding-right:10px\" for=\"mentalhealth\">Mental Illness?</label><div class=\"btn-group\" click.delegate=\"spousementalhealth()\" data-toggle=\"buttons\"><label class=\"btn ${user.spouseFamilyHealth.checkMentalHealth ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.spouseFamilyHealth.checkMentalHealth ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><label style=\"padding-right:10px\" for=\"diabetes\">Diabetes?</label><div class=\"btn-group\" click.delegate=\"spousediabetes()\" data-toggle=\"buttons\"><label class=\"btn ${user.spouseFamilyHealth.checkDiabetes ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.spouseFamilyHealth.checkDiabetes ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><br></div><hr style=\"clear:both\"><div id=\"back-button-div\" class=\"col-md-10\"><button id=\"back\" class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div><div id=\"submit-button-div\" class=\"col-md-2\"><button id=\"submit\" type=\"submit\" class=\"btn btn-primary\">Submit</button></div></form></template>"; });
define('text!health/myhealth.html', ['module'], function(module) { module.exports = "<template><form id=\"myhealth\" submit.delegate=\"submit()\"><div id=\"client\" class=\"${user.clientPersonalInfo.checkspouse ? 'hasSpouse' : 'noSpouse'}\"><h1 style=\"text-align:center\">My Health - Client</h1><div show.bind=\"validHeight\" class=\"alert alert-danger\" role=\"alert\"><strong>Uh oh!</strong> Please be sure to enter a valid height in the format: feet ' inches.</div><div class=\"form-group ${heightError}\"><label for=\"height\">Height</label><input type=\"text\" value.bind=\"user.clientMyHealth.height\" class=\"form-control\" placeholder=\"5'7\" change.trigger=\"checkHeight()\"></div><div class=\"form-group\"><label for=\"weight\">Weight</label><input type=\"text\" value.bind=\"user.clientMyHealth.weight\" class=\"form-control\" placeholder=\"155\"></div><div class=\"form-group\"><label for=\"healthRank\">How many times do you exercise per week?</label><select class=\"form-control\" value.bind=\"user.clientMyHealth.exercisePerWeek\"><option data-hidden=\"true\">Please Select</option><option>0</option><option>1-2</option><option>3-4</option><option>5+</option></select></div><div class=\"form-group\"><label for=\"healthRank\">How many hours do you sleep per week?</label><select class=\"form-control\" value.bind=\"user.clientMyHealth.sleepPerWeek\"><option data-hidden=\"true\">Please Select</option><option>0-4</option><option>5-6</option><option>7-8</option><option>9+</option></select></div><div class=\"form-group\"><label for=\"healthRank\">How would you rank your health?</label><select class=\"form-control\" value.bind=\"user.clientMyHealth.healthRank\"><option data-hidden=\"true\">Please Select</option><option>Excellent</option><option>Good</option><option>Average</option><option>Bad</option><option>Terrible</option></select></div><hr><h2 style=\"text-align:center\">Habits</h2><div class=\"form-group\"><label for=\"healthRank\">How many alcoholic drinks do you consume per week?</label><select class=\"form-control\" value.bind=\"user.clientMyHealth.alcoholPerWeek\"><option data-hidden=\"true\">Please Select</option><option>0-1</option><option>2-7</option><option>8+</option></select></div><label style=\"padding-right:10px\" for=\"gender\">Do you smoke?</label><div class=\"btn-group\" click.delegate=\"smoking()\" data-toggle=\"buttons\"><label class=\"btn ${user.clientMyHealth.checksmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientMyHealth.checksmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><div id=\"spouse\" style=\"width:45%;float:right\" show.bind=\"user.clientPersonalInfo.checkspouse\"><h1 style=\"text-align:center\">My Health - Co-Client</h1><div show.bind=\"validHeightSpouse\" class=\"alert alert-danger\" role=\"alert\"><strong>Uh oh!</strong> Please be sure to enter a valid height in the format: feet ' inches.</div><div class=\"form-group ${heightErrorSpouse}\"><label for=\"height\">Height</label><input type=\"text\" value.bind=\"user.spouseMyHealth.height\" class=\"form-control\" placeholder=\"5'7\" change.trigger=\"checkHeightSpouse()\"></div><div class=\"form-group\"><label for=\"weight\">Weight</label><input type=\"text\" value.bind=\"user.spouseMyHealth.weight\" class=\"form-control\" placeholder=\"155\"></div><div class=\"form-group\"><label for=\"healthRank\">How many times do you exercise per week?</label><select class=\"form-control\" value.bind=\"user.spouseMyHealth.exercisePerWeek\"><option data-hidden=\"true\">Please Select</option><option>0</option><option>1-2</option><option>3-4</option><option>5+</option></select></div><div class=\"form-group\"><label for=\"healthRank\">How many hours do you sleep per week?</label><select class=\"form-control\" value.bind=\"user.spouseMyHealth.sleepPerWeek\"><option data-hidden=\"true\">Please Select</option><option>0-4</option><option>5-6</option><option>7-8</option><option>9+</option></select></div><div class=\"form-group\"><label for=\"healthRank\">How would you rank your health?</label><select class=\"form-control\" value.bind=\"user.spouseMyHealth.healthRank\"><option data-hidden=\"true\">Please Select</option><option>Excellent</option><option>Good</option><option>Average</option><option>Bad</option><option>Terrible</option></select></div><hr><h2 style=\"text-align:center\">Habits</h2><div class=\"form-group\"><label for=\"healthRank\">How many alcoholic drinks do you consume per week?</label><select class=\"form-control\" value.bind=\"user.spouseMyHealth.alcoholPerWeek\"><option data-hidden=\"true\">Please Select</option><option>0-1</option><option>2-7</option><option>8+</option></select></div><label style=\"padding-right:10px\" for=\"gender\">Do you smoke?</label><div class=\"btn-group\" click.delegate=\"smokingSpouse()\" data-toggle=\"buttons\"><label class=\"btn ${user.spouseMyHealth.checksmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.spouseMyHealth.checksmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><br></div><br><hr style=\"clear:both\"><div id=\"back-button-div\" class=\"col-md-10\"><button id=\"back\" class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div><div id=\"submit-button-div\" class=\"col-md-2\"><button id=\"submit\" type=\"submit\" class=\"btn btn-primary\">Submit</button></div></form></template>"; });
define('text!occupation/occupation.html', ['module'], function(module) { module.exports = "<template><form id=\"occupation\" submit.delegate=\"submit()\"><div id=\"client\" class=\"${user.clientPersonalInfo.checkspouse ? 'hasSpouse' : 'noSpouse'}\"><h1 style=\"text-align:center\">Occupation - Client</h1><hr><h4><b>Do you have experience working in...</b></h4><label style=\"padding-right:10px\" for=\"education\">Education?</label><div class=\"btn-group\" click.delegate=\"education()\" data-toggle=\"buttons\"><label class=\"btn ${user.clientOccupation.checkEducation ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientOccupation.checkEducation ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><label style=\"padding-right:10px\" for=\"construction\">Construction?</label><div class=\"btn-group\" click.delegate=\"construction()\" data-toggle=\"buttons\"><label class=\"btn ${user.clientOccupation.checkConstruction ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientOccupation.checkConstruction ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><label style=\"padding-right:10px\" for=\"emergencyResponding\">Emergency Responding?</label><div class=\"btn-group\" click.delegate=\"emergencyResponding()\" data-toggle=\"buttons\"><label class=\"btn ${user.clientOccupation.checkEmergencyResponding ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientOccupation.checkEmergencyResponding ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><div id=\"spouse\" style=\"width:45%;float:right\" show.bind=\"user.clientPersonalInfo.checkspouse\"><h1 style=\"text-align:center\">Occupation - Co-Client</h1><hr><h4><b>Do you have experience working in...</b></h4><label style=\"padding-right:10px\" for=\"education\">Education?</label><div class=\"btn-group\" click.delegate=\"spouseeducation()\" data-toggle=\"buttons\"><label class=\"btn ${user.spouseOccupation.checkEducation ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.spouseOccupation.checkEducation ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><label style=\"padding-right:10px\" for=\"construction\">Construction?</label><div class=\"btn-group\" click.delegate=\"spouseconstruction()\" data-toggle=\"buttons\"><label class=\"btn ${user.spouseOccupation.checkConstruction ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.spouseOccupation.checkConstruction ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><label style=\"padding-right:10px\" for=\"emergencyResponding\">Emergency Responding?</label><div class=\"btn-group\" click.delegate=\"spouseemergencyResponding()\" data-toggle=\"buttons\"><label class=\"btn ${user.spouseOccupation.checkEmergencyResponding ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.spouseOccupation.checkEmergencyResponding ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><br></div><hr style=\"clear:both\"><div id=\"back-button-div\" class=\"col-md-10\"><button id=\"back\" class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div><div id=\"submit-button-div\" class=\"col-md-2\"><button id=\"submit\" type=\"submit\" class=\"btn btn-primary\">Submit</button></div></form></template>"; });
define('text!results/results.html', ['module'], function(module) { module.exports = "<template><div id=\"results\"><h1>Results</h1><button class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div></template>"; });
=======
define('text!aboutyou/personalinfo.html', ['module'], function(module) { module.exports = "<template><require from=\"ion-rangeslider/css/ion.rangeSlider.css\"></require><require from=\"ion-rangeslider/css/ion.rangeSlider.skinHTML5.css\"></require><require from=\"ion-rangeslider/css/normalize.css\"></require><form id=\"personalinfo\" submit.delegate=\"submit()\"><div style=\"margin-left:38.5%\"><label style=\"padding-right:10px\" for=\"checkspouse\">Do you have a spouse?</label><div class=\"btn-group\" click.delegate=\"checkspouse()\" data-toggle=\"buttons\"><label class=\"btn ${user.clientPersonalInfo.checkspouse ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientPersonalInfo.checkspouse ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><div id=\"client-spouse-container\"><div id=\"client\" class=\"${user.clientPersonalInfo.checkspouse ? 'hasSpouse' : 'noSpouse'}\"><h2 id=\"clientorspouse\" style=\"text-align:center\">Client</h2><div class=\"form-group\"><label for=\"age\">Age:</label><input style=\"width:400px\" id=\"age\"></div><label style=\"padding-right:10px\" for=\"gender\">Gender:</label><div class=\"btn-group\" click.delegate=\"gender()\" data-toggle=\"buttons\"><label class=\"btn ${user.clientPersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Male</label><label class=\"btn ${!user.clientPersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Female</label></div><br><br><br><div class=\"form-group\"><label for=\"race\">Race</label><select class=\"form-control\" value.bind=\"user.clientPersonalInfo.race\"><option>White</option><option>Black</option><option>Hispanic</option><option>Asian</option></select></div><div class=\"form-group\"><label for=\"state\">State</label><select class=\"form-control\" change.delegate=\"checkState()\" value.bind=\"user.clientPersonalInfo.state\"><option>Please Select</option><option repeat.for=\"state of stateData.stateSet\">${state}</option></select></div><div class=\"form-group\"><label for=\"county\">County</label><select class=\"form-control\" change.delegate=\"checkLifeExpectancy()\" value.bind=\"user.clientPersonalInfo.county\"><option>Please Select</option><option repeat.for=\"county of currentCountyArray\">${county}</option></select></div></div><div id=\"spouse\" style=\"width:45%;float:right;text-align:center\" show.bind=\"user.clientPersonalInfo.checkspouse\"><h2 id=\"clientorspouse\">Co-Client</h2><div class=\"form-group\"><label for=\"age\">Age:</label><input style=\"width:400px\" id=\"spouseage\"></div><label style=\"padding-right:10px\" for=\"gender\">Gender:</label><div class=\"btn-group\" click.delegate=\"spousegender()\" data-toggle=\"buttons\"><label class=\"btn ${user.spousePersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Male</label><label class=\"btn ${!user.spousePersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Female</label></div><br><br><br><div class=\"form-group\"><label for=\"race\">Race</label><select class=\"form-control\" value.bind=\"user.spousePersonalInfo.race\"><option>White</option><option>Black</option><option>Hispanic</option><option>Asian</option></select></div><div class=\"form-group\"><label for=\"state\">State</label><select class=\"form-control\" change.delegate=\"checkStateSpouse()\" value.bind=\"user.spousePersonalInfo.state\"><option>Please Select</option><option repeat.for=\"state of stateData.stateSet\">${state}</option></select></div><div class=\"form-group\"><label for=\"county\">County</label><select class=\"form-control\" change.delegate=\"checkLifeExpectancySpouse()\" value.bind=\"user.spousePersonalInfo.county\"><option>Please Select</option><option repeat.for=\"county of currentCountyArray\">${county}</option></select></div></div></div><hr style=\"clear:both\"><div class=\"additional-information-container\"><h1 style=\"text-align:center\">Input More Information:</h1><div style=\"margin:0 auto\"><button style=\"float:left\" class=\"btn btn-primary col-md-3\" click.delegate=\"myhealth()\">My Health</button> <button style=\"margin-left:12.5%\" class=\"btn btn-primary col-md-3\" click.delegate=\"familyhealth()\">My Family Health</button> <button style=\"float:right\" class=\"btn btn-primary col-md-3\" click.delegate=\"occupation()\">My Occupation</button></div></div><br><br><hr style=\"clear:both\"><div id=\"submit-button-div-home\"><button id=\"submit\" type=\"submit\" class=\"btn btn-primary\">Submit</button></div></form></template>"; });
define('text!health/familyhealth.html', ['module'], function(module) { module.exports = "<template><form id=\"familyhealth\" submit.delegate=\"submit()\"><div id=\"client\" class=\"${user.clientPersonalInfo.checkspouse ? 'hasSpouse' : 'noSpouse'}\"><h1 style=\"text-align:center\">Family Health - Client</h1></div><div id=\"spouse\" style=\"width:45%;float:right;text-align:center\" show.bind=\"user.clientPersonalInfo.checkspouse\"><h1 style=\"text-align:center\">Family Health - Co-Client</h1></div><hr style=\"clear:both\"><div id=\"back-button-div\" class=\"col-md-10\"><button id=\"back\" class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div><div id=\"submit-button-div\" class=\"col-md-2\"><button id=\"submit\" type=\"submit\" class=\"btn btn-primary\">Submit</button></div></form></template>"; });
define('text!health/myhealth.html', ['module'], function(module) { module.exports = "<template><form id=\"myhealth\" submit.delegate=\"submit()\"><div id=\"client\" class=\"${user.clientPersonalInfo.checkspouse ? 'hasSpouse' : 'noSpouse'}\"><h1 style=\"text-align:center\">My Health - Client</h1><div show.bind=\"validHeight\" class=\"alert alert-danger\" role=\"alert\"><strong>Uh oh!</strong> Please be sure to enter a valid height in the format: feet ' inches.</div><div class=\"form-group ${heightError}\"><label for=\"height\">Height</label><input type=\"text\" value.bind=\"user.clientMyHealth.height\" class=\"form-control\" placeholder=\"5'7\" change.trigger=\"checkHeight()\"></div><div class=\"form-group\"><label for=\"weight\">Weight</label><input type=\"text\" value.bind=\"user.clientMyHealth.weight\" class=\"form-control\" placeholder=\"155\"></div><div class=\"form-group\"><label for=\"healthRank\">How would you rank your health?</label><select class=\"form-control\" value.bind=\"user.clientMyHealth.healthRank\"><option data-hidden=\"true\">Please Select</option><option>Excellent</option><option>Good</option><option>Average</option><option>Bad</option><option>Terrible</option></select></div></div><div id=\"spouse\" style=\"width:45%;float:right;text-align:center\" show.bind=\"user.clientPersonalInfo.checkspouse\"><h1 style=\"text-align:center\">My Health - Co-Client</h1><div show.bind=\"validHeightSpouse\" class=\"alert alert-danger\" role=\"alert\"><strong>Uh oh!</strong> Please be sure to enter a valid height in the format: feet ' inches.</div><div class=\"form-group ${heightErrorSpouse}\"><label for=\"height\">Height</label><input type=\"text\" value.bind=\"user.spouseMyHealth.height\" class=\"form-control\" placeholder=\"5'7\" change.trigger=\"checkHeightSpouse()\"></div><div class=\"form-group\"><label for=\"weight\">Weight</label><input type=\"text\" value.bind=\"user.spouseMyHealth.weight\" class=\"form-control\" placeholder=\"155\"></div><div class=\"form-group\"><label for=\"healthRank\">How would you rank your health?</label><select class=\"form-control\" value.bind=\"user.spouseMyHealth.healthRank\"><option data-hidden=\"true\">Please Select</option><option>Excellent</option><option>Good</option><option>Average</option><option>Bad</option><option>Terrible</option></select></div></div><hr style=\"clear:both\"><div id=\"back-button-div\" class=\"col-md-10\"><button id=\"back\" class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div><div id=\"submit-button-div\" class=\"col-md-2\"><button id=\"submit\" type=\"submit\" class=\"btn btn-primary\">Submit</button></div></form></template>"; });
define('text!occupation/occupation.html', ['module'], function(module) { module.exports = "<template><form id=\"occupation\" submit.delegate=\"submit()\"><div id=\"client\" class=\"${user.clientPersonalInfo.checkspouse ? 'hasSpouse' : 'noSpouse'}\"><h1 style=\"text-align:center\">Occupation - Client</h1></div><div id=\"spouse\" style=\"width:45%;float:right;text-align:center\" show.bind=\"user.clientPersonalInfo.checkspouse\"><h1 style=\"text-align:center\">Occupation - Co-Client</h1></div><hr style=\"clear:both\"><div id=\"back-button-div\" class=\"col-md-10\"><button id=\"back\" class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div><div id=\"submit-button-div\" class=\"col-md-2\"><button id=\"submit\" type=\"submit\" class=\"btn btn-primary\">Submit</button></div></form></template>"; });
define('text!results/results.html', ['module'], function(module) { module.exports = "<template><require from=\"highcharts/css/highcharts.css\"></require><div id=\"results\"><h1>Results</h1><div id=\"chart-container\" style=\"width:100%;height:400px\"></div><button class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button><div show.bind=\"userData.spouse.checkUserSelected\" class=\"table-outter\"><table class=\"table table-hover table-bordered search-table\"><thead></thead><tbody></tbody></table></div></div></template>"; });
>>>>>>> b80daee133f0e03f1582f8afc4a42c0d70b195eb
//# sourceMappingURL=app-bundle.js.map