let express = require('express');
let app = express();

let mysql = require('mysql2');

let dbparams = {
    host: 'localhost',
    database: 'mumbai',
    user: 'root',
    password: 'cdac',
    port: 3306
}

let con = mysql.createConnection(dbparams);

app.use(express.static("sf"));
app.get('/searching', (req, resp) => {
    let empno = req.query.empno;
    let output = { status: true, empdetails: { empno: empno, empname: "Not Found", sal: "Not Found" } };

    con.query('select empno, empname,sal from emp where empno=?', [empno],
        (err, rows) => {

            if (rows.length == 1) {
                output.status = true;
                output.empdetails.empno = rows[0].empno;
                output.empdetails.empname = rows[0].empname;
                output.empdetails.sal = rows[0].sal;
            }

            resp.send(output);
        });//qyery end





})

app.listen(8085, () => {

    console.log("port 8085 working....")

});