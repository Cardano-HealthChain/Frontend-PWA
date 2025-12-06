import axios, { AxiosInstance, AxiosError } from 'axios';

// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-apis-production-5e22.up.railway.app';

// Create Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // Increased to 30 seconds
});

// Request interceptor - Add JWT token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface SignupRequest {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface SignupResponse {
  user_email: string;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface PersonalDetailsRequest {
  firstname: string;
  lastname: string;
  dob: string;
  gender: string;
}

export interface HealthInfoRequest {
  blood_type: string;
  genotype: string;
  known_allergies: string;
  pre_existing_conditions: string;
}

export interface EmergencyContactRequest {
  name: string;
  phone_number: string;
  relationship: string;
}

export interface LocationRequest {
  country: string;
  state: string;
}

export interface MedicalRecord {
  record_id: string;
  record_type: string;
  record_data: string;
  patientName: string;
  hash_local: string;
  blockchainTransactionID: string;
  verified: boolean;
  uploaded_by: string;
  created_at: string;
}

export interface Permission {
  permissions_id: string;
  clinic_name: string;
  clinic_id: string;
  access_type: 'READ' | 'WRITE' | 'READANDWRITE';
  granted: boolean;
  revoked: boolean;
  granted_at: string;
  revoked_at: string | null;
}

export interface Notification {
  notification_id: string;
  title: string;
  message: string;
  notification_level: string;
  notification_type: string;
  sent_at: string;
}

export interface AuditLog {
  actor_type: string;
  actor_reference: string;
  action_performed: string;
  details: string;
}

export interface ProfileData {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  dob: string;
  gender: string;
  address: string;
  blood_type: string;
  genotype: string;
  known_allergies: string;
  pre_existing_conditions: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_rel: string;
  nationality: string;
  state_of_origin: string;
  created_at: string;
  verified: boolean;
  role: string;
}

export interface DashboardData {
  profile: ProfileData;
  records: MedicalRecord[];
  notifications: Notification[];
  permissions: Permission[];
  verifiedRecordsCount: number;
  clinicsVisitedCount: number;
}

// ============================================================================
// AUTHENTICATION ENDPOINTS
// ============================================================================

/**
 * Register a new user account
 */
export const signup = async (data: SignupRequest) => {
  return apiClient.post<SignupResponse>('/api/v1/resident/signup', data);
};

/**
 * Login user and get JWT token
 */
export const login = async (data: LoginRequest) => {
  return apiClient.post<string>('/auth/login', data);
};

// ============================================================================
// PROFILE ENDPOINTS
// ============================================================================

/**
 * Get user profile completion percentage
 */
export const getProfileCompletion = async () => {
  return apiClient.get<{ completion: number }>('/api/v1/resident/profile_completion');
};

/**
 * Get complete user profile data
 */
export const getProfileData = async () => {
  return apiClient.get<ProfileData>('/api/v1/resident/profile_data');
};

/**
 * Update personal details
 */
export const updatePersonalDetails = async (data: PersonalDetailsRequest) => {
  return apiClient.post('/api/v1/resident/profile/personal_details', data);
};

/**
 * Update health information
 */
export const updateHealthInfo = async (data: HealthInfoRequest) => {
  return apiClient.post('/api/v1/resident/profile/basic_health_information', data);
};

/**
 * Update emergency contact
 */
export const updateEmergencyContact = async (data: EmergencyContactRequest) => {
  return apiClient.post('/api/v1/resident/profile/emergency_contact', data);
};

/**
 * Update location
 */
export const updateLocation = async (data: LocationRequest) => {
  return apiClient.post('/api/v1/resident/profile/location', data);
};

// ============================================================================
// MEDICAL RECORDS ENDPOINTS
// ============================================================================

/**
 * Get all medical records (paginated)
 */
export const getMedicalRecords = async (page: number = 0) => {
  return apiClient.get<MedicalRecord[]>(`/api/v1/resident/records?page=${page}`);
};

/**
 * Get verified medical records only (paginated)
 */
export const getVerifiedRecords = async (page: number = 0) => {
  return apiClient.get<MedicalRecord[]>(`/api/v1/resident/verified_records?page=${page}`);
};

/**
 * Get single medical record by ID
 */
export const getMedicalRecord = async (recordId: string) => {
  return apiClient.get<MedicalRecord>(`/api/v1/resident/record?record_id=${recordId}`);
};

/**
 * Get filtered medical records by category
 */
export const getFilteredRecords = async (page: number = 0, category: string) => {
  return apiClient.get<MedicalRecord[]>(`/api/v1/resident/records/filtered?page=${page}&category=${category}`);
};

/**
 * Get filtered verified records by category
 */
export const getFilteredVerifiedRecords = async (page: number = 0, category: string) => {
  return apiClient.get<MedicalRecord[]>(`/api/v1/resident/verified_records/filtered?page=${page}&category=${category}`);
};

/**
 * Search medical records by keyword
 */
