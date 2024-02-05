import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../../context/GlobalContext";

export default function GuestLayout() {
    const {token} = useStateContext()

    if (token) {
        return <Navigate to='/'/>
    }

    return (
        <div>
            <Outlet/>
        </div>
    )
}