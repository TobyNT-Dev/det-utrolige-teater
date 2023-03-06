import { Route, Routes } from "react-router-dom"
import { Actors } from "../../Pages/Actors/Actors"
import { Events } from "../../Pages/Events/Events"
import { Home } from "../../Pages/Home/Home"
import { Footer } from "../Footer/Footer"
import { Navbar } from "../Navbar/Navbar"

export const AppRouter = () => {
    return (
        <>
        {/* Displays the navigation bar on every page */}
        <Navbar />
        {/* Creates the routes for the links in the NavBar Component */}
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forestillinger-og-events" element={<Events />} />
            <Route path="/skuespillere" element={<Actors />} />
        </Routes>
        {/* shows the footer on every page */}
        <Footer />
        </>
    )
}