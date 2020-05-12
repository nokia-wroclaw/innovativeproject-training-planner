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
    <div>
      <div className="navbar-fixed">
        <nav className="nav-wrapper primary-color">
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
                className="btn pulse waves-effect waves-light secondary-color"
                style={{marginRight: 40, width: 100}}
              >
                Login
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="background">
        <div className="container center-align">
          <div
            className="z-depth-3"
            style={{marginBottom: 100, borderRadius: 3}}
          >
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
                  <p className="white-text"></p>
                </div>
              </div>
              <div
                className="carousel-item blue darken-1 white-text"
                href="#two!"
              >
                <div className="container">
                  <h2>PERSONAL CALENDAR</h2>
                  <p className="white-text"></p>
                </div>
              </div>
              <div
                className="carousel-item blue lighten-1 white-text"
                href="#three!"
              >
                <div className="container">
                  <h2>EVENT INVITATIONS</h2>
                  <p className="white-text"></p>
                </div>
              </div>
              <div
                className="carousel-item blue darken-1 white-text"
                href="#four!"
              >
                <div className="container">
                  <h2>EDITABLE AND REUSABLE TEMPLATES</h2>
                  <p className="white-text"></p>
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
                  <i className="fas fa-tasks" /> Goals
                </div>
                <div className="collapsible-body row">
                  <div className="col s12 l4 offset-l2">
                    <h5 className="center done">
                      DONE <i className="material-icons">done_all</i>
                    </h5>
                    <ul className="left-align">
                      <li>
                        <i className="tiny material-icons done">brightness_1</i>
                        Customizable and editable event templates.
                      </li>
                      <li>
                        <i className="tiny material-icons done">brightness_1</i>
                        Event invitations.
                      </li>
                      <li>
                        <i className="tiny material-icons done">brightness_1</i>
                        Color coded events.
                      </li>
                      <li>
                        <i className="tiny material-icons done">brightness_1</i>
                        Template filtering and searchbar.
                      </li>
                      <li>
                        <i className="tiny material-icons done">brightness_1</i>
                        Public and presonal calendars.
                      </li>
                    </ul>
                  </div>
                  <div className="col s12 l4 offset-l1">
                    <h5 style={{color: 'orange', fontWeight: 'bold'}}>
                      TO DO <i className="material-icons">build</i>
                    </h5>
                    <ul className="left-align">
                      <li>
                        <i className="tiny material-icons todo">brightness_1</i>
                        Date booking and better training scheduling.
                      </li>
                      <li>
                        <i className="tiny material-icons todo">brightness_1</i>
                        Notifications of upcoming training.
                      </li>
                      <li>
                        <i className="tiny material-icons todo">brightness_1</i>
                        Expansion of statitistics feature.
                      </li>
                      <li>
                        <i className="tiny material-icons todo">brightness_1</i>
                        User profile view.
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <div className="collapsible-header">
                  <i className="fas fa-cogs" /> Technologies
                </div>
                <div className="collapsible-body">
                  <h5>
                    <a style={{margin: 15}} href="https://www.mongodb.com/">
                      MongoDB <i className="fas fa-database" />
                    </a>
                    <a style={{margin: 15}} href="https://nodejs.org/en/">
                      Node.js <i className="fab fa-node-js" />
                    </a>
                    <a style={{margin: 15}} href="https://reactjs.org/">
                      React.js <i className="fab fa-react" />
                    </a>
                    <a style={{margin: 15}} href="https://www.heroku.com/">
                      Heroku <i className="fas fa-server" />
                    </a>
                    <a style={{margin: 15}} href="https://travis-ci.com/">
                      TravisCI <i className="fas fa-toolbox" />
                    </a>
                    <a style={{margin: 15}} href="https://www.docker.com/">
                      Docker <i className="fab fa-docker" />
                    </a>
                    <a style={{margin: 15}} href="https://www.okta.com/">
                      Okta <i className="fas fa-clipboard-check" />
                    </a>
                  </h5>
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
      </div>
    </div>
  );
};

export default LoginPage;
