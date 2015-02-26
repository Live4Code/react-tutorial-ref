var es5Shim = require('es5-shim');
var HomePage = require('./components/HomePage');
var DetailPage = require('./components/DetailPage');
var EmployeeWebAPIUtils = require('./utils/EmployeeWebAPIUtils');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route, DefaultRoute = Router.DefaultRoute,
  Link=Router.Link, RouteHandler = Router.RouteHandler, NotFoundRoute = Router.NotFoundRoute;

//load employees into EmployeeStore, simulate a database call
EmployeeWebAPIUtils.getEmployees();

//default router, for url not handlered
var NotFound = React.createClass({
  render: function () {
    return <h2>Not found</h2>;
  }
});

//page is controlled by React Router based on the url segment
var EmployeeApp = React.createClass({
  render: function () {
    return (
      <div>
        <RouteHandler />
      </div>
    );
  }
});

// define app routes
// default '/' -> HomePage component. 
// '/employees/:id' -> DetailPage component. Visit a employee's detail page
var routes = (
  <Route handler={EmployeeApp}>
    <Route name="Detail" handler={DetailPage} path="employees/:id" />
    <DefaultRoute handler={HomePage} />
    <NotFoundRoute handler={NotFound}/>
  </Route>

);

// bootstrap react app
Router.run(routes, function(Handler){
  React.render(<Handler/>, document.getElementById('app'));
});