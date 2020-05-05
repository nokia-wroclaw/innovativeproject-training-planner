import React, {useState, useEffect} from 'react';
import M from 'materialize-css';

const LoginPage = ({authState, authService}) => {
  const refLoginCarousel = React.createRef();
  const [loginCarousel, setLoginCarousel] = useState(null);

  useEffect(() => {
    const elems = document.querySelectorAll('.carousel');
    M.Carousel.init(elems, {
      dist: 0,
      padding: 0,
      fullWidth: true,
      indicators: true,
      duration: 100,
    });
  }, []);

  useEffect(() => {
    if (refLoginCarousel.current != null) {
      setLoginCarousel(M.Carousel.getInstance(refLoginCarousel.current));
    }
  }, [refLoginCarousel, loginCarousel]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (loginCarousel != null) {
        loginCarousel.next();
      }
    }, 7000); // <- time in ms
    return () => clearInterval(interval);
  }, [refLoginCarousel, loginCarousel]);

  const login = async () => {
    // Redirects to    ---------v--------- after login
    authService.login('/templateDashboard');
  };

  return (
    <div className="container center-align">
      <div className="row">
        <h1>MiTraining Planner</h1>
        <button
          onClick={login}
          className="btn-large pulse waves-effect waves-light pink lighten-1"
        >
          Login
        </button>
      </div>

      <div className="row">
        <div
          className="carousel carousel-slider"
          data-indicators="true"
          ref={refLoginCarousel}
        >
          <div className="carousel-fixed-item">
            <div className="container">
              <h2 className="white-text">Fixed item</h2>
            </div>
          </div>
          <div className="carousel-item blue white-text" href="#one!">
            <div className="container">
              <h2>QUICK AND SIMPLE</h2>
              <p className="white-text">
                Etiam porta sem malesuada magna mollis euismod.
              </p>
            </div>
          </div>
          <div className="carousel-item blue darken-2 white-text" href="#two!">
            <div className="container">
              <h2>PERSONAL CALENDAR</h2>
              <p className="white-text">
                Etiam porta sem malesuada magna mollis euismod.
              </p>
            </div>
          </div>
          <div className="carousel-item blue white-text" href="#three!">
            <div className="container">
              <h2>EVENT INVITATIONS</h2>
              <p className="white-text">
                Etiam porta sem malesuada magna mollis euismod.
              </p>
            </div>
          </div>
          <div className="carousel-item blue darken-2 white-text" href="#four!">
            <div className="container">
              <h2>EDITABLE AND REUSABLE TEMPLATES</h2>
              <p className="white-text">
                Etiam porta sem malesuada magna mollis euismod.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
