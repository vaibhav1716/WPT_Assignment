const express = require('express');

const app = express();

app.use(express.static("sf"));
let dbparams=
{
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'erandol2',
	port:3306
}; // change port to 3306 that may be the port mostly.


//fate means other person design
const mysql = require('mysql2'); //fate
const con=mysql.createConnection(dbparams);
app.get("/EmpInfo", (req, resp) => {
        let accname = req.query.accname;
        // console.log(accname);
        let details = { status: false, details1: {} }
        con.query('select accname from bank  where accno=?', [accname],
            (error, accnameRow) => {
             //   console.log("error occured");
                if (error) {
                    //when you dont have data why problem is there collect data first.
                    console.log("Error aaa raha he " + error);
                }
                else if(accnameRow.length>0){
                    details.details1.status = true;
                    details.details1.sal =accnameRow[0];
                }
               resp.send(details);
    
                console.log("Found abhi ho gaya");
    
            }
        );
        // console.log(details.balance.bank)
        
    });
    app.listen(1500, function () {
        console.log("Server connect tomport 1500");
    
    });