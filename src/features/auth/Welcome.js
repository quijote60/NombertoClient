import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <>
        
      
            
        <section>
        <div className="welcome-container">
              <div className="welcome-header">
                  <h1>Welcome !</h1>
                  <p className="date">{today}</p>
              </div>

              <div className="dashboard-grid">
                  <Link to="/dash/properties" className="dash-card">
                      <h2>View Properties</h2>
                  </Link>
                  <Link to="/dash/residents" className="dash-card">
                      <h2>View Residents</h2>
                  </Link>

                  <Link to="/dash/users" className="dash-card">
                      <h2>View Users</h2>
                  </Link>
                  <Link to="/dash/finetypes" className="dash-card">
                      <h2>View Fine Types</h2>
                  </Link>
                  <Link to="/dash/expenses" className="dash-card">
                      <h2>View Expenses</h2>
                  </Link>

                  

                  
              </div>
          </div>

       </section>
        </>
    )

    return content
}

export default Welcome
