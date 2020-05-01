import React from 'react';
import renderer from 'react-test-renderer';
import TemplateCard, {setCardColor} from './templateCard.component';
import {MemoryRouter} from 'react-router-dom';

const templatelistItemMock = {
  userName: ['mitrainingplaner@gmail.com'],
  _id: '5e8cf389fe13d0205e4ae533',
  date: 'Thu Apr 30 2020',
  startTime: '06:37 PM',
  endTime: '06:43 PM',
  trainingType: 'Soft Skills Training',
  instructor: 'Jan Nowak',
  title: 'Jak rozmawiać z ludźmi z grypy, by się nie pozabijać',
  description: 'Spotkanie dla ludzi mających trudności z komunikacją w grupie',
  willLearn: 'Jak pracować dobrze w grupie.',
  mustKnow: 'blank :)',
  materials: 'blank',
  createdAt: '2020-04-07T21:41:29.903Z',
  updatedAt: '2020-04-30T15:38:33.528Z',
  __v: 0,
};

test('Match TemplateCard to snapshot', () => {
  const outcome = renderer.create(
      <MemoryRouter>
        <TemplateCard item={templatelistItemMock} />
      </MemoryRouter>,
  ).toJSON();
  expect(outcome).toMatchSnapshot();
});

test('Generate TemplateCard background color', () => {
  const particularColor = setCardColor('Hardware Training');
  const anyColor = setCardColor('Big Papa Pillow');

  expect(particularColor).toBe('#7c4dff');
  expect(anyColor).toBe('#9e9e9e');
});
