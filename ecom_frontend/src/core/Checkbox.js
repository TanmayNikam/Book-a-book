import React,{useState} from 'react'


const Checkbox = ({categories,handleFilters}) => {

    const [checked,setChecked] = useState([])

    const handleChange = id =>()=> {
        const currentCheckedCategory = checked.indexOf(id)
        const checkedCopy = [...checked]

        if(currentCheckedCategory === -1){
            checkedCopy.push(id)
        }
        else{
            checkedCopy.splice(currentCheckedCategory,1)
        }
        // console.log(checkedCopy)
        setChecked(checkedCopy)
        handleFilters(checkedCopy,"category")
    }

    return categories.map((e,i)=>(
        <li key={i} className="list-unstyled">
            <input onChange={handleChange(e._id)} type="checkbox" className="form-check-input"/>
            <label className="form-check-label">{e.name}</label>
        </li>
    ));
}

export default Checkbox
