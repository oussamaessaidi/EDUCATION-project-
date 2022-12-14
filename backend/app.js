// import express module
const express = require("express");

const bodyParser = require("body-parser");

// import mongoose module
const mongoose = require('mongoose');

// import multer module
const multer = require("multer");

// import bcrypt module
const bcrypt = require("bcrypt");

//import Reservation Model
const Reservation = require('./models/reservation');

// create express application named app
const app = express();

// conneciton with mongoDB named anonymousDB 
mongoose.connect('mongodb://localhost:27017/educationDB', { useNewUrlParser: true, useUnifiedTopology: true });

// import event model
const Event = require("./models/event");

// import course model
const Course = require("./models/course");
// import course model
const User = require("./models/user");
//import eventReservation Model
const EventReservation = require("./models/eventReservation");

// pour la configuration de l application: send response  to FE in json format
app.use(bodyParser.json());
///body parser configuration to parse received object from FE  //pour acceder au body by request
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
  });

//   app.use('/images', express.static(path.join('backend/images')));
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
    // 'application/pdf': 'jpg'
}
const storage = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
        //kol espace tetbael b -
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' + extension;
        cb(null, imgName);
    }

});

// busniss logic : add event object
app.post("/events", (req, res) => {
    console.log("here into add");
    console.log("here event object", req.body);
    // let match=new Match(req.body);
    // a droite attributs proviennt du front a gauche proviennet du schamea
    let event = new Event({
        eventName: req.body.eventName,
        duration: req.body.duration,
        date: req.body.date,
    });
    //save fonction predefinie mongoose prend la variable echouf chnia type mte3ha w esobha fil collections
    event.save((err, doc) => {
        if (err) {
            console.log('here error', err);
        } else {
            res.json({
                message: "course added with success",
            });
        }
    });
});

// Business Logic : Edit Event
app.put("/events/:id", (req, res) => {
    console.log("Here event ID", req.params.id);
    console.log("Here event object", req.body);
    Event.updateOne({ _id: req.params.id }, req.body).then((response) => {
        console.log("Here response after update", response);

        res.json({ message: "Edited with success" });

    });
});
// Business Logic : Get Event By ID
app.get("/events/:id", (req, res) => {
    // Recuperer le param nommé id from path
    let x = req.params.id;
    Event.findOne({ _id: x }).then((doc) => {
        console.log("Here doc", doc);
        res.json({ event: doc });
    });
});

///get users ayant role teacher 

app.get("/users/teachers", (req, res) => {
    //instruction

  //  let role = req.body.role; //recuperer le param nomme id from path
    //search match by id
    User.find({ role: "teacher" }).exec(function (err, docs) {

        console.log('herre err', err);
        console.log('herre err', err);
        console.log('herre docs', docs);
        if (err) {
            console.log("here error", err);

        } else {
            res.json({ teachers: docs, message: 'here all teachers' })
        }
    });
});

// Business Logic : Get ALL Events
app.get("/events", (req, res) => {
    // Instructions
    Event.find((err, docs) => {
        if (err) {
            console.log("here error with DB", err);
        } else {
            res.json({ events: docs, message: "Here all events, Done" });
        }
    });
});
// Business Logic : Delete Event By ID
app.delete("/events/:id", (req, res) => {
    console.log("Here into delete", req.params.id);
    let x = req.params.id;
    Event.deleteOne({ _id: x }).then((response) => {
        console.log("Here response", response);
        if (response.deletedCount == 1) {
            res.json({ message: "Deleted with success" });
        }
    });
});

// busniss logic : add course object
app.post("/courses", (req, res) => {
    console.log("here into add");
    console.log("here course object", req.body);
    // let match=new Match(req.body);
    // a droite attributs proviennt du front a gauche proviennet du schamea
    let course = new Course({
        courseName: req.body.courseName,
        price: req.body.price,
        professor: req.body.professor,
        duration: req.body.duration,
    });
    //save fonction predefinie mongoose prend la variable echouf chnia type mte3ha w esobha fil collections
    course.save((err, doc) => {
        if (err) {
            console.log('here error', err);
        } else {
            res.json({
                message: "course added with success",
            });
        }
    });
});

