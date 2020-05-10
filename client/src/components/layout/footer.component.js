import React from 'react';

const Footer = (props) => {
  return (
    <footer className="page-footer blue darken-1">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Footer Content</h5>
            <p className="grey-text text-lighten-4">
              You can use rows and columns here to organize your footer content.
            </p>
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
