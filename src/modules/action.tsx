import { TvShow, TvShowEpisode, TvShowSeason } from '../interfaces';

const RECEIVE_SHOW_INFO = 'RECEIVE_SHOW_INFO';
const RECIEVE_SHOW_EPISODES = 'RECIEVE_SHOW_EPISODES';
const RECIEVE_SHOW_SEASONS = 'RECIEVE_SHOW_SEASONS';

function receiveShow(showId: string, json: TvShow | TvShowEpisode[] | TvShowSeason[], type: string) {
    return {
        type,
        showId,
        data: json,
    };
}

function fetchShowInfo(showId: string) {
    return (dispatch: any) => {
        return fetch(`http://api.tvmaze.com/shows/${showId}`)
            .then(response => response.json())
            .then(json => dispatch(receiveShow(showId, json, RECEIVE_SHOW_INFO)));
    };
}

function fetchShowEpisodes(showId: string) {
    return (dispatch: any) => {
        return fetch(`http://api.tvmaze.com/shows/${showId}/episodes`)
            .then(response => response.json())
            .then(json => dispatch(receiveShow(showId, json, RECIEVE_SHOW_EPISODES)));
    };
}

function fetchShowSeasons(showId: string) {
    return (dispatch: any) => {
        return fetch(`http://api.tvmaze.com/shows/${showId}/seasons`)
            .then(response => response.json())
            .then(json => dispatch(receiveShow(showId, json, RECIEVE_SHOW_SEASONS)));
    };
}

export {
    fetchShowInfo,
    fetchShowEpisodes,
    fetchShowSeasons,
    RECEIVE_SHOW_INFO,
    RECIEVE_SHOW_EPISODES,
    RECIEVE_SHOW_SEASONS,
};

