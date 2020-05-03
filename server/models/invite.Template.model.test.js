/**
 * @jest-environment node
 */
const InviteTemplate = require('./inviteTemplate.model');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

const invalidTemplateMock = {
  startTime: '06:37 PM',
  endTime: '06:43 PM',
  trainingType: 'Soft Skills Training',
  instructor: 'Jan Nowak',
  title: 'Jak rozmawiać z ludźmi z grypy, by się nie pozabijać',
  agenda: 'sss',
  description: 'Spotkanie dla ludzi mających trudności z komunikacją w grupie',
  willLearn: 'Jak pracować dobrze w grupie.',
  mustKnow: 'blank :)',
  materials: 'blank',
  username: 'mitrainingplaner@gmail.com',
};
const validTemplateMock = {
  startTime: '06:37 PM',
  endTime: '06:43 PM',
  trainingType: 'Soft Skills Training',
  instructor: 'Jan Nowak',
  date: 'Thu Apr 30 2020',
  title: 'Jak rozmawiać z ludźmi z grypy, by się nie pozabijać',
  agenda: 'sss',
  description: 'Spotkanie dla ludzi mających trudności z komunikacją w grupie',
  willLearn: 'Jak pracować dobrze w grupie.',
  mustKnow: 'blank :)',
  materials: 'blank',
  userName: 'mitrainingplaner@gmail.com',
};

it('try to throw, if invalid template is saved', async () => {
  const InviteTemplateWithoutDateField = new InviteTemplate(invalidTemplateMock);
  let err;
  try {
      await InviteTemplateWithoutDateField.save();
  } catch (error) {
      err = error
  }
  expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
});

it('create & save tempalte successfully', async () => {
  const validTemplate = new InviteTemplate(validTemplateMock);
  const savedTemplate = await validTemplate.save();
  
  expect(savedTemplate._id).toBeDefined();
  expect(savedTemplate.__v).toBeDefined();
  expect(savedTemplate.date).toBeDefined();
  expect(savedTemplate.updatedAt).toBeDefined();
  expect(savedTemplate.createdAt).toBeDefined();
  expect(savedTemplate.instructor).toBe(validTemplateMock.instructor);
  expect(savedTemplate.startTime).toBe(validTemplateMock.startTime);
  expect(savedTemplate.endTime).toBe(validTemplateMock.endTime);
  expect(savedTemplate.description).toBe(validTemplateMock.description);
  expect(savedTemplate.willLearn).toBe(validTemplateMock.willLearn);
  expect(savedTemplate.agenda).toBe(validTemplateMock.agenda);
  expect(savedTemplate.mustKnow).toBe(validTemplateMock.mustKnow);
  expect(savedTemplate.materials).toBe(validTemplateMock.materials);
  expect(savedTemplate.userName).toContain(validTemplateMock.userName);
});