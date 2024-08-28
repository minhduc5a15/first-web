'use client';

import styled from 'styled-components';
import React from 'react';
import { FaHeart } from 'react-icons/fa6';

type LikeButtonProps = {
    $liked: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Container = styled.button<LikeButtonProps>`
    width: 45px;
    height: 45px;
    background: #e5e5e5;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;

    & > span {
        width: 40px;
        height: 30px;
        display: flex;
        position: absolute;
        justify-content: center;
        align-items: center;
        color: ${(props) => (props.$liked ? 'red' : '#aaa')};
        font-size: 17px;
        user-select: none;
        transition: color 0.2s ease-in-out;

        &:focus {
            transform: none;
        }

        &:hover {
            color: ${(props) => (props.$liked ? 'red' : 'black')};
        }
    }
`;

const LikeButton: React.FC<LikeButtonProps> = ({ $liked = false, ...props }) => {
    return (
        <Container $liked={$liked} {...props}>
            <span>
                <FaHeart />
            </span>
        </Container>
    );
};

export default LikeButton;
