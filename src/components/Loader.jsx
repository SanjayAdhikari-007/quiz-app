import PropTypes from 'prop-types';

export default function Loader({ message }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <div className="spinner" style={{
        width: '50px',
        height: '50px',
        border: '5px solid lightgray',
        borderTop: '5px solid #3498db',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto'
      }} />
      <p>{message}</p>
    </div>
  );
}

Loader.propTypes = {
  message: PropTypes.string.isRequired,
};

// CSS for spinner (add to your App.css)
