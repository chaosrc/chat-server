import * as http from 'http';
import * as path from 'path';
import {handle404, sendFile, pathMap, serveStatic} from './handle';
import { socketListener } from './socket';


const cache = {};

const server = http.createServer((req, res) => {
    // handle404(res);
    //handle static files
    let absPath = pathMap(req.url, '/static', path.join(__dirname, 'public'));
    if(absPath){
        serveStatic(res, cache, absPath);
    }else{
        handle404(res);
    }
    
})

socketListener(server);

server.listen(8899);