import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";


const useConvertRouter = ()=>{

    const pathname = usePathname();
    const router = useRouter();

    const handleConvertRoute = useCallback((goto:string)=>{
        if (!!pathname?.split("/")?.[1]) {
            return router.push(`/${pathname?.split("/")?.[1]}${goto}`);
        }
    },[])

    const handleReplaceRoute = useCallback((goto:string)=>{
        if (!!pathname?.split("/")?.[1]) {
            return router.replace(`/${pathname?.split("/")?.[1]}${goto}`);
        }
    },[])

    const handleConvertRoutePaginate = useCallback((goto:string)=>{
        if (!!pathname?.split("/")?.[1]) {
            return router.replace(`/${pathname?.split("/")?.[1]}${goto}`, { scroll : false });
        }
    },[])

    return{
        handleConvertRoute,
        handleConvertRoutePaginate,
        handleReplaceRoute
    }

}

export default useConvertRouter;