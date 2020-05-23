import styled, { css } from 'styled-components';

const layoutStyles = css`
    padding-left: 40px;
    padding-right: 40px;
    margin-left: auto;
    margin-right: auto;
    max-width: 1280px;
    
    @media(max-width: 756px) {
        padding-left: 20px;
        padding-right: 20px;
    }
`;

const Button = styled.button`
    cursor: pointer;
    border: none;
    border-radius: 0;
    box-shadow: none;
    font-size: 14px;
    font-weight: bold;
    background: #43AC6A;
    color: #fff;
    padding: 5px 15px;
    
    &:hover {
        background: #368a55;
        color: #fff;
    }
    
    &:focus,
    &:active {
        outline: none;
    }
`;

interface PageProps {
    background: string;
}

const Page = styled.div<PageProps>`
    background: ${props => props.background};
    padding: 40px 0;
`;

const Title = styled.h1`
    font-size: 28px;
    font-weight: 300;
    margin: 20px 0;
`;

const SubTitle = styled.h2`
    font-size: 24px;
    font-weight: 300;
    margin: 10px 0;
`;

const PageContent = styled.div`
    ${layoutStyles}
`;

const Info = styled.div`
    margin-bottom: 20px;
    
    @media(max-width: 756px) {
        order: 3;
    }
`;

const InfoRow = styled.div`
    margin-bottom: 5px;
`;

const Description = styled.div`
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 20px;
    
    @media(max-width: 756px) {
        order: 4;
        grid-column: span 2;
    }
`;

interface ImageProps {
    onClick?(): void;
}

const Image = styled.img<ImageProps>`
    width: 210px;
    margin-bottom: 20px;
    cursor: pointer;
`;

const Overview = styled.div`
    display: grid;
    grid-template-columns: 210px 3fr 2fr;
    grid-template-rows: auto auto;
    grid-column-gap: 40px;
    margin-bottom: 50px;
    
    @media(max-width: 765px) {
        grid-template-columns: 200px auto;
    }
    
    @media(max-width: 450px) {
        display: block;
    }
`;

const PageTitle = styled(Title)`
    grid-column: span 3;
    
    @media(max-width: 756px) {
        grid-column: span 2;
    }
`;

export {
    layoutStyles,
    Page,
    PageContent,
    Title,
    Button,
    SubTitle,
    InfoRow,
    Description,
    Image,
    Info,
    Overview,
    PageTitle,
};

