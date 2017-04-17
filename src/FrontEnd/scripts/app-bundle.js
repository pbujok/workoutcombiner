define('about',['exports', 'aurelia-fetch-client', 'aurelia-framework', 'helpers/data-configuration'], function (exports, _aureliaFetchClient, _aureliaFramework, _dataConfiguration) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.About = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var About = exports.About = (_dec = (0, _aureliaFramework.inject)(_dataConfiguration.DataConfiguration), _dec(_class = function () {
        function About(configuraton) {
            _classCallCheck(this, About);

            this.content = "";
            this.title = "";

            this.http = new _aureliaFetchClient.HttpClient().configure(function (config) {
                config.withBaseUrl(configuraton.apiUrl);
            });
        }

        About.prototype.activate = function activate() {
            var that = this;
            this.http.fetch('/api/StaticPage/about').then(function (response) {
                return response.json();
            }).then(function (content) {
                that.title = content.title;
                that.content = content.description;
            });
        };

        return About;
    }()) || _class);
});
define('app',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.App = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    var _dec, _desc, _value, _class;

    var App = exports.App = (_dec = (0, _aureliaFramework.computedFrom)("activePage"), (_class = function () {
        App.prototype.configureRouter = function configureRouter(config, router) {
            this.router = router;
            config.title = 'Single workout';
            config.map([{ route: '', name: 'home', moduleId: 'home' }, { route: '/about', name: 'about', moduleId: 'about' }, { route: '/form', name: 'form', moduleId: 'form' }]);
        };

        function App() {
            _classCallCheck(this, App);

            this.message = 'Hello World!';
            this.name = "name";
            this.activePage = 'home';
        }

        App.prototype.SetActive = function SetActive(pageName) {
            this.activePage = pageName;
            return true;
        };

        _createClass(App, [{
            key: 'Active',
            get: function get() {
                return this.activePage;
            }
        }]);

        return App;
    }(), (_applyDecoratedDescriptor(_class.prototype, 'Active', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'Active'), _class.prototype)), _class));
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
define('form',['exports', 'aurelia-framework', 'aurelia-validation', 'aurelia-fetch-client', 'helpers/workout-file-uploader', 'helpers/input-data-file-specification', 'toastr/toastr'], function (exports, _aureliaFramework, _aureliaValidation, _aureliaFetchClient, _workoutFileUploader, _inputDataFileSpecification, _toastr) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Person = exports.Form = undefined;

    var toastr = _interopRequireWildcard(_toastr);

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

    var _dec, _class;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var WorkoutAttributes = function WorkoutAttributes(pulse, altitude, distance, cadence) {
        _classCallCheck(this, WorkoutAttributes);

        this.pulse = pulse;
        this.altitude = altitude;
        this.distance = distance;
        this.cadence = cadence;
    };

    var FileInput = function () {
        function FileInput() {
            var file = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

            _classCallCheck(this, FileInput);

            this.file = file;

            this.conflicts = new WorkoutAttributes(false, false, false, false);
            this.priority = new WorkoutAttributes(false, false, false, false);
        }

        FileInput.prototype.pick = function pick($event) {
            $($event.srcElement).siblings("input[type='file']").click();
        };

        FileInput.prototype.addConflictedProperty = function addConflictedProperty(propertyName) {
            this.conflicts[propertyName.toLowerCase()] = true;
        };

        return FileInput;
    }();

    var Form = exports.Form = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.NewInstance.of(_aureliaValidation.ValidationController), _workoutFileUploader.WorkoutFileUploader, toastr), _dec(_class = function () {
        function Form(controller, workoutFileUploader, toastr) {
            _classCallCheck(this, Form);

            this.name = "";
            this.person = new Person('MALE', 75, 25);
            this.toastr = toastr;

            this.fileInputs = [];
            this._controller = controller;
            this.workoutFileUploader = workoutFileUploader;
            this.isDragover = false;

            this._defineValidationRules();
            this._initDropTarget();
        }

        Form.prototype.addFileInput = function addFileInput() {
            this.fileInputs.push(new FileInput());
        };

        Form.prototype.removeFile = function removeFile(file) {
            var index = this.fileInputs.findIndex(function (n) {
                return n === file;
            });
            this.fileInputs.splice(index, 1);
        };

        Form.prototype.submit = function submit() {
            var _this = this;

            var self = this;
            this._controller.validate().then(function (result) {
                if (result.length > 0) {
                    return;
                }
                var priorityInfo = _this._constructPriorityInfo();
                var files = _this.fileInputs.map(function (fileInput) {
                    return fileInput.file;
                });
                _this.workoutFileUploader.postFileAjax(files, _this.name, _this.person, priorityInfo).then(function () {
                    alert('sukces');
                }).fail(function (data) {
                    var conflictInfo = JSON.parse(data),
                        conflict = void 0,
                        fileIndex = void 0;
                    for (var i in conflictInfo) {
                        conflict = conflictInfo[i];
                        for (var f in conflict.containingFile) {
                            fileIndex = conflict.containingFile[f];
                            self.fileInputs[fileIndex].addConflictedProperty(conflict.propertyName);
                        }
                    }

                    _this.toastr.error("There are conflicts");
                });
            });
        };

        Form.prototype._constructPriorityInfo = function _constructPriorityInfo() {
            var file = void 0,
                result = [],
                priorityInfo = void 0;
            for (var i in this.fileInputs) {
                priorityInfo = [];
                file = this.fileInputs[i];
                for (var p in file.priority) {
                    if (file.priority[p] === "on") {
                        priorityInfo.push(p);
                    }
                }
                result.push({ FileIndex: i, PriorityInfo: priorityInfo });
            }
            return result;
        };

        Form.prototype._defineValidationRules = function _defineValidationRules() {
            this._controller.validateTrigger = _aureliaValidation.validateTrigger.blur;
        };

        Form.prototype._dropFileHandler = function _dropFileHandler(e) {
            e.preventDefault();
            if (e.originalEvent && e.originalEvent.dataTransfer) {
                var fileSpecification = new _inputDataFileSpecification.InputDataFileSpecification();
                for (var file in e.originalEvent.dataTransfer.files) {
                    file = e.originalEvent.dataTransfer.files[file];
                    if (fileSpecification.isSatifiedBy(file)) {
                        this.fileInputs.push(new FileInput(file));
                    }
                }
            }
        };

        Form.prototype._initDropTarget = function _initDropTarget() {
            var that = this;
            $(document).on('drag dragstart dragend dragover dragenter dragleave drop', '.upload-file-cnt', function (e) {
                e.preventDefault();
                e.stopPropagation();
            }).on('dragover dragenter', '.upload-file-cnt', function () {
                return that.isDragover = true;
            }).on('dragleave dragend drop', '.upload-file-cnt', function () {
                return that.isDragover = false;
            }).on('drop', '.upload-file-cnt', this._dropFileHandler.bind(this));
        };

        return Form;
    }()) || _class);

    var Person = exports.Person = function Person(sex, weight, age) {
        _classCallCheck(this, Person);

        this.Sex = sex;
        this.KilogramsWeight = weight;
        this.Age = age;
    };

    ;

    _aureliaValidation.ValidationRules.ensure('name').required().minLength(3).on(Form);

    _aureliaValidation.ValidationRules.ensure('Age').required().minLength(2).ensure('KilogramsWeight').required().minLength(2).ensure('Sex').required().matches(/MALE|FAMALE/).on(Person);
});
define('home',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Home = exports.Home = function Home() {
        _classCallCheck(this, Home);
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

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing').plugin('aurelia-validation');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('navigation',["exports", "helpers/nav-element"], function (exports, _navElement) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Navigation = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Navigation = exports.Navigation = function () {
        function Navigation() {
            _classCallCheck(this, Navigation);

            this.home = new _navElement.NavElement("Home");
            this.about = new _navElement.NavElement("About");
            this.form = new _navElement.NavElement("Upload");
            this._active = this.home;
        }

        Navigation.prototype.changeActive = function changeActive(navElement) {
            this._active.deactivate();
            navElement.activate();
            this._active = navElement;
            return true;
        };

        return Navigation;
    }();
});
define('helpers/data-configuration',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var DataConfiguration = exports.DataConfiguration = function DataConfiguration() {
        _classCallCheck(this, DataConfiguration);

        this.apiUrl = "http://localhost:64973";
    };
});
define('helpers/input-data-file-specification',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var InputDataFileSpecification = exports.InputDataFileSpecification = function () {
        function InputDataFileSpecification() {
            _classCallCheck(this, InputDataFileSpecification);

            this._expectedExtencions = ["tcx", "gpx"];
        }

        InputDataFileSpecification.prototype.isSatifiedBy = function isSatifiedBy(file) {

            if (file == null) {
                return false;
            }

            if (file.name === undefined && file.type === undefined) {
                return false;
            }

            if (file.type && file.type !== "") {
                return this._isOfRequiredType(file);
            } else {
                return this._hasRequiredExtenction(file);
            }
        };

        InputDataFileSpecification.prototype._isOfRequiredType = function _isOfRequiredType(file) {
            return this._expectedExtencions.indexOf(file.type) !== -1;
        };

        InputDataFileSpecification.prototype._hasRequiredExtenction = function _hasRequiredExtenction(file) {
            return this._expectedExtencions.findIndex(function (ex) {
                return file.name.endsWith(ex);
            }) !== -1;
        };

        return InputDataFileSpecification;
    }();
});
define('helpers/nav-element',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.NavElement = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    var _dec, _desc, _value, _class;

    var NavElement = exports.NavElement = (_dec = (0, _aureliaFramework.computedFrom)("_isActive"), (_class = function () {
        function NavElement(name) {
            _classCallCheck(this, NavElement);

            this.name = name;
            this._isActive = false;
        }

        NavElement.prototype.deactivate = function deactivate() {
            this._isActive = false;
        };

        NavElement.prototype.activate = function activate() {
            this._isActive = true;
        };

        _createClass(NavElement, [{
            key: 'isActiveClass',
            get: function get() {
                return this._isActive ? 'active' : '';
            }
        }]);

        return NavElement;
    }(), (_applyDecoratedDescriptor(_class.prototype, 'isActiveClass', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'isActiveClass'), _class.prototype)), _class));
});
define('helpers/workout-file-uploader',['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'helpers/data-configuration'], function (exports, _aureliaFramework, _aureliaEventAggregator, _dataConfiguration) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.WorkoutFileUploader = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var WorkoutFileUploader = exports.WorkoutFileUploader = (_dec = (0, _aureliaFramework.inject)(_dataConfiguration.DataConfiguration, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
        function WorkoutFileUploader(configuration, eventAggregator) {
            _classCallCheck(this, WorkoutFileUploader);

            this.configuration = configuration;
            this.eventAggregator = eventAggregator;
        }

        WorkoutFileUploader.prototype.postFileAjax = function postFileAjax(files, name, person, priority) {
            var data = new FormData(),
                that = this,
                deferred = jQuery.Deferred();

            data.append("model.Name", name);
            data.append("model.Priority", JSON.stringify(priority));

            for (var prop in person) {
                data.append("model." + prop, person[prop]);
            }

            for (var x = 0; x < files.length; x++) {
                data.append(files[x].name, files[x]);
            }

            $.ajax({
                type: "post",
                url: this.configuration.apiUrl + '/api/Merge',
                contentType: false,
                processData: false,
                data: data,
                success: function success(response) {
                    var data = new Blob([response.documentElement.outerHTML], { type: 'text/xml' });
                    saveAs(data, name + '.tcx');
                    deferred.resolve();
                },
                error: function error(xhr, status, err) {
                    deferred.reject(xhr.responseText);
                }
            });

            return deferred;
        };

        return WorkoutFileUploader;
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
define('value_converters/file-input-value-converter',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var FileInputValueConverter = exports.FileInputValueConverter = function () {
        function FileInputValueConverter() {
            _classCallCheck(this, FileInputValueConverter);
        }

        FileInputValueConverter.prototype.fromView = function fromView(fileList) {
            if (fileList[0]) {
                return fileList[0];
            }
        };

        return FileInputValueConverter;
    }();
});
define('value_converters/file-name-value-converter',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var FileNameValueConverter = exports.FileNameValueConverter = function () {
        function FileNameValueConverter() {
            _classCallCheck(this, FileNameValueConverter);
        }

        FileNameValueConverter.prototype.toView = function toView(file) {
            if (file) {
                return file.name;
            }
            return "...";
        };

        return FileNameValueConverter;
    }();
});
define('aurelia-validation/property-info',["require", "exports", "aurelia-binding"], function (require, exports, aurelia_binding_1) {
    "use strict";
    function getObject(expression, objectExpression, source) {
        var value = objectExpression.evaluate(source, null);
        if (value === null || value === undefined || value instanceof Object) {
            return value;
        }
        /* tslint:disable */
        throw new Error("The '" + objectExpression + "' part of '" + expression + "' evaluates to " + value + " instead of an object, null or undefined.");
        /* tslint:enable */
    }
    /**
     * Retrieves the object and property name for the specified expression.
     * @param expression The expression
     * @param source The scope
     */
    function getPropertyInfo(expression, source) {
        var originalExpression = expression;
        while (expression instanceof aurelia_binding_1.BindingBehavior || expression instanceof aurelia_binding_1.ValueConverter) {
            expression = expression.expression;
        }
        var object;
        var propertyName;
        if (expression instanceof aurelia_binding_1.AccessScope) {
            object = source.bindingContext;
            propertyName = expression.name;
        }
        else if (expression instanceof aurelia_binding_1.AccessMember) {
            object = getObject(originalExpression, expression.object, source);
            propertyName = expression.name;
        }
        else if (expression instanceof aurelia_binding_1.AccessKeyed) {
            object = getObject(originalExpression, expression.object, source);
            propertyName = expression.key.evaluate(source);
        }
        else {
            throw new Error("Expression '" + originalExpression + "' is not compatible with the validate binding-behavior.");
        }
        if (object === null || object === undefined) {
            return null;
        }
        return { object: object, propertyName: propertyName };
    }
    exports.getPropertyInfo = getPropertyInfo;
});

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define('aurelia-validation/validate-binding-behavior',["require", "exports", "aurelia-task-queue", "./validate-trigger", "./validate-binding-behavior-base"], function (require, exports, aurelia_task_queue_1, validate_trigger_1, validate_binding_behavior_base_1) {
    "use strict";
    /**
     * Binding behavior. Indicates the bound property should be validated
     * when the validate trigger specified by the associated controller's
     * validateTrigger property occurs.
     */
    var ValidateBindingBehavior = (function (_super) {
        __extends(ValidateBindingBehavior, _super);
        function ValidateBindingBehavior() {
            return _super.apply(this, arguments) || this;
        }
        ValidateBindingBehavior.prototype.getValidateTrigger = function (controller) {
            return controller.validateTrigger;
        };
        return ValidateBindingBehavior;
    }(validate_binding_behavior_base_1.ValidateBindingBehaviorBase));
    ValidateBindingBehavior.inject = [aurelia_task_queue_1.TaskQueue];
    exports.ValidateBindingBehavior = ValidateBindingBehavior;
    /**
     * Binding behavior. Indicates the bound property will be validated
     * manually, by calling controller.validate(). No automatic validation
     * triggered by data-entry or blur will occur.
     */
    var ValidateManuallyBindingBehavior = (function (_super) {
        __extends(ValidateManuallyBindingBehavior, _super);
        function ValidateManuallyBindingBehavior() {
            return _super.apply(this, arguments) || this;
        }
        ValidateManuallyBindingBehavior.prototype.getValidateTrigger = function () {
            return validate_trigger_1.validateTrigger.manual;
        };
        return ValidateManuallyBindingBehavior;
    }(validate_binding_behavior_base_1.ValidateBindingBehaviorBase));
    ValidateManuallyBindingBehavior.inject = [aurelia_task_queue_1.TaskQueue];
    exports.ValidateManuallyBindingBehavior = ValidateManuallyBindingBehavior;
    /**
     * Binding behavior. Indicates the bound property should be validated
     * when the associated element blurs.
     */
    var ValidateOnBlurBindingBehavior = (function (_super) {
        __extends(ValidateOnBlurBindingBehavior, _super);
        function ValidateOnBlurBindingBehavior() {
            return _super.apply(this, arguments) || this;
        }
        ValidateOnBlurBindingBehavior.prototype.getValidateTrigger = function () {
            return validate_trigger_1.validateTrigger.blur;
        };
        return ValidateOnBlurBindingBehavior;
    }(validate_binding_behavior_base_1.ValidateBindingBehaviorBase));
    ValidateOnBlurBindingBehavior.inject = [aurelia_task_queue_1.TaskQueue];
    exports.ValidateOnBlurBindingBehavior = ValidateOnBlurBindingBehavior;
    /**
     * Binding behavior. Indicates the bound property should be validated
     * when the associated element is changed by the user, causing a change
     * to the model.
     */
    var ValidateOnChangeBindingBehavior = (function (_super) {
        __extends(ValidateOnChangeBindingBehavior, _super);
        function ValidateOnChangeBindingBehavior() {
            return _super.apply(this, arguments) || this;
        }
        ValidateOnChangeBindingBehavior.prototype.getValidateTrigger = function () {
            return validate_trigger_1.validateTrigger.change;
        };
        return ValidateOnChangeBindingBehavior;
    }(validate_binding_behavior_base_1.ValidateBindingBehaviorBase));
    ValidateOnChangeBindingBehavior.inject = [aurelia_task_queue_1.TaskQueue];
    exports.ValidateOnChangeBindingBehavior = ValidateOnChangeBindingBehavior;
    /**
     * Binding behavior. Indicates the bound property should be validated
     * when the associated element blurs or is changed by the user, causing
     * a change to the model.
     */
    var ValidateOnChangeOrBlurBindingBehavior = (function (_super) {
        __extends(ValidateOnChangeOrBlurBindingBehavior, _super);
        function ValidateOnChangeOrBlurBindingBehavior() {
            return _super.apply(this, arguments) || this;
        }
        ValidateOnChangeOrBlurBindingBehavior.prototype.getValidateTrigger = function () {
            return validate_trigger_1.validateTrigger.changeOrBlur;
        };
        return ValidateOnChangeOrBlurBindingBehavior;
    }(validate_binding_behavior_base_1.ValidateBindingBehaviorBase));
    ValidateOnChangeOrBlurBindingBehavior.inject = [aurelia_task_queue_1.TaskQueue];
    exports.ValidateOnChangeOrBlurBindingBehavior = ValidateOnChangeOrBlurBindingBehavior;
});

