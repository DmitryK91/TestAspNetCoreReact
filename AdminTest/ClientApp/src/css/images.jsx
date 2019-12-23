import React from 'react';


export const ArrowDown = () =>
    <svg height="16" viewBox="0 0 48 48" width="16" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 20l10 10 10-10z" />
        <path d="M0 0h48v48h-48z" fill="none" />
    </svg>

export const ArrowUp = () =>
    <svg height="16" viewBox="0 0 48 48" width="16" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }} >
        <path d="M14 20l10 10 10-10z" />
        <path d="M0 0h48v48h-48z" fill="none" />
    </svg>

export const Filter = (color) =>
    <svg height="16" viewBox="0 0 1792 1792" width="16" xmlns="http://www.w3.org/2000/svg" style={{ fill: color }}>
        <path d="M1595 295q17 41-14 70l-493 493v742q0 42-39 59-13 5-25 5-27 0-45-19l-256-256q-19-19-19-45v-486l-493-493q-31-29-14-70 17-39 59-39h1280q42 0 59 39z" />
    </svg>