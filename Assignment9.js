let express = require('express');

let app = express();
let mysql = require('mysql2');
let dbparam = {
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'mumbai',
    port: 3306

}
let con = mysql.createConnection(dbparam);

app.use(express.static("sf"));

app.get('/searching', (req, resp) => {

    let pincode = req.query.pincode;
    let output = { status: false, area: "not found" };

    con.query('select area from map where pincode=?', [pincode],
        (err, rows) => {
            if (err) {
                console.log(" DB error ");
            } else {
                if (rows.length == 1) {
                    output.status = true;
                    output.area = rows[0].area;
                }

                resp.send(output);
            }



        })


})

app.listen(8081, () => {

    console.log("port 8081 working....");
})