import React, { Component } from 'react';
import { ModalImage, Overlay } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
    window.removeEventListener('keydown', this.handleKeyPress);
  }

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

  render() {
    const { image } = this.props;

    return (
      <Overlay onClick={this.handleCloseModal}>
        <ModalImage>
          <img src={image.largeImageURL} alt={image.tags} />
        </ModalImage>
      </Overlay>
    );
  }
}
