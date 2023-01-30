//socket server
const axios = require("axios");
const io = require("./index");
const jwt = require("jsonwebtoken");
const url = "http://localhost:3001";

let users = [];

const connect = (socket) => {
    console.log("a user connected");
    socket.on("chat message", (msg) => {
        console.log(msg);
        io.io.emit("chat message", msg);
    });
    socket.on("emit_method", (msg) => {
        console.log(msg);
        io.io.emit("emit_method", msg);
    });
    socket.on("disconnect", () => {
        if (users[socket.id]) {
            const data = {
                status: 0,
                room_id: users[socket.id].room_id,
            };
            axios
                .put(url + "/user/in-room/update/" + users[socket.id].id, data)
                .then((res) => {
                    axios
                        .get(url + "/user/in-room/getroom/" + users[socket.id].room_id)
                        .then((res) => {
                            if (res.data.success) {
                                // console.log(res.data.data);
                                let data = {
                                    data: res.data.data,
                                    room: users[socket.id].room_id,
                                };

                                io.io.emit("in_room", data);
                            }
                        });
                });
        }
        console.log("user disconnected", socket.id);
    });

    //room user play
    socket.on("in_room", (msg) => {
        console.log("hello");

        // socket.join(msg.room_id);
        // console.log(socket.id, "Socket\n");
        if (msg.token) {
            try {
                const decode = jwt.verify(msg.token, process.env.JWT_SECRET);
                console.log(decode.data.user);
                users[socket.id] = decode.data.user;
                const data = {
                    status: 1,
                    room_id: users[socket.id].room_id,
                };

                //make disconnect
                // if (io.io.sockets[decode.data.user.socket_id]) {
                //     console.log(decode.data.user.socket_id);
                // }
                axios
                    .put(url + "/user/in-room/update/" + users[socket.id].id, data)
                    .then((res) => {
                        axios
                            .get(url + "/user/in-room/getroom/" + users[socket.id].room_id)
                            .then((res) => {
                                if (res.data.success) {
                                    // console.log(res.data.data);
                                    let data = {
                                        data: res.data.data,
                                        room: users[socket.id].room_id,
                                    };

                                    io.io.emit("in_room", data);
                                }
                            });
                    });
            } catch (error) {
                console.log(error);
            }
        } else if (msg.name == "") {
            try {
                axios.get(url + "/user/in-room/getroom/" + msg.room_id).then((res) => {
                    if (res.data.success) {
                        // console.log(res.data.data);
                        let data = {
                            data: res.data.data,
                            room: msg.room_id,
                        };

                        io.io.emit("in_room", data);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                axios.post(url + "/user/in-room/create", msg).then((res) => {
                    if (res.data.success) {
                        users[socket.id] = {
                            id: res.data.data._id,
                            room_id: msg.room_id,
                        };
                        const token = jwt.sign({
                                exp: Math.floor(Date.now() / 1000) +
                                    parseInt(process.env.EXP_USER),
                                data: {
                                    user: {
                                        id: res.data.data._id,
                                        room_id: msg.room_id,
                                    },
                                },
                            },
                            process.env.JWT_SECRET
                        );
                        // console.log(users);
                        axios
                            .get(url + "/user/in-room/getroom/" + msg.room_id)
                            .then((res) => {
                                if (res.data.success) {
                                    // console.log(res.data.data);
                                    let data = {
                                        data: res.data.data,
                                        room: msg.room_id,
                                    };

                                    socket.emit("in_room", { token: token });
                                    io.io.emit("in_room", data);
                                }
                            });
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
        // io.to(socket.id).emit("in_room", msg);
    });
    //play by teacher
    socket.on("play", (msg) => {
        if (msg.data) {
            msg.data.correct_answer = null;
            let data = {
                data: msg.data,
                room: msg.room_id,
            };
            console.log(msg);
            io.io.emit("play", data);
        }
    });

    //global user join room
    socket.on("global_user", () => {
        axios.get(url + "/user/in-room/get-all").then((res) => {
            if (res.data.success) {
                io.io.emit("global_user", res.data.data);
            }
        });
    });
};

module.exports = { connect };