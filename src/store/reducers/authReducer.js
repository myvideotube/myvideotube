//state inicial
const initState = {
    authError: null,
    authErrorLogin: null,
    authErrorRegisto: null,
    authErrorPassword: null,
    email: null
}

//processamento de erros relacionados com a autenticação
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'USER_REGISTADO':
            return {
                ...state,
                authErrorRegisto: null
            };
        case 'ERRO_REGISTO':
            return {
                ...state,
                authErrorRegisto: action.err.message
            };
        case 'LOGIN_EFETUADO':
            return {
                ...state,
                authErrorLogin: null,
            };
        case 'SIGNOUT_SUCCESS':
            return state
        case 'ERRO_LOGIN':
            return {
                ...state,
                authErrorLogin: 'Login error'
            };
        case 'ERRO_EMAIL':
            return {
                ...state,
                authError: action.err.message,

            };
        case 'ERRO_PASSWORD':
            return {
                ...state,
                authError: action.err.message
            };
        case 'ERRO_UPDATEPASS':
            return {
                ...state,
                authError: action.err.message
            };
        case 'RESET_FEITO':
            return {
                ...state,
                email: action.email_certo
            } ;
        case 'ERRO_RESET':
            return {
                ...state,
                authErrorPassword: action.err.message
            };
        default:
            return state;

    }
};

export default authReducer;
