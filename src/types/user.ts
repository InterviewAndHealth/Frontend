export type registerData = {
  email: string;
  password: string;
};

export type googleLoginData = {
  code: string;
};

export type studentProfileData = {
  firstName: string;
  lastName: string;
  contactNumber: string;
  gender: string;
  city: string;
  country: string;
  skills: string[];
  preparingFor: string;
  workMode: string;
  preferredCity: string;
};

export type updateStudentProfileData = {
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  gender?: string;
  city?: string;
  country?: string;
  skills?: string[];
  preparingFor?: string;
  workMode?: string;
  preferredCity?: string;
  resumelink?: string;
};
