const initState = {
  likes: [{
    id: ' ',
    title: ' ',
    description: ' '
  }]
}

const likeReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_LIKE':
      return state;

    case 'ERRO_LIKE':
    return state;

    case 'DELETE':
    return state;

    case 'ERRO_DELETE':
    return state;

    default:
    return state;
  }
}

export default likeReducer;
