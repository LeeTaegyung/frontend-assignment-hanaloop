import { GHG_UNIT, SCOPE_COLORS } from '@/constants/emissions';
import { MonthlyEmissionDataType, ScopeEmissionsDataType } from '@/types';
import { ValueOf } from 'next/dist/shared/lib/constants';
import {
  Bar,
  BarChart,
  CartesianGrid,
  DefaultLegendContentProps,
  Legend,
  Tooltip,
  TooltipContentProps,
  XAxis,
  YAxis,
} from 'recharts';

interface Props {
  initData: MonthlyEmissionDataType;
}

const CustomTooltip = ({ active, payload }: TooltipContentProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload as ValueOf<MonthlyEmissionDataType>;

  return (
    <div className='rounded-xl border bg-white p-2 text-sm'>
      {!!data && (
        <>
          <strong>{`${data.month}월`}</strong>
          {data.scopeData !== null &&
            Object.values(data.scopeData)
              .sort((a, b) => Number(a!.scope) - Number(b!.scope))
              .map((scopeData, i) => {
                return (
                  <p
                    key={scopeData?.scope}
                    className='flex items-center gap-1 text-sm'
                    style={{
                      color: payload[i].color,
                    }}
                  >
                    <span
                      className='mt-1 block h-2 w-2 rounded-full'
                      style={{
                        backgroundColor: payload[i].color,
                      }}
                    />
                    {`scope${scopeData?.scope} : ${scopeData !== null ? scopeData.value.toLocaleString() : 0} ${GHG_UNIT}/${scopeData.unit}`}
                  </p>
                );
              })}
          <p className='text-primary mt-1 text-sm font-medium'>{`total: ${data.total.toLocaleString()} ${GHG_UNIT}`}</p>
        </>
      )}
    </div>
  );
};

const RenderCustomLegend = (props: DefaultLegendContentProps) => {
  const { payload } = props;
  if (!payload) return null;

  return (
    <ul className='mt-2 flex items-center justify-center gap-2'>
      {payload.map((entry, index) => (
        <li
          key={`item-${index}`}
          style={{ color: entry.color, display: 'flex', alignItems: 'center' }}
        >
          <span
            style={{
              width: '10px',
              height: '10px',
              backgroundColor: entry.color,
              marginRight: '5px',
              borderRadius: '50%',
            }}
          />
          {entry.value ? String(entry.value).split('.')[1] : ''}
        </li>
      ))}
    </ul>
  );
};

export default function MonthlyStackBarChart({ initData }: Props) {
  const data = Object.values(initData).sort(
    (a, b) => Number(a.month) - Number(b.month)
  );

  return (
    <BarChart
      style={{
        width: '100%',
        maxHeight: '70vh',
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{
        top: 50,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis
        dataKey='month'
        niceTicks='snap125'
        tickFormatter={(tickItem) => `${tickItem}월`}
      />
      <YAxis
        width='auto'
        niceTicks='snap125'
        tickFormatter={(tickItem) => tickItem.toLocaleString()}
        label={{
          value: GHG_UNIT,
          offset: 30,
          angle: 0,
          position: 'top',
          fontWeight: 700,
        }}
      />
      <Tooltip content={CustomTooltip} />
      <Legend content={RenderCustomLegend} />
      <Bar
        dataKey='scopeData.scope1.value'
        stackId='a'
        fill={SCOPE_COLORS['1']}
        background
      />
      <Bar
        dataKey='scopeData.scope2.value'
        stackId='a'
        fill={SCOPE_COLORS['2']}
        background
      />
      <Bar
        dataKey='scopeData.scope3.value'
        stackId='a'
        fill={SCOPE_COLORS['3']}
        background
      />
    </BarChart>
  );
}
