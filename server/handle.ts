import * as Http from "http";
import * as mime from 'mime';
import * as path from 'path';
import * as fs   from 'fs'; 

export const handle404 = (response: Http.ServerResponse) => {
  response.writeHead(404, { "Content-Type": "text/plain" });
  response.write("404 not found \n");
  response.end();
};

export const sendFile = (response: Http.ServerResponse, filePath: string, file) => {
    response.writeHead(200, {
        'Content-Type': mime.getType(filePath) || ''
    });
    response.end(file);
};


export const serveStatic = (res: Http.ServerResponse, cache: Object, absPath: string) => {
    let file = cache[absPath];
    if(!file){
        fs.readFile(absPath, (err,data) => {
            if(err){
                res.end('file read error\n');
                console.log(err.message);
            }else{
                sendFile(res,absPath, data);
            }
        })
      
    }else {
        sendFile(res, absPath, file);
    }
}

export const pathMap = (url: string = '', path: string, filePath: string) => {
    
    if(url.indexOf(path) === 0){
        return filePath + url.slice(path.length);
    }else{
        return null;
    }
}
