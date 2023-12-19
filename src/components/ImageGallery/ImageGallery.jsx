import React, { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export class ImageGallery extends Component {
  state = {
    selectedImage: null,
  };

  openModalWithImage = id => {
    const { images } = this.props;
    const selectedImage = images.find(image => image.id === id);

    if (selectedImage) {
      this.setState({ selectedImage });
    }
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { images, loading, onClick, totalHits, page } = this.props;
    const { selectedImage } = this.state;

    const checkPage = page < Math.ceil(totalHits / 12);

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
        {selectedImage && (
          <Modal image={selectedImage} closeModal={this.closeModal} />
        )}
        {!loading && images.length > 0 && checkPage && (
          <Button onClick={onClick} />
        )}
      </div>
    );
  }
}
