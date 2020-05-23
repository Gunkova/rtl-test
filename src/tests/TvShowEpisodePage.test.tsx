import React from 'react';
import { mount } from 'enzyme';
import { Image } from '../components/lib/StyledComponnets';
import { Provider as ReduxProvider } from 'react-redux';
import { mockStore, wait } from '../setupTests';
import { act } from 'react-dom/test-utils';
import { CloseIcon, Modal } from '../components/Modal';
import { MemoryRouter } from 'react-router-dom';
import TvShowEpisodePage from '../components/TvShowEpisodePage';

const stateWithEpisodes = {
    tvShow: {
        name: 'name',
        language: 'en',
        type: 'animation',
        image: {
            original: 'image1',
            medium: 'image2',
        },
        genres: ['genr1', 'genr2', 'genr3'],
        summary: 'summary',
        website: 'https://',
        rating: '5',
        duration: '15min',
        seasons: [{
            id: 'seasonId1',
            number: 1,
            summary: 'season summary 1',
        }, {
            id: 'seasonId2',
            number: 2,
        }],
        episodes: [{
            id: 9999,
            name: 'episode 1',
            season: 1,
            number: 1,
            summury: 'episode summary 1',
            image: {
                original: 'episode image1',
                medium: 'episode image2',
            },
        },{
            id: 'episodeId2',
            name: 'episode 2',
            season: 1,
            number: 2,
            summury: 'episode summary 2',
            image: {
                original: 'episode image1',
                medium: 'episode image2',
            },
        },{
            id: 'episodeId3',
            name: 'episode 3',
            season: 1,
            number: 3,
            summury: 'episode summary 3',
            image: {
                original: 'episode image1',
                medium: 'episode image2',
            },
        },{
            id: 'episodeId4',
            name: 'episode 4',
            season: 2,
            number: 1,
            summury: 'episode summary 4',
            image: {
                original: 'episode image1',
                medium: 'episode image2',
            },
        }]
    }
};

const episode = {
    id: 4,
    name: 'episode 4',
    season: 2,
    number: 1,
    summary: 'episode summary 4',
    image: {
        original: 'episode image1',
        medium: 'episode image2',
    },
    match: {
        params: {
            episodeId: '4',
        },
    },
}

const episodeWithoutSummary = {
    id: 4,
    name: 'episode 4',
    season: 2,
    number: 1,
    image: {
        original: 'episode image1',
        medium: 'episode image2',
    },
    match: {
        params: {
            episodeId: '4',
        },
    },
}

it('renders TvShowEpisodePage', () => {
    const store = mockStore(stateWithEpisodes);

    const wrapper = mount(
        <MemoryRouter initialEntries={[ '/episode/4' ]} initialIndex={0}>
            <ReduxProvider store={store}>
                <TvShowEpisodePage {...episode} />
            </ReduxProvider>
        </MemoryRouter>
    );

    expect(wrapper.find('TvShowEpisodePage').length).toBe(1);
});

it('shows modal with image and closes it', async () => {
    const store = mockStore(stateWithEpisodes);

    await act(async () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/episode/4' ]} initialIndex={0}>
                <ReduxProvider store={store}>
                    <TvShowEpisodePage {...episodeWithoutSummary} />
                </ReduxProvider>
            </MemoryRouter>
        );

        const { onClick } = wrapper.find(Image).get(0).props;
        onClick();

        await wait();
        wrapper.update();

        expect(wrapper.find(Modal).length).toBe(1);

        const closeIcon = wrapper.find(CloseIcon);
        closeIcon.simulate('click');

        await wait();
        wrapper.update();

        expect(wrapper.find(Modal).length).toBe(0);
    });
});
