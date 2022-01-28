import React, { Component } from 'react'
import Workouts from './Workouts'
import Introduction from '../Components/Introduction'
import SearchForm from './SearchForm'


export default function Home() {
    return (
        <main>
            <Introduction />
            <SearchForm />
            <Workouts />

        </main>
    )

}