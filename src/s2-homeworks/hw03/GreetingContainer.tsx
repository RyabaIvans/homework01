import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import Greeting from './Greeting'
import { UserType } from './HW3'
import user from "../hw08/User";

type GreetingContainerPropsType = {
    users: Array<UserType>
    addUserCallback: (val:string)=>void // need to fix any
}

export const pureAddUser = (name: string, setError: (val:string)=> void, setName: (val:string)=>void, addUserCallback: (val:string)=> void) => {
    switch (name) {
        case '' :
            return setError('Error')
        default : addUserCallback(name)
    }
    setName('')

}

export const pureOnBlur = (name: string, setError: (val:string)=> void) => {
    !name && setError('Mistake')  // если имя пустое - показать ошибку
}

export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>, addUser: ()=>void) => { // если нажата кнопка Enter - добавить
    if (e.key === "Enter") {
        addUser()
    }
}

// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
    users,
    addUserCallback,
}) => {
    // деструктуризация пропсов
    const [name, setName] = useState<string>('') // need to fix any
    const [error, setError] = useState<string>('') // need to fix any

    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        error && setError('')
    }
    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)

    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        pureOnEnter(e, addUser)
    }

    const totalUsers = users.length // need to fix
    let lastUserName = ''
    if (users.length<1){
        lastUserName = ''
    } else lastUserName = users[users.length-1].name
    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer
