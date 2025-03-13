import http from "http";

import * as htmlPages from "./createHTMLPages.js";
import { getStyle } from "./cssFiles.js";

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url.includes("css")) {
    switch (url) {
      case "/css/style":
        res.end(getStyle(url));
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
        const homePage = htmlPages.getHtmlPage("home", res);
        res.end(homePage);
        break;
      case "/about":
        const aboutPage = htmlPages.getHtmlPage("about", res);
        res.end(aboutPage);
        break;
      case "/contact":
        const contactPage = htmlPages.getHtmlPage("contact", res);
        res.end(contactPage);
        break;

      default:
        const notFound = htmlPages.getNotFoundPage(res);
        res.end(notFound);
        break;
    }
  }
});

server.listen(8000);
