import { Status } from '@astrouxds/mock-data';

export interface Equipment {
  name: string;
  description: string;
  online: boolean;
  considered: boolean;
  id: string;
  status: Status;
  category: string;
  config: string;
  scheduledJobs: {
    id: number;
    type: string;
    description: string;
    startsAt: number;
    endsAt: number;
    technician: string;
    follow: boolean;
    status: Status;
    createdOn: number;
    equipmentId: string;
  }[];
}

export type Job = {
  id: number;
  type: string;
  description: string;
  startsAt: string;
  stopsAt: string;
  technician: string;
  status: Status;
  createdOn: string;
  equipmentId: string;
};
