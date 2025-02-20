const express = require("express")
const app = express()
const userData = []

app.get("/", (req, res) => {
    res.send("<h1>This is the backend</h1>")
})

app.use(express.json());

app.post("/add-user", (req, res) => {
    const { email, password,username, dateofbirth } = req.body;

    if (!email || !password || !username) {
        return res.status(400).send("Email and password are required");
    }


    if (password.length < 8 && password.length>=16) {
        return res.send("password should contain more than 8 characters")
    }

    userData.push({
        email: email,
        password: password,
        username: username,
        dateofbirth: dateofbirth
    })

    res.status(200).json({ message: "successfully added the user", data: userData })
})

app.put("/update-user", (req, res) => {
    const { email, newPassword,username } = req.body;

    if (!email || !newPassword || !username) {
        return res.status(400).send("Email and new password are required");
    }

    if (newPassword.length < 8 && newPassword >=16) {
        return res.send("password should contain more than 8 characters")
    }

    const user = userData.find(user => user.email === email);
    if (user) 
        {
        user.password = newPassword;
        return res.status(200).json({ message: "Password successfully updated", data: userData });
    }

    return res.status(404).json({ message: "email does not exist" })
})

app.delete("/delete-user", (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const index = userData.findIndex(user => user.email.toLowerCase() === email.toLowerCase());
    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    userData.splice(index, 1);
    res.status(200).json({ message: "User deleted successfully", data: userData });
});

app.get('/user', (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const user = userData.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User found', user });
});

console.log(userData)

app.listen(8080, () => {
    console.log("the server is listening at http://localhost:8080")
})
