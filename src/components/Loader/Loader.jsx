import { ThreeCircles } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderWrapper>
      <ThreeCircles
        height={100}
        width={100}
        color="aqua"
        ariaLabel="three-circles-rotating"
      />
    </LoaderWrapper>
  );
};
