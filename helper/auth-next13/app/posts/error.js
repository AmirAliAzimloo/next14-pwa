'use client';
 
import { useEffect } from 'react';
import { toast } from 'react-toastify';
 
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    toast.error('error')
  }, [error]);
 
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}