
import { Dispatch, SetStateAction } from 'react';
import { BarChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useDataConversion } from '../../hook/useDataConversion/useDataConversion';
import { ChartResponseContainer, ChartTitle, ChartWrapper, Container } from './MetricsChart.styles';
import { renderPercentageBar, renderRestDataBar } from './renderMethods';

type Props = {
    metrics: IMetric[]
    selectedType: string
    setSelectedMetricRow: Dispatch<SetStateAction<string>>
}

const MetricsChart = ({ metrics, selectedType, setSelectedMetricRow }: Props) => {

    const { splitDataIntoGroups, splitPercentageData } = useDataConversion()

    const data = splitDataIntoGroups(metrics, selectedType)

    const handleMouseOver = (e: any) => {
        const row: string = e.id
        setSelectedMetricRow(() => row)
    }

    const handleMouseLeave = () => setSelectedMetricRow(() => "")

    return (
        <Container>
            {
                data.map((values, valuesIdx) => {
                    const { percentageData, restData } = splitPercentageData(values)
                    console.warn({percentageData, restData})
                    return (
                        <ChartWrapper key={`chart-wrapper-${valuesIdx}`}>
                            <ChartTitle>{values[0].category}</ChartTitle>
                            <ChartResponseContainer width="100%" height={150} $size={data.length}>
                                <BarChart data={[...restData, ...percentageData]}>
                                    <YAxis orientation='left' yAxisId={0} dataKey="total" />
                                    {percentageData.length > 0 ? <YAxis orientation="right" yAxisId={1} domain={[0, 100]} dataKey="pct" tickFormatter={(value: number) => `${value}%`} />
                                        : null}
                                    <Tooltip label="label" />
                                    {data.length === 1 ? <XAxis dataKey="label" /> : null}
                                    {renderRestDataBar(restData, valuesIdx, handleMouseOver, handleMouseLeave)}
                                    {renderPercentageBar(percentageData, valuesIdx, handleMouseOver, handleMouseLeave)}
                                </BarChart>
                            </ChartResponseContainer>
                        </ChartWrapper>
                    )
                }
                )
            }
        </Container >
    );
};

export default MetricsChart;