// Business Logic : Edit Course Object
app.put("/courses/:id", (req, res) => {
    console.log("Here course ID", req.params.id);
    console.log("Here course object", req.body);
    Course.updateOne({ _id: req.params.id }, req.body).then((response) => {
        console.log("Here response after update", response);

        res.json({ message: "Edited with success" });

    });
});
// Business Logic : Get Course By ID
app.get("/courses/:id", (req, res) => {
    // Recuperer le param nommé id from path
    let x = req.params.id;
    Course.findOne({ _id: x }).then((doc) => {
        console.log("Here doc", doc);
        res.json({ course: doc });
    });
});
// Business Logic : Get ALL Courses
app.get("/courses", (req, res) => {
    // Instructions
    Course.find((err, docs) => {
        if (err) {
            console.log("here error with DB", err);
        } else {
            res.json({ courses: docs, message: "Here all courses, Done" });
        }
    });
});
// Business Logic : Delete Course By ID
app.delete("/courses/:id", (req, res) => {
    console.log("Here into delete", req.params.id);
    let x = req.params.id;
    Course.deleteOne({ _id: x }).then((response) => {
        console.log("Here response", response);
        if (response.deletedCount == 1) {
            res.json({ message: "Deleted with success" });
        }
    });
});

// busniss logic : add course reservation object
app.post("/courses/reservation", (req, res) => {
    console.log("here into reserve");
  
    console.log("here into add");
    console.log("here course object", req.body);
    // let match=new Match(req.body);
    // a droite attributs proviennt du front a gauche proviennet du schamea
    let reservation = new Reservation({
        idCourse:req.body.idCourse,
        userId: req.body.userId,
        teacherName: req.body.teacherName,
    });
    console.log("here course before reservation ", req.body.idCourse);
    console.log("here course before reservation ", reservation);
    //save fonction predefinie mongoose prend la variable echouf chnia type mte3ha w esobha fil collections
    reservation.save((err, doc) => {
        if (err) {
            console.log('here error', err);
        } else {
            res.json({

                message: "Resevation added with success",

            });
        }

    });
});

// busniss logic : add event reservation object
app.post("/events/reservation", (req, res) => {
    console.log("here into reserve");
  
    console.log("here into add");
    console.log("here event object", req.body);
    // let event=new event(req.body);
    // a droite attributs proviennt du front a gauche proviennet du schamea
    let eventReservation = new EventReservation({
        idEvent:req.body.idEvent,
        userId: req.body.userId,
        teacherName: req.body.teacherName,
    });
    console.log("here event before reservation ", req.body.idEvent);
    console.log("here event before reservation ", eventReservation);
    //save fonction predefinie mongoose prend la variable echouf chnia type mte3ha w esobha fil collections
    eventReservation.save((err, doc) => {
        if (err) {
            console.log('here error', err);
        } else {
            res.json({

                message: "Resevation added with success",

            });
        }

    });
});

// Business Logic : Get ALL Courses
app.get("/courses/add/myReservation", (req, res) => {
    // Instructions
    Reservation.find((err, docs) => {
        if (err) {
            console.log("here error with DB", err);
        } else {
            res.json({ reservation: docs, message: "Here all Reservation, Done" });
        }
    });
});

// Business Logic : Get ALL Courses
app.get("/events/add/myReservation", (req, res) => {
    // Instructions
    EventReservation.find((err, docs) => {
        if (err) {
            console.log("here error with DB", err);
        } else {
            res.json({ reservation: docs, message: "Here all Reservation, Done" });
        }
    });
});

// Business Logic: signup
// app.post("/users/signup", (req, res) => {
//     console.log("here into signup student")

