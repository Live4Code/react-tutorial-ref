var React = require('react');
var Router = require('react-router');
var EmployeeStore = require('../stores/EmployeeStore');
var Header = require('./Header');

var DetailPage = React.createClass({
  mixins: [ Router.Navigation, Router.State ],

  //get id from url segment and fetch employee from EmployeeStore
  getStateFromStore: function (id) {
    id = this.getParams().id;
    return {
      employee: EmployeeStore.findById(id)
    };
  },

  //set employee as state
  getInitialState: function () {
    return this.getStateFromStore();
  },

  //fired on EmployeeStore emit change, trigger updateEmployee method
  componentDidMount: function () {
    EmployeeStore.addChangeListener(this.updateEmployee);
  },

  //remove listener on destroy
  componentWillUnmount: function () {
    EmployeeStore.removeChangeListener(this.updateEmployee);
  },

  //get updated employee
  updateEmployee: function () {
    if (!this.isMounted())
      return;

    this.setState(this.getStateFromStore());
  },  

  render: function () {
    return (
      <div>
        <Header text={this.state.employee.firstName+" "+this.state.employee.lastName} back="true"/>
        <div className="card">
          <ul className="table-view">
            <li className="table-view-cell media">
              <img className="media-object big pull-left" 
                src={"pics/" + this.state.employee.firstName + "_" + this.state.employee.lastName + ".jpg" }/>
              <h1>{this.state.employee.firstName} {this.state.employee.lastName}</h1>
              <p>{this.state.employee.title}</p>
            </li>
            <li className="table-view-cell media">
              <a href={"tel:" + this.state.employee.officePhone} className="push-right">
                <span className="media-object pull-left icon icon-call"></span>
                <div className="media-body">
                  Call Office
                  <p>{this.state.employee.officePhone}</p>
                </div>
              </a>
            </li>
            <li className="table-view-cell media">
              <a href={"tel:" + this.state.employee.mobilePhone} className="push-right">
                <span className="media-object pull-left icon icon-call"></span>
                <div className="media-body">
                  Call Mobile
                  <p>{this.state.employee.mobilePhone}</p>
                </div>
              </a>
            </li>
            <li className="table-view-cell media">
              <a href={"sms:" + this.state.employee.mobilePhone} className="push-right">
                <span className="media-object pull-left icon icon-sms"></span>
                <div className="media-body">
                  SMS
                  <p>{this.state.employee.mobilePhone}</p>
                </div>
              </a>
            </li>
            <li className="table-view-cell media">
              <a href={"mailto:" + this.state.employee.email} className="push-right">
                <span className="media-object pull-left icon icon-email"></span>
                <div className="media-body">
                  Email
                  <p>{this.state.employee.email}</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );  
  }

});

module.exports = DetailPage;