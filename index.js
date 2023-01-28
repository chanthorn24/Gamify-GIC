const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();
const path = require("path");

//route import
const userRoleRoute = require("./routes/userRoleRoute");
const userRoute = require("./routes/userRoute");
const userInRoomRoute = require("./routes/userInRoomRoute");
const userAnswerHistoryRoute = require("./routes/userAnswerHistoryRoute");
const userQuestionHistoryRoute = require("./routes/userQuestionHistoryRoute");
const roomRoute = require("./routes/roomRoute");
const roomTypeRoute = require("./routes/roomTypeRoute");
const questionRoute = require("./routes/questionRoute");
const questionTypeRoute = require("./routes/questionTypeRoute");
const answerRoute = require("./routes/answerRoute");
const imageUploadRoute = require("./routes/imageUploadRoute");
const departmentRoute = require("./routes/departmentRoute");

//options
const app = express();
const port = 3001;

//socket server
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("tiny"));

const connection = require("./connection");

io.on("connection", connection.connect);
//connect mongoDB
mongoose
    .connect(process.env.DATABASE_ONLINE)
    .then(() => {
        server.listen(port, () => {
            console.log("DB Connected");
            console.log("http://localhost:3001");
        });
    })
    .catch((err) => console.log(err));

//home
app.get("/", (req, res) => {
    // res.json({ work: true });
    res.sendFile(__dirname + "/index.html");
});

app.use("/user", userRoute);
app.use("/user/role", userRoleRoute);
app.use("/user/answer-history", userAnswerHistoryRoute);
app.use("/user/question-history", userQuestionHistoryRoute);
app.use("/user/in-room", userInRoomRoute);
app.use("/room", roomRoute);
app.use("/room/type", roomTypeRoute);
app.use("/question", questionRoute);
app.use("/question/type", questionTypeRoute);
app.use("/answer", answerRoute);
app.use("/image", imageUploadRoute);
app.use("/department", departmentRoute);

exports.io = io;