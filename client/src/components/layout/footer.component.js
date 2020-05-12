import React from 'react';

const Footer = (props) => {
  return (
    <footer className="page-footer primary-color">
      <div className="container">
        <div className="row">
          <div className="col l5 s6 center">
            <h5 className="white-text" style={{fontWeight: 'bold'}}>
              MiTraining Planner
            </h5>
            <div className="divider" />
            <p>
              This project is being developed in collaboration with
              Nokia-Wrocław as part of Innovative Project initative.
            </p>
            <h6>
              <a
                className="grey-text text-lighten-3"
                href="https://nokiawroclaw.pl/kim-jestesmy/wspolpraca-z-uczelniami/"
              >
                Read more about it here <i className="fas fa-link" />
              </a>
            </h6>
          </div>

          <div className="col l2 offset-l4 s12">
            <h5 className="white-text center" style={{fontWeight: 'bold'}}>
              <i className="fas fa-user-friends"></i> Our team
            </h5>
            <div className="divider" />

            <ul>
              <li>
                <a
                  style={{marginRight: 10}}
                  className="grey-text text-lighten-3"
                  href="https://github.com/Bednar22"
                >
                  <i className="fab fa-github" />
                </a>
                <a
                  style={{marginRight: 10}}
                  className="grey-text text-lighten-3"
                  href="https://pl.linkedin.com/"
                >
                  <i className="fab fa-linkedin" />
                </a>
                Maciek Bednarski
              </li>

              <li>
                <a
                  style={{marginRight: 10}}
                  className="grey-text text-lighten-3"
                  href="https://github.com/Cvaniak"
                >
                  <i className="fab fa-github" />
                </a>
                <a
                  style={{marginRight: 10}}
                  className="grey-text text-lighten-3"
                  href="https://pl.linkedin.com/"
                >
                  <i className="fab fa-linkedin" />
                </a>
                Ignacy Iwaniak
              </li>

              <li>
                <a
                  style={{marginRight: 10}}
                  className="grey-text text-lighten-3"
                  href="https://github.com/mKomorek"
                >
                  <i className="fab fa-github" />
                </a>
                <a
                  style={{marginRight: 10}}
                  className="grey-text text-lighten-3"
                  href="https://pl.linkedin.com/"
                >
                  <i className="fab fa-linkedin" />
                </a>
                Marcin Komorek
              </li>

              <li>
                <a
                  style={{marginRight: 10}}
                  className="grey-text text-lighten-3"
                  href="https://github.com/jaolejnik"
                >
                  <i className="fab fa-github" />
                </a>
                <a
                  style={{marginRight: 10}}
                  className="grey-text text-lighten-3"
                  href="https://pl.linkedin.com/"
                >
                  <i className="fab fa-linkedin" />
                </a>
                Jakub Olejnik
              </li>

              <li>
                <a
                  style={{marginRight: 10}}
                  className="grey-text text-lighten-3"
                  href="https://github.com/starmarek"
                >
                  <i className="fab fa-github" />
                </a>
                <a
                  style={{marginRight: 10}}
                  className="grey-text text-lighten-3"
                  href="https://pl.linkedin.com/"
                >
                  <i className="fab fa-linkedin" />
                </a>
                Aleksander Pucher
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <div className="container">
          © 2020 MiTraining Planner
          <a
            className="grey-text text-lighten-4 right"
            href="https://github.com/nokia-wroclaw/innovativeproject-training-planner"
          >
            <i className="fab fa-github" style={{marginRight: 10}} />
            View source code
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
