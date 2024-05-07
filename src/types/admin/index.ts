import { MaritalStatus } from '@/types';
export interface IAdmin {
    id: string;
    name: string;
    email:string;
    profilePhoto: string;
    contactNumber: string;
    address: string;
   
    
    gender: "MALE" | "FEMALE";
    MaritalStatus:"MARRIED"| "UNMARRIED";
  
    qualification: string;
  
   
   
  }
  
  export interface ISpecialties {
    specialtiesId: string;
    isDeleted?: null;
  }
  
  export interface IAdminFormData {
    doctor: IAdmin;
    password: string;
  }