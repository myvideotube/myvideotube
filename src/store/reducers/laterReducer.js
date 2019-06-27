const initState = {
  later: [{
    id: ' ',
    title: ' ',
    description: ' '
  }]
}

const laterReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_LATER':
      return state;

    case 'ERRO_LATER':
    return state;

    case 'DELETE':
    return state;

    case 'ERRO_DELETE':
    return state;

    default:
    return state;
  }
}

export default laterReducer;
