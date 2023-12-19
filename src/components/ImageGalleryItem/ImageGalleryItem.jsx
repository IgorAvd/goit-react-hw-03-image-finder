import { GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ id, tags, webformatURL, onClick }) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <GalleryItem onClick={handleClick}>
      <img src={webformatURL} alt={tags} />
    </GalleryItem>
  );
};
