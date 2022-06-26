let express = require('express');
let app = express();

app.use(express.static("sf"));

let mysql = require('mysql2');
let dbparams = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'cdac',
    database: 'mumbai'
}
let con = mysql.createConnection(dbparams);


app.get('/getAllItems', (req, resp) => {

    /* itemdetails = [{ itemno: 1, itemname: "compass", price: 100 }, { itemno: 1, itemname: "pen", price: 200 }]
     /*let msg = "";
     for (let i = 0; i < itemdetails.length; i++) {
         msg += "</Br>" + itemdetails[i].itemno + " " + itemdetails[i].itemname + " " + itemdetails[i].price;
 
     }*/
    let output = [];
    con.query('select * from items', [],
        (error, rows) => {
            if (error) {
                console.log("Error - Not connected to db server");
            } else {
                if (rows.length > 0) {
                    output = rows;
                }

            }
            resp.send(output);
        })//query fn

})

app.get('/getItems', (req, resp) => {
    let itemno = req.query.itemno;
    let output = { status: false, itemdetails: { itemno: itemno, itemname: "", price: "" } };
    con.query('select * from items where itemno=?', [itemno],
        (error, rows) => {
            if (error) {
                console.log("Error - Not connected to db server" + error);
            } else {
                if (rows.length == 1) {
                    output.itemdetails = rows[0];

                    output.status = true;
                }

            }
            resp.send(output);
        })
    app.get('/addItem', (req, resp) => {

        let itemno = req.query.itemno;

        let itemname = req.query.itemname;
        let price = req.query.price;


        let output = { status: false };
        con.query('insert into items(itemno,itemname,price)values(?,?,?)', [itemno, itemname, price], (error, rows) => {

            if (error) {
                console.log("Error - Not connected to db server" + error);
            } else {
                if (rows.affectedRows == 1) {
                    output.status = true;
                }

            }
            resp.send(output);


        })//query fn end


    })


});

app.get('/updateItem', (req, resp) => {
    let output = { status: false };
    let itemno = req.query.itemno;
    let itemname = req.query.itemname;
    let price = req.query.price;
    con.query('update items set itemname=?,price=? where itemno=?', [itemname, price, itemno],
        (error, rows) => {

            if (error) {
                console.log("Error - Not connected to db server" + error);
            } else {
                if (rows.affectedRows == 1) {
                    output.status = true;
                }


            }
            resp.send(output);


        })//query function


})//update URI 
app.listen(8086, () => {
    console.log("8086 is working")
})