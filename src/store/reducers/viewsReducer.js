const initState = {
    views: [{
        nrviews: ' ',
        categoria: ' ',
        userId: ' '
    }]
};

const viewsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_VIEW':
            ("view adicionada", action.like);
            return state;

        case 'ERRO_VIEW':
            ("erro a adicionar view", action.err);
            return state;

        default:
            return state;
    }
};

export default viewsReducer;
