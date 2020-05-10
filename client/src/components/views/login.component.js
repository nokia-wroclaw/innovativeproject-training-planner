import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import M from 'materialize-css';
import GeneralCalendar from '../calendar/generalCalendar.component';

const LoginPage = ({authState, authService}) => {
  const refLoginCarousel = React.createRef();
  const [loginCarousel, setLoginCarousel] = useState(null);

  useEffect(() => {
    let elems = document.querySelectorAll('.carousel');
    M.Carousel.init(elems, {
      dist: 0,
      padding: 0,
      fullWidth: true,
      indicators: true,
      duration: 100,
    });

    elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);
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

  const login = () => {
    // Redirects to    ---------v--------- after login
    authService.login('/');
  };

  return (
    <div id="loginPage" className="blue lighten-5">
      <div className="navbar-fixed" style={{marginBottom: 50}}>
        <nav className="nav-wrapper blue darken-3">
          <Link
            to="/"
            className="brand-logo center"
            style={{fontFamily: 'Denk one'}}
          >
            MiTraining Planner
            <i className="material-icons right">
              <img
                src={process.env.PUBLIC_URL + '/logo-white.png'}
                alt="LOGO"
                width="60"
              />
            </i>
          </Link>
          <ul className="right">
            <li>
              <button
                onClick={login}
                className="btn pulse waves-effect waves-light pink lighten-1"
                style={{marginRight: 40, width: 100}}
              >
                Login
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="container center-align">
        <div className=" z-depth-3" style={{marginBottom: 100}}>
          <div
            className="carousel carousel-slider"
            data-indicators="true"
            ref={refLoginCarousel}
          >
            <div className="carousel-fixed-item">
              <div className="container">
                <h3 className="white-text">
                  Your training is just a click away!
                </h3>
              </div>
            </div>
            <div
              className="carousel-item blue lighten-1 white-text"
              href="#one!"
            >
              <div className="container">
                <h2>QUICK AND SIMPLE</h2>
                <p className="white-text">
                  Etiam porta sem malesuada magna mollis euismod.
                </p>
              </div>
            </div>
            <div
              className="carousel-item blue darken-1 white-text"
              href="#two!"
            >
              <div className="container">
                <h2>PERSONAL CALENDAR</h2>
                <p className="white-text">
                  Etiam porta sem malesuada magna mollis euismod.
                </p>
              </div>
            </div>
            <div
              className="carousel-item blue lighten-1 white-text"
              href="#three!"
            >
              <div className="container">
                <h2>EVENT INVITATIONS</h2>
                <p className="white-text">
                  Etiam porta sem malesuada magna mollis euismod.
                </p>
              </div>
            </div>
            <div
              className="carousel-item blue darken-1 white-text"
              href="#four!"
            >
              <div className="container">
                <h2>EDITABLE AND REUSABLE TEMPLATES</h2>
                <p className="white-text">
                  Etiam porta sem malesuada magna mollis euismod.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{marginBottom: 100}}>
          <h4 style={{fontWeight: 'bold', marginBottom: 50}}>
            OPEN FOR PUBLIC TRAININGS CREATED WITH MITRAINING PLANNER
          </h4>
          <GeneralCalendar height="550pt" />
        </div>

        <div>
          <h4 style={{fontWeight: 'bold', marginBottom: 50}}>
            MORE ABOUT MITRAINING PLANNER
          </h4>
          <ul className="collapsible white">
            <li>
              <div className="collapsible-header">
                <i className="material-icons">filter_drama</i>First
              </div>
              <div className="collapsible-body">
                <span>Lorem ipsum dolor sit amet.</span>
              </div>
            </li>
            <li>
              <div className="collapsible-header">
                <i className="material-icons">place</i>Second
              </div>
              <div className="collapsible-body">
                <span>Lorem ipsum dolor sit amet.</span>
              </div>
            </li>
            <li>
              <div className="collapsible-header">
                <i className="material-icons">whatshot</i>Third
              </div>
              <div className="collapsible-body">
                <span>Lorem ipsum dolor sit amet.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <br />
    </div>
  );
};

export default LoginPage;
