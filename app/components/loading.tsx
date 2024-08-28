'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingProps {
    size?: number;
    fullScreen?: boolean;
}

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const FullScreenOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1a1c2dd1;
    z-index: 9999;
    cursor: wait;
`;

const Spinner = styled.div<{ size: number }>`
    border: ${({ size }) => size / 8}px solid #202328;
    border-top: ${({ size }) => size / 8}px solid #b1b3b4;
    border-radius: 50%;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    animation: ${spin} 1s linear infinite;
`;

const Loading: React.FC<LoadingProps> = ({ size = 40, fullScreen = false }) => {
    if (fullScreen) {
        return (
            <FullScreenOverlay>
                <Spinner size={size} />
            </FullScreenOverlay>
        );
    }

    return <Spinner size={size} />;
};

export default Loading;
