import React, {useEffect, useState} from 'react';
import logo from "./images/logo.jpg"


const FindNewDialog = () => {

    const [search, setSearch] = useState('');

    useEffect(() => {
        if (search.length > 1)
            console.log(search)
    }, [search])

    return (
        <>
            <div className="search">
                <div className="box">
                    <div className="input-box">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"/></svg>
                        <input onChange={(e) => {setSearch(e.target.value)}} type="text" placeholder="Start new dialog - enter telephone"/>
                    </div>
                </div>
            </div>
            <div className="dialogs">
                <div className="dialog">
                    <img src={logo} alt="error"/>
                    <div className="details">
                        <div className="dialog-info1">
                            <div className="dialog-name big-text">
                                Anastasija 26527700
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FindNewDialog;