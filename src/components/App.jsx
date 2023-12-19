import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchText: '',
  };

  onSubmit = searchText => {
    this.setState({ searchText });
  };

  render() {
    const { searchText } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery searchText={searchText} />
      </>
    );
  }
}
