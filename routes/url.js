var express = require('express');
var router = express.Router();
var timers = require('timers')
var data = [{
    title: "Best blogpost ever 1",
    text: "Node.js is an open source, cross-platform runtime environment for server-side and networking applications. Node.js applications are written in JavaScript, and can be run within the Node.js runtime on OS X, Microsoft Windows, Linux, FreeBSD, NonStop and IBM i."
}, {
    title: "Best blogpost ever 2",
    text: "Node.js is an open source, cross-platform runtime environment for server-side and networking applications. Node.js applications are written in JavaScript, and can be run within the Node.js runtime on OS X, Microsoft Windows, Linux, FreeBSD, NonStop and IBM i."
}, {
    title: "Best blogpost ever 3",
    text: "Node.js is an open source, cross-platform runtime environment for server-side and networking applications. Node.js applications are written in JavaScript, and can be run within the Node.js runtime on OS X, Microsoft Windows, Linux, FreeBSD, NonStop and IBM i."
}]


/* GET processed url  listing. */
router.get('/', function(req, res) {
    console.log("called");
    var id = timers.setTimeout(function() {
        timers.clearTimeout(id);
        res.json(data);
    }, 5000)
});
router.get('/:id', function(req, res) {

});


module.exports = router;
