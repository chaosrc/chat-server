"use strict";
exports.__esModule = true;
exports.handle404 = function (response) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('404 not found');
    response.end();
};
// exports.handle404 = handle404;
