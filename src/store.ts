import { create } from 'zustand'
import { SAMPLE_FORMS } from './helpers/constants'

export const useSurveyStore = () => create(set => ({
  surveys: SAMPLE_FORMS,
  selectedSurvey: {},
  setSelectedSurvey: (data) => set(() => ({selectedSurvey: data})),
  setSurveys: (data) => set(() => ({surveys: data}))
}))