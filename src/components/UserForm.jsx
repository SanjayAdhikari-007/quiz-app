import { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

export default function UserForm() {
  const [inputName, setInputName] = useState('');
  const { setName, setAnswers, setElement, setArtwork } = useContext(UserContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setName(inputName);
    setAnswers([]);
    setElement('');
    setArtwork(null);
    navigate('/quiz');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Enter Your Name:</label>
      <input 
        type="text" 
        id="name" 
        value={inputName} 
        onChange={(e) => setInputName(e.target.value)} 
        required
      />
      <button type="submit">Start Quiz</button>
    </form>
  );
}
