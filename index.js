const express = require("express");
const path = require("path");
const port = 4000;

const app = express();
const db = require("./config/mongoose");
const Contact = require("./models/contact");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// middleware for faching data from form and covert to decoded
app.use(express.urlencoded());
app.use(express.static("assets"));

const contactList = [
    { name: "Rajkumar", phone: "123456" },
    { name: "Arpan", phone: "123456" },
    { name: "Hitesh", phone: "123456" },
    { name: "Akash", phone: "123456" },
];

//  home pagr controler
app.get("/", async (req, res) => {
    try {
        const contactList = await Contact.find({});
        res.render("home", {
            title: "Home Page",
            contact_List: contactList,
        });
    } catch (err) {
        console.log("Some Error in fetching contacts from the database....", err);
    }
});


//  practice page controler
app.get("/practice", (req, res) => {
    res.render("practice", { title: "I changed my Page title." });
});


// adding contacts and checking contacts
app.post("/create-contact", async (req, res) => {
    try {
        const newContact = await Contact.create({
            name: req.body.name,
            phone: req.body.phone,
        });
        console.log("*******", newContact);
        res.redirect("back");
    } catch (err) {
        console.log("Contact create Error...!", err);
    }
});



// delete the contacts from server 
app.get("/delete-contact", async (req, res) => {
    try {
        let id = req.query.id;
        
        // Use the `await` keyword to wait for the Promise to resolve
        await Contact.findByIdAndDelete(id);

        res.redirect("back");
    } catch (err) {
        console.log("Error in finding the objects in the database and then deleting...", err);
        // Handle the error appropriately, e.g., sending an error response to the client
    }
});


// handel the server
app.listen(port, (err) => {
    if (err) {
        console.log("Error in running server: ", err);
    }
    console.log("Server is running on port ==> ", port);
});
