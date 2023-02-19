import { Routes, Route } from "react-router-dom"
import AppLayout from "./components/layouts/AppLayout"
import Home from "./components/Home"
import AgentList from './components/agent/List'
import AgentDetail from './components/agent/Detail'
import Map from './components/map/List'
import Weapon from './components/weapon/List'
import WeaponDetail from './components/weapon/Detail'
import PlayerCard from './components/player_card/List'
import Bundle from './components/bundle/List'

const RouterComponent = () => {
    return (
        <Routes>
            <Route path="" element={<AppLayout />}>
                <Route path="" element={<Home />} />
                <Route path="/agent" element={<AgentList />}>
                    <Route path="/agent/detail" element={<AgentDetail />}></Route>
                </Route>
                <Route path="/map" element={<Map />} />
                <Route path="/weapon" element={<Weapon />}></Route>
                <Route path="/weapon/detail" element={<WeaponDetail />}></Route>
                <Route path="/player_card" element={<PlayerCard />}></Route>
                <Route path="/bundle" element={<Bundle />}></Route>

            </Route>
        </Routes>
    )
}


export default RouterComponent;