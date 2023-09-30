import { create } from 'zustand'
import { SAMPLE_FORMS } from './helpers/constants'
import { Survey } from './types/survey'

export type SurveyStoreProps = {
  surveys: Survey[],
  selectedSurvey: Survey | null,
  setSurveys: (surveys: Survey[]) => void,
  clearSelectedSurvey: () => void,
  setSelectedSurvey: (survey: Survey) => void,
}

export const useSurveyStore = create<SurveyStoreProps>(set => ({
  surveys: SAMPLE_FORMS,
  selectedSurvey: null,
  setSelectedSurvey: (data) => set(() => ({selectedSurvey: data})),
  clearSelectedSurvey: () => set(() => ({selectedSurvey: null})),
  setSurveys: (data) => set(() => {
    return ({surveys: data})
  })
}))