import React, { Component } from 'react';
import SearchBar from './components/SearchBar'
import ListItem from './components/ListItem'
import './style.css'
import API from './util/api';

class App extends Component {

  state = { 
    employees: [],
    search: ""
  }

  componentDidMount() {
    API.search().then(res => {
      this.setState({ employees: res.data })
    });
  }
  callASDF = () => {
    console.log(this.state);
  }

  handleChange = (event) => {
    this.setState({ search: event.target.value });
    let newList = this.state.employees.filter(employee => {
      let fullName = `${employee.first} ${employee.last}`;
      if(fullName.substr(0, this.state.search.length) === this.state.search.substr(0, this.state.search.length + 1)) {
        return true;
      } else {
        return false;
      }
    })
    this.setState({ employees: newList });
    console.log(newList);
  }


  render() { 
    return ( 
      <div className="w-100 h-100">
        <div className="topBox"></div>
        <h1 className="text-center mt-5">EMPLOYEE DIRECTORY</h1>
        <SearchBar handleChange={this.handleChange}/>
        <div className="listHeader d-flex justify-content-around text-center">
          <h2 className="listHeading">Name</h2>
          <h2 className="listHeading">Email</h2>
          <h2 className="listHeading">Address</h2>
        </div>
        {this.state.employees.map(item => {
          let fullName = `${item.first} ${item.last}`
          return <ListItem name={fullName} key={fullName} email={item.email} address={item.address} />
        })}
      </div>
     );
  }
}
 
export default App;