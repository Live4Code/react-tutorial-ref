var React = require('react');
var ReactPropTypes = React.PropTypes;

var EmployeeListItem = React.createClass({

  propTypes: {
    //employee is an object, coming from parent component - EmployeeList
    //it is available as this.props.employee
    employee: ReactPropTypes.object
  },

  render: function () {
    return (
      <li className="table-view-cell media">
        <a href={"#employees/" + this.props.employee.id}>
          <img className="media-object small pull-left" 
            src={"pics/" + this.props.employee.firstName + "_" + this.props.employee.lastName + ".jpg" }/>
          {this.props.employee.firstName} {this.props.employee.lastName}
          <p>{this.props.employee.title}</p>
        </a>
      </li>
    );
  }

});

module.exports = EmployeeListItem;