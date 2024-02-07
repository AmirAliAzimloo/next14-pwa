import { UseFormSetValue } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";

interface FiledsProps{
    address:string;
    setValue:UseFormSetValue<any>;
    setShowMap:Dispatch<SetStateAction<boolean>>;
    btnTitle:string
}

const Fileds : React.FC<FiledsProps> = ({address,setValue,setShowMap,btnTitle}) => {
  return (
    <div
      style={{
        zIndex: "1000",
      }}
      className="     
      absolute
      bottom-14
      left-4
      right-4
      space-y-4
      "
    >
      <input
        value={address}
        type="text"
        className={`border-none
        outline-none
        form-input
        block
        w-full
        rounded-md
        border-0
        p-2
        text-gray-900
        shadow-sm
        ring-1
        ring-inset
        ring-gray-300
        placeholder:text-gray-400
        focus:ring-2
        focus:ring-inset
        focus:ring-teal-600
        sm:text-sm
        sm:leading-6`}
      />

      <button
      type="button"
      onClick={()=>{
        setValue("address",address);
        setShowMap(false);
      }}

      >
        {btnTitle}
      </button>
    </div>
  );
};

export default Fileds;
