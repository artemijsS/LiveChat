import './App.css';
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import {useEffect} from "react";
import {getProfileFetch} from "./redux/actions/user";
import {useDispatch} from "react-redux";

function App() {
    const routes = useRoutes()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfileFetch())
    }, [])

    return (
        <Router>
            {routes}
        </Router>
    );
}

export default App;
