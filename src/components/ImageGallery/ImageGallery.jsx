import React, { Component } from 'react';
import axios from 'axios';
import * as basicLightbox from 'basiclightbox';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

const API_KEY = '40628787-b19937df0640d8f4069c69a27';
const BASE_URL = 'https://pixabay.com/api/';

export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    loading: false,
    selectedImageURL: '',
  };

  componentDidUpdate(prevProps) {
    if (prevProps.searchText !== this.props.searchText) {
      this.fetchImg(1);
      this.setState({ images: [], loading: true });
    }
  }

  openModalWithImage = id => {
    const { images } = this.state;
    const selectedImage = images.find(image => image.id === id);
    if (selectedImage) {
      this.setState({ selectedImageURL: selectedImage.largeImageURL });
    }
  };

  closeModal = () => {
    this.setState({ selectedImageURL: '' });
  };

  handleLoadMore = () => {
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage, loading: true }, () => {
      this.fetchImg(nextPage);
    });
  };

  fetchImg = page => {
    const { searchText } = this.props;
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: searchText,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: page,
      per_page: 12,
    });

    axios
      .get(`${BASE_URL}?${searchParams}`)
      .then(response => {
        const newImages = response.data.hits;

        this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
          loading: false,
        }));
      })
      .catch(error => {
        console.error('Ошибка при загрузке изображений:', error);
        this.setState({ loading: false });
      });
  };

  render() {
    const { images, loading, selectedImageURL } = this.state;

    return (
      <div>
        <GalleryList>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              id={image.id}
              tags={image.tags}
              webformatURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
              onClick={this.openModalWithImage}
            />
          ))}
        </GalleryList>
        {loading && <Loader />}
        {selectedImageURL && (
          <Modal
            largeImageURL={selectedImageURL}
            closeModal={this.closeModal}
            // tags={image.tags}
          />
        )}
        {!loading && images.length > 0 && (
          <Button onClick={this.handleLoadMore} />
        )}
      </div>
    );
  }
}
