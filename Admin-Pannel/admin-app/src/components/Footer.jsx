import React from 'react'

const Footer = () => {
    
    const year = new Date().getFullYear();
    
    return (
        <footer className="sticky-footer bg-white">
            <div className="container my-auto">
                <div className="copyright text-center my-auto">
                    <span>Copyright &copy; MODIFIX {year}</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer