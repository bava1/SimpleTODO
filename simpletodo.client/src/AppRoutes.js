import Homepage from "./Pages/Homepage/Homepage";
import Tasks from "./Pages/Tasks/Tasks";
import Weather from './Pages/Weather/Weather';
import Contact from './Pages/Contact/Contact';
import Blog from './Pages/Blog/Blog';

const AppRoutes = [
    {
        path: '/',
        element: Homepage
    },
    {
        path: '/tasks',
        element: Tasks
    },
    {
        path: '/blog',
        element: Blog
    },
    {
        path: '/contact',
        element: Contact
    },
    {
        path: '/weather',
        element: Weather
    }

]

export default AppRoutes