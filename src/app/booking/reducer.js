
export const initialState = {
  formData: {
    name: "",
    postcode: "",
    house: "",
    city: "",
    phoneNumber: "",
    email: "",
  },

  loading: false,
  success: false,
  fail: false,
  errors: {},
};

export function formReducer(state, action) {
  switch (action.type) {
    case "ON_USER_INPUT":
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
      };

    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SUCCESS":
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
        loading: false,
        success: true,
      };
    case "FAIL":
      return {
        ...state,
        loading: false,
        success: false,
        fail: true,
        errors: { ...state.errors, ...action.payload },
      };
    default:
      return state;
  }
}


