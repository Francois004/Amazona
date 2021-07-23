import React from 'react';
import {
  Header,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react';
import { Navbar,nav,Form,Button,FormControl } from 'react-bootstrap';

class Navbarr extends React.Component{
constructor(props){
super(props)
this.state = { 
}
}
render () {

   return(
       <div>
 <nav className="navbar navbar-inverse">
  <div className="container-fluid">
    <div className="navbar-header">
      <a className="navbar-brand" href="#">WebSiteName</a>
    </div>
    <ul className="nav navbar-nav">
      <li className="active"><a href="#">Home</a></li>
      <li><a href="#">Page 1</a></li>
      <li><a href="#">Page 2</a></li>
    </ul>
    <ul className="nav navbar-nav navbar-right">
      <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
      <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
    </ul>
  </div>
</nav>
   </div>
   )
}
}
export default Navbarr;