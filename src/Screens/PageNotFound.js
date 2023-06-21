import React from 'react';
import '.././error.css'
import tilli from '../images/logos.png';

const PageNotFound = () => {
  return (

    <div className='pageNotFound'>
      <img className="img-fluid tilli" src={tilli} alt="loading..." />
      <h1> 404 - Page Not Found.</h1>
      <p> The Page you are looking for might have been removed or its name changed or is temporarily unavailable.</p>
    </div>

  )
}

export default PageNotFound;