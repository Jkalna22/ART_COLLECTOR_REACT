import React, { Component } from 'react'
// import { render } from 'react-dom';

import { 
  fetchAllCenturies,
  fetchAllClassifications,
  fetchQueryResults
} from '../api';

class Search extends Component {//setIsLoading, setSearchResults

  constructor(props) {
    super(props);
    this.state = { 
      centuryList: [],
      classificationList: [],
      queryString: '',
      century: 'any',
      classification: 'any',
     }
  }  

  setCenturyList = (newCentury) => {
    this.setState({
      centuryList: newCentury,
    });
  }

  handleCenturyListChange = (event) => {
    let targetValue = event.target.value;
    this.setState({century: targetValue})
  }

  setClassificationList = (newClassificationList) => {
    this.setState({
      classificationList: newClassificationList,
    });
  }

  handleClassificationListChange = (event) => {
    let targetValue = event.target.value;
    this.setState({ classification: targetValue});
  }

  setQueryString = (newQueryString) => {
    this.setState({
      queryString: newQueryString,
    });
  }

  handleQueryStringChange = (event) => {
    let targetValue = event.target.value;
    this.setQueryString(targetValue)
  }

  componentDidMount() {
    Promise.all([fetchAllCenturies(), fetchAllClassifications()])
    .then(([centuries, classifications]) => { 
      this.setState({
        centuryList: centuries,
        classificationList: classifications
      })
    })
    .catch(error => console.error(error))
  }


  render() {
    const {
      classificationList,
      centuryList,
      century,
      classification,
      queryString
    } = this.state

  return <form id="search" onSubmit={async (event) => {
    event.preventDefault();
    this.props.setIsLoading(true);

    try {
      const fetchResult = await fetchQueryResults({century, classification, queryString})
      this.props.setSearchResults(fetchResult)
    } catch (error) {
      console.error(error);
    } finally {
      this.props.setIsLoading(false);
    }
    
  }}>
    <fieldset>
      <label htmlFor="keywords">Query</label>
      <input 
        id="keywords" 
        type="text" 
        placeholder="enter keywords..." 
        value={
        this.props.queryString
        } 
        onChange={this.handleQueryStringChange}/>
    </fieldset>
    <fieldset>
      <label htmlFor="select-classification">Classification <span className="classification-count">({ classificationList.length })</span></label>
      <select 
        name="classification"
        id="select-classification"
        value={
        this.props.classification
        } 
        onChange={this.handleClassificationListChange}>
        <option value="any">Any</option>
        {
        classificationList.map((item, idx) => {
            return <option key={idx} value={item.name}>{item.name}</option>
          })
        }
      </select>
    </fieldset>
    <fieldset>
      <label htmlFor="select-century">Century <span className="century-count">({ centuryList.length })</span></label>
      <select 
        name="century" 
        id="select-century"
        value={
        this.props.century
        } 
        onChange={this.handleCenturyListChange}
        >
        <option value="any">Any</option>
        {
        centuryList.map((item, idx) => {
          return <option key={idx} value={item.name}>{item.name}</option>
        })
      }
      </select>
     </fieldset>
    <button>SEARCH</button>
  </form>
}
}

export default Search;