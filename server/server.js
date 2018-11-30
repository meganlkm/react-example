require('dotenv').config();

const express = require('express');
const multer = require('multer');
const ps = require('python-shell');

const port = 5000;
const dest = process.env.UPLOAD_PATH || '/opt/uploads';
const python_path = process.env.PYTHON_PATH || '/usr/bin/python';
const script_path = process.env.SCRIPT_PATH || '/opt/scripts';

const app = express();

// Callback in storage pulls filename from dropzone request
const storage = multer.diskStorage({
    destination: dest,
    filename: function (req, file, cb) {
        cb(null, req.body.name);
    }
});

// Used for control of filename
const upload = multer({ storage })


function runPyScriptExample(req, res) {
    let options = {
        mode: 'text',
        pythonPath: python_path,
        scriptPath: script_path
    }
    ps.PythonShell.run('example.py', options, function (err, results) {
        console.log("results: " + results);
        console.log("err: " + err);
        if (err) res.send(err);
        res.send({express: 'Finished running script!'});
        console.log("finished running script");
    })
}


// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// status endpoint
app.get('/up', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

// Text in single call nneeds to match
app.post('/upload', upload.single('file'), (req, res) => {
    // console.log(req);
    if (!req.file) {
        console.log('No file received');
        return res.send({ success: false });
    }
    console.log('File received');
    return res.send({ success: true });
});

app.get('/run-py-script', runPyScriptExample);
