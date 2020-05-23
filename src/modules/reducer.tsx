import {
    RECEIVE_SHOW_INFO,
    RECIEVE_SHOW_EPISODES,
    RECIEVE_SHOW_SEASONS,
} from './action';
import { InitialStateProps } from '../interfaces';

const initialState: InitialStateProps = {
    tvShow: {
        name: '',
        episodes: [],
    },
};

function reducer(state = initialState, action: any) {
    switch (action.type) {
        case RECEIVE_SHOW_INFO:
            return {
                ...state,
                tvShow: {
                    ...state.tvShow,
                    name: action.data.name,
                    language: action.data.language,
                    type: action.data.type,
                    image: action.data.image,
                    genres: action.data.genres,
                    summary: action.data.summary,
                    website: action.data.officialSite,
                    rating: action.data.rating.average,
                    duration: action.data.runtime,
                },
            };
        case RECIEVE_SHOW_EPISODES:
            return {
                ...state,
                tvShow: {
                    ...state.tvShow,
                    episodes: action.data,
                },
            };
        case RECIEVE_SHOW_SEASONS:
            return {
                ...state,
                tvShow: {
                    ...state.tvShow,
                    seasons: action.data,
                },
            };
    }

    return state;
}

export {
    reducer,
    initialState,
};

