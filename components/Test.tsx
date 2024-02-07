import { TestContext } from "@/context/TestContext";
import axios from "@/lib/axios/axios";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const Test = () => {

    const router = useRouter()
    const pathname = usePathname()
    const { changeName } = useContext(TestContext)

    // const checkUserLoggedIn = async()=>{
    //     try {
    //         console.log(router,"router")
    //         console.log(pathname,"pathname")
    //         console.log(pathname?.toString()?.split("/")?.[2],"pathname2")
    //         const user = await axios.post("/api/me");
    //         console.log("dkjhgdsh",user)

    //         if(!!user){
    //             changeName(user.data.user.name)
    //         }

    //         if(!!user 
    //             && (
    //             pathname?.toString()?.split("/")?.[2] == "register"
    //             ||
    //             pathname?.toString()?.split("/")?.[2] == "login"
    //             ||
    //             pathname?.toString()?.split("/")?.[2] == "checkotp"
    //         )){
    //             changeName(user.data.user.name)
    //             router.push("/")
    //         }
    //         console.log("user =>",user)
    //     } catch (error) {
    //         console.log(error)
    //         if(
    //             pathname?.toString()?.split("/")?.[2] !== "register"
    //             &&
    //             pathname?.toString()?.split("/")?.[2] !== "login"
    //             &&
    //             pathname?.toString()?.split("/")?.[2] !== "checkotp"
    //             ){
    //                 router.push("/login")
    //         }
    //     }
    // }

    // useEffect(()=>{

    //    (async()=>await checkUserLoggedIn())()

    // },[router,pathname])

    return ( 
        <div>
            test
        </div>
     );
}
 
export default Test;