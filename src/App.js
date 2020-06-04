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

      const images_link = [ 'https://solarsystem.nasa.gov/system/stellar_items/image_files/2_feature_1600x900_mercury.jpg',
        'https://solarsystem.nasa.gov/system/stellar_items/list_view_images/3_480x320_venus.png',
        'https://solarsystem.nasa.gov/system/stellar_items/list_view_images/4_earth_480x320.jpg',
        'https://solarsystem.nasa.gov/system/stellar_items/list_view_images/6_mars_480x320.jpg',
        'https://solarsystem.nasa.gov/system/stellar_items/list_view_images/704_ceres_480x320.jpg',
        'https://solarsystem.nasa.gov/system/stellar_items/list_view_images/9_jupiter_480x320_new.jpg',
        'https://solarsystem.nasa.gov/system/stellar_items/list_view_images/38_saturn_480x320.jpg',
        'https://solarsystem.nasa.gov/system/stellar_items/list_view_images/99_pluto_480x320.jpg',
        'https://solarsystem.nasa.gov/system/stellar_items/list_view_images/723_haumea_480x320.jpg',
        'https://solarsystem.nasa.gov/system/stellar_items/list_view_images/705_makemake_480x320.jpg',
        'https://solarsystem.nasa.gov/system/stellar_items/list_view_images/724_eris_480x320.jpg' 
      ]

      const wiki_link = ['https://en.wikipedia.org/wiki/Mercury_(planet)', 
        'https://en.wikipedia.org/wiki/Venus',
        'https://en.wikipedia.org/wiki/Earth',
        'https://en.wikipedia.org/wiki/Mars',
        'https://en.wikipedia.org/wiki/Ceres_(dwarf_planet)',
        'https://en.wikipedia.org/wiki/Jupiter',
        'https://en.wikipedia.org/wiki/Saturn',
        'https://en.wikipedia.org/wiki/Pluto',
        'https://en.wikipedia.org/wiki/Haumea',
        'https://en.wikipedia.org/wiki/Makemake',
        'https://en.wikipedia.org/wiki/Eris_(dwarf_planet)'  
      ]

      for(var i=0; i<Object.keys(planets).length; i++) {
        let p = planets[i];
        p['image'] = images_link[i];
        p['wiki'] = wiki_link[i];
      }
      
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