//     let user = new User({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         gender: req.body.gender,
//         email: req.body.email,
//         password: req.body.password,
//         cin: req.body.cin,
//         tel: req.body.telephone,
//         role: 'student'
//     });
//     user.save((err, doc) => {
//         if (err) {
//             console.log("Error with DB", err);
//             if (err.errors.email.message) {
//                 res.json({
//                     message: "0",
//                 });
//             }
//         } else {
//             res.json({
//                 message: "1",
//                 user: doc,
//             });
//             localStorage.setItem(this.acces_users, res)

//         }
//     });


// });

// app.post("/users/signupTeacher", (req, res) => {
//     console.log("here into signup teacher")

//     let user = new User({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         password: req.body.password,
//         cin: req.body.cin,
//         tel: req.body.telephone,
//         role: 'teacher'
//     });
//     user.save((err, doc) => {
//         if (err) {
//             console.log("Error with DB", err);
//             if (err.errors.email.message) {
//                 res.json({
//                     message: "0",
//                 });
//             }
//         } else {
//             res.json({
//                 message: "1",
//                 user: doc,
//             });
//         }
//     });
// });

// // Business Logic: (login)

// app.post("/users/login", (req, res) => {
//     console.log("Here user", req.body);
//     User.findOne({ cin: req.body.cin })
//         .then((doc) => {
//             console.log("Here doc ", doc);
//             if (!doc) {
//                 res.json({ message: "0" });
//             }
//             // compare req.body.pwd with doc.pwd
//         })
//         .then((pwdResult) => {
//             console.log("pwdResult", pwdResult);
//             if (!pwdResult) {
//                 res.json({ message: "1" });
//             }

//             User.findOne({ email: req.body.email }).then((finalResult) => {
//                 let userToSend = {
//                     fName: finalResult.firstName,
//                     lName: finalResult.lastName,
//                 };

//                 res.json({
//                     message: "2",
//                     user: userToSend,
//                 });
//             });
//         });
// });

// // Business Logic : Edit User Object
// app.put("/users/:id", (req, res) => {
//     console.log("Here user id", req.params.id);
//     console.log("Here user object", req.body);
//     User.updateOne({ _id: req.params.id }, req.body).then((response) => {
//         console.log("Here response after update", response);

//         res.json({ message: "Edited with success" });

//     });
// });
// // Business Logic : Get User By ID
// app.get("/users/:id", (req, res) => {
//     // Recuperer le param nommé id from path
//     let x = req.params.id;
//     User.findOne({ _id: x }).then((doc) => {
//         console.log("Here doc", doc);
//         res.json({ user: doc });
//     });
// });
// app.get("/users/one/:email", (req, res) => {
//     // Recuperer le param nommé id from path
//     let x = req.params.email;
//     User.findOne({ _email: x }).then((doc) => {
//         console.log("Here doc", doc);
//         res.json({ user: doc });
//     });
// });

// app.get("/users/teachers", (req, res) => {
//     //instruction

//   //  let role = req.body.role; //recuperer le param nomme id from path
//     //search match by id
//     User.find({ role: "teacher" }).exec(function (err, docs) {

//         console.log('herre err', err);
//         console.log('herre err', err);
//         console.log('herre docs', docs);
//         if (err) {
//             console.log("here error", err);

//         } else {
//             res.json({ teachers: docs, message: 'here all teachers' })
//         }
//     });
// });

// // Business Logic : Get ALL Users
// app.get("/users", (req, res) => {
//     // Instructions
//     User.find((err, docs) => {
//         if (err) {
//             console.log("here error with DB", err);
//         } else {
//             res.json({ users: docs, message: "Here all useres, Done" });
//         }
//     });
// });
// // Business Logic : Delete User By ID
// app.delete("/users/:id", (req, res) => {
//     console.log("Here into delete", req.params.id);
//     let x = req.params.id;
//     User.deleteOne({ _id: x }).then((response) => {
//         console.log("Here response", response);
//         if (response.deletedCount == 1) {
//             res.json({ message: "Deleted with success" });
//         }
//     });
// });

/////////////////////////////////////////////////Debut Users//////////////////////////////////////////////////////////////////////

