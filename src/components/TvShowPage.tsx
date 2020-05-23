import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { InitialStateProps } from './../interfaces';
import {
    Button,
    Page,
    PageContent,
    PageTitle,
    SubTitle,
    Overview,
    Info,
    Image,
    InfoRow,
    Description,
} from './lib/StyledComponnets';
import { TvShowEpisode, TvShowSeason } from './../interfaces';
import { Link } from 'react-router-dom';
import { Modal } from './Modal';

const InfoButton = styled(Button)`
    margin-top: 15px;
`;

const ShowSeason = styled.div`
    margin-bottom: 25px;
    max-width: 700px;
`;

const ShowEpisode = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
`;

const EpisodeNumber = styled.div`
    font-size: 14px;
    min-width: 100px;
    padding-top: 3px;
    
    span {
        margin-right: 5px;
    }
`;

const SeasonInfo = styled.div`
    margin-bottom: 20px;
`;

const ShowEpisodes = styled.div`
    margin-bottom: 20px;
`;

function TvShowPage({tvShow}: InitialStateProps) {
    const [openInfo, setOpenInfo] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [showEpisodes, setShowEpisodes] = useState<number>();

    const {
        name,
        image,
        summary,
        language,
        type,
        website,
        rating,
        genres,
        episodes,
        duration,
        seasons,
    } = tvShow;

    // function to render episode from loop
    function renderEpisode(episode: TvShowEpisode) {
        const { number, name, id } = episode;

        return (
            <ShowEpisode key={id}>
                <EpisodeNumber>
                    <span>Episode {number}</span>
                </EpisodeNumber>
                <Link to={`/episode/${id}`}>
                    {name}
                </Link>
            </ShowEpisode>
        );
    }

    return (
        <Page background="#aae1e1">
            <PageContent>
                <Overview>
                    <PageTitle>
                        {name}
                    </PageTitle>
                    { image && (
                        <Image
                            src={image.medium}
                            onClick={() => image && setModalOpen(true)}
                            alt="Propper Alt Atribute"
                        />
                    )}
                    { summary && (
                        // clean summary from tags
                        <Description>
                            {tvShow.summary!.replace(/<[^>]*>/g, '')}
                        </Description>
                    )}
                    <Info>
                        <InfoRow>
                            <strong>Language:</strong> {language}
                        </InfoRow>
                        <InfoRow>
                            <strong>Show Type:</strong> {type}
                        </InfoRow>
                        <InfoRow>
                            <strong>Genres:</strong> {genres && genres.join(" | ")}
                        </InfoRow>
                        { openInfo && (
                            <div>
                                <InfoRow>
                                    <strong>Rating:</strong> {rating}/10
                                </InfoRow>
                                <InfoRow>
                                    <strong>Episode Duration:</strong> {duration}
                                </InfoRow>
                                <InfoRow>
                                    <a href={website}>Visit Official Website</a>
                                </InfoRow>
                            </div>
                        )}
                        <InfoButton onClick={() => setOpenInfo(!openInfo)}>
                            { openInfo ? 'Hide' : 'Show more info' }
                        </InfoButton>
                    </Info>
                </Overview>
                {/*render seasons*/}
                { seasons && seasons.map((season: TvShowSeason) => {
                        const showSeason = showEpisodes === season.number && episodes;
                        return (
                            <ShowSeason key={season.id}>
                                <SubTitle>
                                    Season {season.number}
                                </SubTitle>
                                { season.summary && (
                                    <SeasonInfo>
                                        {season.summary!.replace(/<[^>]*>/g, '')}
                                    </SeasonInfo>
                                )}
                                { showSeason && (
                                    <ShowEpisodes>
                                        {episodes!.map(episode => episode.season === season.number && renderEpisode(episode))}
                                    </ShowEpisodes>
                                )}
                                <Button
                                    onClick={() => setShowEpisodes(showEpisodes === season.number ? undefined : season.number)}
                                >
                                    {/*render season episodes if the button to show them was clicked*/}
                                    { showEpisodes === season.number ? 'Hide' : 'Show episodes'}
                                </Button>
                            </ShowSeason>
                        );
                    })
                }
            </PageContent>
            { modalOpen && (
                <Modal
                    image={image!.original}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </Page>
    );
}

function mapStateToProps(state: InitialStateProps) {
    const { tvShow } = state;

    return {
        tvShow
    };
}

export default connect(mapStateToProps)(TvShowPage);

export {
    ShowSeason,
    ShowEpisode,
    InfoButton,
};
