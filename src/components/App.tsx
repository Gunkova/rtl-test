import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchShowEpisodes, fetchShowInfo, fetchShowSeasons } from '../modules/action';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import styled from 'styled-components';
import { layoutStyles } from './lib/StyledComponnets';
import TvShowPage from './TvShowPage';
import TvShowEpisodePage from './TvShowEpisodePage';

const Logo = styled.a`
    width: 200px;
    display: block;
    
    img {
        display: block;
        width: 100%;
    }
    
    @media(max-width: 450px) {
        width: 100px;
    }
`;

const Header = styled.header`
    background: #3F3F3F;
    color: #fff;
    height: 120px;
`;

const HeaderContent = styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
    min-height: 100%;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    ${layoutStyles}
`;

const Slogan = styled.div`
    text-align: right;
    font-size: 28px;
    font-style: italic;
    font-weight: 300;
    
    @media(max-width: 450px) {
        font-size: 20px;
    }
`;

const Footer = styled.footer`
    height: 60px;
    box-sizing: border-box;
    color: #368a55;
    padding: 20px;
    font-weight: 300;
    ${layoutStyles}
`;

function App() {
    const showId = '6771';
    const dispatch = useDispatch();

    // get all data we need only once,
    // do it in separate dispatches so if one of the requests fails
    // we can show the rest
    React.useEffect(() => {
        dispatch(fetchShowInfo(showId));
        dispatch(fetchShowEpisodes(showId));
        dispatch(fetchShowSeasons(showId));
    }, [dispatch]);

    return (
        <div className="app">
            <Header>
                <HeaderContent>
                    <Logo href='http://www.tvmaze.com/'>
                        <img src='/images/logo.png' alt='logo' />
                    </Logo>
                    <Slogan>
                        Tv shows are the best!
                    </Slogan>
                </HeaderContent>
            </Header>
            <Router>
                <Switch>
                    <Route path="/" exact={true} component={TvShowPage} />
                    <Route path="/episode/:episodeId" exact={true} component={TvShowEpisodePage} />
                </Switch>
            </Router>
            <Footer>
                © Made by Veronika
            </Footer>
        </div>
    );
}

export default App;
