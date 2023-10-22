import {
  createContext, 
  useContext,
  useReducer
} from 'react'

type FieldsContextValuesProps = {
  view: 'default' | 'mini'
}

const initialState:FieldsContextValuesProps = {
  view: 'default'
}

export const FieldsState = createContext<any>(null)
export const FieldsDispatch = createContext<any>(null)

export const useFieldState = () => useContext(FieldsState)
export const useFieldDispatch = () => useContext(FieldsDispatch)

const reducer = (state, action) => {
  switch(action?.type){
    case "CHANGE_VIEW":
      return {
        ...state, 
        view: action?.payload
      }
    default:
      return {...state}
  }
}

/** 
 * A provider that is responsible for the setup of the fields
 */
export const FieldsContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <FieldsDispatch.Provider value={dispatch}>
      <FieldsState.Provider value={state}>
        {children}
      </FieldsState.Provider>
    </FieldsDispatch.Provider>
  )
}