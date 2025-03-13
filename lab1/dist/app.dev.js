"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _http = _interopRequireDefault(require("http"));

var htmlPages = _interopRequireWildcard(require("./createHTMLPages.js"));

var _cssFiles = require("./cssFiles.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var server = _http["default"].createServer(function (req, res) {
  var url = req.url;

  if (url.includes("css")) {
    switch (url) {
      case "/css/style":
        res.end((0, _cssFiles.getStyle)(url));
        break;

      default:
        res.statusCode = 404;
        res.statusMessage = "Style can not be found";
        res.end();
        break;
    }
  } else {
    switch (url) {
      case "/":
        var homePage = htmlPages.getHtmlPage("home", res);
        res.end(homePage);
        break;

      case "/about":
        var aboutPage = htmlPages.getHtmlPage("about", res);
        res.end(aboutPage);
        break;

      case "/contact":
        var contactPage = htmlPages.getHtmlPage("contact", res);
        res.end(contactPage);
        break;

      default:
        var notFound = htmlPages.getNotFoundPage(res);
        res.end(notFound);
        break;
    }
  }
});

server.listen(8000);