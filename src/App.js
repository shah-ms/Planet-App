import React from 'react';
import FullWidthTabs from './FullWidthTabs';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {planets: []};
  }

  componentDidMount() {
    axios.get('https://assignment-machstatz.herokuapp.com/planet').then(res => {
      const planets = res.data;
      this.setState({planets});
    })
  }

  render() {
    return (
      <div className="App">
        <FullWidthTabs planets={this.state.planets}/>
      </div>
    );
}
}

export default App;
