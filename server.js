const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());

// const dateTime = require("date-and-time");
// const format = require("dateformat");



var mysql = require('mysql');
var con = mysql.createConnection({
    host: '192.168.2.8',
    user: 'trainee',
    password: 'trainee@123',
    database: 'trainee'
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
}
);

app.post('/bugdata', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const assignee = req.body.assignee;

    let date = new Date();
    // date.setDate(date.getDate() + 1)
    const currentDate = date.toJSON().slice(0, 10);
    // The toJSON() method returns a date object as a string, formatted as a JSON date
    // currentDate = currentDate +1;

    const Time = date.toLocaleTimeString();
    // The toLocaleTimeString() method returns the time portion of a date object as a string,
    //  using locale conventions.


    // console.log("time",Time)
    // console.log("currentdate",currentDate)

    const sql = `insert into ishabugformdata(title,description,time,date,assignee) 
    values("${title}","${description}", "${Time}","${currentDate}" ,"${assignee}")`

    console.log(sql)

    con.query(sql, function (err, result) {
        if (err) throw err;
        // console.log(result);
        //    resolve(result);
        // console.log("inserted"); 
    });
})

app.get('/showdata', (req, res) => {
    const sql = 'select * from ishabugformdata'
    // console.log(sql)
    con.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            result = result.map((item) => {
                // console.log(item.left_days)
                // console.log("date : ", item.date)
                const date = new Date();
                // console.log(date);
                console.log(result)
                ld = date.getDate();
                // console.log(ld)

                // console.log(item.date);
                ld = date.getDate() - item.date.getDate();
                item.left_days = 3 - ld;
                return item;
            })
            res.json(result);
        }
    })
})

app.listen(8001, () => {
    console.log("running on 8001");
})
