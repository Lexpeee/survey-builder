import { Survey } from '@/types/survey'
import { useEffect, useState } from 'react'
import useApi from './useApi'

const SURVEY_STORAGE = 'user-surveys'

const useSurvey = () => {

  const {
    isLoading: isCreatingSurvey,
    fetch: createSurvey
  } = useApi('createSurvey')

  const {
    data: userSurveys,
    isLoading: isLoadingUserSurveys,
    fetch: fetchUserSurveys,
  } = useApi('getSurveysByUser')

  const [surveys, setSurveys] = useState([])
  const [selectedSurvey, setSelectedSurvey] = useState(null)

  const clearSelectedSurvey = () => {
    setSelectedSurvey(null)
  }

  const storeSurveys = (data) => {
    localStorage.setItem(SURVEY_STORAGE, JSON.stringify(data))
  }

  const getUserSurveys = async (userId) => {
    try {
      await fetchUserSurveys({
        params: {
          userId
        }
      }) 
      storeSurveys(userSurveys)
    } catch (err) {
      console.error(err)
    }
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
      createSurvey({data})
      setSurveys(surveys.concat(data))
    }
  }

  const removeSurvey = (index: number) => {
    setSurveys(surveys?.filter((v,i) => i !== index))
  }

  /** 
   * Stores user surveys to the state
   */
  useEffect(()=>{
    setSurveys(userSurveys)
    storeSurveys(userSurveys)
  }, [userSurveys])

  return ({
    isCreatingSurvey,
    isLoadingUserSurveys, 
    surveys, 
    getUserSurveys,
    selectSurvey,
    storeSurveys, 
    saveSurvey,
    removeSurvey,
    selectedSurvey, 
  })
}

export default useSurvey