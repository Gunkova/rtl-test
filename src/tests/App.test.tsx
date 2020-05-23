import React from 'react';
import { mount } from 'enzyme';
import App from './../components/App';
import { Button, Info, Image } from '../components/lib/StyledComponnets';
import { ShowSeason, ShowEpisode, InfoButton } from '../components/TvShowPage';
import TvShowPage from '../components/TvShowPage';
import { Provider as ReduxProvider } from 'react-redux';
import { mockStore, wait } from '../setupTests';
import { act } from 'react-dom/test-utils';
import { CloseIcon, Modal } from '../components/Modal';

const stateWithTvShowInfo = {
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
    },
};

const stateWithSeasons = {
    tvShow: {
        name: 'name',
        language: 'en',
        type: 'animation',
        genres: ['genr1', 'genr2', 'genr3'],
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
    },
};

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
        }],
    },
};

it('renders App with TvShowPage', () => {
    const store = mockStore(stateWithTvShowInfo);

  const wrapper = mount(
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
  );

  expect(wrapper.find('TvShowPage').length).toBe(1);
});

it('shows seasons', () => {
    const store = mockStore(stateWithSeasons);

    const wrapper = mount(
        <ReduxProvider store={store}>
            <App />
        </ReduxProvider>
    );

    expect(wrapper.find(ShowSeason).length).toBe(2);
});

it('shows episodes and then hides', async () => {
    const store = mockStore(stateWithEpisodes);

    await act(async () => {
        const wrapper = mount(
            <ReduxProvider store={store}>
                <App/>
            </ReduxProvider>
        );

        const {onClick} = wrapper.find(Button).get(0).props;
        onClick();

        await wait();
        wrapper.update();

        expect(wrapper.find(ShowEpisode).length).toBe(3);

        wrapper.find(Button).first().simulate('click');

        await wait();
        wrapper.update();

        expect(wrapper.find(ShowEpisode).length).toBe(0);
    });
});

it('shows hidden info', async () => {
    const store = mockStore(stateWithEpisodes);

    await act(async () => {
        const wrapper = mount(
            <ReduxProvider store={store}>
                <App/>
            </ReduxProvider>
        );

        expect(wrapper.find(Info).html()).not.toContain('Rating');

        const {onClick} = wrapper.find(InfoButton).get(0).props;
        onClick();

        await wait();
        wrapper.update();

        expect(wrapper.find(Info).html()).toContain('Rating');
    });
});

it('shows modal with image and closes it', async () => {
    const store = mockStore(stateWithEpisodes);

    await act(async () => {
        const wrapper = mount(
            <ReduxProvider store={store}>
                <App/>
            </ReduxProvider>
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
