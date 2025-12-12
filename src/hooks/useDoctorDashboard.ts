import { useState, useEffect } from "react";
import {
  FileText,
  AlertCircle,
  Stethoscope,
} from "lucide-react";

export interface DoctorDashboardData {
  doctor: {
    name: string;
    specialty: string;
    clinic_name: string;
    email: string;
    verified: boolean;
  };
  stats: {
    totalPatients: number;
    activePatients: number;
    appointmentsToday: number;
    recordsCreated: number;
    criticalCases: number;
    completedToday: number;
  };
  patients?: any[];
  appointments?: any[];
  activities?: any[];
}

export function useDoctorDashboard(autoFetch = true) {
  const [data, setData] = useState<DoctorDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<Error | null>(null); // No error since we use mock data

  // ------------ MOCK DATA ------------
  const mockData: DoctorDashboardData = {
    doctor: {
      name: "John Doe",
      specialty: "Cardiology",
      clinic_name: "HealthChain Clinic",
      email: "dr.johndoe@clinic.com",
      verified: true,
    },

    stats: {
      totalPatients: 230,
      activePatients: 152,
      appointmentsToday: 12,
      recordsCreated: 58,
      criticalCases: 4,
      completedToday: 7,
    },

    patients: [
      {
        name: "Sarah Adams",
        condition: "Hypertension",
        lastVisit: "2 days ago",
        status: "Stable",
      },
      {
        name: "Michael Brown",
        condition: "Arrhythmia",
        lastVisit: "1 week ago",
        status: "Critical",
      },
      {
        name: "Emily Johnson",
        condition: "High Cholesterol",
        lastVisit: "5 days ago",
        status: "Stable",
      },
      {
        name: "Daniel Green",
        condition: "Heart Palpitations",
        lastVisit: "3 weeks ago",
        status: "Under Review",
      },
      {
        name: "Chinedu Okafor",
        condition: "Hypertension",
        lastVisit: "Today",
        status: "Stable",
      },
    ],

    appointments: [
      {
        patientName: "Sarah Adams",
        type: "Routine Checkup",
        time: "09:00 AM",
      },
      {
        patientName: "Michael Brown",
        type: "Follow-up",
        time: "10:30 AM",
      },
      {
        patientName: "Emily Johnson",
        type: "Consultation",
        time: "1:00 PM",
      },
      {
        patientName: "Daniel Green",
        type: "Examination",
        time: "3:15 PM",
      },
    ],

    activities: [
      {
        title: "New patient record added",
        description: "You added a new patient: Sarah Adams",
        timestamp: "20 mins ago",
        icon: FileText,
        bgColor: "bg-blue-50",
        color: "text-blue-500",
      },
      {
        title: "Critical case flagged",
        description: "Patient Michael Brown marked as critical",
        timestamp: "1 hour ago",
        icon: AlertCircle,
        bgColor: "bg-red-50",
        color: "text-red-500",
      },
      {
        title: "Appointment completed",
        description: "Finished consultation with Emily Johnson",
        timestamp: "3 hours ago",
        icon: Stethoscope,
        bgColor: "bg-green-50",
        color: "text-green-600",
      },
    ],
  };
  // -----------------------------------

  const fetchDashboard = async () => {
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      setData(mockData);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchDashboard();
    }
  }, [autoFetch]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchDashboard,
  };
}

export default {
  useDoctorDashboard,
};




// // hooks/useDoctorDashboard.ts
// import { useState, useEffect } from 'react';
// import  apiClient  from '@/lib/api';


// export interface DoctorDashboardData {
//   doctor: {
//     name: string;
//     specialty: string;
//     clinic_name: string;
//     email: string;
//     verified: boolean;
//   };
//   stats: {
//     totalPatients: number;
//     activePatients: number;
//     appointmentsToday: number;
//     recordsCreated: number;
//     criticalCases: number;
//     completedToday: number;
//   };
//   patients?: any[];
//   appointments?: any[];
//   activities?: any[];
// }

// export function useDoctorDashboard(autoFetch = true) {
//   const [data, setData] = useState<DoctorDashboardData | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   const fetchDashboard = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       // Fetch doctor profile
//       const doctorResponse = await apiClient.get('/api/doctor/profile');
      
//       // Fetch dashboard stats
//       const statsResponse = await apiClient.get('/api/doctor/dashboard/stats');
      
//       // Fetch patients list
//       const patientsResponse = await apiClient.get('/api/doctor/patients?limit=10');
      
//       // Fetch today's appointments
//       const appointmentsResponse = await apiClient.get('/api/doctor/appointments/today');
      
//       // Fetch recent activities
//       const activitiesResponse = await apiClient.get('/api/doctor/activities?limit=10');

//       setData({
//         doctor: doctorResponse.data,
//         stats: statsResponse.data,
//         patients: patientsResponse.data,
//         appointments: appointmentsResponse.data,
//         activities: activitiesResponse.data,
//       });
//     } catch (err) {
//       console.error('Failed to fetch doctor dashboard:', err);
//       setError(err instanceof Error ? err : new Error('Failed to fetch dashboard data'));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (autoFetch) {
//       fetchDashboard();
//     }
//   }, [autoFetch]);

//   return {
//     data,
//     isLoading,
//     error,
//     refetch: fetchDashboard,
//   };
// }

// export default {
//   useDoctorDashboard,
// };