const RoundedBtn = ({children, color, clickedEvent}) => {
    const handleClick = () => {
        clickedEvent();
    }
return(
    <>
        <button onClick={handleClick} className={`shadow-md w-12 h-12 flex justify-center items-center rounded-full ${color} mx-2`}>
            {children}
        </button>
    </>
    )
}
export default RoundedBtn;