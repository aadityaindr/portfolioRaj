const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const port = 3019

const app = express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: "https://portfolio-ten-black-93.vercel.app/",
})
        );

}


mongoose.connect("mongodb+srv://aaditya:aaditya@cluster0.jgjbq.mongodb.net/")
const db = mongoose.connection
db.once('open', ()=>{
    console.log("mongodb connected")
})

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const Users = mongoose.model("data", userSchema)

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/post', async (req, res) => {
    try {
        const { fullname, email, message } = req.body;
        const user = new Users({
            fullname,
            email,
            message
        });

        await user.save(); // Save the user to the database
        // console.log(user); // Log the user data in the server console

        // Send a success response to the client
        res.status(200).json({ message: "Form submitted successfully" });
    } catch (error) {
        console.error(error); // Log any errors to the server console
        res.status(500).json({ message: "Error submitting form" }); // Send an error response
    }
});

app.listen(port,()=>{
    console.log("Server started")
})


