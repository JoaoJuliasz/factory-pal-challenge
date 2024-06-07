import { Bar, BarProps, Cell } from 'recharts';

export const renderRestDataBar = (
    restData: IMetric[],
    valuesIdx: number,
    handleMouseEnter: BarProps['onMouseEnter'],
    handleMouseLeave: () => void
) => (
    <Bar dataKey="total" activeBar={false} yAxisId={0}
        background={{ fill: 'transparent' }} barSize={50} onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} fill={"#8884d8"}>
        {restData.map((_, index) => (
            <Cell key={`cell-${valuesIdx}-${index}`} data-testid={`cell-${valuesIdx}-${index}`} id={`cell-${valuesIdx}-${index}`} />
        ))}
    </Bar>
);

export const renderPercentageBar = (
    percentageData: IMetric[],
    valuesIdx: number,
    handleMouseEnter: BarProps['onMouseEnter'],
    handleMouseLeave: () => void
) => {
    if (percentageData.length > 0) {
        return (
            <Bar dataKey="pct" activeBar={false} yAxisId={1}
                background={{ fill: 'transparent' }} barSize={50} onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave} fill={"#82ca9d"}>
                {percentageData.map((_, index) => (
                    <Cell key={`cell-${valuesIdx}-${index}`} data-testid={`cell-${valuesIdx}-${index}`}
                        id={`cell-pct-${valuesIdx}-${index}`} />
                )
                )}
            </Bar>
        );
    }
};
