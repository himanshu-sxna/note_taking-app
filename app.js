const express = require("express");

const server = express();

const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=> {
    console.log(`Server listening on: http://localhost: ${PORT}`);
})

server.get('/', (req, res)=>{
    res.send("server is working")
})

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
