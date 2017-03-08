"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("/home/pi/repos/pablo.life/node_modules/next/node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _head = require("/home/pi/repos/pablo.life/node_modules/next/dist/lib/head.js");

var _head2 = _interopRequireDefault(_head);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    "div",
    { id: "main" },
    _react2.default.createElement(
      _head2.default,
      null,
      _react2.default.createElement(
        "title",
        null,
        "Pablo Varela"
      )
    ),
    _react2.default.createElement(
      "div",
      { className: "home" },
      _react2.default.createElement(
        "div",
        { className: "main" },
        _react2.default.createElement(
          "h1",
          null,
          "Pablo Varela"
        ),
        _react2.default.createElement(
          "nav",
          null,
          _react2.default.createElement(
            "a",
            { target: "_blank", href: "https://twitter.com/pablopunk" },
            "Twitter"
          ),
          _react2.default.createElement(
            "a",
            { target: "_blank", href: "https://youtube.com/varelapol13" },
            "YouTube"
          ),
          _react2.default.createElement(
            "a",
            { target: "_blank", href: "https://pexels.com/u/pablopunk" },
            "Photography"
          ),
          _react2.default.createElement(
            "a",
            { target: "_blank", href: "https://github.com/pablopunk" },
            "Code"
          )
        )
      )
    ),
    _react2.default.createElement(
      "style",
      { jsx: true },
      "\n      .home {\n        font-family: Menlo, monospace;\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        z-index: -1;\n      }\n\n      .main {\n        flex: none;\n        text-align: center;\n      }\n\n      h1 {\n        font-size: 1em;\n        font-weight: normal;\n        color: #3a7bd5;\n      }\n\n      a {\n        display: inline-block;\n        padding: .5em;\n        text-decoration: none;\n        font-size: .8em;\n        color: #FF4E50;\n      }\n    "
    )
  );
};