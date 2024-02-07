
import toast from "react-hot-toast";

const handleErrors = (err: any) => {

 
    if (err.response) {
      if (err.response.status == 422 || err.response.status == 400) {
        Object.keys(err.response.data.errors).map((key: string) => {
          err.response.data.errors[key].map((e: string) => {
            toast.error(e);
          }); 
        });
      } else if (err.response.status == 403) {
        toast.error("شما به این قسمت دسترسی ندارید");
      } else if (err.response.status >= 500) { 
        toast.error("خطای سرویس");
      }
    } else if (err.request) {
      toast.error(err?.message);
      console.log(err.request);
    } else {
      console.log(err);
      console.log(err?.message);
    }
  
};

export default handleErrors;
