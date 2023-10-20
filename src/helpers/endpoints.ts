const SURVEY_ENDPOINTS = [
  {
    name: 'getSurveys',
    request: 'GET',
    url: '/surveys',
  },
  {
    name: 'getSurveyById',
    request: 'GET',
    url: '/surveys/:surveyIdOrSlug',
  },
  {
    name: 'getSurveysByUser',
    request: 'GET',
    url: '/surveys/user/:userId',
  },
  {
    name: 'createSurvey',
    request: 'POST',
    url: '/surveys/',
  },
  {
    name: 'updateSurvey',
    request: 'PATCH',
    url: '/surveys/:surveyId',
  },
  {
    name: 'removeSurvey',
    request: 'POST',
    url: '/surveys/:surveyId',
  }
]

const SURVEY_FIELDS_ENDPOINTS = [
  {
    name: 'getSurveyFields',
    request: 'GET',
    url: '/surveys/:surveyId/fields',
  },
  {
    name: 'addSurveyFields',
    request: 'POST',
    url: '/surveys/:surveyId/fields',
  }
]

const endpoints = [
  ...SURVEY_ENDPOINTS,
  ...SURVEY_FIELDS_ENDPOINTS,
  {
    name: 'submitSurveyForm',
    request: 'POST',
    url: '/surveys/answers',
  }
]

export default endpoints