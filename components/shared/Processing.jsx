import React from 'react'

const Processing = ({status}) => {
  return (
    <div>
        {
            status === 'pending' ? 
            (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#f5ac10" className="bi bi-dash-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                </svg>
            ) : (
                <h2>completed</h2>
            )
        }
    </div>
  )
}

export default Processing