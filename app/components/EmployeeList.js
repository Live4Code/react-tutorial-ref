var React = require('react');
var EmployeeStore = require('../stores/EmployeeStore');
var EmployeeListItem = require('./EmployeeListItem');

//get array of employees to be rendered
function getStateFromStores(){
  return {
    employees: EmployeeStore.getEmployees()
  }
}

var EmployeeList = React.createClass({
  
  //initial state: get all employees
  getInitialState: function() {
    return getStateFromStores();
  },

  //listen for changes in EmployeeStore, and trigger _onChange method
  componentDidMount: function() {
    EmployeeStore.addChangeListener(this._onChange);
  },

  //unbinder listener when component is destroyed
  componentWillUnmount: function() {
    EmployeeStore.removeChangeListener(this._onChange);
  },

  render: function () {
    //for each employee, create an EmployeeListItem component, key is used to identify each component
    //pass employee as property, to be rendered in EmployeeListItem
    var items = this.state.employees.map(function (employee) {
      return (
        <EmployeeListItem key={employee.id} employee={employee} />
      );
    });
    return (
      <ul className="table-view">
        {items}
      </ul>
    );
  },

  /**
   * Event handler for 'change' events coming from the EmployeeStore
   */
  _onChange: function() {
    //update state value when EmployeeStore changes
    //component re-render itself
    this.setState(getStateFromStores());
  }

});

module.exports = EmployeeList;