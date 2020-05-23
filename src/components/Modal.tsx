import React from 'react';
import styled from 'styled-components';
import { Button } from './lib/StyledComponnets';

interface ModalProps {
    image: string;
    onClose(): void;
}

const ModalWrap = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    img {
        max-width: 90vw;
        max-height: 90vh;
    }
`;

const ModalOverlay = styled.div`
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.5);
    z-index: 1;
`;

const CloseIcon = styled(Button)`
    position: absolute;
    top: 0;
    right: 0;
`;

function Modal({ image, onClose }: ModalProps) {
    return (
        <ModalOverlay>
            <ModalWrap>
                <CloseIcon onClick={onClose}>x</CloseIcon>
                <img src={image} alt="Propper Alt Atribute" />
            </ModalWrap>
        </ModalOverlay>
    );
}

export { Modal, CloseIcon };
