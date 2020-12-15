
const express = require('express');
const admin = require("firebase-admin");
const firebaseKey = require('./firebase-key.json');
const bodyParser = require('body-parser');

const port = 3001;
const web = express();
const serviceAccount = firebaseKey;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const fieldVal = admin.firestore.FieldValue;
web.use(bodyParser.json());

//To create a new student record
web.post('/create-student', (req, res) => {
    let student = req.body;
    let studentRollNo = req.body.rollno;
    delete student.rollno;
    db.collection("student").doc(studentRollNo).set(student).then(data =>  res.send("Student data created successfully")).catch(err => res.send("Student data creation failed"));
   
})

//To find a student record based on the provided student name
web.get('/find-student', async (req, res) => {

    let student;
    await db.collection("student").doc(req.query.studentname).get().then(data => { res.send(data.data()); console.log(data.data()) }).catch(err => console.log(err));

    
})

//To get all the student records
web.get('/get-all-student', async (req, res) => {

    let students = [];
    await db.collection("student").get().then(data => { data.forEach(student => students.push(student.data())); }).catch(err => console.log(err));

    console.log(students)
    res.send(students);
})


//To update a student record
web.put('/update-student', async (req, res) => {
    const updateAttr = req.body.updateAttr;

    await db.collection("student").doc(req.body.rollno).update({
        [updateAttr]: req.body.newVal
    }).then(val => res.send("Student details updated successfully")).catch(err => res.send("Student details updation failed"));
    
    
})


//To delete a student record
web.delete('/delete-student', async (req, res) => {
    const delAttr = req.body.deleteAttribute;

    await db.collection("student").doc(req.body.rollno).update({
        [delAttr]: fieldVal.delete()
    }).then(val => res.send("Student details deleted successfully")).catch(err => res.send("Student details deletion failed"));
    ;
   
})


web.listen(port, () => {
    console.log("Server started running successfully at "+port);
});





/*

//db.collection("sample").doc("id").get().then(data => console.log(data.data()));
//db.collection("sample").doc("id2").set({class:"B.E"}).then(res => console.log(res));
//db.collection("sample").doc("id2").delete().then(res => console.log(res));
//db.collection("sample").doc("id2").set({class:"B.E"}).then(res => console.log(res));


web.get('/sample', (req, res) => {

    res.send(req);
});

web.listen(port, () => {
    console.log("It's done");
});*/
