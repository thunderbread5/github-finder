import React, { useContext } from "react";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/GithubContext";
import Spinner from "../Spinner";

function UserResults() {
    const { users, loading } = useContext(GithubContext);

    if (loading) {
        return <Spinner />
    } else {
        return (
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                {users.map((user) => (
                    <UserItem key={user.login} user={user} />
                ))}
            </div>
        );
    }
}

export default UserResults;
