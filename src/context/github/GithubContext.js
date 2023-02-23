import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        loading: false,
        user: {},
        repos: [],
    };

    const [state, dispatch] = useReducer(githubReducer, initialState);

    // test components
    const fetchUsers = async () => {
        setLoading();
        const response = await fetch(`${GITHUB_URL}/users`);
        const data = await response.json();
        dispatch({ type: "GET_USERS", payload: data });
    };

    const searchUsers = async (text) => {
        setLoading();
        const params = new URLSearchParams({
            q: text,
        });
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`);
        const { items } = await response.json();
        dispatch({ type: "GET_USERS", payload: items });
    };

    const getUserRepos = async (login) => {
        setLoading();
        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10,
        });
        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`);
        const data = await response.json();
        dispatch({ type: "GET_REPOS", payload: data });
    };

    const getUser = async (login) => {
        setLoading();
        const response = await fetch(`${GITHUB_URL}/users/${login}`);
        if (response.status === 404) {
            window.location = '/notfound'
        } else {
            const data = await response.json();
            dispatch({ type: "GET_USER", payload: data });
        }
    };

    const clearUsers = async () => {
        setLoading();
        dispatch({ type: "GET_USERS", payload: [] });
    };

    const setLoading = () => {
        dispatch({ type: "SET_LOADING" });
    };

    return (
        <GithubContext.Provider
            value={{
                users: state.users,
                loading: state.loading,
                user: state.user,
                repos: state.repos,
                getUserRepos,
                getUser,
                fetchUsers,
                searchUsers,
                clearUsers,
            }}
        >
            {children}
        </GithubContext.Provider>
    );
};

export default GithubContext;