define('aurelia-validation/validate-trigger',["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Validation triggers.
     */
    exports.validateTrigger = {
        /**
         * Manual validation.  Use the controller's `validate()` and  `reset()` methods
         * to validate all bindings.
         */
        manual: 0,
        /**
         * Validate the binding when the binding's target element fires a DOM "blur" event.
         */
        blur: 1,
        /**
         * Validate the binding when it updates the model due to a change in the view.
         */
        change: 2,
        /**
         * Validate the binding when the binding's target element fires a DOM "blur" event and
         * when it updates the model due to a change in the view.
         */
        changeOrBlur: 3
    };
});

define('aurelia-validation/validate-binding-behavior-base',["require", "exports", "aurelia-dependency-injection", "aurelia-pal", "./validation-controller", "./validate-trigger"], function (require, exports, aurelia_dependency_injection_1, aurelia_pal_1, validation_controller_1, validate_trigger_1) {
    "use strict";
    /**
     * Binding behavior. Indicates the bound property should be validated.
     */
    var ValidateBindingBehaviorBase = (function () {
        function ValidateBindingBehaviorBase(taskQueue) {
            this.taskQueue = taskQueue;
        }
        /**
         * Gets the DOM element associated with the data-binding. Most of the time it's
         * the binding.target but sometimes binding.target is an aurelia custom element,
         * or custom attribute which is a javascript "class" instance, so we need to use
         * the controller's container to retrieve the actual DOM element.
         */
        ValidateBindingBehaviorBase.prototype.getTarget = function (binding, view) {
            var target = binding.target;
            // DOM element
            if (target instanceof Element) {
                return target;
            }
            // custom element or custom attribute
            for (var i = 0, ii = view.controllers.length; i < ii; i++) {
                var controller = view.controllers[i];
                if (controller.viewModel === target) {
                    var element = controller.container.get(aurelia_pal_1.DOM.Element);
                    if (element) {
                        return element;
                    }
                    throw new Error("Unable to locate target element for \"" + binding.sourceExpression + "\".");
                }
            }
            throw new Error("Unable to locate target element for \"" + binding.sourceExpression + "\".");
        };
        ValidateBindingBehaviorBase.prototype.bind = function (binding, source, rulesOrController, rules) {
            var _this = this;
            // identify the target element.
            var target = this.getTarget(binding, source);
            // locate the controller.
            var controller;
            if (rulesOrController instanceof validation_controller_1.ValidationController) {
                controller = rulesOrController;
            }
            else {
                controller = source.container.get(aurelia_dependency_injection_1.Optional.of(validation_controller_1.ValidationController));
                rules = rulesOrController;
            }
            if (controller === null) {
                throw new Error("A ValidationController has not been registered.");
            }
            controller.registerBinding(binding, target, rules);
            binding.validationController = controller;
            var trigger = this.getValidateTrigger(controller);
            /* tslint:disable:no-bitwise */
            if (trigger & validate_trigger_1.validateTrigger.change) {
                /* tslint:enable:no-bitwise */
                binding.standardUpdateSource = binding.updateSource;
                /* tslint:disable:only-arrow-functions */
                binding.updateSource = function (value) {
                    /* tslint:enable:only-arrow-functions */
                    this.standardUpdateSource(value);
                    this.validationController.validateBinding(this);
                };
            }
            /* tslint:disable:no-bitwise */
            if (trigger & validate_trigger_1.validateTrigger.blur) {
                /* tslint:enable:no-bitwise */
                binding.validateBlurHandler = function () {
                    _this.taskQueue.queueMicroTask(function () { return controller.validateBinding(binding); });
                };
                binding.validateTarget = target;
                target.addEventListener('blur', binding.validateBlurHandler);
            }
            if (trigger !== validate_trigger_1.validateTrigger.manual) {
                binding.standardUpdateTarget = binding.updateTarget;
                /* tslint:disable:only-arrow-functions */
                binding.updateTarget = function (value) {
                    /* tslint:enable:only-arrow-functions */
                    this.standardUpdateTarget(value);
                    this.validationController.resetBinding(this);
                };
            }
        };
        ValidateBindingBehaviorBase.prototype.unbind = function (binding) {
            // reset the binding to it's original state.
            if (binding.standardUpdateSource) {
                binding.updateSource = binding.standardUpdateSource;
                binding.standardUpdateSource = null;
            }
            if (binding.standardUpdateTarget) {
                binding.updateTarget = binding.standardUpdateTarget;
                binding.standardUpdateTarget = null;
            }
            if (binding.validateBlurHandler) {
                binding.validateTarget.removeEventListener('blur', binding.validateBlurHandler);
                binding.validateBlurHandler = null;
                binding.validateTarget = null;
            }
            binding.validationController.unregisterBinding(binding);
            binding.validationController = null;
        };
        return ValidateBindingBehaviorBase;
    }());
    exports.ValidateBindingBehaviorBase = ValidateBindingBehaviorBase;
});

