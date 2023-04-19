import React from 'react'
import { Link } from 'react-router-dom'

export default function Default() {
    return (
        <div className='homeInner'>
            <Link to="/manager"><button className='button-56'>Manager</button></Link>
            <Link to="/executive"><button className='button-56'>Executive</button></Link>
            <Link to="/user"><button className='button-56'>Token</button></Link>
            <Link to="/detailsScreen"><button className='button-56'>Details Screen</button></Link>

        </div>
    )
}


