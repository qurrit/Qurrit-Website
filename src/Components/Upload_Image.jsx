import React, { useState } from 'react';


export default function Upload_Image({ submitImageUrl }) {

    const [selectedFile, setSelectedFile] = useState('');

    const [isSelected, setIsSelected] = useState(false);

    const [imageSubmit, setImageSubmit] = useState(true);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    const showImageSubmit = () => {
        setImageSubmit(!imageSubmit)
    }

    const handleSubmission = () => {
        const formData = new FormData();

        formData.append('file', selectedFile);
        formData.append('upload_preset', 'zpo2ml3c')

        fetch(
            'https://api.cloudinary.com/v1_1/de421a273/image/upload',
            {
                method: 'POST',
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
                submitImageUrl(result.url)
                if (result.url) {
                    setImageSubmit(!imageSubmit)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    return (
        <div>
            {imageSubmit ?
                <div>
                    <input type="file" name="file" onChange={changeHandler} />
                    {isSelected ? (
                        <div>

                            <p>Click Submit</p>
                        </div>
                    ) : (
                        null
                    )}
                    <div>
                        <button className='default-button background-red' onClick={handleSubmission}>Submit</button>
                    </div>


                </div>
                :
                <React.Fragment>
                    <div>Image Uploaded</div>
                    <button onClick={showImageSubmit}>Edit Image</button>
                </React.Fragment>}
        </div>
    )
}
