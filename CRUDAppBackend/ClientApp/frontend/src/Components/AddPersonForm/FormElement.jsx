import React from "react";

const FormElement = function ({name , placeholder, register, error}) {

    return (
        <div>
            <input className='myInput'
                {...register(name)}
                type="text"
                placeholder={placeholder}
            />
            {error && <p className='error'>{error.message}</p>}
        </div>
    )
}

export default FormElement;