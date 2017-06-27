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
define('aboutyou/myhealth',['exports', 'aurelia-framework', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaRouter) {
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

    var myhealth = exports.myhealth = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function myhealth(router) {
        _classCallCheck(this, myhealth);

        this.router = router;
    }) || _class);
});
define('aboutyou/personalinfo',['exports', 'aurelia-framework', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaRouter) {
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

    var personalinfo = exports.personalinfo = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function personalinfo(router) {
        _classCallCheck(this, personalinfo);

        this.router = router;
    }) || _class);
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

    var results = exports.results = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function results(router) {
        _classCallCheck(this, results);

        this.router = router;
    }) || _class);
});
define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
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
  }();
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

    var myhealth = exports.myhealth = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function myhealth(router) {
        _classCallCheck(this, myhealth);

        this.router = router;
    }) || _class);
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

    var familyhealth = exports.familyhealth = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function familyhealth(router) {
        _classCallCheck(this, familyhealth);

        this.router = router;
    }) || _class);
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

    var occupation = exports.occupation = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function occupation(router) {
        _classCallCheck(this, occupation);

        this.router = router;
    }) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><h1>Life Expectancy Calculator</h1><div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\"><ul class=\"nav navbar-nav\"><li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : 'disabled'}\"><a href.bind=\"row.href\">${row.title}</a></li></ul></div><router-view></router-view></template>"; });
define('text!aboutyou/myhealth.html', ['module'], function(module) { module.exports = "<template><h1>My Health</h1></template>"; });
define('text!aboutyou/personalinfo.html', ['module'], function(module) { module.exports = "<template><h1>Personal Info</h1></template>"; });
define('text!results/results.html', ['module'], function(module) { module.exports = "<template><h1>Results</h1></template>"; });
define('text!health/myhealth.html', ['module'], function(module) { module.exports = "<template><h1>My Health</h1></template>"; });
define('text!health/familyhealth.html', ['module'], function(module) { module.exports = "<template><h1>Family Health</h1></template>"; });
define('text!occupation/occupation.html', ['module'], function(module) { module.exports = "<template><h1>Occupation</h1></template>"; });
//# sourceMappingURL=app-bundle.js.map