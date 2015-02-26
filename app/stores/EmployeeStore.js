var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var EmployeeConstants = require('../constants/EmployeeConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _allEmployees = [];
var _employees = [];

/**
 * load all employees from a datastore
 * here just use a js array from EmployeeWebAPIUtils to mock database return
 */ 
function loadEmployees(employees){
  _allEmployees = employees;
  _employees = employees;
}

/**
 * search employees by his/her full name
 * @param {string} searchKey The search keyword
 * @return [object] array of employees
 */
function findByName(searchKey) {
  var results;
  if (searchKey.trim()){
    results = _allEmployees.filter(function (element) {
      var fullName = element.firstName + " " + element.lastName;
      return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
    });      
  } else {
    results = _allEmployees;
  }
  _employees = results;
}

/**
 * get all employees reporting to a manager
 * @param {string} managerId The id of manager in interest
 * @return [object] array of employees reporting to the manager
 */
function findByManager(managerId) {
  var results = _allEmployees.filter(function (element) {
    return managerId === element.managerId;
  });
  _employees = results;
}


var EmployeeStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  
  /**
   * @return [object] get array of employees
   */
  getEmployees: function(){
    return _employees;
  },
  
  /**
   * @return {object} get employee by id
   */
  findById: function (id) {
    var employee = null;
    var l = _allEmployees.length;
    for (var i = 0; i < l; i++) {
      if (_allEmployees[i].id == id) {
        employee = _allEmployees[i];
        break;
      }
    }
    return employee;
  }
  
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    
    case EmployeeConstants.RECEIVE_EMPLOYEES:
      loadEmployees(action.employees);
      EmployeeStore.emitChange();
      break;

    case EmployeeConstants.SEARCH_EMPLOYEES_BY_NAME:
      var searchKey = action.searchKey;
      findByName(searchKey);
      EmployeeStore.emitChange();
      break;

    case EmployeeConstants.FIND_EMPLOYEES_BY_MANAGER:
      var managerId = action.managerId;
      findByManager(managerId);
      EmployeeStore.emitChange();
      break;

    default:
      // do nothing
    
  }
});

module.exports = EmployeeStore;