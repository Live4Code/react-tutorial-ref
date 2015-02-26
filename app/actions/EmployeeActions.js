var AppDispatcher = require('../dispatcher/AppDispatcher');
var EmployeeConstants = require('../constants/EmployeeConstants');

var EmployeeActions = {

  /**
   * @param  [object] employees
   */
  receiveAll: function(employees) {
    AppDispatcher.dispatch({
      actionType: EmployeeConstants.RECEIVE_EMPLOYEES,
      employees: employees
    });
  },

  /**
   * @param  {string} searchKey
   */
  searchEmployees: function(searchKey) {
    AppDispatcher.dispatch({
      actionType: EmployeeConstants.SEARCH_EMPLOYEES_BY_NAME,
      searchKey: searchKey
    });    
  },

  /**
   * @param  {string} managerId
   */
  findEmployeesByManager: function(managerId) {
    AppDispatcher.dispatch({
      actionType: EmployeeConstants.FIND_EMPLOYEES_BY_MANAGER,
      managerId: managerId
    });    
  }  
  
};

module.exports = EmployeeActions;