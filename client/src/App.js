import './App.css';
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import {useEffect} from "react";
import {getProfileFetch} from "./redux/actions/user";
import {useDispatch, useSelector} from "react-redux";

function App() {
    const routes = useRoutes()
    const dispatch = useDispatch()

    const {loading} = useSelector(({ user }) => user);

    useEffect(() => {
        dispatch(getProfileFetch())
    }, [])

    return (
        <>
            {loading ?
                <div>Loading</div>
                :
                <Router>
                    {routes}
                </Router>
            }
        </>
    );
}

export default App;
