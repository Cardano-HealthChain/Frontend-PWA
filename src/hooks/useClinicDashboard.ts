import { useState, useEffect } from "react";

// Same interface you already use
export interface ClinicDashboardData {
  clinic: {
    name: string;
    location: string;
    verified: boolean;
  };
  stats: {
    totalDoctors: number;
    activeDoctors: number;
    totalPatients: number;
    newPatientsThisMonth: number;
    totalAppointments: number;
    appointmentsToday: number;
    totalRecords: number;
    recordsThisMonth: number;
    criticalAlerts: number;
  };
  doctors?: any[];
  activities?: any[];
}

export function useClinicDashboard(autoFetch = true) {
  const [data, setData] = useState<ClinicDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<Error | null>(null); // error removed because mock data never fails

  // Mock data for temporary frontend preview
  const mockData: ClinicDashboardData = {
    clinic: {
      name: "HealthChain Clinic",
      location: "Lagos, Nigeria",
      verified: true,
    },
    stats: {
      totalDoctors: 15,
      activeDoctors: 12,
      totalPatients: 305,
      newPatientsThisMonth: 47,
      totalAppointments: 1247,
      appointmentsToday: 52,
      totalRecords: 1856,
      recordsThisMonth: 234,
      criticalAlerts: 3,
    },
    doctors: [
      {
        name: "Sarah Johnson",
        specialty: "Cardiology",
        status: "Active",
        patientCount: 45,
        appointmentsToday: 8,
        satisfaction: 95
      },
      {
        name: "Michael Chen",
        specialty: "Pediatrics",
        status: "Active",
        patientCount: 62,
        appointmentsToday: 12,
        satisfaction: 98
      },
      {
        name: "Emily Rodriguez",
        specialty: "Dermatology",
        status: "Active",
        patientCount: 38,
        appointmentsToday: 6,
        satisfaction: 92
      },
      {
        name: "James Wilson",
        specialty: "Orthopedics",
        status: "Active",
        patientCount: 51,
        appointmentsToday: 9,
        satisfaction: 96
      },
      {
        name: "Lisa Anderson",
        specialty: "Internal Medicine",
        status: "Active",
        patientCount: 73,
        appointmentsToday: 15,
        satisfaction: 94
      },
      {
        name: "David Martinez",
        specialty: "Neurology",
        status: "Inactive",
        patientCount: 29,
        appointmentsToday: 0,
        satisfaction: 91
      }
    ],
    activities: [
      {
        icon: "UserPlus",
        title: "New doctor added",
        description: "Dr. David Martinez joined as Neurologist",
        timestamp: "10 minutes ago",
        bgColor: "bg-blue-50",
        color: "text-blue-500"
      },
      {
        icon: "FileText",
        title: "Bulk records uploaded",
        description: "127 patient records imported successfully",
        timestamp: "1 hour ago",
        bgColor: "bg-green-50",
        color: "text-green-500"
      }
    ]
  };

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
  useClinicDashboard,
};


// import { useState, useEffect } from 'react';
// import apiClient  from '@/lib/api';


// // hooks/useClinicDashboard.ts
// export interface ClinicDashboardData {
//   clinic: {
//     name: string;
//     location: string;
//     verified: boolean;
//   };
//   stats: {
//     totalDoctors: number;
//     activeDoctors: number;
//     totalPatients: number;
//     newPatientsThisMonth: number;
//     totalAppointments: number;
//     appointmentsToday: number;
//     totalRecords: number;
//     recordsThisMonth: number;
//     criticalAlerts: number;
//   };
//   doctors?: any[];
//   activities?: any[];
// }

// export function useClinicDashboard(autoFetch = true) {
//   const [data, setData] = useState<ClinicDashboardData | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   const fetchDashboard = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       // Fetch clinic profile
//       const clinicResponse = await apiClient.get('/api/clinic/profile');
      
//       // Fetch dashboard stats
//       const statsResponse = await apiClient.get('/api/clinic/dashboard/stats');
      
//       // Fetch doctors list
//       const doctorsResponse = await apiClient.get('/api/clinic/doctors?limit=20');
      
//       // Fetch recent activities
//       const activitiesResponse = await apiClient.get('/api/clinic/activities?limit=15');

//       setData({
//         clinic: clinicResponse.data,
//         stats: statsResponse.data,
//         doctors: doctorsResponse.data,
//         activities: activitiesResponse.data,
//       });
//     } catch (err) {
//       console.error('Failed to fetch clinic dashboard:', err);
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

// // Export both hooks from a single file
// export default {
//   useClinicDashboard,
// };