const Http = require('http');
const querystring = require('querystring');
const db = require('./mysql');


Http.createServer((req, res) => {
    switch(req.url){
        case '/view':
            handleView(req, res);
            break;
        case '/post':
            handlePost(req, res);
            break;
        default:
            handle404(req, res);
    }
    
})
.listen(8898);

function handle404(req, res){
    console.log(`${req.url} not found`);
    res.end('404\n');
}

/**
 * 
 * @param {Http.ServerRequest} req 
 * @param {Http.ServerResponse} res 
 */
function handlePost(req, res){
    let body = '';
     req.on('data', (chunk) => {
        body += chunk;
     });
     req.on('end', () => {
         console.log('post body', body);
         body = querystring.parse(body);
         let content = body.content;
         if(content){
             db.insertContent(content, (err) => {
                 if(err){
                     console.log(err);
                     res.end('insert error');
                 }
                 redirect(res, '/view');
             });
         }
     })
}

let htmlHead = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<form action="/post" method="POST">
<textarea name="content" id="" cols="30" rows="10"></textarea>
<button type="submit">submit</button>
</form>
`;
let htmlEnd = `
</body>
</html>
`
function handleView(req, res){
    console.log('view page');

    db.getContents( (err, contents = []) => {
        if(err){
            res.end('error');
        }
        let html = contents.map(t => `<p style="color:#ffa500;">${t.content}</p><span>${t.time}</span>`);
        res.end(`${htmlHead}${html.join('')}${htmlEnd}` || 'view\n');
    } );
    
}

/**
 * 
 * @param {Http.ServerResponse} res 
 */
function redirect(res, path){
    res.writeHead(302, {
        'Location': path
    });
    res.end();
}