type Props = {
    children: React.ReactNode
}

const LessonLayout = ({children}:Props) => {
    return ( 
        <div className=" flex flex-col justify-center items-center h-full w-full">
            <div className=" flex flex-col h-full lg:w-4/5 w-full">

            {children}
            </div>
        </div>
     );
}
 
export default LessonLayout;