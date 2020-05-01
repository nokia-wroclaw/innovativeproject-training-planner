import React from 'react';
import renderer from 'react-test-renderer';
import CreateInviteTemplate from './createInviteTemplate.component';
// https://pl.reactjs.org/docs/test-renderer.html
// https://jestjs.io/docs/en/expect

jest.mock('@okta/okta-react', () => ({
  useOktaAuth: () => {
    return {
      authState: {},
      authService: {},
    };
  },
}));

test('Check initial value of trainingType hook', () => {
  const component = renderer.create(<CreateInviteTemplate />).root;
  expect(component.findByType('select').props.value).toBe('General Training');
});
