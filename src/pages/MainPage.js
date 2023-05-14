import React, { createContext, useState } from 'react'
import { Navbar } from '../components/Navbar/Navbar';
import { Menu } from '../components/Menu/Menu';
import { TabsMenu } from "../components/TabsMenu/TabsMenu";
import axios from "axios";
import { HOST, PORT } from "../prodURL";

export const MainPageContext = createContext();

const MainPage = () => {
    const [selectedId, setSelectedId] = useState(1);
    const [username, setUsername] = useState('Username');
    const [score, setScore] = useState('Score');

    const addSubmitedScore = newScore => setScore(score + newScore);

    axios
        .get(`http://${HOST}:${PORT}/user/${localStorage.getItem('email')}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(resp => {
            if (200 === resp.status) {
                setUsername(resp.data.firstName + ' ' + resp.data.lastName);
                setScore(resp.data.score);
                localStorage.setItem('uid', resp.data.id);
            }
        })
        .catch(console.error);

    return (
        <MainPageContext.Provider value={{ selectedId, setSelectedId }}>
            <div>
                <Navbar username={username} score={score} />
                <Menu />
                <TabsMenu onQuizSubmitted={addSubmitedScore} />
            </div>
        </MainPageContext.Provider>

    );
};

export default MainPage;