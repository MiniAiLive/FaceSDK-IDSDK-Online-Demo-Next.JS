import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const ID_BASE_URL = process.env.NEXT_PUBLIC_API_ID_SDK_URL;
export const FACE_BASE_URL = process.env.NEXT_PUBLIC_API_FACE_SDK_URL;
export const FACE_LIVE_BASE_URL = process.env.NEXT_PUBLIC_API_FACE_LIVE_SDK_URL;
export const ID_LIVE_BASE_URL = process.env.NEXT_PUBLIC_API_ID_LIVE_SDK_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DATABASE_NAME = "faceAppDb";
export const STORE_NAME = "kycSelfieData";

export const storageKeys = {
  formData: "kycFormData",
  licenseData: "kycLicenseData",
  faceMatchingData: "kycFaceMatchingData",
  passportData: "kycPassportData",
  livenessData: "kycSelfieData",
};

// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";

// // API URLs with type safety
// const getEnvVar = (key: string): string => {
//   const value = process.env[key];
//   if (!value) {
//     throw new Error(`Missing environment variable: ${key}`);
//   }
//   return value;
// };

// // Group related API URLs
// export const API_URLS = {
//   ID: getEnvVar('NEXT_PUBLIC_API_ID_SDK_URL'),
//   FACE: getEnvVar('NEXT_PUBLIC_API_FACE_SDK_URL'),
//   FACE_LIVE: getEnvVar('NEXT_PUBLIC_API_FACE_LIVE_SDK_URL'),
//   ID_LIVE: getEnvVar('NEXT_PUBLIC_API_ID_LIVE_SDK_URL'),
// } as const;

// // Utility function for class names
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// // Database constants
// export const DATABASE_CONFIG = {
//   NAME: "faceAppDb",
//   STORE: "kycSelfieData",
// } as const;

// // Storage keys as const enum for better performance
// export const enum StorageKeys {
//   FormData = "kycFormData",
//   LicenseData = "kycLicenseData",
//   FaceMatchingData = "kycFaceMatchingData",
//   PassportData = "kycPassportData",
//   LivenessData = "kycSelfieData",
// }
