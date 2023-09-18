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