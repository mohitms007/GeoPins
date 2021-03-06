export default function reducer(state, { type, payload }) {
  switch (type) {
    case "LOGIN_USER":
      return {
        ...state,
        currentUser: payload,
      };
    case "IS_LOGGED_IN":
      return {
        ...state,
        isAuth: payload,
      };

    case "SIGNOUT_USER":
      return {
        ...state,
        isAuth: false,
        currentUser: null,
      };
    case "CREATE_DRAFT":
      return {
          ...state,
          currentPin: null,
          draft: {
              latitude: 0,
              longitude: 0
          }
      };
    case "UPDATE_DRAFT_LOCATION":
        return {
            ...state, 
            draft: payload
        } 
    case "DELETE_DRAFT":
      return {
        ...state, 
        draft: null
      }
      
    case "GET_PINS": {
      return {
        ...state,
        pins: payload
      }
    }
    
    case "CREATE_PIN": {
      const newPin = payload
      const prevPins = state.pins.filter(pin => pin._id !== newPin._id)
      return {
        ...state,
        pins: [...prevPins, newPin]
        
      }
    }

    case "SET_PIN": {
      return {
        ...state,
        currentPin: payload,
        draft: null
      }
    }

    case "DELETE_PIN": {
      if (state.currentPin) {
        if (state.currentPin._id === payload._id) {
          return {
            ...state,
            pins: state.pins.filter(pin => pin._id !== payload._id),
            currentPin: null,
          }
        }
      }
      return {
        ...state,
        pins: state.pins.filter(pin => pin._id !== payload._id),
      }
    }

    case "UPDATED_PIN_COMMENT":
  
    const updatedCurrentPin  = payload
    console.log(payload)
     const updatedPins =  state.pins.map(pin => 
      pin._id === updatedCurrentPin._id ? updatedCurrentPin : pin
      )

      return {
        ...state,
        pins: updatedPins,
        currentPin: updatedCurrentPin
      }
    
  
      default:
      return state;
  }
}