app.post("/users/signup", multer({ storage: storage }).single('img'), (req, res) => {

    bcrypt.hash(req.body.password, 10).then((cryptedPwd) => {
        //  bcrypt.hash("Hwess2022!", 10).then((cryptedPwd) => {
        console.log("here into signup", req.body);
        let url = req.protocol + '://' + req.get('host');
        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: cryptedPwd,
            cin: req.body.cin,
            tel: req.body.tel,
            gender: req.body.gender,
            specialite: req.body.specialite,
            role: req.body.role,
            img: url + '/images/' + req.file.filename,
            

            //   let user=new User({
            //    firstName:'Admin',
            //    lastName:'Admin',
            //    email:'contact@wess.net',
            //    password:cryptedPwd,
            //    cin:"09086176",
            //    tel:"22027919",
            //    gender:"Femme",
            //   specialite:"admin",
            //  role:"admin",
            //  img:"http://localhost:3000/images/A.png"
              

        });


        //save fonction predefinie mongoose prend la variable echouf chnia type mte3ha w esobha fil collections
        /*     user.save((err,doc)=>{
                if(err){
                    console.log('here error',err);
                    if(err.errors.email.message){
                        res.json({
                               message: "0",  
        
                        })
        
                    }
                }else{
                    res.json({
               
                        message: "1",
                        user:doc
              
            });
        }
        });  */
        var admin_email = "oussama.essaidi2018@gmail.com";

        user.save(function (err, user) {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {
                console.log('!!!',user);
                dispatch_emails(admin_email, user.email, user.firstName, user.cin, user.password);

                //  user.hash_password = undefined;
                return res.json(user);
            }
        })
    });
});

app.get("/users/:id", (req, res) => {
    // snapchat.paramMap.get('id')
    // let x = req.params.id; recuperer le param nommé id b path
    let x = req.params.id;
    console.log("here id from path", x);
    User.findOne({ _id: x }).then((doc) => {
        console.log('here doc', doc);
        res.json({ user: doc });
    });

});
//Bussiness Logic :search user by email and pwd
app.post("/users/login", (req, res) => {
    console.log("here user ", req.body);
    User.findOne({ cin: req.body.cin }).then((doc) => {
        console.log("here doc", doc);
        if (!doc) {
            return res.json({ message: "0" })

        }
        //compare req.body.pwd with doc.pwd
        return bcrypt.compare(req.body.password, doc.password);
    }).then((pwdResult) => {
        console.log("pwdResult", pwdResult);
        if (!pwdResult) {
            return res.json({ message: "1" })
        }
        User.findOne({ cin: req.body.cin }).then((finalResult) => {
            let userToSend = {
                fName: finalResult.firstName,
                lName: finalResult.lastName,
                _id: finalResult._id,
                role: finalResult.role,
                img: finalResult.img,
              

            };
            return res.json({
                message: "2",
                user: userToSend,
            })
        });
    });


});



app.get("/users", (req, res) => {
    //instruction
    console.log("Here into get all users BL");
    // function predefini mangooose yemchi lil collection users w eraja3li elkol
    User.find((err, docs) => {
        console.log('herre err', err);
        console.log('herre docs', docs);
        if (err) {
            console.log("here erreor", err);

        } else {
            res.json({ users: docs, message: 'here all users' })
        }
    });

});



app.delete("/users/:id", (req, res) => {
    console.log("here into delete", req.params.id);
    let x = req.params.id;
    console.log("here id from path", x);
    User.deleteOne({ _id: x }).then((response) => {
        console.log('here response', response);
        if (response.deletedCount == 1) {
            res.json({ message: "deleteed with success" });
        }
    });
});

/* app.get("/users/role", (req, res)=> {
    // snapchat.paramMap.get('id')
    // let x = req.params.id; recuperer le param nommé id b path
    let role = req.body.role;
    console.log("here id from path", role);
    User.findOne({role:role}).then((doc)=>{console.log('here doc',doc);
    res.json({users:doc});
});

}); */


module.exports = app;