import { Status } from '@astrouxds/mock-data';

export interface Equipment {
  equipmentString: string;
  description: string;
  online: boolean;
  considered: boolean;
  id: string;
  status: Status;
  category: string;
  config: string;
  scehduledJobs: {
    jobId: number;
    jobType: string;
    description: string;
    startTime: string;
    stopTime: string;
    technician: string;
    follow: boolean;
    status: Status;
    createdOn: string;
    equipment: string;
  }[];
}

export interface Job {
  jobId: number;
  jobType: string;
  description: string;
  startTime: string;
  stopTime: string;
  technician: string;
  follow: boolean;
  status: Status;
  createdOn: string;
  equipment: string;
}
