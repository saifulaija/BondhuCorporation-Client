interface IEmployee {
  id:string;
    email: string;
    name: string;
    dob: string; 
    gender: 'MALE' | 'FEMALE';
    maritalStatus: 'MARRIED' | 'UNMARRIED';
    profilePhoto: string;
    contactNumber: string;
    emergencyContactName: string | null;
    address: string;
    designation: 'HEAD_OF_SELLS' | 'SELLS_MANAGER' | 'STORE_MANAGER';
    experience: number;
    qualification: string;
    joining_date: string | null; 
    salary: number;
    resigning_date: string | null; 
    bankAccountNumber: string | null;
    bankName: string | null;
    isDeleted: boolean;
    userId: string;
   
  }