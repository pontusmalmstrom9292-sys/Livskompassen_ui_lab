export type PlanningColumnMock = {
  id: string;
  title: string;
  items: string[];
};

export type PlanningMock = {
  nextStep: string;
  guidance: string;
  inboxCount: number;
  columns: PlanningColumnMock[];
};

export const planningMock: PlanningMock = {
  nextStep: 'Förbered nästa avstämning',
  guidance: 'Ett steg i taget. Resten kan vänta.',
  inboxCount: 4,
  columns: [
    {
      id: 'todo',
      title: 'Att göra',
      items: ['Samla anteckningar', 'Välj ett första steg', 'Boka fokustid'],
    },
    {
      id: 'waiting',
      title: 'Väntar',
      items: ['Svar på förfrågan', 'Bekräftelse av tid'],
    },
    {
      id: 'done',
      title: 'Klart',
      items: ['Morgonens check-in', 'Sortera inkorgen'],
    },
  ],
};
