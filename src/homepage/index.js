var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var request = require('superagent');
var header = require('../header');
var axios = require('axios');

var Promisefrom = require('promise-polyfill');

// To add to window
if (!window.Promise) {
    window.Promise = Promise;
}

page('/', header,loadPicturesFetch, function (ctx, next) {
    title('Spirit Growth Network');
    var main = document.getElementById('main-container');
    empty(main).appendChild(template(pictures));
})

function loadPictures(ctx, next) {
    request
        .get('/api/pictures')
        .end(function (err, res) {
            if (err) return console.log(err);

            ctx.pictures = res.body;
            next();
        })
}

function loadPicturesAxios(ctx, next) {
    axios
        .get('/api/pictures')
        .then(function (res) {
            ctx.pictures = res.data;
            next();
        })        
        .catch (function (err) {
            console.log(err)
        })
}

function loadPicturesFetch(ctx, next) {
    fetch('/api/pictures')
        .then(function (res) {
            return res.json();
        })
        .then(function (pictures) {
            ctx.pictures = pictures;
            next();
        })
        .catch(function (err) {
            console.log(err);
        })
}