import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [name, setName] = useState('');
  const [answers, setAnswers] = useState([]);
  const [element, setElement] = useState('');
  const [artwork, setArtwork] = useState(null);

  return (
    <UserContext.Provider value={{ name, setName, answers, setAnswers, element, setElement, artwork, setArtwork }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
