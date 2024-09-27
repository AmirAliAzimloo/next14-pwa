'use client';

// import toast from "react-hot-toast";

const handleErrors = (err: any) => {

    if (err.response) {
      if (err.response.status == 422 || err.response.status == 400) {
          // toast.error(err?.response?.data?.message);
          alert(err?.response?.data?.message);
      } else if (err.response.status == 403 || err.response.status == 401) {
        // toast.error("ne access");
        alert("ne access");
      } else if (err.response.status >= 500) { 
        // toast.error("network error");
        alert("network error");
      }
    } else if (err.request) {
      // toast.error(err?.message);
      console.log(err.request);
      alert(err?.message);
    } else {
      console.log(err);
      console.log(err?.message);
      alert(err?.message);
    }
  
};

export default handleErrors;
