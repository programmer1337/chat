export function doTimeout(setError){
    setTimeout(()=>{
        setError("")
    }, 1500)
}