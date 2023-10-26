export type SurveyOptions = {
  link: string | null
  isPublished: boolean
  finishButtonLabel: string
  isLoginRequired: boolean
  theme?: {
    backgroundColor?: string
    foregroundColor?: string
    buttonColor?: string
  }
}

export type SurveyFields = {
  id: string
  surveyId: string
  order: number
  question: string // this can also contain a message for a survey if type is set to message
  description?: string
  answer?: string
  name?: string
  placeholder?: string
  type: string
  defaultValue?: string
  options?: string[] | number[]
  // TODO: wrap options below to fieldOptions property
  isAnswerRequired?: boolean
  isFullScreen?: boolean
  isRequired?: boolean
  isFieldLocked?: boolean
  isAnswerReusable?: boolean
}

export type Survey = {
  id: string
  workspaceIds?: string
  userId: string
  name: string
  description?: string
  fields?: SurveyFields[],
  options: SurveyOptions
  datePublished?: string
  dateCreated?: string
  dateRemoved?: string
  displayImages: string[]
  isVisible: boolean,
  answers?: SurveyAnswers[]
}

export type SurveyAnswers = {
  id: string
  surveyId: string
  userId: string
  answers: any
  dateCreated: string
}