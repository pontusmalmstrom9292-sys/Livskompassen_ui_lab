export type HomeStepMock = {
  id: string;
  label: string;
  time: string;
  done: boolean;
};

export type HomeMock = {
  userName: string;
  anchor: string;
  nextStep: string;
  capacity: number;
  steps: HomeStepMock[];
};

export const homeMock: HomeMock = {
  userName: 'vän',
  anchor: 'Ett mikrosteg räcker.',
  nextStep: 'Förbered dagens viktigaste sak',
  capacity: 7,
  steps: [
    { id: 'step-1', label: 'Förbered dagens viktigaste sak', time: '09:30', done: false },
    { id: 'step-2', label: 'Ta en kort paus', time: '11:30', done: false },
    { id: 'step-3', label: 'Rör på dig i 20 minuter', time: '18:00', done: false },
  ],
};
