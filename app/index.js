const React = require('react');
const ReactDOM = require('react-dom');
require('./main.css');
var App = require('./components/App')


ReactDOM.render (
    <App/>, 
    document.getElementById('app')
);
