import React, { Component } from 'react';
import * as basicLightbox from 'basiclightbox';
import { ModalImage, Overlay } from './Modal.stuled';

export class Modal extends Component {
  openModal = () => {
    const { largeImageURL } = this.props;
    const instance = basicLightbox.create(`
      <img src="${largeImageURL}" alt="Large"  />
    `);
  };

  handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  handleKeyPress = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  render() {
    const { largeImageURL } = this.props;

    return (
      <Overlay onClick={this.handleCloseModal}>
        <ModalImage onClick={this.openModal}>
          <img src={largeImageURL} alt="Large" />
        </ModalImage>
      </Overlay>
    );
  }
}