define('aurelia-validation/validation-controller',["require", "exports", "./validator", "./validate-trigger", "./property-info", "./validate-result"], function (require, exports, validator_1, validate_trigger_1, property_info_1, validate_result_1) {
    "use strict";
    /**
     * Orchestrates validation.
     * Manages a set of bindings, renderers and objects.
     * Exposes the current list of validation results for binding purposes.
     */
    var ValidationController = (function () {
        function ValidationController(validator) {
            this.validator = validator;
            // Registered bindings (via the validate binding behavior)
            this.bindings = new Map();
            // Renderers that have been added to the controller instance.
            this.renderers = [];
            /**
             * Validation results that have been rendered by the controller.
             */
            this.results = [];
            /**
             * Validation errors that have been rendered by the controller.
             */
            this.errors = [];
            /**
             *  Whether the controller is currently validating.
             */
            this.validating = false;
            // Elements related to validation results that have been rendered.
            this.elements = new Map();
            // Objects that have been added to the controller instance (entity-style validation).
            this.objects = new Map();
            /**
             * The trigger that will invoke automatic validation of a property used in a binding.
             */
            this.validateTrigger = validate_trigger_1.validateTrigger.blur;
            // Promise that resolves when validation has completed.
            this.finishValidating = Promise.resolve();
        }
        /**
         * Adds an object to the set of objects that should be validated when validate is called.
         * @param object The object.
         * @param rules Optional. The rules. If rules aren't supplied the Validator implementation will lookup the rules.
         */
        ValidationController.prototype.addObject = function (object, rules) {
            this.objects.set(object, rules);
        };
        /**
         * Removes an object from the set of objects that should be validated when validate is called.
         * @param object The object.
         */
        ValidationController.prototype.removeObject = function (object) {
            this.objects.delete(object);
            this.processResultDelta('reset', this.results.filter(function (result) { return result.object === object; }), []);
        };
        /**
         * Adds and renders an error.
         */
        ValidationController.prototype.addError = function (message, object, propertyName) {
            if (propertyName === void 0) { propertyName = null; }
            var result = new validate_result_1.ValidateResult({}, object, propertyName, false, message);
            this.processResultDelta('validate', [], [result]);
            return result;
        };
        /**
         * Removes and unrenders an error.
         */
        ValidationController.prototype.removeError = function (result) {
            if (this.results.indexOf(result) !== -1) {
                this.processResultDelta('reset', [result], []);
            }
        };
        /**
         * Adds a renderer.
         * @param renderer The renderer.
         */
        ValidationController.prototype.addRenderer = function (renderer) {
            var _this = this;
            this.renderers.push(renderer);
            renderer.render({
                kind: 'validate',
                render: this.results.map(function (result) { return ({ result: result, elements: _this.elements.get(result) }); }),
                unrender: []
            });
        };
        /**
         * Removes a renderer.
         * @param renderer The renderer.
         */
        ValidationController.prototype.removeRenderer = function (renderer) {
            var _this = this;
            this.renderers.splice(this.renderers.indexOf(renderer), 1);
            renderer.render({
                kind: 'reset',
                render: [],
                unrender: this.results.map(function (result) { return ({ result: result, elements: _this.elements.get(result) }); })
            });
        };
        /**
         * Registers a binding with the controller.
         * @param binding The binding instance.
         * @param target The DOM element.
         * @param rules (optional) rules associated with the binding. Validator implementation specific.
         */
        ValidationController.prototype.registerBinding = function (binding, target, rules) {
            this.bindings.set(binding, { target: target, rules: rules, propertyInfo: null });
        };
        /**
         * Unregisters a binding with the controller.
         * @param binding The binding instance.
         */
        ValidationController.prototype.unregisterBinding = function (binding) {
            this.resetBinding(binding);
            this.bindings.delete(binding);
        };
        /**
         * Interprets the instruction and returns a predicate that will identify
         * relevant results in the list of rendered validation results.
         */
        ValidationController.prototype.getInstructionPredicate = function (instruction) {
            var _this = this;
            if (instruction) {
                var object_1 = instruction.object, propertyName_1 = instruction.propertyName, rules_1 = instruction.rules;
                var predicate_1;
                if (instruction.propertyName) {
                    predicate_1 = function (x) { return x.object === object_1 && x.propertyName === propertyName_1; };
                }
                else {
                    predicate_1 = function (x) { return x.object === object_1; };
                }
                if (rules_1) {
                    return function (x) { return predicate_1(x) && _this.validator.ruleExists(rules_1, x.rule); };
                }
                return predicate_1;
            }
            else {
                return function () { return true; };
            }
        };
        /**
         * Validates and renders results.
         * @param instruction Optional. Instructions on what to validate. If undefined, all
         * objects and bindings will be validated.
         */
        ValidationController.prototype.validate = function (instruction) {
            var _this = this;
            // Get a function that will process the validation instruction.
            var execute;
            if (instruction) {
                var object_2 = instruction.object, propertyName_2 = instruction.propertyName, rules_2 = instruction.rules;
                // if rules were not specified, check the object map.
                rules_2 = rules_2 || this.objects.get(object_2);
                // property specified?
                if (instruction.propertyName === undefined) {
                    // validate the specified object.
                    execute = function () { return _this.validator.validateObject(object_2, rules_2); };
                }
                else {
                    // validate the specified property.
                    execute = function () { return _this.validator.validateProperty(object_2, propertyName_2, rules_2); };
                }
            }
            else {
                // validate all objects and bindings.
                execute = function () {
                    var promises = [];
                    for (var _i = 0, _a = Array.from(_this.objects); _i < _a.length; _i++) {
                        var _b = _a[_i], object = _b[0], rules = _b[1];
                        promises.push(_this.validator.validateObject(object, rules));
                    }
                    for (var _c = 0, _d = Array.from(_this.bindings); _c < _d.length; _c++) {
                        var _e = _d[_c], binding = _e[0], rules = _e[1].rules;
                        var propertyInfo = property_info_1.getPropertyInfo(binding.sourceExpression, binding.source);
                        if (!propertyInfo || _this.objects.has(propertyInfo.object)) {
                            continue;
                        }
                        promises.push(_this.validator.validateProperty(propertyInfo.object, propertyInfo.propertyName, rules));
                    }
                    return Promise.all(promises).then(function (resultSets) { return resultSets.reduce(function (a, b) { return a.concat(b); }, []); });
                };
            }
            // Wait for any existing validation to finish, execute the instruction, render the results.
            this.validating = true;
            var returnPromise = this.finishValidating
                .then(execute)
                .then(function (newResults) {
                var predicate = _this.getInstructionPredicate(instruction);
                var oldResults = _this.results.filter(predicate);
                _this.processResultDelta('validate', oldResults, newResults);
                if (returnPromise === _this.finishValidating) {
                    _this.validating = false;
                }
                var result = {
                    instruction: instruction,
                    valid: newResults.find(function (x) { return !x.valid; }) === undefined,
                    results: newResults
                };
                return result;
            })
                .catch(function (exception) {
                // recover, to enable subsequent calls to validate()
                _this.validating = false;
                _this.finishValidating = Promise.resolve();
                return Promise.reject(exception);
            });
            this.finishValidating = returnPromise;
            return returnPromise;
        };
        /**
         * Resets any rendered validation results (unrenders).
         * @param instruction Optional. Instructions on what to reset. If unspecified all rendered results
         * will be unrendered.
         */
        ValidationController.prototype.reset = function (instruction) {
            var predicate = this.getInstructionPredicate(instruction);
            var oldResults = this.results.filter(predicate);
            this.processResultDelta('reset', oldResults, []);
        };
        /**
         * Gets the elements associated with an object and propertyName (if any).
         */
        ValidationController.prototype.getAssociatedElements = function (_a) {
            var object = _a.object, propertyName = _a.propertyName;
            var elements = [];
            for (var _i = 0, _b = Array.from(this.bindings); _i < _b.length; _i++) {
                var _c = _b[_i], binding = _c[0], target = _c[1].target;
                var propertyInfo = property_info_1.getPropertyInfo(binding.sourceExpression, binding.source);
                if (propertyInfo && propertyInfo.object === object && propertyInfo.propertyName === propertyName) {
                    elements.push(target);
                }
            }
            return elements;
        };
        ValidationController.prototype.processResultDelta = function (kind, oldResults, newResults) {
            // prepare the instruction.
            var instruction = {
                kind: kind,
                render: [],
                unrender: []
            };
            // create a shallow copy of newResults so we can mutate it without causing side-effects.
            newResults = newResults.slice(0);
            var _loop_1 = function (oldResult) {
                // get the elements associated with the old result.
                var elements = this_1.elements.get(oldResult);
                // remove the old result from the element map.
                this_1.elements.delete(oldResult);
                // create the unrender instruction.
                instruction.unrender.push({ result: oldResult, elements: elements });
                // determine if there's a corresponding new result for the old result we are unrendering.
                var newResultIndex = newResults.findIndex(function (x) { return x.rule === oldResult.rule && x.object === oldResult.object && x.propertyName === oldResult.propertyName; });
                if (newResultIndex === -1) {
                    // no corresponding new result... simple remove.
                    this_1.results.splice(this_1.results.indexOf(oldResult), 1);
                    if (!oldResult.valid) {
                        this_1.errors.splice(this_1.errors.indexOf(oldResult), 1);
                    }
                }
                else {
                    // there is a corresponding new result...        
                    var newResult = newResults.splice(newResultIndex, 1)[0];
                    // get the elements that are associated with the new result.
                    var elements_1 = this_1.getAssociatedElements(newResult);
                    this_1.elements.set(newResult, elements_1);
                    // create a render instruction for the new result.
                    instruction.render.push({ result: newResult, elements: elements_1 });
                    // do an in-place replacement of the old result with the new result.
                    // this ensures any repeats bound to this.results will not thrash.
                    this_1.results.splice(this_1.results.indexOf(oldResult), 1, newResult);
                    if (!oldResult.valid && newResult.valid) {
                        this_1.errors.splice(this_1.errors.indexOf(oldResult), 1);
                    }
                    else if (!oldResult.valid && !newResult.valid) {
                        this_1.errors.splice(this_1.errors.indexOf(oldResult), 1, newResult);
                    }
                    else if (!newResult.valid) {
                        this_1.errors.push(newResult);
                    }
                }
            };
            var this_1 = this;
            // create unrender instructions from the old results.
            for (var _i = 0, oldResults_1 = oldResults; _i < oldResults_1.length; _i++) {
                var oldResult = oldResults_1[_i];
                _loop_1(oldResult);
            }
            // create render instructions from the remaining new results.
            for (var _a = 0, newResults_1 = newResults; _a < newResults_1.length; _a++) {
                var result = newResults_1[_a];
                var elements = this.getAssociatedElements(result);
                instruction.render.push({ result: result, elements: elements });
                this.elements.set(result, elements);
                this.results.push(result);
                if (!result.valid) {
                    this.errors.push(result);
                }
            }
            // render.
            for (var _b = 0, _c = this.renderers; _b < _c.length; _b++) {
                var renderer = _c[_b];
                renderer.render(instruction);
            }
        };
        /**
         * Validates the property associated with a binding.
         */
        ValidationController.prototype.validateBinding = function (binding) {
            if (!binding.isBound) {
                return;
            }
            var propertyInfo = property_info_1.getPropertyInfo(binding.sourceExpression, binding.source);
            var rules = undefined;
            var registeredBinding = this.bindings.get(binding);
            if (registeredBinding) {
                rules = registeredBinding.rules;
                registeredBinding.propertyInfo = propertyInfo;
            }
            if (!propertyInfo) {
                return;
            }
            var object = propertyInfo.object, propertyName = propertyInfo.propertyName;
            this.validate({ object: object, propertyName: propertyName, rules: rules });
        };
        /**
         * Resets the results for a property associated with a binding.
         */
        ValidationController.prototype.resetBinding = function (binding) {
            var registeredBinding = this.bindings.get(binding);
            var propertyInfo = property_info_1.getPropertyInfo(binding.sourceExpression, binding.source);
            if (!propertyInfo && registeredBinding) {
                propertyInfo = registeredBinding.propertyInfo;
            }
            if (registeredBinding) {
                registeredBinding.propertyInfo = null;
            }
            if (!propertyInfo) {
                return;
            }
            var object = propertyInfo.object, propertyName = propertyInfo.propertyName;
            this.reset({ object: object, propertyName: propertyName });
        };
        return ValidationController;
    }());
    ValidationController.inject = [validator_1.Validator];
    exports.ValidationController = ValidationController;
});

