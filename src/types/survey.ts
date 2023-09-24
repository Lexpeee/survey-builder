export type SurveyOptions = {
  link: string | null
  isPublished: boolean
  finishButtonLabel: string
  theme?: {
    backgroundColor?: string
    foregroundColor?: string
    buttonColor?: string
  }
}

export type SurveyFields = {
  id: string
  order: number
  question: string // this can also contain a message for a survey if type is set to message
  answer?: string
  name?: string
  placeholder?: string
  type: string
  defaultValue?: string
  options?: string[] | number[]
  // TODOI: wrap options below to fieldOptions property
  isAnswerRequired?: boolean
  isFullScreen?: boolean
  isRequired?: boolean
  isFieldLocked?: boolean
}

export type Survey = {
  id: string
  userId: string
  name: string
  fields: SurveyFields[],
  options: SurveyOptions
  datePublished: string
  dateCreated: string
  dateRemoved: string
  displayImages: string[]
  isVisible: boolean

}