export const searchMedicalRecords = async (searchKeyword: string, page: number = 0) => {
  return apiClient.get<MedicalRecord[]>(`/api/v1/resident/records/search?search_keyword=${searchKeyword}&page=${page}`);
};

// ============================================================================
// PERMISSIONS ENDPOINTS
// ============================================================================

/**
 * Get clinic permissions (paginated)
 */
export const getPermissions = async (page: number = 0) => {
  return apiClient.get<Permission[]>(`/api/v1/resident/permissions?page=${page}`);
};

/**
 * Grant permission to a clinic
 */
export const grantPermission = async (clinicId: string, permissionAccess: 'READ' | 'WRITE' | 'READANDWRITE') => {
  return apiClient.post(`/api/v1/resident/permissions/grant?clinicId=${clinicId}&permissionAccess=${permissionAccess}`);
};

/**
 * Revoke permission from a clinic
 */
export const revokePermission = async (clinicId: string) => {
  return apiClient.post(`/api/v1/resident/permissions/revoke?clinicId=${clinicId}`);
};

// ============================================================================
// NOTIFICATIONS ENDPOINTS
// ============================================================================

/**
 * Get notifications (paginated)
 */
export const getNotifications = async (page: number = 0) => {
  return apiClient.get<Notification[]>(`/api/v1/resident/notifications?page=${page}`);
};

/**
 * Mark notification as read
 */
export const markNotificationAsRead = async (notificationId: string) => {
  return apiClient.post(`/api/v1/resident/notifications/read?notificationId=${notificationId}`);
};

// ============================================================================
// DASHBOARD/STATISTICS ENDPOINTS
// ============================================================================

/**
 * Get count of verified records
 */
export const getVerifiedRecordsCount = async () => {
  return apiClient.post<number>('/api/v1/resident/dashboard/records/verified_count');
};

/**
 * Get count of clinics visited
 */
export const getClinicsVisitedCount = async () => {
  return apiClient.get<number>('/api/v1/resident/clinics_visited');
};

// ============================================================================
// ACCOUNT MANAGEMENT ENDPOINTS
// ============================================================================

/**
 * Delete user account permanently
 */
export const deleteAccount = async () => {
  return apiClient.post('/api/v1/resident/delete');
};

// ============================================================================
// AUDIT ENDPOINTS
// ============================================================================

/**
 * Get audit logs (paginated)
 */
export const getAuditLogs = async (page: number = 0) => {
  return apiClient.get<AuditLog>(`/api/v1/resident/audit?page=${page}`);
};

// ============================================================================
// DASHBOARD - FETCH ALL DATA AT ONCE
// ============================================================================

/**
 * Fetch all dashboard data at once using Promise.all
 * This is more efficient than making multiple separate requests
 */
export const loadDashboard = async (): Promise<DashboardData> => {
  const [
    profileRes,
    recordsRes,
    notificationsRes,
    permissionsRes,
    verifiedCountRes,
    clinicsCountRes,
  ] = await Promise.all([
    getProfileData(),
    getMedicalRecords(0),
    getNotifications(0),
    getPermissions(0),
    getVerifiedRecordsCount(),
    getClinicsVisitedCount(),
  ]);

  return {
    profile: profileRes.data,
    records: recordsRes.data,
    notifications: notificationsRes.data,
    permissions: permissionsRes.data,
    verifiedRecordsCount: verifiedCountRes.data,
    clinicsVisitedCount: clinicsCountRes.data,
  };
};

/**
 * Fetch dashboard data with error handling
 * Returns partial data if some requests fail
 */
export const loadDashboardSafe = async (): Promise<Partial<DashboardData>> => {
  try {
    const results = await Promise.allSettled([
      getProfileData(),
      getMedicalRecords(0),
      getNotifications(0),
      getPermissions(0),
      getVerifiedRecordsCount(),
      getClinicsVisitedCount(),
    ]);

    const dashboardData: Partial<DashboardData> = {};

    if (results[0].status === 'fulfilled') {
      dashboardData.profile = results[0].value.data;
    }
    if (results[1].status === 'fulfilled') {
      dashboardData.records = results[1].value.data;
    }
    if (results[2].status === 'fulfilled') {
      dashboardData.notifications = results[2].value.data;
    }
    if (results[3].status === 'fulfilled') {
      dashboardData.permissions = results[3].value.data;
    }
    if (results[4].status === 'fulfilled') {
      dashboardData.verifiedRecordsCount = results[4].value.data;
    }
    if (results[5].status === 'fulfilled') {
      dashboardData.clinicsVisitedCount = results[5].value.data;
    }

    return dashboardData;
  } catch (error) {
    console.error('Error loading dashboard:', error);
    throw error;
  }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Store auth token
 */
export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
};

/**
 * Get auth token
 */
export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

/**
 * Remove auth token
 */
export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
};

/**
 * Logout user
 */
export const logout = () => {
  removeAuthToken();
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};

export default apiClient;