import React, { Component } from 'react';
import SearchBar from './components/SearchBar'
import ListItem from './components/ListItem'
import './style.css'
import API from './util/api';

class App extends Component {

  state = { 
    employees: [],
    search: "",
    renderList: []
  }

  componentDidMount() {
    API.search().then(res => {
      this.setState({ employees: res.data });
      this.setState({ renderList: res.data });
    });
  }

  handleChange = (event) => {
    this.setState({ search: event.target.value }, () => {
      this.employeeSearch();
    });
  }

  employeeSearch = () => {
    let newList = this.state.employees.filter(employee => {
      let fullName = `${employee.first} ${employee.last}`;
      if(fullName.toLowerCase().substr(0, this.state.search.length) === this.state.search.toLowerCase().substr(0, this.state.search.length)) {
        return true;
      } else {
        return false;
      }
    })
    this.setState({ renderList: newList });
  }

  sortEmployees = () => {
    console.log('asdf');
    let newList = this.state.renderList.sort();
    this.setState({ renderList: newList })
  }


  render() { 
    return ( 
      <div className="w-100 h-100">
        <div className="topBox"></div>
        <h1 className="text-center mt-5">EMPLOYEE DIRECTORY</h1>
        <SearchBar handleChange={this.handleChange}/>
        <div className="listHeader d-flex justify-content-around text-center">
          <h2 className="listHeading nameHeading" onClick={this.sortEmployees}>Name</h2>
          <h2 className="listHeading">Email</h2>
          <h2 className="listHeading">Address</h2>
        </div>
        {this.state.renderList.map(item => {
          let fullName = `${item.first} ${item.last}`
          return <ListItem name={fullName} key={fullName} email={item.email} address={item.address} />
        })}
      </div>
     );
  }
}
 
export default App;