import { useContext } from 'react';
import { UserContext } from './UserContext';
import Loader from './Loader';

export default function Results() {
  const { element, artwork } = useContext(UserContext);

  if (!element || !artwork) {
    return <Loader message="Loading your results..." />;
  }

  return (
    <div>
      <h2>Your Element: {element}</h2>
      <div className="artwork-container">
        {artwork.primaryImage ? (
          <img
            className="artwork-image"
            src={artwork.primaryImage}
            alt={artwork.title}
          />
        ) : (
          <div className="artwork-placeholder">No Artwork Found</div>
        )}
      </div>
      <h3>{artwork.title}</h3>
      <p>{artwork.artistDisplayName}</p>
      <p>{artwork.objectDate}</p>
    </div>
  );
}
