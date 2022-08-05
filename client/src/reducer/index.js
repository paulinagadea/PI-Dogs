const initalState = {
    // Fixed state.
    allDogs: [],

    // Used for changes of the state allDogs.
    dogs: [],

    temperaments: [],
    details: [],
};

function rootReducer(state = initalState, action) {
    switch(action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            };

        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload
            };

        case 'GET_NAMES':
            return {
                ...state,
                dogs: action.payload
            };

        case 'GET_DETAILS':
            return {
                ...state,
                details: action.payload
            };

        case 'DETAIL_EMPTY': 
            return {
                ...state,
                details: []
            };

        case 'POST_BREED':
        return {
            ...state,
        };

        case 'FILTER_BY_TEMPERAMENT':
            const allDogs = state.allDogs
            const filtered = action.payload === 'all' ? allDogs 
            : allDogs.filter(e => { 
                if (e.temperament) {
                    return e.temperament.includes(action.payload);
                } else if (e.temperaments) {
                    let temps = e.temperaments.map(e => e.name);
                    return temps.includes(action.payload);
                }
                return true;
            });

            return {
                ...state,
                dogs: filtered
            };


        case 'EXISTENT_OR_CREATED':
            const allBreeds = state.allDogs;
            const filteredBreeds = action.payload === 'all' ? allBreeds
            : action.payload === 'api'? allBreeds.filter(e => !e.created_in_db) : allBreeds.filter(e => e.created_in_db);

            return {
                ...state,
                dogs: filteredBreeds
            };

        case 'ORDER_ALPH':
            const allNames = state.allDogs;
            const orderedNames = 
            action.payload === 'az'? allNames.sort(function(a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                } else {
                    return 0;
                };
            })
            : action.payload === 'za'? allNames.sort(function(a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1;
                } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return 1;
                } else {
                    return 0;
                };
            })
            : allNames
            
            return {
                ...state,
                dogs: orderedNames
            };

        case 'ORDER_BY_WEIGHT':
            const allWeights = state.allDogs;
            const orderedWeights = 
            action.payload === 'asc'? allWeights.sort(function(a, b) {
                if (a.weight > b.weight) return 1;
                if (a.weight < b.weight) return -1;
                return 0;
            })
            : action.payload === 'desc'? allWeights.sort(function(a, b) {
                if (a.weight > b.weight) return -1;
                if (a.weight < b.weight) return 1;
                return 0;
            })
            : allWeights

            return {
                ...state,
                dogs: orderedWeights
            };

        default:
            return state;
    };   
};

export default rootReducer;