import React, { useState, useRef, useContext, useEffect } from 'react';
import { useCallback } from 'react';

const url = 'https://qurrit-react.herokuapp.com/api/programs/search'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [workouts, setWorkouts] = useState([])


    const fetchWorkouts = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${url}/${searchTerm}`)
            const data = await response.json()


            if (data) {
                const newWorkouts = data.map((items) => {
                    const { id, program_name, trainer_name, duration, cost, image } = items;
                    return { id, program_name, trainer_name, duration, cost, image }
                })
                setWorkouts(newWorkouts)

            }

            else {
                setWorkouts([])
            }
            setLoading(false)


        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const fetchAllWorkouts = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${url}`)
            const data = await response.json()


            if (data) {
                const newWorkouts = data.map((items) => {
                    const { id, program_name, trainer_name, duration, cost, image } = items;
                    return { id, program_name, trainer_name, duration, cost, image }
                })
                setWorkouts(newWorkouts)

            }

            else {
                setWorkouts([])
            }
            setLoading(false)


        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (searchTerm) {
            fetchWorkouts()
        } else {
            fetchAllWorkouts()
        }
    }, [searchTerm])


    return (
        <AppContext.Provider value={{ loading, workouts, setSearchTerm }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }