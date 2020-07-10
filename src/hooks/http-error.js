import {useEffect,useState} from 'react'
export default httpClient =>{
        
    const [error,setError] = useState(null)
    const reqInterpector = httpClient.interceptors.request.use(req=>{
        setError(null)
        return req
    },error=>{
    })
    const resInterpector = httpClient.interceptors.response.use(res => res,error=>{
        setError(error)
    })
    useEffect(()=>{
        httpClient.interceptors.request.eject(reqInterpector)
        httpClient.interceptors.response.eject(resInterpector)
    },[reqInterpector,resInterpector])
        
    
    const errorConfirmedHandler = () =>{
        setError(null)

    }
    return [error,errorConfirmedHandler]

}