import { GHG_UNIT, SCOPE_COLORS } from '@/constants/emissions';
import { ScopeEmissionsDataType, YearlyEmissionDataType } from '@/types';
import { ValueOf } from 'next/dist/shared/lib/constants';
import { Label, Pie, PieChart, Tooltip, TooltipContentProps } from 'recharts';

interface Props {
  yearlyEmissions: YearlyEmissionDataType;
}

const CustomTooltip = ({ active, payload }: TooltipContentProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload as ValueOf<ScopeEmissionsDataType> & {
    fill: string;
  };

  return (
    <div className='rounded-xl border bg-white p-2 text-sm'>
      {!!data && (
        <>
          <div className='flex items-center gap-1'>
            <span
              className='block h-2 w-2 rounded-full'
              style={{
                backgroundColor: data.fill,
              }}
            />
            <strong className='font-medium'>
              탄소 배출량 - {`scope${data.scope}`}
            </strong>
          </div>
          <p>
            {Math.round(data.value * 100) / 100} {GHG_UNIT}/{data.unit}
          </p>
        </>
      )}
    </div>
  );
};

export default function YearlyPieChart({ yearlyEmissions }: Props) {
  const scopeData = Object.values(yearlyEmissions.scopeData || {})
    .sort((a, b) => Number(a.scope) - Number(b.scope))
    .map((data) => ({ ...data, fill: SCOPE_COLORS[data.scope] }));

  return (
    <PieChart className='aspect-1 h-full max-h-[80vh] w-full' responsive>
      <Pie
        data={scopeData}
        dataKey='value'
        cx='50%'
        cy='50%'
        innerRadius='60%'
        outerRadius='80%'
        isAnimationActive={true}
        nameKey='scope'
      />

      <Label
        content={({ viewBox }) => {
          if (!viewBox || !('width' in viewBox)) return null;

          const { width, height } = viewBox;

          return (
            <text
              x={width / 2}
              y={height / 2}
              textAnchor='middle'
              dominantBaseline='middle'
            >
              <tspan
                x={width / 2}
                dy='-1.2em'
                className='text-sm font-medium lg:text-lg'
              >
                {yearlyEmissions.year}년
              </tspan>
              <tspan x={width / 2} dy='1.5em'>
                누적 탄소 배출량
              </tspan>
              <tspan
                x={width / 2}
                dy='1.5em'
                className='text-base font-bold lg:text-xl'
              >
                {Math.round(yearlyEmissions.total * 100) / 100} {GHG_UNIT}
              </tspan>
            </text>
          );
        }}
        position='center'
      />

      <Tooltip content={CustomTooltip} />
    </PieChart>
  );
}
