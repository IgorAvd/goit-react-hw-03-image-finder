import { FaMagnifyingGlass } from 'react-icons/fa6';
import {
  SearchbarBtn,
  SearchbarForm,
  SearchbarInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const searchbarValue = e.target.elements.text.value;
    onSubmit(searchbarValue);
  };

  return (
    <header>
      <SearchbarForm onSubmit={handleSubmit}>
        <SearchbarBtn type="submit">
          <FaMagnifyingGlass />
        </SearchbarBtn>

        <SearchbarInput
          type="text"
          name="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchbarForm>
    </header>
  );
};
