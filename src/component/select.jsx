import { languagesData } from "../helper";
const Select = ({WhenSelected, value}) => {
    function handleChange(event){
       WhenSelected(event.target.value);
       console.log(`value is ${value}`)
    }
return(
    <>
        <div>
            <select className="my-4 text-blue-600 p-2 border-[2px] border-solid border-violet-600" onChange={()=>{handleChange(event)}} value={value}> 
                <option >select</option>
                {languagesData.data.languages.map((data)=>{
                return ( <option key={data.language} value={data.language}>{data.description}</option>)
                })}
            </select>
            <span className="ml-2">{value}</span> 
        </div>
    </>
)
}

export default Select;