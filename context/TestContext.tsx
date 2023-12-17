"use client";

import { createContext, useState } from "react";

interface TestContextProps {
    user:string;
    changeName:(name:string)=>void;
}

export const TestContext = createContext<TestContextProps | null>(null);

export const TestProvider = (
    {children} : {children : React.ReactNode}
) =>{

    const [ name , setName ] = useState("")

    const user = name;

    const changeName = (name:string)=>{
        setName(name)
    }
    

    return(
        <TestContext.Provider value={{user , changeName}}>
            {children}
        </TestContext.Provider>
    )
}