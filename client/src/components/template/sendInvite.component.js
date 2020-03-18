import React from 'react';

const SendInvite = () => {

    return(
        <div className="container">
            <form className="white col s12" style={{padding:"0 20px"}}>
                <div className="row center">
                    <div className="input-field col s6 offset-s3">
                        <label htmlFor="recipents">Recipents</label>
                        <input 
                            type="text" 
                            id="recipents" 
                        />
                    </div>
                    <div className="input-field col s6 offset-s3">
                        <label htmlFor="subject">Subject</label>
                        <input 
                            type="text" 
                            id="subject" 
                        />
                    </div>
                    <div className="input-field col s6 offset-s3" style={{border: true}}>
                        <label htmlFor="textarea1">Message</label>
                        <textarea id="textarea1" className="materialize-textarea"></textarea>
                    </div>
                    <div className="input-field col s6 offset-s3">
                        <button className="btn pink lighten-1 z-depth-0">
                            Send
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SendInvite;