define('aurelia-validation/validator',["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Validates objects and properties.
     */
    var Validator = (function () {
        function Validator() {
        }
        return Validator;
    }());
    exports.Validator = Validator;
});

define('aurelia-validation/validate-result',["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * The result of validating an individual validation rule.
     */
    var ValidateResult = (function () {
        /**
         * @param rule The rule associated with the result. Validator implementation specific.
         * @param object The object that was validated.
         * @param propertyName The name of the property that was validated.
         * @param error The error, if the result is a validation error.
         */
        function ValidateResult(rule, object, propertyName, valid, message) {
            if (message === void 0) { message = null; }
            this.rule = rule;
            this.object = object;
            this.propertyName = propertyName;
            this.valid = valid;
            this.message = message;
            this.id = ValidateResult.nextId++;
        }
        ValidateResult.prototype.toString = function () {
            return this.valid ? 'Valid.' : this.message;
        };
        return ValidateResult;
    }());
    ValidateResult.nextId = 0;
    exports.ValidateResult = ValidateResult;
});

define('aurelia-validation/validation-controller-factory',["require", "exports", "./validation-controller", "./validator"], function (require, exports, validation_controller_1, validator_1) {
    "use strict";
    /**
     * Creates ValidationController instances.
     */
    var ValidationControllerFactory = (function () {
        function ValidationControllerFactory(container) {
            this.container = container;
        }
        ValidationControllerFactory.get = function (container) {
            return new ValidationControllerFactory(container);
        };
        /**
         * Creates a new controller instance.
         */
        ValidationControllerFactory.prototype.create = function (validator) {
            if (!validator) {
                validator = this.container.get(validator_1.Validator);
            }
            return new validation_controller_1.ValidationController(validator);
        };
        /**
         * Creates a new controller and registers it in the current element's container so that it's
         * available to the validate binding behavior and renderers.
         */
        ValidationControllerFactory.prototype.createForCurrentScope = function (validator) {
            var controller = this.create(validator);
            this.container.registerInstance(validation_controller_1.ValidationController, controller);
            return controller;
        };
        return ValidationControllerFactory;
    }());
    exports.ValidationControllerFactory = ValidationControllerFactory;
    ValidationControllerFactory['protocol:aurelia:resolver'] = true;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('aurelia-validation/validation-errors-custom-attribute',["require", "exports", "aurelia-binding", "aurelia-dependency-injection", "aurelia-templating", "./validation-controller"], function (require, exports, aurelia_binding_1, aurelia_dependency_injection_1, aurelia_templating_1, validation_controller_1) {
    "use strict";
    var ValidationErrorsCustomAttribute = (function () {
        function ValidationErrorsCustomAttribute(boundaryElement, controllerAccessor) {
            this.boundaryElement = boundaryElement;
            this.controllerAccessor = controllerAccessor;
            this.errors = [];
        }
        ValidationErrorsCustomAttribute.prototype.sort = function () {
            this.errors.sort(function (a, b) {
                if (a.targets[0] === b.targets[0]) {
                    return 0;
                }
                /* tslint:disable:no-bitwise */
                return a.targets[0].compareDocumentPosition(b.targets[0]) & 2 ? 1 : -1;
                /* tslint:enable:no-bitwise */
            });
        };
        ValidationErrorsCustomAttribute.prototype.interestingElements = function (elements) {
            var _this = this;
            return elements.filter(function (e) { return _this.boundaryElement.contains(e); });
        };
        ValidationErrorsCustomAttribute.prototype.render = function (instruction) {
            var _loop_1 = function (result) {
                var index = this_1.errors.findIndex(function (x) { return x.error === result; });
                if (index !== -1) {
                    this_1.errors.splice(index, 1);
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = instruction.unrender; _i < _a.length; _i++) {
                var result = _a[_i].result;
                _loop_1(result);
            }
            for (var _b = 0, _c = instruction.render; _b < _c.length; _b++) {
                var _d = _c[_b], result = _d.result, elements = _d.elements;
                if (result.valid) {
                    continue;
                }
                var targets = this.interestingElements(elements);
                if (targets.length) {
                    this.errors.push({ error: result, targets: targets });
                }
            }
            this.sort();
            this.value = this.errors;
        };
        ValidationErrorsCustomAttribute.prototype.bind = function () {
            this.controllerAccessor().addRenderer(this);
            this.value = this.errors;
        };
        ValidationErrorsCustomAttribute.prototype.unbind = function () {
            this.controllerAccessor().removeRenderer(this);
        };
        return ValidationErrorsCustomAttribute;
    }());
    ValidationErrorsCustomAttribute.inject = [Element, aurelia_dependency_injection_1.Lazy.of(validation_controller_1.ValidationController)];
    ValidationErrorsCustomAttribute = __decorate([
        aurelia_templating_1.customAttribute('validation-errors', aurelia_binding_1.bindingMode.twoWay)
    ], ValidationErrorsCustomAttribute);
    exports.ValidationErrorsCustomAttribute = ValidationErrorsCustomAttribute;
});

define('aurelia-validation/validation-renderer-custom-attribute',["require", "exports", "./validation-controller"], function (require, exports, validation_controller_1) {
    "use strict";
    var ValidationRendererCustomAttribute = (function () {
        function ValidationRendererCustomAttribute() {
        }
        ValidationRendererCustomAttribute.prototype.created = function (view) {
            this.container = view.container;
        };
        ValidationRendererCustomAttribute.prototype.bind = function () {
            this.controller = this.container.get(validation_controller_1.ValidationController);
            this.renderer = this.container.get(this.value);
            this.controller.addRenderer(this.renderer);
        };
        ValidationRendererCustomAttribute.prototype.unbind = function () {
            this.controller.removeRenderer(this.renderer);
            this.controller = null;
            this.renderer = null;
        };
        return ValidationRendererCustomAttribute;
    }());
    exports.ValidationRendererCustomAttribute = ValidationRendererCustomAttribute;
});

define('aurelia-validation/implementation/rules',["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Sets, unsets and retrieves rules on an object or constructor function.
     */
    var Rules = (function () {
        function Rules() {
        }
        /**
         * Applies the rules to a target.
         */
        Rules.set = function (target, rules) {
            if (target instanceof Function) {
                target = target.prototype;
            }
            Object.defineProperty(target, Rules.key, { enumerable: false, configurable: false, writable: true, value: rules });
        };
        /**
         * Removes rules from a target.
         */
        Rules.unset = function (target) {
            if (target instanceof Function) {
                target = target.prototype;
            }
            target[Rules.key] = null;
        };
        /**
         * Retrieves the target's rules.
         */
        Rules.get = function (target) {
            return target[Rules.key] || null;
        };
        return Rules;
    }());
    /**
     * The name of the property that stores the rules.
     */
    Rules.key = '__rules__';
    exports.Rules = Rules;
});

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define('aurelia-validation/implementation/standard-validator',["require", "exports", "aurelia-templating", "../validator", "../validate-result", "./rules", "./validation-messages"], function (require, exports, aurelia_templating_1, validator_1, validate_result_1, rules_1, validation_messages_1) {
    "use strict";
    /**
     * Validates.
     * Responsible for validating objects and properties.
     */
    var StandardValidator = (function (_super) {
        __extends(StandardValidator, _super);
        function StandardValidator(messageProvider, resources) {
            var _this = _super.call(this) || this;
            _this.messageProvider = messageProvider;
            _this.lookupFunctions = resources.lookupFunctions;
            _this.getDisplayName = messageProvider.getDisplayName.bind(messageProvider);
            return _this;
        }
        /**
         * Validates the specified property.
         * @param object The object to validate.
         * @param propertyName The name of the property to validate.
         * @param rules Optional. If unspecified, the rules will be looked up using the metadata
         * for the object created by ValidationRules....on(class/object)
         */
        StandardValidator.prototype.validateProperty = function (object, propertyName, rules) {
            return this.validate(object, propertyName, rules || null);
        };
        /**
         * Validates all rules for specified object and it's properties.
         * @param object The object to validate.
         * @param rules Optional. If unspecified, the rules will be looked up using the metadata
         * for the object created by ValidationRules....on(class/object)
         */
        StandardValidator.prototype.validateObject = function (object, rules) {
            return this.validate(object, null, rules || null);
        };
        /**
         * Determines whether a rule exists in a set of rules.
         * @param rules The rules to search.
         * @parem rule The rule to find.
         */
        StandardValidator.prototype.ruleExists = function (rules, rule) {
            var i = rules.length;
            while (i--) {
                if (rules[i].indexOf(rule) !== -1) {
                    return true;
                }
            }
            return false;
        };
        StandardValidator.prototype.getMessage = function (rule, object, value) {
            var expression = rule.message || this.messageProvider.getMessage(rule.messageKey);
            var _a = rule.property, propertyName = _a.name, displayName = _a.displayName;
            if (propertyName !== null) {
                displayName = this.messageProvider.getDisplayName(propertyName, displayName);
            }
            var overrideContext = {
                $displayName: displayName,
                $propertyName: propertyName,
                $value: value,
                $object: object,
                $config: rule.config,
                $getDisplayName: this.getDisplayName
            };
            return expression.evaluate({ bindingContext: object, overrideContext: overrideContext }, this.lookupFunctions);
        };
        StandardValidator.prototype.validateRuleSequence = function (object, propertyName, ruleSequence, sequence, results) {
            var _this = this;
            // are we validating all properties or a single property?
            var validateAllProperties = propertyName === null || propertyName === undefined;
            var rules = ruleSequence[sequence];
            var allValid = true;
            // validate each rule.
            var promises = [];
            var _loop_1 = function (i) {
                var rule = rules[i];
                // is the rule related to the property we're validating.
                if (!validateAllProperties && rule.property.name !== propertyName) {
                    return "continue";
                }
                // is this a conditional rule? is the condition met?
                if (rule.when && !rule.when(object)) {
                    return "continue";
                }
                // validate.
                var value = rule.property.name === null ? object : object[rule.property.name];
                var promiseOrBoolean = rule.condition(value, object);
                if (!(promiseOrBoolean instanceof Promise)) {
                    promiseOrBoolean = Promise.resolve(promiseOrBoolean);
                }
                promises.push(promiseOrBoolean.then(function (valid) {
                    var message = valid ? null : _this.getMessage(rule, object, value);
                    results.push(new validate_result_1.ValidateResult(rule, object, rule.property.name, valid, message));
                    allValid = allValid && valid;
                    return valid;
                }));
            };
            for (var i = 0; i < rules.length; i++) {
                _loop_1(i);
            }
            return Promise.all(promises)
                .then(function () {
                sequence++;
                if (allValid && sequence < ruleSequence.length) {
                    return _this.validateRuleSequence(object, propertyName, ruleSequence, sequence, results);
                }
                return results;
            });
        };
        StandardValidator.prototype.validate = function (object, propertyName, rules) {
            // rules specified?
            if (!rules) {
                // no. attempt to locate the rules.
                rules = rules_1.Rules.get(object);
            }
            // any rules?
            if (!rules) {
                return Promise.resolve([]);
            }
            return this.validateRuleSequence(object, propertyName, rules, 0, []);
        };
        return StandardValidator;
    }(validator_1.Validator));
    StandardValidator.inject = [validation_messages_1.ValidationMessageProvider, aurelia_templating_1.ViewResources];
    exports.StandardValidator = StandardValidator;
});

define('aurelia-validation/implementation/validation-messages',["require", "exports", "./validation-parser"], function (require, exports, validation_parser_1) {
    "use strict";
    /**
     * Dictionary of validation messages. [messageKey]: messageExpression
     */
    exports.validationMessages = {
        /**
         * The default validation message. Used with rules that have no standard message.
         */
        default: "${$displayName} is invalid.",
        required: "${$displayName} is required.",
        matches: "${$displayName} is not correctly formatted.",
        email: "${$displayName} is not a valid email.",
        minLength: "${$displayName} must be at least ${$config.length} character${$config.length === 1 ? '' : 's'}.",
        maxLength: "${$displayName} cannot be longer than ${$config.length} character${$config.length === 1 ? '' : 's'}.",
        minItems: "${$displayName} must contain at least ${$config.count} item${$config.count === 1 ? '' : 's'}.",
        maxItems: "${$displayName} cannot contain more than ${$config.count} item${$config.count === 1 ? '' : 's'}.",
        equals: "${$displayName} must be ${$config.expectedValue}.",
    };
    /**
     * Retrieves validation messages and property display names.
     */
    var ValidationMessageProvider = (function () {
        function ValidationMessageProvider(parser) {
            this.parser = parser;
        }
        /**
         * Returns a message binding expression that corresponds to the key.
         * @param key The message key.
         */
        ValidationMessageProvider.prototype.getMessage = function (key) {
            var message;
            if (key in exports.validationMessages) {
                message = exports.validationMessages[key];
            }
            else {
                message = exports.validationMessages['default'];
            }
            return this.parser.parseMessage(message);
        };
        /**
         * Formulates a property display name using the property name and the configured
         * displayName (if provided).
         * Override this with your own custom logic.
         * @param propertyName The property name.
         */
        ValidationMessageProvider.prototype.getDisplayName = function (propertyName, displayName) {
            if (displayName !== null && displayName !== undefined) {
                return displayName;
            }
            // split on upper-case letters.
            var words = propertyName.split(/(?=[A-Z])/).join(' ');
            // capitalize first letter.
            return words.charAt(0).toUpperCase() + words.slice(1);
        };
        return ValidationMessageProvider;
    }());
    ValidationMessageProvider.inject = [validation_parser_1.ValidationParser];
    exports.ValidationMessageProvider = ValidationMessageProvider;
});

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define('aurelia-validation/implementation/validation-parser',["require", "exports", "aurelia-binding", "aurelia-templating", "./util", "aurelia-logging"], function (require, exports, aurelia_binding_1, aurelia_templating_1, util_1, LogManager) {
    "use strict";
    var ValidationParser = (function () {
        function ValidationParser(parser, bindinqLanguage) {
            this.parser = parser;
            this.bindinqLanguage = bindinqLanguage;
            this.emptyStringExpression = new aurelia_binding_1.LiteralString('');
            this.nullExpression = new aurelia_binding_1.LiteralPrimitive(null);
            this.undefinedExpression = new aurelia_binding_1.LiteralPrimitive(undefined);
            this.cache = {};
        }
        ValidationParser.prototype.parseMessage = function (message) {
            if (this.cache[message] !== undefined) {
                return this.cache[message];
            }
            var parts = this.bindinqLanguage.parseInterpolation(null, message);
            if (parts === null) {
                return new aurelia_binding_1.LiteralString(message);
            }
            var expression = new aurelia_binding_1.LiteralString(parts[0]);
            for (var i = 1; i < parts.length; i += 2) {
                expression = new aurelia_binding_1.Binary('+', expression, new aurelia_binding_1.Binary('+', this.coalesce(parts[i]), new aurelia_binding_1.LiteralString(parts[i + 1])));
            }
            MessageExpressionValidator.validate(expression, message);
            this.cache[message] = expression;
            return expression;
        };
        ValidationParser.prototype.parseProperty = function (property) {
            if (util_1.isString(property)) {
                return { name: property, displayName: null };
            }
            var accessor = this.getAccessorExpression(property.toString());
            if (accessor instanceof aurelia_binding_1.AccessScope
                || accessor instanceof aurelia_binding_1.AccessMember && accessor.object instanceof aurelia_binding_1.AccessScope) {
                return {
                    name: accessor.name,
                    displayName: null
                };
            }
            throw new Error("Invalid subject: \"" + accessor + "\"");
        };
        ValidationParser.prototype.coalesce = function (part) {
            // part === null || part === undefined ? '' : part
            return new aurelia_binding_1.Conditional(new aurelia_binding_1.Binary('||', new aurelia_binding_1.Binary('===', part, this.nullExpression), new aurelia_binding_1.Binary('===', part, this.undefinedExpression)), this.emptyStringExpression, new aurelia_binding_1.CallMember(part, 'toString', []));
        };
        ValidationParser.prototype.getAccessorExpression = function (fn) {
            var classic = /^function\s*\([$_\w\d]+\)\s*\{\s*(?:"use strict";)?\s*return\s+[$_\w\d]+\.([$_\w\d]+)\s*;?\s*\}$/;
            var arrow = /^\(?[$_\w\d]+\)?\s*=>\s*[$_\w\d]+\.([$_\w\d]+)$/;
            var match = classic.exec(fn) || arrow.exec(fn);
            if (match === null) {
                throw new Error("Unable to parse accessor function:\n" + fn);
            }
            return this.parser.parse(match[1]);
        };
        return ValidationParser;
    }());
    ValidationParser.inject = [aurelia_binding_1.Parser, aurelia_templating_1.BindingLanguage];
    exports.ValidationParser = ValidationParser;
    var MessageExpressionValidator = (function (_super) {
        __extends(MessageExpressionValidator, _super);
        function MessageExpressionValidator(originalMessage) {
            var _this = _super.call(this, []) || this;
            _this.originalMessage = originalMessage;
            return _this;
        }
        MessageExpressionValidator.validate = function (expression, originalMessage) {
            var visitor = new MessageExpressionValidator(originalMessage);
            expression.accept(visitor);
        };
        MessageExpressionValidator.prototype.visitAccessScope = function (access) {
            if (access.ancestor !== 0) {
                throw new Error('$parent is not permitted in validation message expressions.');
            }
            if (['displayName', 'propertyName', 'value', 'object', 'config', 'getDisplayName'].indexOf(access.name) !== -1) {
                LogManager.getLogger('aurelia-validation')
                    .warn("Did you mean to use \"$" + access.name + "\" instead of \"" + access.name + "\" in this validation message template: \"" + this.originalMessage + "\"?");
            }
        };
        return MessageExpressionValidator;
    }(aurelia_binding_1.Unparser));
    exports.MessageExpressionValidator = MessageExpressionValidator;
});

define('aurelia-validation/implementation/util',["require", "exports"], function (require, exports) {
    "use strict";
    function isString(value) {
        return Object.prototype.toString.call(value) === '[object String]';
    }
    exports.isString = isString;
});

define('aurelia-validation/implementation/validation-rules',["require", "exports", "./util", "./rules", "./validation-messages"], function (require, exports, util_1, rules_1, validation_messages_1) {
    "use strict";
    /**
     * Part of the fluent rule API. Enables customizing property rules.
     */
    var FluentRuleCustomizer = (function () {
        function FluentRuleCustomizer(property, condition, config, fluentEnsure, fluentRules, parser) {
            if (config === void 0) { config = {}; }
            this.fluentEnsure = fluentEnsure;
            this.fluentRules = fluentRules;
            this.parser = parser;
            this.rule = {
                property: property,
                condition: condition,
                config: config,
                when: null,
                messageKey: 'default',
                message: null,
                sequence: fluentRules.sequence
            };
            this.fluentEnsure._addRule(this.rule);
        }
        /**
         * Validate subsequent rules after previously declared rules have
         * been validated successfully. Use to postpone validation of costly
         * rules until less expensive rules pass validation.
         */
        FluentRuleCustomizer.prototype.then = function () {
            this.fluentRules.sequence++;
            return this;
        };
        /**
         * Specifies the key to use when looking up the rule's validation message.
         */
        FluentRuleCustomizer.prototype.withMessageKey = function (key) {
            this.rule.messageKey = key;
            this.rule.message = null;
            return this;
        };
        /**
         * Specifies rule's validation message.
         */
        FluentRuleCustomizer.prototype.withMessage = function (message) {
            this.rule.messageKey = 'custom';
            this.rule.message = this.parser.parseMessage(message);
            return this;
        };
        /**
         * Specifies a condition that must be met before attempting to validate the rule.
         * @param condition A function that accepts the object as a parameter and returns true
         * or false whether the rule should be evaluated.
         */
        FluentRuleCustomizer.prototype.when = function (condition) {
            this.rule.when = condition;
            return this;
        };
        /**
         * Tags the rule instance, enabling the rule to be found easily
         * using ValidationRules.taggedRules(rules, tag)
         */
        FluentRuleCustomizer.prototype.tag = function (tag) {
            this.rule.tag = tag;
            return this;
        };
        ///// FluentEnsure APIs /////
        /**
         * Target a property with validation rules.
         * @param property The property to target. Can be the property name or a property accessor function.
         */
        FluentRuleCustomizer.prototype.ensure = function (subject) {
            return this.fluentEnsure.ensure(subject);
        };
        /**
         * Targets an object with validation rules.
         */
        FluentRuleCustomizer.prototype.ensureObject = function () {
            return this.fluentEnsure.ensureObject();
        };
        Object.defineProperty(FluentRuleCustomizer.prototype, "rules", {
            /**
             * Rules that have been defined using the fluent API.
             */
            get: function () {
                return this.fluentEnsure.rules;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Applies the rules to a class or object, making them discoverable by the StandardValidator.
         * @param target A class or object.
         */
        FluentRuleCustomizer.prototype.on = function (target) {
            return this.fluentEnsure.on(target);
        };
        ///////// FluentRules APIs /////////
        /**
         * Applies an ad-hoc rule function to the ensured property or object.
         * @param condition The function to validate the rule.
         * Will be called with two arguments, the property value and the object.
         * Should return a boolean or a Promise that resolves to a boolean.
         */
        FluentRuleCustomizer.prototype.satisfies = function (condition, config) {
            return this.fluentRules.satisfies(condition, config);
        };
        /**
         * Applies a rule by name.
         * @param name The name of the custom or standard rule.
         * @param args The rule's arguments.
         */
        FluentRuleCustomizer.prototype.satisfiesRule = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return (_a = this.fluentRules).satisfiesRule.apply(_a, [name].concat(args));
            var _a;
        };
        /**
         * Applies the "required" rule to the property.
         * The value cannot be null, undefined or whitespace.
         */
        FluentRuleCustomizer.prototype.required = function () {
            return this.fluentRules.required();
        };
        /**
         * Applies the "matches" rule to the property.
         * Value must match the specified regular expression.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRuleCustomizer.prototype.matches = function (regex) {
            return this.fluentRules.matches(regex);
        };
        /**
         * Applies the "email" rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRuleCustomizer.prototype.email = function () {
            return this.fluentRules.email();
        };
        /**
         * Applies the "minLength" STRING validation rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRuleCustomizer.prototype.minLength = function (length) {
            return this.fluentRules.minLength(length);
        };
        /**
         * Applies the "maxLength" STRING validation rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRuleCustomizer.prototype.maxLength = function (length) {
            return this.fluentRules.maxLength(length);
        };
        /**
         * Applies the "minItems" ARRAY validation rule to the property.
         * null and undefined values are considered valid.
         */
        FluentRuleCustomizer.prototype.minItems = function (count) {
            return this.fluentRules.minItems(count);
        };
        /**
         * Applies the "maxItems" ARRAY validation rule to the property.
         * null and undefined values are considered valid.
         */
        FluentRuleCustomizer.prototype.maxItems = function (count) {
            return this.fluentRules.maxItems(count);
        };
        /**
         * Applies the "equals" validation rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRuleCustomizer.prototype.equals = function (expectedValue) {
            return this.fluentRules.equals(expectedValue);
        };
        return FluentRuleCustomizer;
    }());
    exports.FluentRuleCustomizer = FluentRuleCustomizer;
    /**
     * Part of the fluent rule API. Enables applying rules to properties and objects.
     */
    var FluentRules = (function () {
        function FluentRules(fluentEnsure, parser, property) {
            this.fluentEnsure = fluentEnsure;
            this.parser = parser;
            this.property = property;
            /**
             * Current rule sequence number. Used to postpone evaluation of rules until rules
             * with lower sequence number have successfully validated. The "then" fluent API method
             * manages this property, there's usually no need to set it directly.
             */
            this.sequence = 0;
        }
        /**
         * Sets the display name of the ensured property.
         */
        FluentRules.prototype.displayName = function (name) {
            this.property.displayName = name;
            return this;
        };
        /**
         * Applies an ad-hoc rule function to the ensured property or object.
         * @param condition The function to validate the rule.
         * Will be called with two arguments, the property value and the object.
         * Should return a boolean or a Promise that resolves to a boolean.
         */
        FluentRules.prototype.satisfies = function (condition, config) {
            return new FluentRuleCustomizer(this.property, condition, config, this.fluentEnsure, this, this.parser);
        };
        /**
         * Applies a rule by name.
         * @param name The name of the custom or standard rule.
         * @param args The rule's arguments.
         */
        FluentRules.prototype.satisfiesRule = function (name) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var rule = FluentRules.customRules[name];
            if (!rule) {
                // standard rule?
                rule = this[name];
                if (rule instanceof Function) {
                    return rule.call.apply(rule, [this].concat(args));
                }
                throw new Error("Rule with name \"" + name + "\" does not exist.");
            }
            var config = rule.argsToConfig ? rule.argsToConfig.apply(rule, args) : undefined;
            return this.satisfies(function (value, obj) {
                return (_a = rule.condition).call.apply(_a, [_this, value, obj].concat(args));
                var _a;
            }, config)
                .withMessageKey(name);
        };
        /**
         * Applies the "required" rule to the property.
         * The value cannot be null, undefined or whitespace.
         */
        FluentRules.prototype.required = function () {
            return this.satisfies(function (value) {
                return value !== null
                    && value !== undefined
                    && !(util_1.isString(value) && !/\S/.test(value));
            }).withMessageKey('required');
        };
        /**
         * Applies the "matches" rule to the property.
         * Value must match the specified regular expression.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRules.prototype.matches = function (regex) {
            return this.satisfies(function (value) { return value === null || value === undefined || value.length === 0 || regex.test(value); })
                .withMessageKey('matches');
        };
        /**
         * Applies the "email" rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRules.prototype.email = function () {
            // regex from https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
            /* tslint:disable:max-line-length */
            return this.matches(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
                .withMessageKey('email');
        };
        /**
         * Applies the "minLength" STRING validation rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRules.prototype.minLength = function (length) {
            return this.satisfies(function (value) { return value === null || value === undefined || value.length === 0 || value.length >= length; }, { length: length })
                .withMessageKey('minLength');
        };
        /**
         * Applies the "maxLength" STRING validation rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRules.prototype.maxLength = function (length) {
            return this.satisfies(function (value) { return value === null || value === undefined || value.length === 0 || value.length <= length; }, { length: length })
                .withMessageKey('maxLength');
        };
        /**
         * Applies the "minItems" ARRAY validation rule to the property.
         * null and undefined values are considered valid.
         */
        FluentRules.prototype.minItems = function (count) {
            return this.satisfies(function (value) { return value === null || value === undefined || value.length >= count; }, { count: count })
                .withMessageKey('minItems');
        };
        /**
         * Applies the "maxItems" ARRAY validation rule to the property.
         * null and undefined values are considered valid.
         */
        FluentRules.prototype.maxItems = function (count) {
            return this.satisfies(function (value) { return value === null || value === undefined || value.length <= count; }, { count: count })
                .withMessageKey('maxItems');
        };
        /**
         * Applies the "equals" validation rule to the property.
         * null and undefined values are considered valid.
         */
        FluentRules.prototype.equals = function (expectedValue) {
            return this.satisfies(function (value) { return value === null || value === undefined || value === '' || value === expectedValue; }, { expectedValue: expectedValue })
                .withMessageKey('equals');
        };
        return FluentRules;
    }());
    FluentRules.customRules = {};
    exports.FluentRules = FluentRules;
    /**
     * Part of the fluent rule API. Enables targeting properties and objects with rules.
     */
    var FluentEnsure = (function () {
        function FluentEnsure(parser) {
            this.parser = parser;
            /**
             * Rules that have been defined using the fluent API.
             */
            this.rules = [];
        }
        /**
         * Target a property with validation rules.
         * @param property The property to target. Can be the property name or a property accessor
         * function.
         */
        FluentEnsure.prototype.ensure = function (property) {
            this.assertInitialized();
            return new FluentRules(this, this.parser, this.parser.parseProperty(property));
        };
        /**
         * Targets an object with validation rules.
         */
        FluentEnsure.prototype.ensureObject = function () {
            this.assertInitialized();
            return new FluentRules(this, this.parser, { name: null, displayName: null });
        };
        /**
         * Applies the rules to a class or object, making them discoverable by the StandardValidator.
         * @param target A class or object.
         */
        FluentEnsure.prototype.on = function (target) {
            rules_1.Rules.set(target, this.rules);
            return this;
        };
        /**
         * Adds a rule definition to the sequenced ruleset.
         */
        FluentEnsure.prototype._addRule = function (rule) {
            while (this.rules.length < rule.sequence + 1) {
                this.rules.push([]);
            }
            this.rules[rule.sequence].push(rule);
        };
        FluentEnsure.prototype.assertInitialized = function () {
            if (this.parser) {
                return;
            }
            throw new Error("Did you forget to add \".plugin('aurelia-validation)\" to your main.js?");
        };
        return FluentEnsure;
    }());
    exports.FluentEnsure = FluentEnsure;
    /**
     * Fluent rule definition API.
     */
    var ValidationRules = (function () {
        function ValidationRules() {
        }
        ValidationRules.initialize = function (parser) {
            ValidationRules.parser = parser;
        };
        /**
         * Target a property with validation rules.
         * @param property The property to target. Can be the property name or a property accessor function.
         */
        ValidationRules.ensure = function (property) {
            return new FluentEnsure(ValidationRules.parser).ensure(property);
        };
        /**
         * Targets an object with validation rules.
         */
        ValidationRules.ensureObject = function () {
            return new FluentEnsure(ValidationRules.parser).ensureObject();
        };
        /**
         * Defines a custom rule.
         * @param name The name of the custom rule. Also serves as the message key.
         * @param condition The rule function.
         * @param message The message expression
         * @param argsToConfig A function that maps the rule's arguments to a "config"
         * object that can be used when evaluating the message expression.
         */
        ValidationRules.customRule = function (name, condition, message, argsToConfig) {
            validation_messages_1.validationMessages[name] = message;
            FluentRules.customRules[name] = { condition: condition, argsToConfig: argsToConfig };
        };
        /**
         * Returns rules with the matching tag.
         * @param rules The rules to search.
         * @param tag The tag to search for.
         */
        ValidationRules.taggedRules = function (rules, tag) {
            return rules.map(function (x) { return x.filter(function (r) { return r.tag === tag; }); });
        };
        /**
         * Removes the rules from a class or object.
         * @param target A class or object.
         */
        ValidationRules.off = function (target) {
            rules_1.Rules.unset(target);
        };
        return ValidationRules;
    }());
    exports.ValidationRules = ValidationRules;
});

define('text!style/style.css', ['module'], function(module) { module.exports = "body {\r\n  background: #dbdbdb;\r\n  border-top: 3px solid #000;\r\n}\r\nbody > div {\r\n  color: #000;\r\n  background: #00ffdd;\r\n}\r\nbody input[type='file'] {\r\n  display: none!important;\r\n}\r\n"; });
define('text!about.html', ['module'], function(module) { module.exports = "<template><h2>${title}</h2>${content}</template>"; });
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"toastr/toastr.min.css\"></require><require from=\"./navigation\"></require><require from=\"./style/style.css\"></require><nav class=\"navbar navbar-default\"><div class=\"container-fluid\"><div class=\"navbar-header\"><a class=\"navbar-brand\" href=\"#\">WebSiteName</a></div><navigation></navigation></div></nav><div class=\"container\"><router-view></router-view></div></template>"; });
define('text!form.html', ['module'], function(module) { module.exports = "<template><require from=\"./value_converters/file-name-value-converter\"></require><require from=\"./value_converters/file-input-value-converter\"></require><div class=\"upload-file-cnt form-horizontal\" class.bind=\"isDragover ? 'dragover' : ''\"><div class=\"row\"><div class=\"form-group col-md-6\" validation-errors.bind=\"nameErrors\"><label class=\"control-label col-md-4\" for=\"name\">Nazwa</label><div class=\"col-md-8\"><input type=\"text\" name=\"name\" class=\"form-control\" value.bind=\"name & validate\"></div><span class=\"help-block col-md-offset-4 col-md-8\" repeat.for=\"errorInfo of nameErrors\">${errorInfo.error.message}</span></div><div class=\"form-group col-md-6\" validation-errors.bind=\"ageErrors\"><label class=\"control-label col-md-4\" for=\"name\">Wiek</label><div class=\"col-md-8\"><input type=\"number\" name=\"age\" class=\"form-control\" value.bind=\"person.Age & validate\"></div><span class=\"help-block col-md-offset-4 col-md-8\" repeat.for=\"errorInfo of ageErrors\">${errorInfo.error.message}</span></div></div><div class=\"row\"><div class=\"form-group col-md-6\" validation-errors.bind=\"weightErrors\"><label class=\"control-label col-md-4\" for=\"name\">Waga</label><div class=\"col-md-8\"><input type=\"number\" name=\"weight\" class=\"form-control\" value.bind=\"person.KilogramsWeight & validate\"></div><span class=\"help-block col-md-offset-4 col-md-8\" repeat.for=\"errorInfo of weightErrors\">${errorInfo.error.message}</span></div><div class=\"form-group col-md-6\" validation-errors.bind=\"sexErrors\"><label class=\"control-label col-md-4\" for=\"name\">Płeć</label><div class=\"col-md-8\"><select name=\"sex\" class=\"form-control\" value.bind=\"person.Sex & validate\"><option value=\"MALE\">Chłopiec</option><option value=\"FAMALE\">Dziewczynka</option></select></div><span class=\"help-block col-md-offset-4 col-md-8\" repeat.for=\"errorInfo of sexErrors\">${errorInfo.error.message}</span></div></div><table><tr><th>File</th><th>Pulse</th><td>Cadence</td><td>Distance</td><td>Altitude</td><td>dsad</td></tr><tr validation-errors.bind=\"nameErrors\" repeat.for=\"file of fileInputs\"><td><span>${file.file | fileName}</span> <input type=\"file\" files.bind=\"file.file | fileInput\" accept=\".tcx,.gpx\" class=\"form-control\"> <button class=\"btn btn-info\" click.delegate=\"file.pick($event)\">pick</button> <button class=\"btn btn-danger\" click.delegate=\"$parent.removeFile(file)\">-</button></td><td if.bind=\"file.conflicts.pulse\"><input type=\"radio\" name=\"pulse\" checked.bind=\"file.priority.pulse\"></td><td if.bind=\"file.conflicts.cadence\"><input type=\"radio\" name=\"cadence\" checked.bind=\"file.priority.cadence\"></td><td if.bind=\"file.conflicts.distance\"><input type=\"radio\" name=\"distance\" checked.bind=\"file.priority.distance\"></td><td if.bind=\"file.conflicts.altitude\"><input type=\"radio\" name=\"altitude\" checked.bind=\"file.priority.altitude\"></td>${file.priority}</tr></table><div class=\"form-inline\"><button class=\"btn btn-primary\" click.delegate=\"addFileInput()\">Dodaj plik</button> <button class=\"btn btn-primary\" click.delegate=\"submit()\">Submit</button></div></div></template>"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template><h2>Hello</h2></template>"; });
define('text!navigation.html', ['module'], function(module) { module.exports = "<template><ul class=\"nav navbar-nav\"><li class.bind=\"home.isActiveClass\"><a route-href=\"route : home;\" click.trigger=\"changeActive(home)\">${home.name}</a></li><li class.bind=\"about.isActiveClass\"><a route-href=\"route : about;\" click.trigger=\"changeActive(about)\">${about.name}</a></li><li class.bind=\"form.isActiveClass\"><a route-href=\"route : form;\" click.trigger=\"changeActive(form)\">${form.name}</a></li></ul></template>"; });
//# sourceMappingURL=app-bundle.js.map