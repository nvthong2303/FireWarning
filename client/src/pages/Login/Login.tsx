import React from 'react';
import Banner from '../../components/Banner/Banner';
import FormLogin from '../../components/Login/FormLogin';

export default function Login() {
    console.log('login')
    return (
        <div className='row'>
            <Banner />
            <FormLogin />
        </div>
    )
}
