import { faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons';

const datasource = [
  {
    title: "Income",
    icon: faArrowTrendUp,
    bgcolor: "#d4f8e8",
    data: [
      { id: '1', key: 1500, category: 'Salary' },
      { id: '2', key: 200, category: 'Allowance' },
    ],
  },
  {
    title: "Expenses",
    icon: faArrowTrendDown,
    bgcolor: "#f8d4d4",
    data: [
      { id: '3', key: 50, category: 'Lunch' },
      { id: '4', key: 30, category: 'Dinner' },
    ],
  },
];

export {datasource};
