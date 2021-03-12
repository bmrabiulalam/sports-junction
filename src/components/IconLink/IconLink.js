import React, {useState, useEffect } from 'react';
import './IconLink.css';
import { isWebUri } from 'valid-url'; // https://github.com/ogt/valid-url

const IconLink = (props) => {
    const { strURL } = props;
    const [url, setUrl] = useState('');

    useEffect(() => {
        const testUrl = isWebUri(`https://${strURL}`);
        setUrl(testUrl);
    }, [strURL]);

    return (
        strURL  ?   <div className="social-link"
                        style={{ 
                            display: 'inline-block', 
                            marginInline: '15px', 
                            cursor: 'pointer', 
                            color: 'white' 
                        }}

                        onClick={() => url ? window.open(url) : alert('Invalid URL!')}
                    >
                        {
                            props.children
                        }
                    </div>
                :   <></>
    );
};

export default IconLink;