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
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">
              Our team <i className="material-icons">group</i>
            </h5>
            <ul>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://github.com/Bednar22"
                >
                  Maciek Bednarski
                </a>
              </li>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://github.com/Cvaniak"
                >
                  Ignacy Iwaniak
                </a>
              </li>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://github.com/mKomorek"
                >
                  Marcin Komorek
                </a>
              </li>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://github.com/jaolejnik"
                >
                  Jakub Olejnik
                </a>
              </li>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://github.com/starmarek"
                >
                  Aleksander Pucher
                </a>
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
            Source code
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
