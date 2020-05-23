export interface InitialStateProps {
    tvShow: TvShow,
}

export interface TvShow {
    name: string,
    language?: string,
    type?: string,
    image?: {
        original: string,
        medium: string,
    },
    summary?: string,
    genres?: string[],
    website?: string,
    rating?: string,
    duration?: string,
    episodes: TvShowEpisode[],
    seasons?: TvShowSeason[],
}

export interface TvShowEpisode {
    id: number,
    name: string,
    season: number,
    number: number,
    image?: {
        original: string,
        medium: string,
    },
    summary?: string,
}

export interface TvShowSeason {
    id: number,
    number: number,
    summary?: string,
}
