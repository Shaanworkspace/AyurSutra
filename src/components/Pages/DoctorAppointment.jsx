import { useNavigate } from "react-router-dom";
import React from 'react'

function DoctorAppointment() {
    const navigate = useNavigate();
    return (
        <div>DoctorAppointment
            <h1>ye vo page h jisme ab patient doc ko apni symptom report bhejega
                aur fir doc usse apna prescription dega ki konsi therapy lo</h1>
            <button 
              onClick={() => {
                navigate("/nasya" )}              }
              className="w-full mt-3 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg">
                book therapist
              </button>
              
        </div>

    )
}

export default DoctorAppointment