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
  question: string 
  name: string
  placeholder: string
  type: string
  defaultValue?: string
  options?: string[] | number[]
  isFullScreen?: boolean
  isRequired?: boolean
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