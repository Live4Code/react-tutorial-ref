var React = require('react');
var Header = require('./Header');
var SearchBar = require('./SearchBar');
var EmployeeList = require('./EmployeeList');


var HomePage = React.createClass({
  render: function () {
    return (
      <div>
        <Header text="Employee Directory" back="false"/>
        <SearchBar/>
        <div className="content">
          <EmployeeList/>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;