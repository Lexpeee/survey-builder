import { useSurveyStore } from '@/store'
import { Survey } from '@/types/survey'
import { useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'

const SURVEY_STORAGE = 'user-surveys'

const useSurvey = () => {
  const {
    surveys,
    selectedSurvey: selectedSurveyStore, 
    clearSelectedSurvey,
    setSelectedSurvey,
    setSurveys
  } = useSurveyStore((draft) => ({
    surveys: draft.surveys,
    selectedSurvey: draft.selectedSurvey,
    clearSelectedSurvey: draft.clearSelectedSurvey,
    setSelectedSurvey: draft.setSelectedSurvey,
    setSurveys: draft.setSurveys
  }), shallow)

  const storeSurveys = (data) => {
    localStorage.setItem(SURVEY_STORAGE, JSON.stringify(data))
  }

  const selectSurvey = (survey?: Survey) => {
    if (!survey) {
      clearSelectedSurvey()
      return
    }
    setSelectedSurvey(survey)
  }
  
  const saveSurvey = (data:Survey) => {
    if (data) {
      setSurveys(surveys.concat(data))
    }
  }

  const removeSurvey = (index: number) => {
    setSurveys(surveys.filter((v,i) => i !== index))
  }

  useEffect(()=>{
    storeSurveys(surveys)
  }, [surveys])

  return ({
    surveys, 
    selectSurvey,
    storeSurveys, 
    saveSurvey,
    removeSurvey,
    selectedSurvey: selectedSurveyStore, 
  })
}

export default useSurvey