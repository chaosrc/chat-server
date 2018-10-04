import * as http from 'http';
import * as path from 'path';
import * as fs from 'fs';
import {handle404, sendFile, pathMap, serveStatic} from './handle';

const cache = {};

http.createServer((req, res) => {
    // handle404(res);
    //handle static files
    let absPath = pathMap(req.url, '/static', path.join(__dirname, 'public'));
    if(absPath){
        serveStatic(res, cache, absPath);
    }else{
        handle404(res);
    }
    
}).listen(8899);