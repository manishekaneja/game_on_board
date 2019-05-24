import React from 'react';
import values from './const';
const weapon_render = value => {
    switch (value) {
        case 10:
            return <img style={{ height: '100%', width: '100%' }} src={values.melle} alt="player2" />;
        case 20:
            return <img style={{ height: '100%', width: '100%' }} src={values.axe} alt="player2" />;
        case 30:
            return <img style={{ height: '100%', width: '100%' }} src={values.bow} alt="player2" />;
        case 40:
            return <img style={{ height: '100%', width: '100%' }} src={values.gun} alt="player2" />;
        default:
            return null;


    }
}
export default weapon_render;