const mysql = require('mysql');

let connection = mysql.createConnection({
    host: '45.78.22.110',
    user: 'root',
    password: 'qwert',
    database: 'test'
});

// connection.connect();
// // connection.query('insert into student values("make", 123)', (err, result) => {
// //     if(err) throw err;
// //     console.log('insert success', result);
// // })
// connection.query('select * from student', (err, result) => {
//     if(err) throw err;
//     console.log('result', result);
// })


// connection.end();

const db = [];

exports.insertContent = (content, cb) => {
    let date = new Date();
    let now = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    let sql = 'insert into form(content, time) values(\'' + content + '\',\'' + now + '\')';
    console.log(sql);
    connection.query(sql.toString(), cb);
}

exports.getContents = (cb) => {
    let sql = `select * from form order by time`;
    connection.query(sql, (err, result = []) => {
        if(err){
            cb(err);
            throw err;
        }
        let re = result.map(content => ({content: content.content, time: content.time}));
        if(cb){
            cb(null, re);
        }
    })
}