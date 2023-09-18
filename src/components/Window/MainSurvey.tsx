import {
  FC, 
  useEffect, 
  useState,
  useMemo
} from 'react'

type MainSurveyProps = {
  fields: any
  options: any
}

const MainSurvey:FC<MainSurveyProps> = (p) => {
  
  useEffect(()=>{
    console.log("props", p)
  }, [p])
  
  return (
    <div>MainSurveyWindow</div>
  )
}

export default MainSurvey