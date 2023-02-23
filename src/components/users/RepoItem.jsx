import React from "react";
import { FaLink } from "react-icons/fa";
import PropTypes from "prop-types";

function RepoItem({ repo }) {
    const { html_url, name, description } = repo;
    return (
        <div className="mb-2 rounded-md card bg-gray-800 hover:bg-gray-900">
            <div className="card-body">
                <h3 className="card-title">
                    <a href={html_url} target="_blank" rel="noreferrer">
                        <FaLink className="inline mr-2"/>
                        {name}
                    </a>
                </h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

RepoItem.propTypes = {
    repo: PropTypes.object.isRequired,
};

export default RepoItem;
