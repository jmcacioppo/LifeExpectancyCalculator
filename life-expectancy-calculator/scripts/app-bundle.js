define('app',['exports', 'jquery', 'aurelia-framework', 'aurelia-fetch-client', 'bootstrap'], function (exports, _jquery, _aureliaFramework, _aureliaFetchClient) {
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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function App(http) {
      _classCallCheck(this, App);

      this.message = 'Life Expectancy Calculator';
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = "Life Expectancy Calculator";
      config.map([{ route: ['', 'personalinfo'], moduleId: 'aboutyou/personalinfo',
        name: 'personalinfo', title: 'Personal Info', nav: true }, { route: 'myhealth', moduleId: 'health/myhealth',
        name: 'myhealth', title: 'My Health', nav: true }, { route: 'familyhealth', moduleId: 'health/familyhealth',
        name: 'familyhealth', title: 'Family Health', nav: true }, { route: 'occupation', moduleId: 'occupation/occupation',
        name: 'occupation', title: 'Occupation', nav: true }, { route: 'results', moduleId: 'results/results',
        name: 'results', title: 'Results', nav: true }]);
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
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"css/styles.css\"></require><div id=\"home\"><h1>Life Expectancy Calculator</h1></div><router-view></router-view></template>"; });
define('text!css/styles.css', ['module'], function(module) { module.exports = "#home, #personalinfo, #myhealth, #familyhealth, #occupation, #results {    \r\n    text-align: center;\r\n    margin: 0 auto;\r\n    width: 500px;\r\n}"; });
define('text!aboutyou/personalinfo.html', ['module'], function(module) { module.exports = "<template><form id=\"personalinfo\" submit.delegate=\"submit()\"><h1>Personal Info</h1><div class=\"form-group\"><label for=\"age\">Age</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.age\" class=\"form-control\" placeholder=\"30\"></div><div click.delegate=\"gender()\" class=\"btn-group\" data-toggle=\"buttons\"><label class=\"btn ${user.clientPersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Male</label><label class=\"btn ${!user.clientPersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Female</label></div><br><br><div class=\"form-group\"><label for=\"race\">Race</label><select class=\"form-control\" value.bind=\"user.clientPersonalInfo.race\"><option data-hidden=\"true\">Please Select</option><option>White</option><option>Black</option><option>Hispanic</option><option>Asian</option></select></div><br><button class=\"btn btn-primary\" click.delegate=\"myhealth()\">My Health</button> <button class=\"btn btn-primary\" click.delegate=\"familyhealth()\">My Family Health</button> <button class=\"btn btn-primary\" click.delegate=\"occupation()\">My Occupation</button> <button type=\"submit\" class=\"btn btn-primary\">Submit</button></form></template>"; });
define('text!health/familyhealth.html', ['module'], function(module) { module.exports = "<template><div id=\"familyhealth\"><h1>Family Health</h1><button class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div></template>"; });
define('text!health/myhealth.html', ['module'], function(module) { module.exports = "<template><div id=\"myhealth\"><h1>My Health</h1><button class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div></template>"; });
define('text!occupation/occupation.html', ['module'], function(module) { module.exports = "<template><div id=\"occupation\"><h1>Occupation</h1><button class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div></template>"; });
define('text!results/results.html', ['module'], function(module) { module.exports = "<template><div id=\"results\"><h1>Results</h1><button class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div></template>"; });
//# sourceMappingURL=app-bundle.js.map