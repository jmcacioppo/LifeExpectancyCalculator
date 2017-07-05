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

    var personalinfo = exports.personalinfo = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User, _stateData.StateData, _slider.Slider, _calculateResults.CalculateResults), _dec(_class = function () {
        function personalinfo(router, user, stateData, slider, calculateResults) {
            _classCallCheck(this, personalinfo);

            this.currentCountyArray = [];

            this.slider = slider;
            this.router = router;
            this.user = user;
            this.stateData = stateData;
            this.calculateResults = calculateResults;
        }

        personalinfo.prototype.gender = function gender(person) {
            person.checkgender = !person.checkgender;
            person.gender = person.checkgender ? 'Male' : 'Female';
            console.log(person);
        };

        personalinfo.prototype.checkspouse = function checkspouse() {
            this.user.clientPersonalInfo.checkspouse = !this.user.clientPersonalInfo.checkspouse;
        };

        personalinfo.prototype.checkState = function checkState(person) {
            var state = person.state;
            if (state != "Please Select") {
                var self = this;
                this.currentCountyArray = [];
                var countyWithLifeArrays = this.stateData.stateToCountyMap.get(state).split(',');
                countyWithLifeArrays.forEach(function (data) {
                    var currentCountyInfo = data.split(":");
                    self.currentCountyArray.push(currentCountyInfo[0]);
                });
                this.currentCountyArray.pop();
            } else person.county = "Please Select";
        };

        personalinfo.prototype.checkLifeExpectancy = function checkLifeExpectancy(person) {
            if (person.county != "Please Select") {
                var state = person.state;
                var countyWithLifeArrays = this.stateData.stateToCountyMap.get(state).split(',');
                countyWithLifeArrays.forEach(function (data) {
                    var currentCountyInfo = data.split(":");

                    var lifeExpectancy = person.checkgender ? currentCountyInfo[2] : currentCountyInfo[1];

                    if (currentCountyInfo[0].indexOf(person.county) != -1) {
                        person.countyLifeExpectancy = person.checkgender ? currentCountyInfo[1] : currentCountyInfo[2];
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

        personalinfo.prototype.submit = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.calculateResults.getLifeTableData(this.user.clientPersonalInfo);

                            case 2:
                                this.user.clientResults.ethnicity = this.user.clientPersonalInfo.ethnicityLifeExpectancy;

                                this.calculateResults.addMyHealthExpectancy(this.user.clientResults);

                                console.log("=======CLIENT=======");
                                console.log(this.user.clientPersonalInfo);
                                console.log(this.user.clientResults);

                                if (!this.user.clientPersonalInfo.checkspouse) {
                                    _context.next = 15;
                                    break;
                                }

                                _context.next = 10;
                                return this.calculateResults.getLifeTableData(this.user.spousePersonalInfo);

                            case 10:
                                this.user.spouseResults.ethnicity = this.user.spousePersonalInfo.ethnicityLifeExpectancy;

                                this.calculateResults.addMyHealthExpectancy(this.user.spouseResults);

                                console.log("=======SPOUSE=======");
                                console.log(this.user.spousePersonalInfo);
                                console.log(this.user.spouseResults);

                            case 15:

                                this.router.navigate('#/results');

                            case 16:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function submit() {
                return _ref.apply(this, arguments);
            }

            return submit;
        }();

        personalinfo.prototype.attached = function attached() {
            this.slider.createAgeSlider();
        };

        return personalinfo;
    }()) || _class);
});
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

        familyhealth.prototype.heartdisease = function heartdisease(person) {
            person.checkHeartDisease = !person.checkHeartDisease;
        };

        familyhealth.prototype.cancer = function cancer(person) {
            person.checkCancer = !person.checkCancer;
        };

        familyhealth.prototype.mentalhealth = function mentalhealth(person) {
            person.checkMentalHealth = !person.checkMentalHealth;
        };

        familyhealth.prototype.diabetes = function diabetes(person) {
            person.checkDiabetes = !person.checkDiabetes;
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
define('health/myhealth',['exports', 'jquery', 'aurelia-framework', 'aurelia-router', '../services/user', '../utilities/calculateMyHealth', 'jquery-ui-dist'], function (exports, _jquery, _aureliaFramework, _aureliaRouter, _user, _calculateMyHealth) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.myhealth = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

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
            this.formHeightWeight = "";

            this.calculateMyHealth = calculateMyHealth;
            this.router = router;
            this.user = user;
        }

        myhealth.prototype.checkHeight = function checkHeight(person) {
            var valid = /^[2-9]' ?(?:\d|1[0-1])"?$/.test(this.user.clientMyHealth.height);
            person.validHeight = valid;
            this.heightError = valid ? "" : "has-error";
            if (valid) {
                var feetAndInches = person.height.split("'");
                person.heightInInches = parseInt(feetAndInches[0]) * 12 + parseInt(feetAndInches[1]);
            }

            if (person.validWeight) {
                this.calculateBMI(person);
            }
        };

        myhealth.prototype.calculateBMI = function calculateBMI(person) {
            if (person.validHeight) {
                this.calculateMyHealth.calculateBMI(person);
                person.validBMI = true;
                this.setIconType(person, false);
                person.iconType = "./src/health/" + person.iconType + ".jpg";
            }
            person.validWeight = true;
            person.formHeightWeight = true;
        };

        myhealth.prototype.setIconType = function setIconType(person, spouse) {
            console.log(person.bmi);
            switch (true) {
                case person.bmi < 18.5:
                    person.iconType = "underweight";
                    break;
                case person.bmi >= 18.5 && person.bmi < 25:
                    person.iconType = "normal";
                    break;
                case person.bmi >= 25 && person.bmi < 30:
                    person.iconType = "overweight";
                    break;
                case person.bmi > 30 && person.bmi < 35:
                    person.iconType = "obese";
                    break;
                default:
                    person.iconType = "extremely-obese";
                    break;
            }
            console.log(person.iconType);
            return person;
        };

        myhealth.prototype.smoking = function smoking(person) {
            person.checksmoking = !person.checksmoking;
        };

        myhealth.prototype.stillSmoking = function stillSmoking(person) {
            person.checkStillSmoking = !person.checkStillSmoking;
        };

        myhealth.prototype.back = function back() {
            this.router.navigate('#/personalinfo');
        };

        myhealth.prototype.submit = function submit() {
            console.log(this.user.clientMyHealth);
            console.log(this.user.spouseMyHealth);

            this.calculateMyHealth.calculateBMI(this.user.clientMyHealth);
            this.calculateMyHealth.calculateExercise(this.user.clientMyHealth);
            this.user.clientResults.exercise = this.user.clientMyHealth.exerciseLifeExpectancy;

            this.calculateMyHealth.calculateSmoker(this.user.clientMyHealth);
            this.user.clientResults.smoker = this.user.clientMyHealth.smokerLifeExpectancy;

            console.log(this.user.clientMyHealth);

            if (this.user.clientPersonalInfo.checkspouse) {
                this.calculateMyHealth.calculateBMI(this.user.spouseMyHealth);
                this.calculateMyHealth.calculateExercise(this.user.spouseMyHealth);
                this.user.spouseResults.exercise = this.user.spouseMyHealth.exerciseLifeExpectancy;

                this.calculateMyHealth.calculateSmoker(this.user.spouseMyHealth);
                this.user.spouseResults.smoker = this.user.spouseMyHealth.smokerLifeExpectancy;
                console.log(this.user.spouseMyHealth);
            }
            this.router.navigate('#/personalinfo');
        };

        myhealth.prototype.attached = function attached() {
            (0, _jquery2.default)('#height-tooltip').tooltip({
                content: "Your height is used to calculate your <b>Body Mass Index (BMI)</b>."
            });

            (0, _jquery2.default)('#weight-tooltip').tooltip({
                content: "Your weight is used to calculate your <b>Body Mass Index (BMI)</b>."
            });

            (0, _jquery2.default)('#exercise-tooltip').tooltip({
                content: "For every 1 minute of exercise, you get 7 minutes of extra life.<br><b>- National Institute of Health</b>"
            });

            (0, _jquery2.default)('#health-rank-tooltip').tooltip({
                content: "How you view your health impacts your life expectancy."
            });

            (0, _jquery2.default)('#spouse-height-tooltip').tooltip({
                content: "Your height is used to calculate your <b>Body Mass Index (BMI)</b>."
            });

            (0, _jquery2.default)('#spouse-weight-tooltip').tooltip({
                content: "Your weight is used to calculate your <b>Body Mass Index (BMI)</b>."
            });

            (0, _jquery2.default)('#spouse-exercise-tooltip').tooltip({
                content: "For every 1 minute of exercise, you get 7 minutes of extra life.<br><b>- National Institute of Health</b>"
            });

            (0, _jquery2.default)('#spouse-health-rank-tooltip').tooltip({
                content: "How you view your health impacts your life expectancy."
            });
        };

        return myhealth;
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

        occupation.prototype.education = function education(person) {
            person.checkEducation = !person.checkEducation;
        };

        occupation.prototype.construction = function construction(person) {
            person.checkConstruction = !person.checkConstruction;
        };

        occupation.prototype.emergencyResponding = function emergencyResponding(person) {
            person.checkEmergencyResponding = !person.checkEmergencyResponding;
        };

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
define('results/results',['exports', 'aurelia-framework', 'aurelia-router', '../services/user', '../utilities/chart', '../utilities/calculateResults'], function (exports, _aureliaFramework, _aureliaRouter, _user, _chart, _calculateResults) {
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

    var results = exports.results = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User, _chart.Chart, _calculateResults.CalculateResults), _dec(_class = function () {
        function results(router, user, chart, calculateResults) {
            _classCallCheck(this, results);

            this.router = router;
            this.user = user;
            this.chart = chart;
            this.calculateResults = calculateResults;
        }

        results.prototype.attached = function attached() {
            this.chart.createChart('chart-container');
        };

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
                this.formHeightWeight = false;
                this.exerciseLifeExpectancy;

                this.validHeight = false;
                this.validWeight = false;
                this.validBMI = false;
                this.iconType = "underweight";

                this.exercisePerWeek;
                this.sleepPerWeek;
                this.healthRank;

                this.alcoholPerWeek;

                this.checksmoking = false;
                this.checkStillSmoking = true;
                this.kindOfSmoker = true;
                this.ageQuitSmoking;
                this.smokerLifeExpectancy;
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

        this.ethnicityLifeExpectancy;
    }) || _class);
});
define('services/resultsData',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
                value: true
        });
        exports.ResultsData = undefined;

        function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                }
        }

        var _dec, _class;

        var ResultsData = exports.ResultsData = (_dec = (0, _aureliaFramework.transient)(), _dec(_class = function ResultsData() {
                _classCallCheck(this, ResultsData);

                this.ethnicity;

                this.exercise;
                this.smoker;

                this.overallLifeExpectancy;
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
define('services/user',['exports', 'aurelia-framework', '../services/personalInfoData', '../services/myHealthData', '../services/familyHealthData', '../services/occupationData', '../services/resultsData'], function (exports, _aureliaFramework, _personalInfoData, _myHealthData, _familyHealthData, _occupationData, _resultsData) {
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

                this.clientResults = new _resultsData.ResultsData();
                this.spouseResults = new _resultsData.ResultsData();
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

        CalculateMyHealth.prototype.calculateBMI = function calculateBMI(person) {
            var metricWeight = person.weight * 0.45;
            var metricHeight = person.heightInInches * 0.025;
            var metricHeightSquared = metricHeight * metricHeight;
            person.bmi = (metricWeight / metricHeightSquared).toPrecision(4);
        };

        CalculateMyHealth.prototype.calculateExercise = function calculateExercise(person) {
            var exercisePerWeek = person.exercisePerWeek;
            var bmi = person.bmi;

            if (exercisePerWeek.indexOf("0") !== -1) {
                person.exerciseLifeExpectancy = 0;
                if (bmi >= 18.5 && bmi < 25) person.exerciseLifeExpectancy -= 4.7;else if (bmi >= 25 && bmi < 30) person.exerciseLifeExpectancy -= 3.9;else if (bmi >= 30 && bmi < 35) person.exerciseLifeExpectancy -= 5.0;else if (bmi >= 35) person.exerciseLifeExpectancy -= 7.2;
            } else if (exercisePerWeek.indexOf("Less") !== -1) {
                person.exerciseLifeExpectancy = 1.8;
                if (bmi >= 18.5 && bmi <= 24.9) person.exerciseLifeExpectancy -= 2.4;else if (bmi >= 25 && bmi < 30) person.exerciseLifeExpectancy -= 1.8;else if (bmi >= 30 && bmi < 35) person.exerciseLifeExpectancy -= 3.2;else if (bmi >= 35) person.exerciseLifeExpectancy -= 6.2;
            } else if (exercisePerWeek.indexOf("Approximately") !== -1) {
                person.exerciseLifeExpectancy = 3.4;
                if (bmi >= 18.5 && bmi <= 24.9) person.exerciseLifeExpectancy -= 0;else if (bmi >= 25 && bmi < 30) person.exerciseLifeExpectancy -= 0;else if (bmi >= 30 && bmi < 35) person.exerciseLifeExpectancy -= 1.6;else if (bmi >= 35) person.exerciseLifeExpectancy -= 4.5;
            } else if (exercisePerWeek.indexOf("More") !== -1) {
                person.exerciseLifeExpectancy = 4.5;
                if (bmi >= 18.5 && bmi <= 24.9) person.exerciseLifeExpectancy -= 0;else if (bmi >= 25 && bmi < 30) person.exerciseLifeExpectancy -= 0;else if (bmi >= 30 && bmi < 35) person.exerciseLifeExpectancy -= 1.6;else if (bmi >= 35) person.exerciseLifeExpectancy -= 4.5;
            }
        };

        CalculateMyHealth.prototype.calculateSmoker = function calculateSmoker(person) {
            var checksmoking = person.checksmoking;
            var smokerLifeExpectancy = 0;

            if (checksmoking) {
                var stillSmoking = person.checkStillSmoking;
                var kindOfSmoker = person.kindOfSmoker;

                if (kindOfSmoker.indexOf("Light") !== -1) smokerLifeExpectancy = -4.8;else if (kindOfSmoker.indexOf("Average") !== -1) smokerLifeExpectancy -= 6.8;else if (kindOfSmoker.indexOf("Heavy") !== -1) smokerLifeExpectancy -= 8.8;

                if (!stillSmoking) {
                    var age = person.ageQuitSmoking;
                    if (age.indexOf("25") !== -1) smokerLifeExpectancy += 10;else if (age.indexOf("35") !== -1) smokerLifeExpectancy += 9;else if (age.indexOf("45") !== -1) smokerLifeExpectancy += 6;else if (age.indexOf("60") !== -1) smokerLifeExpectancy += 3;
                }
            }

            person.smokerLifeExpectancy = smokerLifeExpectancy;
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
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(person) {
                var data, data2;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.httpClient.fetch('/api/life-table/' + person.race.toLowerCase() + '-' + person.gender.toLowerCase() + '.json');

                            case 2:
                                data = _context.sent;
                                _context.next = 5;
                                return data.json();

                            case 5:
                                data2 = _context.sent;

                                this.setUserExpectedAge(data2, person);
                                this.getTestTuples(data2, person);

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

        CalculateResults.prototype.setUserExpectedAge = function setUserExpectedAge(data, person) {
            data.forEach(function (value) {
                var currentAgeArray = [];
                currentAgeArray[0] = parseInt(value.Age.slice(0, 2));
                currentAgeArray[1] = parseInt(value.Age.slice(3, 5));
                if (currentAgeArray[0] === person.age || currentAgeArray[1] === person.age) {
                    person.expectedYearsLeft = parseInt(value.ExpectedAge);
                    person.ethnicityLifeExpectancy = person.expectedYearsLeft + person.age;
                }
            });
        };

        CalculateResults.prototype.addMyHealthExpectancy = function addMyHealthExpectancy(personResults) {
            personResults.overallLifeExpectancy = personResults.ethnicity;
            personResults.overallLifeExpectancy += personResults.exercise;
            personResults.overallLifeExpectancy += personResults.smoker;
        };

        CalculateResults.prototype.getTestTuples = function getTestTuples(jsonData, person) {
            var tempArr = [];
            jsonData.forEach(function (value) {
                tempArr.push([value.Age, 1 - value.Probability]);
            });
            person.testTuples = tempArr;
        };

        return CalculateResults;
    }()) || _class);
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
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"css/styles.css\"></require><div id=\"app\"><div id=\"content\"><div id=\"home\"><h1 style=\"font-size:36px;text-align:center\"><b>Life Expectancy Calculator<b></b></b></h1></div><hr><router-view></router-view></div><br><br><br><footer id=\"footer\"><div class=\"footer-copyright\"><div class=\"container-fluid\"><br>©2017, PIEtech, Inc. All rights reserved.</div></div></footer></div></template>"; });
define('text!css/styles.css', ['module'], function(module) { module.exports = "/*========================GLYPHICON COLOR========================*/\r\n\r\n.glyphicon-question-sign {\r\n    color: #006dcc;\r\n\tmargin:5px;\r\n}\r\n\r\n/*========================END GLYPHICON COLOR========================*/\r\n\r\n.hasSpouse {\r\n\twidth: 45%;\r\n\tfloat: left;\r\n}\r\n\r\n.noSpouse {\r\n\twidth: 100%;\r\n\tfloat: none;\r\n}\r\n\r\n.additional-information-container {\r\n\tclear: both;\r\n\tmargin: 0 auto;\r\n\twidth: 600px;\r\n}\r\n\r\n/*========================BACK BUTTON========================*/\r\n#back-button-div-home {\r\n\tmargin: 0 auto;\r\n    bottom: 0;\r\n\tmargin-left: 46%;\r\n}\r\n\r\n#back-button-div {\r\n\tmargin: 0 auto;\r\n    bottom: 0;\r\n}\r\n\r\n#back {\r\n\tmargin: 0 auto;\r\n    bottom: 0;\r\n}\r\n\r\n/*========================SUBMIT BUTTON========================*/\r\n#submit-button-div-home {\r\n\tmargin: 0 auto;\r\n    bottom: 0;\r\n\tmargin-left: 46%;\r\n}\r\n\r\n#submit-button-div {\r\n\tmargin: 0 auto;\r\n    bottom: 0;\r\n}\r\n\r\n#submit {\r\n\tmargin: 0 auto;\r\n    bottom: 0;\r\n}\r\n\r\n#personalinfo, #myhealth, #familyhealth, #occupation, #results {    \r\n    margin: 0 auto;\r\n    width: 1000px;\r\n}\r\n\r\n/*===========================FOOTER STYLING==========================*/\r\nhtml, body {\r\n\tmargin:0;\r\n\tpadding:0;\r\n\theight:100%;\r\n}\r\n\r\n#app {\r\n\tmin-height:100%;\r\n\tposition:relative;\r\n}\r\n\r\n#content {\r\n\tpadding-bottom:100px; /* Height of the footer element */\r\n}\r\n\r\n#footer {\r\n\tclear: both;\r\n\tbackground:#ededed;\r\n\twidth:100%;\r\n\theight:60px;\r\n\tposition:absolute;\r\n\tbottom:0;\r\n\tleft:0;\r\n    text-align: center;\r\n}\r\n/*============================END FOOTER STYLING===========================*/"; });
define('text!aboutyou/personalinfo.html', ['module'], function(module) { module.exports = "<template><require from=\"ion-rangeslider/css/ion.rangeSlider.css\"></require><require from=\"ion-rangeslider/css/ion.rangeSlider.skinHTML5.css\"></require><require from=\"ion-rangeslider/css/normalize.css\"></require><form id=\"personalinfo\" submit.delegate=\"submit()\"><div style=\"margin-left:38.5%\"><label style=\"padding-right:10px\" for=\"checkspouse\">Do you have a spouse?</label><div class=\"btn-group\" click.delegate=\"checkspouse()\" data-toggle=\"buttons\"><label class=\"btn ${user.clientPersonalInfo.checkspouse ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientPersonalInfo.checkspouse ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><div id=\"client-spouse-container\"><div id=\"client\" class=\"${user.clientPersonalInfo.checkspouse ? 'hasSpouse' : 'noSpouse'}\"><h2 id=\"clientorspouse\" style=\"text-align:center\">Client</h2><div class=\"form-group\"><label for=\"age\">Age:</label><input style=\"width:400px\" id=\"age\"></div><label style=\"padding-right:10px\" for=\"gender\">Gender:</label><div class=\"btn-group\" click.delegate=\"gender(user.clientPersonalInfo)\" data-toggle=\"buttons\"><label class=\"btn ${user.clientPersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Male</label><label class=\"btn ${!user.clientPersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Female</label></div><br><br><br><div class=\"form-group\"><label for=\"race\">Race</label><select class=\"form-control\" value.bind=\"user.clientPersonalInfo.race\"><option>White</option><option>Black</option><option>Hispanic</option><option>Asian</option></select></div><div class=\"form-group\"><label for=\"race\">Marital Status</label><select class=\"form-control\" value.bind=\"user.clientPersonalInfo.maritalStatus\"><option>Please Select</option><option>Never Married</option><option>Cohabitated</option><option>Married</option><option>Divorced</option></select></div><div class=\"form-group\"><label for=\"state\">State</label><select class=\"form-control\" change.delegate=\"checkState(user.clientPersonalInfo)\" value.bind=\"user.clientPersonalInfo.state\"><option>Please Select</option><option repeat.for=\"state of stateData.stateSet\">${state}</option></select></div><div class=\"form-group\"><label for=\"county\">County</label><select class=\"form-control\" change.delegate=\"checkLifeExpectancy(user.clientPersonalInfo)\" value.bind=\"user.clientPersonalInfo.county\"><option>Please Select</option><option repeat.for=\"county of currentCountyArray\">${county}</option></select></div></div><div id=\"spouse\" style=\"width:45%;float:right\" show.bind=\"user.clientPersonalInfo.checkspouse\"><h2 style=\"text-align:center\">Co-Client</h2><div class=\"form-group\"><label for=\"age\">Age:</label><input style=\"width:400px\" id=\"spouseage\"></div><label style=\"padding-right:10px\" for=\"gender\">Gender:</label><div class=\"btn-group\" click.delegate=\"gender(user.spousePersonalInfo)\" data-toggle=\"buttons\"><label class=\"btn ${user.spousePersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Male</label><label class=\"btn ${!user.spousePersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Female</label></div><br><br><br><div class=\"form-group\"><label for=\"race\">Race</label><select class=\"form-control\" value.bind=\"user.spousePersonalInfo.race\"><option>White</option><option>Black</option><option>Hispanic</option><option>Asian</option></select></div><div class=\"form-group\"><label for=\"race\">Marital Status</label><select class=\"form-control\" value.bind=\"user.spousePersonalInfo.maritalStatus\"><option>Please Select</option><option>Never Married</option><option>Cohabitated</option><option>Married</option><option>Divorced</option></select></div><div class=\"form-group\"><label for=\"state\">State</label><select class=\"form-control\" change.delegate=\"checkState(user.spousePersonalInfo)\" value.bind=\"user.spousePersonalInfo.state\"><option>Please Select</option><option repeat.for=\"state of stateData.stateSet\">${state}</option></select></div><div class=\"form-group\"><label for=\"county\">County</label><select class=\"form-control\" change.delegate=\"checkLifeExpectancy(user.spousePersonalInfo)\" value.bind=\"user.spousePersonalInfo.county\"><option>Please Select</option><option repeat.for=\"county of currentCountyArray\">${county}</option></select></div></div></div><hr style=\"clear:both\"><div class=\"additional-information-container\"><h1 style=\"text-align:center\">Input More Information:</h1><div style=\"margin:0 auto\"><button style=\"float:left\" class=\"btn btn-primary col-md-3\" click.delegate=\"myhealth()\">My Health</button> <button style=\"margin-left:12.5%\" class=\"btn btn-primary col-md-3\" click.delegate=\"familyhealth()\">My Family Health</button> <button style=\"float:right\" class=\"btn btn-primary col-md-3\" click.delegate=\"occupation()\">My Occupation</button></div></div><br><br><hr style=\"clear:both\"><div id=\"submit-button-div-home\"><button id=\"submit\" type=\"submit\" class=\"btn btn-primary\">Submit</button></div></form></template>"; });
define('text!health/familyhealth.html', ['module'], function(module) { module.exports = "<template><require from=\"ion-rangeslider/css/ion.rangeSlider.css\"></require><require from=\"ion-rangeslider/css/ion.rangeSlider.skinHTML5.css\"></require><require from=\"ion-rangeslider/css/normalize.css\"></require><form id=\"familyhealth\" submit.delegate=\"submit()\"><div id=\"client\" class=\"${user.clientPersonalInfo.checkspouse ? 'hasSpouse' : 'noSpouse'}\"><h1 style=\"text-align:center\">Family Health - Client</h1><div class=\"form-group\"><label for=\"ageOfFam\">Average Family Life Expectancy:</label><input style=\"width:400px\" id=\"familyLifeExpectancy\"></div><hr><h4><b>Does your family have a history of...</b></h4><label style=\"padding-right:10px\" for=\"heartdisease\">Heart Disease?</label><div class=\"btn-group\" click.delegate=\"heartdisease(user.clientFamilyHealth)\" data-toggle=\"buttons\"><label class=\"btn ${user.clientFamilyHealth.checkHeartDisease ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientFamilyHealth.checkHeartDisease ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><label style=\"padding-right:10px\" for=\"cancer\">Cancer?</label><div class=\"btn-group\" click.delegate=\"cancer(user.clientFamilyHealth)\" data-toggle=\"buttons\"><label class=\"btn ${user.clientFamilyHealth.checkCancer ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientFamilyHealth.checkCancer ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><label style=\"padding-right:10px\" for=\"mentalhealth\">Mental Illness?</label><div class=\"btn-group\" click.delegate=\"mentalhealth(user.clientFamilyHealth)\" data-toggle=\"buttons\"><label class=\"btn ${user.clientFamilyHealth.checkMentalHealth ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientFamilyHealth.checkMentalHealth ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><label style=\"padding-right:10px\" for=\"diabetes\">Diabetes?</label><div class=\"btn-group\" click.delegate=\"diabetes(user.clientFamilyHealth)\" data-toggle=\"buttons\"><label class=\"btn ${user.clientFamilyHealth.checkDiabetes ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientFamilyHealth.checkDiabetes ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><div id=\"spouse\" style=\"width:45%;float:right\" show.bind=\"user.clientPersonalInfo.checkspouse\"><h1 style=\"text-align:center\">Family Health - Co-Client</h1><div class=\"form-group\"><label for=\"ageOfFam\">Average Family Life Expectancy:</label><input style=\"width:400px\" id=\"spousefamilyLifeExpectancy\"></div><hr><h4><b>Does your family have a history of...</b></h4><label style=\"padding-right:10px\" for=\"heartdisease\">Heart Disease?</label><div class=\"btn-group\" click.delegate=\"heartdisease(user.spouseFamilyHealth)\" data-toggle=\"buttons\"><label class=\"btn ${user.spouseFamilyHealth.checkHeartDisease ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.spouseFamilyHealth.checkHeartDisease ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><label style=\"padding-right:10px\" for=\"cancer\">Cancer?</label><div class=\"btn-group\" click.delegate=\"cancer(user.spouseFamilyHealth)\" data-toggle=\"buttons\"><label class=\"btn ${user.spouseFamilyHealth.checkCancer ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.spouseFamilyHealth.checkCancer ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><label style=\"padding-right:10px\" for=\"mentalhealth\">Mental Illness?</label><div class=\"btn-group\" click.delegate=\"mentalhealth(user.spouseFamilyHealth)\" data-toggle=\"buttons\"><label class=\"btn ${user.spouseFamilyHealth.checkMentalHealth ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.spouseFamilyHealth.checkMentalHealth ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><label style=\"padding-right:10px\" for=\"diabetes\">Diabetes?</label><div class=\"btn-group\" click.delegate=\"diabetes(user.spouseFamilyHealth)\" data-toggle=\"buttons\"><label class=\"btn ${user.spouseFamilyHealth.checkDiabetes ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.spouseFamilyHealth.checkDiabetes ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><br></div><hr style=\"clear:both\"><div id=\"back-button-div\" class=\"col-md-10\"><button id=\"back\" class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div><div id=\"submit-button-div\" class=\"col-md-2\"><button id=\"submit\" type=\"submit\" class=\"btn btn-primary\">Submit</button></div></form></template>"; });
<<<<<<< HEAD
define('text!health/myhealth.html', ['module'], function(module) { module.exports = "<template><require from=\"jquery-ui-dist/jquery-ui.css\"></require><form id=\"myhealth\" submit.delegate=\"submit()\"><div id=\"client\" class=\"${user.clientPersonalInfo.checkspouse ? 'hasSpouse' : 'noSpouse'}\"><h1 style=\"text-align:center\">My Health - Client</h1><div show.bind=\"validHeight\" class=\"alert alert-danger\" role=\"alert\"><strong>Uh oh!</strong> Please be sure to enter a valid height in the format: feet ' inches.</div><div><div class=\"${user.clientMyHealth.formHeightWeight ? 'col-md-8' : 'none'}\"><div class=\"form-group ${heightError}\"><label for=\"height\">Height</label><span id=\"height-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span> <input type=\"text\" value.bind=\"user.clientMyHealth.height\" class=\"form-control\" placeholder=\"5'7\" change.trigger=\"checkHeight(user.clientMyHealth)\"></div><div class=\"form-group\"><label for=\"weight\">Weight</label><span id=\"weight-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span> <input type=\"text\" value.bind=\"user.clientMyHealth.weight\" class=\"form-control\" placeholder=\"155\" change.trigger=\"calculateBMI(user.clientMyHealth)\"></div><div id=\"client-bmi-alert\" class=\"alert alert-success\" show.bind=\"user.clientMyHealth.validBMI\"><strong>BMI: ${user.clientMyHealth.bmi}</strong></div></div><div show.bind=\"user.clientMyHealth.validBMI\" class=\"${user.clientMyHealth.formHeightWeight ? 'col-md-2' : 'none'}\"><img src.bind=\"user.clientMyHealth.iconType\" style=\"width:160px;height:240px\"></div></div><div class=\"form-group\" style=\"clear:both\"><label for=\"healthRank\">How many hours do you exercise per week?</label><span id=\"exercise-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span><select class=\"form-control\" value.bind=\"user.clientMyHealth.exercisePerWeek\"><option data-hidden=\"true\">Please Select</option><option>0</option><option>Less than 2.5 hours</option><option>Approximately 2.5 hours</option><option>More than 2.5 hours</option></select></div><div class=\"form-group\"><label for=\"healthRank\">How would you rank your health?</label><span id=\"health-rank-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span><select class=\"form-control\" value.bind=\"user.clientMyHealth.healthRank\"><option data-hidden=\"true\">Please Select</option><option>Excellent</option><option>Good</option><option>Average</option><option>Bad</option><option>Terrible</option></select></div><hr><h2 style=\"text-align:center\">Habits</h2><div class=\"form-group\"><label for=\"healthRank\">How many alcoholic drinks do you consume per week?</label><select class=\"form-control\" value.bind=\"user.clientMyHealth.alcoholPerWeek\"><option data-hidden=\"true\">Please Select</option><option>0-1</option><option>2-7</option><option>8+</option></select></div><label style=\"padding-right:10px\" for=\"smoking\">Have you ever smoked?</label><div class=\"btn-group\" click.delegate=\"smoking(user.clientMyHealth)\" data-toggle=\"buttons\"><label class=\"btn ${user.clientMyHealth.checksmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientMyHealth.checksmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><div show.bind=\"user.clientMyHealth.checksmoking\"><label style=\"padding-right:10px\" for=\"smoking\">Do you still smoke?</label><div class=\"btn-group\" click.delegate=\"stillSmoking(user.clientMyHealth)\" data-toggle=\"buttons\"><label class=\"btn ${user.clientMyHealth.checkStillSmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientMyHealth.checkStillSmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><br><div show.bind=\"user.clientMyHealth.checkStillSmoking && user.clientMyHealth.checksmoking\" class=\"form-group\"><label for=\"healthRank\">What kind of smoker are you?</label><select class=\"form-control\" value.bind=\"user.clientMyHealth.kindOfSmoker\"><option data-hidden=\"true\">Please Select</option><option>Light: less than 10 cigarretes per day</option><option>Average: between 10 and 20 cigarretes per day</option><option>Heavy: more than 20 cigarretes per day</option></select></div><div show.bind=\"!user.clientMyHealth.checkStillSmoking && user.clientMyHealth.checksmoking\" class=\"form-group\"><label for=\"healthRank\">What kind of smoker were you?</label><select class=\"form-control\" value.bind=\"user.clientMyHealth.kindOfSmoker\"><option data-hidden=\"true\">Please Select</option><option>Light: less than 10 cigarretes per day</option><option>Average: between 10 and 20 cigarretes per day</option><option>Heavy: more than 20 cigarretes per day</option></select></div><div show.bind=\"!user.clientMyHealth.checkStillSmoking && user.clientMyHealth.checksmoking\" class=\"form-group\"><label for=\"healthRank\">At what age did you quit smoking?</label><select class=\"form-control\" value.bind=\"user.clientMyHealth.ageQuitSmoking\"><option data-hidden=\"true\">Please Select</option><option>Before 25</option><option>25-34</option><option>35-44</option><option>45-59</option><option>60+</option></select></div></div><div id=\"spouse\" style=\"width:45%;float:right\" show.bind=\"user.clientPersonalInfo.checkspouse\"><h1 style=\"text-align:center\">My Health - Co-Client</h1><div show.bind=\"validHeightSpouse\" class=\"alert alert-danger\" role=\"alert\"><strong>Uh oh!</strong> Please be sure to enter a valid height in the format: feet ' inches.</div><div><div class=\"${user.spouseMyHealth.formHeightWeight ? 'col-md-6' : 'none'}\"><div class=\"form-group ${heightError}\"><label for=\"height\">Height</label><span id=\"height-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span> <input type=\"text\" value.bind=\"user.spouseMyHealth.height\" class=\"form-control\" placeholder=\"5'7\" change.trigger=\"checkHeight(user.spouseMyHealth)\"></div><div class=\"form-group\"><label for=\"weight\">Weight</label><span id=\"weight-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span> <input type=\"text\" value.bind=\"user.spouseMyHealth.weight\" class=\"form-control\" placeholder=\"155\" change.trigger=\"calculateBMI(user.spouseMyHealth)\"></div><div id=\"client-bmi-alert\" class=\"alert alert-success\" show.bind=\"user.spouseMyHealth.validBMI\"><strong>BMI: ${user.spouseMyHealth.bmi}</strong></div></div><div show.bind=\"user.spouseMyHealth.validBMI\" class=\"${user.spouseMyHealth.formHeightWeight ? 'col-md-3' : 'none'}\"><img src.bind=\"user.spouseMyHealth.iconType\" style=\"width:160px;height:240px\"></div></div><div class=\"form-group\"><label for=\"healthRank\">How many hours do you exercise per week?</label><span id=\"spouse-exercise-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span><select class=\"form-control\" value.bind=\"user.spouseMyHealth.exercisePerWeek\"><option data-hidden=\"true\">Please Select</option><option>0</option><option>Less than 2.5 hours</option><option>Approximately 2.5 hours</option><option>More than 2.5 hours</option></select></div><div class=\"form-group\"><label for=\"healthRank\">How would you rank your health?</label><span id=\"spouse-health-rank-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span><select class=\"form-control\" value.bind=\"user.spouseMyHealth.healthRank\"><option data-hidden=\"true\">Please Select</option><option>Excellent</option><option>Good</option><option>Average</option><option>Bad</option><option>Terrible</option></select></div><hr><h2 style=\"text-align:center\">Habits</h2><div class=\"form-group\"><label for=\"healthRank\">How many alcoholic drinks do you consume per week?</label><select class=\"form-control\" value.bind=\"user.spouseMyHealth.alcoholPerWeek\"><option data-hidden=\"true\">Please Select</option><option>0-1</option><option>2-7</option><option>8+</option></select></div><label style=\"padding-right:10px\" for=\"gender\">Have you ever smoked?</label><div class=\"btn-group\" click.delegate=\"smoking(user.spouseMyHealth)\" data-toggle=\"buttons\"><label class=\"btn ${user.spouseMyHealth.checksmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.spouseMyHealth.checksmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><div show.bind=\"user.spouseMyHealth.checksmoking\"><label style=\"padding-right:10px\" for=\"smoking\">Do you still smoke?</label><div class=\"btn-group\" click.delegate=\"stillSmoking(user.spouseMyHealth)\" data-toggle=\"buttons\"><label class=\"btn ${user.spouseMyHealth.checkStillSmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.spouseMyHealth.checkStillSmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><br><div show.bind=\"user.spouseMyHealth.checkStillSmoking && user.spouseMyHealth.checksmoking\" class=\"form-group\"><label for=\"healthRank\">What kind of smoker are you?</label><select class=\"form-control\" value.bind=\"user.spouseMyHealth.kindOfSmoker\"><option data-hidden=\"true\">Please Select</option><option>Light: less than 10 cigarretes per day</option><option>Average: between 10 and 20 cigarretes per day</option><option>Heavy: more than 20 cigarretes per day</option></select></div><div show.bind=\"!user.spouseMyHealth.checkStillSmoking && user.spouseMyHealth.checksmoking\" class=\"form-group\"><label for=\"healthRank\">What kind of smoker were you?</label><select class=\"form-control\" value.bind=\"user.spouseMyHealth.kindOfSmoker\"><option data-hidden=\"true\">Please Select</option><option>Light: less than 10 cigarretes per day</option><option>Average: between 10 and 20 cigarretes per day</option><option>Heavy: more than 20 cigarretes per day</option></select></div><div show.bind=\"!user.spouseMyHealth.checkStillSmoking && user.spouseMyHealth.checksmoking\" class=\"form-group\"><label for=\"healthRank\">At what age did you quit smoking?</label><select class=\"form-control\" value.bind=\"user.spouseMyHealth.ageQuitSmoking\"><option data-hidden=\"true\">Please Select</option><option>Before 25</option><option>25-34</option><option>35-44</option><option>45-59</option><option>60+</option></select></div><br><br><br></div><br><hr style=\"clear:both\"><div id=\"back-button-div\" class=\"col-md-10\"><button id=\"back\" class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div><div id=\"submit-button-div\" class=\"col-md-2\"><button id=\"submit\" type=\"submit\" class=\"btn btn-primary\">Submit</button></div></form></template>"; });
=======
define('text!health/myhealth.html', ['module'], function(module) { module.exports = "<template><require from=\"jquery-ui-dist/jquery-ui.css\"></require><form id=\"myhealth\" submit.delegate=\"submit()\"><div id=\"client\" class=\"${user.clientPersonalInfo.checkspouse ? 'hasSpouse' : 'noSpouse'}\"><h1 style=\"text-align:center\">My Health - Client</h1><div show.bind=\"validHeight\" class=\"alert alert-danger\" role=\"alert\"><strong>Uh oh!</strong> Please be sure to enter a valid height in the format: feet ' inches.</div><div><div class=\"${user.clientMyHealth.formHeightWeight ? 'col-md-8' : 'none'}\"><div class=\"form-group ${heightError}\"><label for=\"height\">Height</label><span id=\"height-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span> <input type=\"text\" value.bind=\"user.clientMyHealth.height\" class=\"form-control\" placeholder=\"5'7\" change.trigger=\"checkHeight(user.clientMyHealth)\"></div><div class=\"form-group\"><label for=\"weight\">Weight</label><span id=\"weight-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span> <input type=\"text\" value.bind=\"user.clientMyHealth.weight\" class=\"form-control\" placeholder=\"155\" change.trigger=\"calculateBMI(user.clientMyHealth)\"></div><div id=\"client-bmi-alert\" class=\"alert alert-success\" show.bind=\"user.clientMyHealth.validBMI\"><strong>BMI: ${user.clientMyHealth.bmi}</strong></div></div><div show.bind=\"user.clientMyHealth.validBMI\" class=\"${user.clientMyHealth.formHeightWeight ? 'col-md-2' : 'none'}\"><img src.bind=\"user.clientMyHealth.iconType\" style=\"width:150px;height:220px\"></div></div><div class=\"form-group\" style=\"clear:both\"><label for=\"healthRank\">How many hours do you exercise per week?</label><span id=\"exercise-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span><select class=\"form-control\" value.bind=\"user.clientMyHealth.exercisePerWeek\"><option data-hidden=\"true\">Please Select</option><option>0</option><option>Less than 2.5 hours</option><option>Approximately 2.5 hours</option><option>More than 2.5 hours</option></select></div><div class=\"form-group\"><label for=\"healthRank\">How would you rank your health?</label><span id=\"health-rank-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span><select class=\"form-control\" value.bind=\"user.clientMyHealth.healthRank\"><option data-hidden=\"true\">Please Select</option><option>Excellent</option><option>Good</option><option>Average</option><option>Bad</option><option>Terrible</option></select></div><hr><h2 style=\"text-align:center\">Habits</h2><div class=\"form-group\"><label for=\"healthRank\">How many alcoholic drinks do you consume per week?</label><select class=\"form-control\" value.bind=\"user.clientMyHealth.alcoholPerWeek\"><option data-hidden=\"true\">Please Select</option><option>0-1</option><option>2-7</option><option>8+</option></select></div><label style=\"padding-right:10px\" for=\"smoking\">Have you ever smoked?</label><div class=\"btn-group\" click.delegate=\"smoking(user.clientMyHealth)\" data-toggle=\"buttons\"><label class=\"btn ${user.clientMyHealth.checksmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientMyHealth.checksmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><div show.bind=\"user.clientMyHealth.checksmoking\"><label style=\"padding-right:10px\" for=\"smoking\">Do you still smoke?</label><div class=\"btn-group\" click.delegate=\"stillSmoking(user.clientMyHealth)\" data-toggle=\"buttons\"><label class=\"btn ${user.clientMyHealth.checkStillSmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientMyHealth.checkStillSmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><br><div show.bind=\"user.clientMyHealth.checkStillSmoking && user.clientMyHealth.checksmoking\" class=\"form-group\"><label for=\"healthRank\">What kind of smoker are you?</label><select class=\"form-control\" value.bind=\"user.clientMyHealth.kindOfSmoker\"><option data-hidden=\"true\">Please Select</option><option>Light</option><option>Average</option><option>Heavy</option></select></div><div show.bind=\"!user.clientMyHealth.checkStillSmoking && user.clientMyHealth.checksmoking\" class=\"form-group\"><label for=\"healthRank\">What kind of smoker were you?</label><select class=\"form-control\" value.bind=\"user.clientMyHealth.kindOfSmoker\"><option data-hidden=\"true\">Please Select</option><option>Light</option><option>Average</option><option>Heavy</option></select></div><div show.bind=\"!user.clientMyHealth.checkStillSmoking && user.clientMyHealth.checksmoking\" class=\"form-group\"><label for=\"healthRank\">At what age did you quit smoking?</label><select class=\"form-control\" value.bind=\"user.clientMyHealth.ageQuitSmoking\"><option data-hidden=\"true\">Please Select</option><option>Before 25</option><option>25-34</option><option>35-44</option><option>45-59</option><option>60+</option></select></div></div><div id=\"spouse\" style=\"width:45%;float:right\" show.bind=\"user.clientPersonalInfo.checkspouse\"><h1 style=\"text-align:center\">My Health - Co-Client</h1><div show.bind=\"validHeightSpouse\" class=\"alert alert-danger\" role=\"alert\"><strong>Uh oh!</strong> Please be sure to enter a valid height in the format: feet ' inches.</div><div><div class=\"${user.spouseMyHealth.formHeightWeight ? 'col-md-8' : 'none'}\"><div class=\"form-group ${heightError}\"><label for=\"height\">Height</label><span id=\"height-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span> <input type=\"text\" value.bind=\"user.spouseMyHealth.height\" class=\"form-control\" placeholder=\"5'7\" change.trigger=\"checkHeight(user.spouseMyHealth)\"></div><div class=\"form-group\"><label for=\"weight\">Weight</label><span id=\"weight-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span> <input type=\"text\" value.bind=\"user.spouseMyHealth.weight\" class=\"form-control\" placeholder=\"155\" change.trigger=\"calculateBMI(user.spouseMyHealth)\"></div><div id=\"client-bmi-alert\" class=\"alert alert-success\" show.bind=\"user.spouseMyHealth.validBMI\"><strong>BMI: ${user.spouseMyHealth.bmi}</strong></div></div><div show.bind=\"user.spouseMyHealth.validBMI\" class=\"${user.spouseMyHealth.formHeightWeight ? 'col-md-2' : 'none'}\"><img src.bind=\"user.spouseMyHealth.iconType\" style=\"width:150px;height:220px\"></div></div><div class=\"form-group\"><label for=\"healthRank\">How many hours do you exercise per week?</label><span id=\"spouse-exercise-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span><select class=\"form-control\" value.bind=\"user.spouseMyHealth.exercisePerWeek\"><option data-hidden=\"true\">Please Select</option><option>0</option><option>Less than 2.5 hours</option><option>Approximately 2.5 hours</option><option>More than 2.5 hours</option></select></div><div class=\"form-group\"><label for=\"healthRank\">How would you rank your health?</label><span id=\"spouse-health-rank-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span><select class=\"form-control\" value.bind=\"user.spouseMyHealth.healthRank\"><option data-hidden=\"true\">Please Select</option><option>Excellent</option><option>Good</option><option>Average</option><option>Bad</option><option>Terrible</option></select></div><hr><h2 style=\"text-align:center\">Habits</h2><div class=\"form-group\"><label for=\"healthRank\">How many alcoholic drinks do you consume per week?</label><select class=\"form-control\" value.bind=\"user.spouseMyHealth.alcoholPerWeek\"><option data-hidden=\"true\">Please Select</option><option>0-1</option><option>2-7</option><option>8+</option></select></div><label style=\"padding-right:10px\" for=\"gender\">Have you ever smoked?</label><div class=\"btn-group\" click.delegate=\"smoking(user.spouseMyHealth)\" data-toggle=\"buttons\"><label class=\"btn ${user.spouseMyHealth.checksmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.spouseMyHealth.checksmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><div show.bind=\"user.spouseMyHealth.checksmoking\"><label style=\"padding-right:10px\" for=\"smoking\">Do you still smoke?</label><div class=\"btn-group\" click.delegate=\"stillSmoking(user.spouseMyHealth)\" data-toggle=\"buttons\"><label class=\"btn ${user.spouseMyHealth.checkStillSmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.spouseMyHealth.checkStillSmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><br><div show.bind=\"user.spouseMyHealth.checkStillSmoking && user.spouseMyHealth.checksmoking\" class=\"form-group\"><label for=\"healthRank\">What kind of smoker are you?</label><select class=\"form-control\" value.bind=\"user.spouseMyHealth.kindOfSmoker\"><option data-hidden=\"true\">Please Select</option><option>Light</option><option>Average</option><option>Heavy</option></select></div><div show.bind=\"!user.spouseMyHealth.checkStillSmoking && user.spouseMyHealth.checksmoking\" class=\"form-group\"><label for=\"healthRank\">What kind of smoker were you?</label><select class=\"form-control\" value.bind=\"user.spouseMyHealth.kindOfSmoker\"><option data-hidden=\"true\">Please Select</option><option>Light</option><option>Average</option><option>Heavy</option></select></div><br><div show.bind=\"!user.spouseMyHealth.checkStillSmoking && user.spouseMyHealth.checksmoking\" class=\"form-group\"><label for=\"healthRank\">At what age did you quit smoking?</label><select class=\"form-control\" value.bind=\"user.spouseMyHealth.ageQuitSmoking\"><option data-hidden=\"true\">Please Select</option><option>Before 25</option><option>25-34</option><option>35-44</option><option>45-59</option><option>60+</option></select></div><br><br><br></div><br><hr style=\"clear:both\"><div id=\"back-button-div\" class=\"col-md-10\"><button id=\"back\" class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div><div id=\"submit-button-div\" class=\"col-md-2\"><button id=\"submit\" type=\"submit\" class=\"btn btn-primary\">Submit</button></div></form></template>"; });
>>>>>>> 59bd42975ff1a6c6c11604587ce5b1933b934ec5
define('text!occupation/occupation.html', ['module'], function(module) { module.exports = "<template><form id=\"occupation\" submit.delegate=\"submit()\"><div id=\"client\" class=\"${user.clientPersonalInfo.checkspouse ? 'hasSpouse' : 'noSpouse'}\"><h1 style=\"text-align:center\">Occupation - Client</h1><hr><h4><b>Do you have experience working in...</b></h4><label style=\"padding-right:10px\" for=\"education\">Education?</label><div class=\"btn-group\" click.delegate=\"education(user.clientOccupation)\" data-toggle=\"buttons\"><label class=\"btn ${user.clientOccupation.checkEducation ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientOccupation.checkEducation ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><label style=\"padding-right:10px\" for=\"construction\">Construction?</label><div class=\"btn-group\" click.delegate=\"construction(user.clientOccupation)\" data-toggle=\"buttons\"><label class=\"btn ${user.clientOccupation.checkConstruction ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientOccupation.checkConstruction ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><label style=\"padding-right:10px\" for=\"emergencyResponding\">Emergency Responding?</label><div class=\"btn-group\" click.delegate=\"emergencyResponding(user.clientOccupation)\" data-toggle=\"buttons\"><label class=\"btn ${user.clientOccupation.checkEmergencyResponding ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientOccupation.checkEmergencyResponding ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><div id=\"spouse\" style=\"width:45%;float:right\" show.bind=\"user.clientPersonalInfo.checkspouse\"><h1 style=\"text-align:center\">Occupation - Co-Client</h1><hr><h4><b>Do you have experience working in...</b></h4><label style=\"padding-right:10px\" for=\"education\">Education?</label><div class=\"btn-group\" click.delegate=\"education(user.spouseOccupation)\" data-toggle=\"buttons\"><label class=\"btn ${user.spouseOccupation.checkEducation ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.spouseOccupation.checkEducation ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><label style=\"padding-right:10px\" for=\"construction\">Construction?</label><div class=\"btn-group\" click.delegate=\"construction(user.spouseOccupation)\" data-toggle=\"buttons\"><label class=\"btn ${user.spouseOccupation.checkConstruction ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.spouseOccupation.checkConstruction ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><label style=\"padding-right:10px\" for=\"emergencyResponding\">Emergency Responding?</label><div class=\"btn-group\" click.delegate=\"emergencyResponding(user.spouseOccupation)\" data-toggle=\"buttons\"><label class=\"btn ${user.spouseOccupation.checkEmergencyResponding ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.spouseOccupation.checkEmergencyResponding ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><br></div><hr style=\"clear:both\"><div id=\"back-button-div\" class=\"col-md-10\"><button id=\"back\" class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div><div id=\"submit-button-div\" class=\"col-md-2\"><button id=\"submit\" type=\"submit\" class=\"btn btn-primary\">Submit</button></div></form></template>"; });
define('text!results/results.html', ['module'], function(module) { module.exports = "<template><require from=\"highcharts/css/highcharts.css\"></require><div id=\"results\"><h1 style=\"text-align:center\">Results</h1><div id=\"chart-container\" style=\"width:100%;height:400px\"></div><div class=\"table-outter\"><table class=\"table table-hover table-bordered search-table\"><thead></thead><tbody></tbody></table></div><hr style=\"clear:both\"><div id=\"back-button-div-home\" class=\"col-md-10\"><button id=\"back\" class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map