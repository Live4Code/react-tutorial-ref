var es5Shim = require('es5-shim');
var React = require('react');

var TodoApp = require('./components/TodoApp.react');

React.render(
  <TodoApp />,
  document.getElementById('todoapp')
);