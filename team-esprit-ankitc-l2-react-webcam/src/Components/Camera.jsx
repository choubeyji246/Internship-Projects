import React, { useState, useRef, useEffect } from 'react'
import Webcam from 'react-webcam'

const Camera = () => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    
    const capture = () => {
            const image = webcamRef.current.getScreenshot();
            setImgSrc(image);

            if (image) {
                const link = document.createElement('a');
                link.href = image;
                link.download = 'snapshot.jpg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        
    }

    useEffect(() => {
        const interval = setInterval(() => {
            capture();
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />
            <img src={imgSrc} alt="captured" />
        </div>
    )
}

export default Camera
