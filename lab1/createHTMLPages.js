import * as fs from "fs";

function getHtmlPage(name, res) {
  const pageUrl = `./html/${name}.html`;
  const file = fs.readFileSync(pageUrl, "utf8");
  res.statusCode = 200;
  res.setHeader("content-type", "text/html");
  return file;
}
function getNotFoundPage(res) {
  const pageUrl = "./html/notFound.html";
  const file = fs.readFileSync(pageUrl, "utf8");
  res.statusCode = 404;
  res.setHeader("content-type", "text/html");
  return file;
}
export { getHtmlPage, getNotFoundPage };
