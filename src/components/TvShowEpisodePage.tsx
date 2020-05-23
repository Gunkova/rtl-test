import React, { useState } from 'react';
import { connect } from 'react-redux';
import { InitialStateProps, TvShowEpisode } from './../interfaces';
import {
    Description,
    Image,
    Overview,
    Page,
    PageContent,
    PageTitle,
} from './lib/StyledComponnets';
import { Modal } from './Modal';

function TvShowEpisodePage({ name, image, summary }: TvShowEpisode) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <Page background="#e1aad0">
            <PageContent>
                <Overview>
                    <PageTitle>
                        {name}
                    </PageTitle>
                    { image ? (
                            <Image
                                src={image.medium}
                                onClick={() => image && setModalOpen(true)}
                                alt="Propper Alt Atribute"
                            />
                    ) : <div>No image</div>
                    }
                    { summary ? (
                        <Description>
                            {summary!.replace(/<[^>]*>/g, '')}
                        </Description>
                    ) : <div>No deacription</div>
                    }
                </Overview>
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

interface RouteProps {
    match: {
        params: {
            episodeId: string;
        }
    };
}

function mapStateToProps(state: InitialStateProps, ownProps: RouteProps) {
    const { tvShow } = state;

    // send only currect episode data to the component
    const episodeId = parseInt(ownProps.match.params.episodeId);

    return tvShow.episodes.find(item => item.id === episodeId) || {};
}

export default connect(mapStateToProps)(TvShowEpisodePage);
