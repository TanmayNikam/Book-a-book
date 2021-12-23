import React,{useState,Fragment} from 'react' // eslint-disable-line no-unused-vars

const Radiobox = ({prices,handleFilters}) => {
    

    
    const handleChange =(event)=>{
        // setValues(range);
        console.log( event.target.value)
        handleFilters(event.target.value,"price")
    }

    return prices.map((e,i)=>(
        <div key={i}>
            <input type="radio" onChange={handleChange} name={e} value={e._id} className="m-2"/>
            <label className="form-group-label">{e.name}</label>
        </div>
    ))
}

export default Radiobox
