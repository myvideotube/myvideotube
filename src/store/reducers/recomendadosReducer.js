const initState = {
  recs: [{
    id: ' ',
    title: ' ',
    description: ' '
  }]
}

const recomendadosReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_REC':
    return state;

    case 'ERRO_REC':
    return state;

    default:
    return state;
  }
}

export default recomendadosReducer;
