import React, { Component } from 'react';
import SearchBar from './components/SearchBar'
import ListItem from './components/ListItem'
import './style.css'
import API from './util/api';

class App extends Component {

  //States for employees, search status, the list to be rendered, and sort direction
  state = { 
    employees: [],
    search: "",
    renderList: [],
    sort: ""
  }  

  //When the component loads, grab the employee data and set the initial states full of employee objects
  componentDidMount() {
    API.search().then(res => {
      this.setState({ employees: res.data });
      this.setState({ renderList: res.data });
    });
  }

  //Function compares two employee objects and returns which name comes after the other
  compare = ( a, b ) => {
    if(this.state.sort === "" || this.state.sort === "DESC") {
      if ( a.first < b.first ){
        return -1;
      }
      if ( a.first > b.first ){
        return 1;
      }
      return 0;
    } else {
      if ( a.first < b.first ){
        return 1;
      }
      if ( a.first > b.first ){
        return -1;
      }
      return 0;
    }
  }

  //When someone types in the search bar, update the search state, and then run the employee search function
  handleChange = (event) => {
    this.setState({ search: event.target.value }, () => {
      this.employeeSearch();
    });
  }

  //Filters the emplyoyees by the search state into a variable
  employeeSearch = () => {
    let newList = this.state.employees.filter(employee => {
      let fullName = `${employee.first} ${employee.last}`;
      //If the search state and the first letters of the name match return true/false
      if(fullName.toLowerCase().substr(0, this.state.search.length) === this.state.search.toLowerCase().substr(0, this.state.search.length)) {
        return true;
      } else {
        return false;
      }
    })
    //Set the rendered list to the new list
    this.setState({ renderList: newList });
  }

  //Sort the employees based on which direction it's already been sorted
  sortEmployees = () => {
    if(this.state.sort === "" || this.state.sort === "DESC") {
      let newList = this.state.renderList.sort(this.compare);
      this.setState({ sort: "ASC" });
      this.setState({ renderList: newList }, () => console.log(this.state.renderList))
    } else {
      let newList = this.state.renderList.sort(this.compare);
      this.setState({ sort: "DESC" });
      this.setState({ renderList: newList }, () => console.log(this.state.renderList))
    }
  }

  render() { 
    return ( 
      <div className="w-100 h-100">
        <div className="topBox"></div>
        <h1 className="text-center mt-5">EMPLOYEE DIRECTORY</h1>
        {/* Render the search bar passing in the handleChange method */}
        <SearchBar handleChange={this.handleChange}/>
        <div className="listHeader d-flex justify-content-around text-center">
          <h2 className="listHeading nameHeading" onClick={this.sortEmployees}>Name</h2>
          <h2 className="listHeading">Email</h2>
          <h2 className="listHeading">Address</h2>
        </div>
        {/* For every object in the employee list make a new List Item component */}
        {this.state.renderList.map(item => {
          let fullName = `${item.first} ${item.last}`
          return <ListItem name={fullName} key={fullName} email={item.email} address={item.address} />
        })}
      </div>
     );
  }
}
 
export default App;