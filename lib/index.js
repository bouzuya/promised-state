"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PromisedState = function () {
    function PromisedState(initial) {
        _classCallCheck(this, PromisedState);

        this.updaterQueue = [];
        this.state = Promise.resolve(initial);
    }

    _createClass(PromisedState, [{
        key: "update",
        value: function update(updater) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var wrapped = function wrapped(state) {
                    return Promise.resolve(state).then(updater).then(function (state) {
                        resolve(state);
                        return state;
                    }, reject);
                };
                _this.updaterQueue.push(wrapped);
                setTimeout(function () {
                    return _this.value();
                });
            });
        }
    }, {
        key: "value",
        value: function value() {
            var _this2 = this;

            this.state = this.state.then(function (state) {
                var update = _this2.updaterQueue.shift();
                return update ? update(state) : state;
            });
            return this.state;
        }
    }]);

    return PromisedState;
}();

exports.PromisedState = PromisedState;