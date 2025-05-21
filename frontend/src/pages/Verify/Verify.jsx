
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { backendUrl } from "../../config/config";

export default function Verify(){
    const[searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const navigate = useNavigate();

    const verifyPayment = async () =>{
        const res = await axios.post(`${backendUrl}/order/verify`, {success, orderId}, { withCredentials: true });
        if(res.data.success){
            navigate("/myorders");
        }else{
            navigate("/");
        }
    }

    useEffect(()=>{
        verifyPayment();
    }, []);

    return(
        <Spinner />
    )
}

