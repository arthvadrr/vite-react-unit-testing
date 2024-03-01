// noinspection JSCheckFunctionSignatures
import { useEffect, useReducer } from "react";
import { actionTypes, initialState } from "./reducer.js";
import reducer from "./reducer.js";
import Repo from "./Repo.jsx";

const RepoList = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({type: actionTypes.FETCH_REQUEST});
        fetch('https://api.github.com/users/arthvadrr/repos?visibility=public&sort=updated&direction=desc&per_page=999')
            .then(res => res.ok ? res.json() : undefined)
            .then(data => dispatch({type: actionTypes.FETCH_SUCCESS, payload: data}))
            .catch(err => dispatch({type: actionTypes.FETCH_REQUEST, payload: err}))
    }, []);

    return (
        <ul>
            { !state.loading && state.repositories.length > 0 &&
                state.repositories.map((repo, i) => <Repo key={`repo-${i}`} repo={ repo }/>)
            }
        </ul>
    )
}

export default RepoList;