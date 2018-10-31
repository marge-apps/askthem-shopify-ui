import React from 'react';
import {IoMdHappy, IoMdSad} from 'react-icons/io';
import {css} from 'react-emotion';

export const Satisfied = () => <IoMdHappy size={26} className={css`color: green`}/>;
export const Disappointed = () => <IoMdSad size={26} className={css`color: red`}/>;

export const Satisfaction = ({satisfied}) => satisfied ? <Satisfied/> : <Disappointed/>;
