import React, { useEffect } from 'react'
import { logEventFirebase } from '../../service/firebase';

const Analytic = () => {

  useEffect(() => {
    window.addEventListener('beforeunload', logEventFirebase);
    return () => {
      window.removeEventListener('beforeunload', logEventFirebase)
    }
  }, []);
  
  return (
    <div>
      log event firebase
    </div>
  )
}

export default Analytic;
