const OktaJwtVerifier = require('@okta/jwt-verifier');

module.exports = {
  // Function from example of Okta, used to authenticate

  checkIfUser: function(req, res, next) {
    console.log('here2');
    next();
  },
  authenticationRequired: function(req, res, next) {
    const oktaJwtVerifier = new OktaJwtVerifier({
      issuer: `${process.env.OKTA_ISSUER}`,
      clientId: `${process.env.OKTA_CLIENT_ID}`,
      assertClaims: {
        aud: 'api://default',
      },
    });
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);

    if (!match) {
      return res.status(401).end();
    }

    const accessToken = match[1];
    const expectedAudience = 'api://default';

    return oktaJwtVerifier
        .verifyAccessToken(accessToken, expectedAudience)
        .then((jwt) => {
          req.jwt = jwt;
          next();
        })
        .catch((err) => {
          res.status(401).send(err.message);
        });
  },
};
