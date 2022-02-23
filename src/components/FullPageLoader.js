import React from 'react';
import "../styles/loader.css";

const FullPageLoader = () => {
    return (
        <div className='spinner'>
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        
    );
}


export default FullPageLoader;