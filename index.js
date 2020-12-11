
const express = require('express');
const admin = require("firebase-admin");

const web = express();
const bodyParser = require('body-parser');
const port = 3001;
const serviceAccount = {
    "type": "service_account",
    "project_id": "firstproject-b6d40",
    "private_key_id": "79998dbbbf11f782c416cf5fc476da14c213f3be",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCPpPrPQdt75z62\nIspufeyuAcxuovZ2VIWlhFow8DnOR2oNCzQv6lqo5+5f4GP322iQv0ENFJXHKeTF\njJ3a32/rdBeX3nJbd6a/LVVK5DhClJNN8GbFNOSnuILmzyvufyq9ArcO+RtTa9c0\nQumBtuBM8tP7eqR5tBNvI2RjAFfjDNa0lUwyOuDqOPZg4GIm2UwinvXZqBG1QHY6\ngOppM/wk4FyrKPdlRlTBGdvqXUeFMAzDhX/GJdL4kQ1AlhMCrIDsQ1sq62/dFIXK\n3uo1ZIh5ES361KgmmxJHan6xlWDRTTlvr4Z/Kn8r11LTMLCyUGjwi4RU43HmLf+d\naYu+AWu3AgMBAAECggEALPABcM5bEieVRFic+LUXUpaIdIIx1XH6v32o04+Lnf9U\na5E6OdU4mIe6WK8zxwoSa9oRSTzL4Js4ER89EQh+lGvkp6O1Je1IMp3FhaDhAt9F\nOAhBtmcmM1wzQ27DgSCyZ6AOUbZXuKDPme9m6qgiAqCi9ZT4GITf4ZByatBkLkjR\nbxSMiZcABogdBxgzrI3XwIYTRYWQwLEAlFtnJlXsuQGGc//9VIcRTNGojSYJlZ6u\nsKRU2lfqB4KhJws5B/wcv+TP2wI+jZfgjHsfCPyNs5dDsh1sSh5Pudg4XX5YA3FO\ncgCvUAcLdsKmnwFxrb5UROrNULDHanNhjp3w1TmUNQKBgQDDeX/GWGibdJylBNwz\n3+AzBXPCllucnsW50Kj4xFrGwEUcTrfPZd7q4R8O1T8LPMVqOrBkXbb9H/s6/0Gk\nz8N8dBJ3iGnnp/m/CgQiFoU9hh8G4n/ndzy0SrkZT3T+cEgZNdX8b67bCbPhs3Md\nZN0Er8+JBfm/zTFQa7Q4K6k+lQKBgQC8HxvYfu7p1a2nflNlic/YiVu5eHE7d3ak\nspBY9W2B5bYlukCONc09yYrYL2nBfz8o+GJ23iZ5AVams2y9hYlR1ZzRSD3MqMWr\nCRq3r/MBmk/9YtkDysMjvizAawoCP/CbJ+L5mQicg04lfhxs1hG+E3uuP889/04o\nQUQoXF4KGwKBgQCSLuO6flVEpJGc6ySOesddAJ/QjsdWOnqd+ojS+Wz1o8ZLZCcc\nKA/sUYz7d8hc7Aaq6dcOR/NYGzmzpj7+NQ35nYhN8itZPgqMrr3mjDb6irnbWTnT\n7Rztq8//OKfCvE9+4v7zeMYoMnpeuOfGvK55Gc23qEtc/+P4Q4OUWjqIfQKBgQC0\nPfooDDZMxPaFLHwrJUeHaNQBeGzFVUjPtGapVT1+3+ENdM61cscbFCd7yrHBO3IA\nhzuQOHkUJzwmrHLbgz52sfx2aIkNtgbuQOLgbCygtIE/fZ4ADB27+VJXajdEwI5/\nmk/WZdHiY8xUD+icPt7xBynRYkHmXN89oorzQMy5UQKBgAVmAriSDpXedW6+2ZWe\nZ7S7VdIds7JAdW6XJv7eHZDEN4RQji3PHnbhfEZhPo7UxHY3IH4V6Jd7ZyR8hYQL\nQ6hLDrnCOsRftp8CpWtGutVJg0F3T1CgejkvMzNgNDHG25+zEdT32XX62ApnSwcL\nmZvHYFkZdLOxVH4KiJ0hVFuX\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-4bvw3@firstproject-b6d40.iam.gserviceaccount.com",
    "client_id": "106743066339021213135",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4bvw3%40firstproject-b6d40.iam.gserviceaccount.com"
};


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