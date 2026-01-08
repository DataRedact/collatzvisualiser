import React, {useRef} from 'react';


function Form({onChange}) {

    const handleInput = ({target}) => {
        onChange(Number(target.value))
    }
    return ( <form>
        <input placeholder='Your Number' onChange={handleInput} type='number'/>
    </form> );
}

export default Form;