import { MonthlyEmissionDataType } from '@/components/dashboard/DashboardArea';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface Props {
  initData: MonthlyEmissionDataType;
}

export default function StackBarChart({ initData }: Props) {
  return (
    <BarChart
      style={{
        width: '100%',
        maxWidth: '700px',
        maxHeight: '70vh',
        aspectRatio: 1.618,
      }}
      responsive
      //data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' niceTicks='snap125' />
      <YAxis width='auto' niceTicks='snap125' />
      <Tooltip />
      <Legend />
      <Bar dataKey='pv' stackId='a' fill='#8884d8' background />
      <Bar dataKey='uv' stackId='a' fill='#82ca9d' background />
    </BarChart>
  );
}
