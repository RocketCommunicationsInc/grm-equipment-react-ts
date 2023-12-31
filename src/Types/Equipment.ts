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
  scheduledJobs: {
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

export type Job = {
  jobId: string;
  jobType: string;
  createdOn: string;
  startTime: string;
  stopTime: string;
  technician: string;
  jobDescription: string;
  equipment: string;
  equipmentStatus: string;
  jobStatus: string;
};
