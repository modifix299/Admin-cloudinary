import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="text-center">
            <div className="error mx-auto" data-text="404">404</div>
            <p className="lead text-gray-800 mb-5">Page Not Found</p>
            {/* <p classsName="text-gray-500 mb-0">It looks like you found a glitch in the matrix...</p> */}
            <Link to="/admin">&larr; Back to Dashboard</Link>
        </div>
    )
}

export default NotFound