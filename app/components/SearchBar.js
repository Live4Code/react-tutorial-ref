var React = require('react');
var EmployeeActions = require('../actions/EmployeeActions');

var SearchBar = React.createClass({

  getInitialState: function() {
    //initialize the search text to empty string
    //that is returning all employees
    return {text: ''};
  },

  _onChange: function(event) {
    //get the search text
    var text = event.target.value;
    this.setState({text: text});
    //Trigger search action to dispatcher
    EmployeeActions.searchEmployees(text);
  },

  render: function () {
    return (
      <div className="bar bar-standard bar-header-secondary">
        <input type="search" onChange={this._onChange} value={this.state.text}/>
      </div>
    );
  }
});

module.exports = SearchBar;