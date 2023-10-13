const SURVEY_ENDPOINTS = [
  {
    name: 'getSurveys',
    request: 'GET',
    url: 'api/v1/surveys',
  },
  {
    name: 'getSurveysById',
    request: 'GET',
    url: 'api/v1/surveys/:surveyId',
  },
  {
    name: 'getSurveysByUser',
    request: 'GET',
    url: 'api/v1/surveys/user/:userId',
  },
  {
    name: 'createSurvey',
    request: 'POST',
    url: 'api/v1/surveys/',
  },
  {
    name: 'updateSurvey',
    request: 'POST',
    url: 'api/v1/surveys/:surveyId',
  },
  {
    name: 'removeSurvey',
    request: 'POST',
    url: 'api/v1/surveys/:surveyId',
  }
]

const SURVEY_FIELDS_ENDPOINTS = [
  {
    name: 'getSurveyFields',
    request: 'GET',
    url: 'api/v1/surveys/:surveyId/fields',
  },
  {
    name: 'addSurveyFields',
    request: 'POST',
    url: 'api/v1/surveys/:surveyId/fields',
  }
]

const endpoints = [
  ...SURVEY_ENDPOINTS,
  ...SURVEY_FIELDS_ENDPOINTS
]

export default endpoints