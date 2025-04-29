import { useState, useContext, useEffect } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import Question from './Question';

const questions = [
  {
    question: "What's your favorite color?",
    options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
  },
];

const elements = {
  "Red 🔴": "Fire",
  "Blue 🔵": "Water",
  "Green 🟢": "Earth",
  "Yellow 🟡": "Air",
};

const keywords = {
  Fire: "sun",
  Water: "water",
  Earth: "landscape",
  Air: "sky",
};

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { answers, setAnswers, setElement, setArtwork } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      const selectedElement = determineElement(answers);
      setElement(selectedElement);
      fetchArtwork(keywords[selectedElement]);
      navigate('/results');
    }
  }, [currentQuestionIndex, answers, setElement, setArtwork, navigate]);

  function handleAnswer(answer) {
    setAnswers(prevAnswers => [...prevAnswers, answer]);
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  }
  
  

  function determineElement(answers) {
    const counts = {};
    answers.forEach((answer) => {
      const elem = elements[answer];
      counts[elem] = (counts[elem] || 0) + 1;
    });
    return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
  }

  function fetchArtwork(keyword) {
    const apiEndpoint = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}`;
    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => {
        if (data.total > 0) {
          const randomIndex = Math.floor(Math.random() * data.objectIDs.length);
          const objectId = data.objectIDs[randomIndex];
          fetchArtworkDetails(objectId);
        }
      })
      .catch(error => console.error('Error fetching artwork:', error));
  }

  function fetchArtworkDetails(objectId) {
    const detailsEndpoint = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`;
    fetch(detailsEndpoint)
      .then(response => response.json())
      .then(data => {
        setArtwork({
          title: data.title,
          primaryImage: data.primaryImage && data.primaryImage !== '' ? data.primaryImage : 'https://picsum.photos/300',
          artistDisplayName: data.artistDisplayName || 'Unknown Artist',
          objectDate: data.objectDate || 'Unknown Date',
        });
      })
      .catch(error => console.error('Error fetching artwork details:', error));
  }

  if (currentQuestionIndex < questions.length) {
    return (
      <Question
        question={questions[currentQuestionIndex].question}
        options={questions[currentQuestionIndex].options}
        onAnswer={handleAnswer}
      />
    );
  }

  return null;
}
