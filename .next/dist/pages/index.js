"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("/Users/xpunk/repos/pablo.life/node_modules/next/node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _head = require("/Users/xpunk/repos/pablo.life/node_modules/next/dist/lib/head.js");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O2tCQUVlO0FBQUEsU0FDYjtBQUFBO0FBQUEsTUFBSyxJQUFHLE1BQVI7QUFDRTtBQUFBO0FBQUE7QUFDSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREosS0FERjtBQUlFO0FBQUE7QUFBQSxRQUFLLFdBQVUsTUFBZjtBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsTUFBZjtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FERjtBQUVJO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxjQUFHLFFBQU8sUUFBVixFQUFtQixNQUFLLCtCQUF4QjtBQUFBO0FBQUEsV0FERjtBQUVFO0FBQUE7QUFBQSxjQUFHLFFBQU8sUUFBVixFQUFtQixNQUFLLGlDQUF4QjtBQUFBO0FBQUEsV0FGRjtBQUdFO0FBQUE7QUFBQSxjQUFHLFFBQU8sUUFBVixFQUFtQixNQUFLLGdDQUF4QjtBQUFBO0FBQUEsV0FIRjtBQUlFO0FBQUE7QUFBQSxjQUFHLFFBQU8sUUFBVixFQUFtQixNQUFLLDhCQUF4QjtBQUFBO0FBQUE7QUFKRjtBQUZKO0FBREYsS0FKRjtBQWdCRTtBQUFBO0FBQUEsUUFBTyxTQUFQO0FBQUE7QUFBQTtBQWhCRixHQURhO0FBQUEsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMveHB1bmsvcmVwb3MvcGFibG8ubGlmZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCdcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4gKFxuICA8ZGl2IGlkPVwibWFpblwiPlxuICAgIDxIZWFkPlxuICAgICAgICA8dGl0bGU+UGFibG8gVmFyZWxhPC90aXRsZT5cbiAgICA8L0hlYWQ+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJob21lXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haW5cIj5cbiAgICAgICAgPGgxPlBhYmxvIFZhcmVsYTwvaDE+XG4gICAgICAgICAgPG5hdj5cbiAgICAgICAgICAgIDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL3R3aXR0ZXIuY29tL3BhYmxvcHVua1wiPlR3aXR0ZXI8L2E+XG4gICAgICAgICAgICA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly95b3V0dWJlLmNvbS92YXJlbGFwb2wxM1wiPllvdVR1YmU8L2E+ICBcbiAgICAgICAgICAgIDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL3BleGVscy5jb20vdS9wYWJsb3B1bmtcIj5QaG90b2dyYXBoeTwvYT5cbiAgICAgICAgICAgIDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vcGFibG9wdW5rXCI+Q29kZTwvYT5cbiAgICAgICAgICA8L25hdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPHN0eWxlIGpzeD57YFxuICAgICAgLmhvbWUge1xuICAgICAgICBmb250LWZhbWlseTogTWVubG8sIG1vbm9zcGFjZTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICB6LWluZGV4OiAtMTtcbiAgICAgIH1cblxuICAgICAgLm1haW4ge1xuICAgICAgICBmbGV4OiBub25lO1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICB9XG5cbiAgICAgIGgxIHtcbiAgICAgICAgZm9udC1zaXplOiAxZW07XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICAgIGNvbG9yOiAjM2E3YmQ1O1xuICAgICAgfVxuXG4gICAgICBhIHtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBwYWRkaW5nOiAuNWVtO1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgIGZvbnQtc2l6ZTogLjhlbTtcbiAgICAgICAgY29sb3I6ICNGRjRFNTA7XG4gICAgICB9XG4gICAgYH08L3N0eWxlPlxuICA8L2Rpdj5cbilcbiJdfQ==