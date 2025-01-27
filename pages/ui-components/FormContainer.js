export default function FormContainer({children,onSubmit}){
    return(
        <div  className='bg w-full h-auto min-h-[100vh] flex items-center justify-center bg-[#F6F7FA] lg:p-[20px]'>
            <div className='flex relative flex-col items-center justify-start gap-[50px] w-[80%] lg:w-[40%] h-auto max-[456px]:w-full sm:w-[70%] md:w-[50%] max-[456px]:h-full bg-white rounded-[10px] max-[456px]:rounded-[0px] p-[20px] border-box'>
{children}
            </div>
        
        </div>
    )
}