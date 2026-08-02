export type ChildFocusQuestionMock = {
  id: string;
  question: string;
  options: string[];
};

export type ChildMock = {
  id: string;
  name: string;
  questions: ChildFocusQuestionMock[];
};

export type FamilyActivityMock = {
  id: string;
  title: string;
  time: string;
};

export type FamilyMock = {
  children: ChildMock[];
  upcomingActivities: FamilyActivityMock[];
  householdStatus: string;
};

export const familyMock: FamilyMock = {
  children: [
    {
      id: 'child-1',
      name: 'Leo',
      questions: [
        {
          id: 'q-1',
          question: 'Hur var lämningen idag?',
          options: ['Lugn', 'Stressig', 'Ledsen'],
        },
        {
          id: 'q-2',
          question: 'Vad är viktigast ikväll?',
          options: ['Låg affekt', 'Rutiner', 'Lek'],
        },
      ],
    },
  ],
  upcomingActivities: [
    { id: 'act-1', title: 'Hämta Leo', time: '15:30' },
    { id: 'act-2', title: 'Middag', time: '17:00' },
  ],
  householdStatus: 'Inga avvikelser i schemat.',
};
