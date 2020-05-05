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

  const login = async () => {
    // Redirects to    ---------v--------- after login
    authService.login('/templateDashboard');
  };

  return (
    <div id="loginPage" className="blue lighten-5">
      <div className="navbar-fixed" style={{marginBottom: '5%'}}>
        <nav className="nav-wrapper blue darken-3">
          <Link to="/" className="brand-logo center">
            Training Planner LOGO
          </Link>
          <ul className="right">
            <li>
              <button
                onClick={login}
                className="btn pulse waves-effect waves-light pink lighten-1"
                style={{margin: 10}}
              >
                Login
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="container center-align">
        <div className="row z-depth-3" style={{marginBottom: '5%'}}>
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
            <div className="carousel-item blue white-text" href="#one!">
              <div className="container">
                <h2>QUICK AND SIMPLE</h2>
                <p className="white-text">
                  Etiam porta sem malesuada magna mollis euismod.
                </p>
              </div>
            </div>
            <div
              className="carousel-item blue darken-2 white-text"
              href="#two!"
            >
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
            <div
              className="carousel-item blue darken-2 white-text"
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

        <div className="row" style={{marginBottom: '5%'}}>
          <h3>OPEN FOR PUBLIC TRAININGS CREATED WITH MITRAININGPLANNER</h3>
          <div className="z-depth-3 white">
            <GeneralCalendar height="550pt" />
          </div>
        </div>

        <div className="row" style={{marginBottom: '5%'}}>
          <h3>MORE ABOUT MITRAININGPLANNER</h3>
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

      <footer className="page-footer blue darken-2">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Footer Content</h5>
              <p className="grey-text text-lighten-4">
                You can use rows and columns here to organize your footer
                content.
              </p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Links</h5>
              <ul>
                <li>
                  <a className="grey-text text-lighten-3" href="#!">
                    Link 1
                  </a>
                </li>
                <li>
                  <a className="grey-text text-lighten-3" href="#!">
                    Link 2
                  </a>
                </li>
                <li>
                  <a className="grey-text text-lighten-3" href="#!">
                    Link 3
                  </a>
                </li>
                <li>
                  <a className="grey-text text-lighten-3" href="#!">
                    Link 4
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            © 2014 Copyright Text
            <a className="grey-text text-lighten-4 right" href="#!">
              More Links
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
