import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImg } from 'utils/getImages';

export class App extends Component {
  state = {
    images: [],
    searchText: '',
    page: 1,
    loading: false,
    totalHits: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.searchText !== prevState.searchText
    ) {
      this.setState({ loading: true });

      fetchImg(this.state.page, this.state.searchText)
        .then(resp => {
          this.setState(prevState => ({
            images: [...prevState.images, ...resp.hits],
            loading: false,
            totalHits: resp.totalHits,
          }));
        })
        .catch(error => {
          console.log('error', error);
          this.setState({ loading: false });
        });
    }
  }

  handleLoadMore = () => {
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage, loading: true }, () => {
      fetchImg(nextPage);
    });
  };

  onSubmit = searchText => {
    if (this.state.searchText !== searchText) {
      this.setState({ searchText, images: [], page: 1 });
    }
  };

  render() {
    const { searchText, images, loading, totalHits, page } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          searchText={searchText}
          images={images}
          loading={loading}
          onClick={this.handleLoadMore}
          totalHits={totalHits}
          page={page}
        />
      </>
    );
  }
}
