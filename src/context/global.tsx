import { createContext, useContext, useEffect, useReducer } from 'react'
import { useColorScheme } from '@mui/joy/styles'

const initialState = {
  isDarkTheme: false
}

const reducer = (state, action) => {
  switch (action?.type) {
    case "TOGGLE_THEME":
      return {
        ...state, 
        isDarkTheme: !state?.isDarkTheme
      }
    default:
      return {
        ...state
      }
  }
}

const GlobalStateContext = createContext(initialState)
const GlobalDispatchContext = createContext(null)

export const useGlobalState = () => useContext(GlobalStateContext)
export const useGlobalDispatch = () => useContext(GlobalDispatchContext)

export const GlobalContextProvider = ({
  children
}) => {
  const { setMode } = useColorScheme()
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    setMode(state.isDarkTheme ? 'dark' : 'light' )
  }, [state?.isDarkTheme])
  
  
  return (
    <GlobalStateContext.Provider value={state} >
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}
