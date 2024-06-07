
import { Dispatch, SetStateAction } from 'react';
import { BarChart, Tooltip, XAxis, YAxis, BarProps } from 'recharts';
import { useDataConversion } from '../../hook/useDataConversion/useDataConversion';
import { ChartResponseContainer, ChartTitle, ChartWrapper, Container, } from './MetricsChart.styles';
import { renderPercentageBar, renderRestDataBar } from './renderMethods';

type Props = {
    metrics: IMetric[]
    selectedType: string
    setSelectedMetricRow: Dispatch<SetStateAction<string>>
}

const MetricsChart = ({ metrics, selectedType, setSelectedMetricRow }: Props) => {

    const { splitDataIntoGroups, splitPercentageData, unitLabelConverter } = useDataConversion()

    const data = splitDataIntoGroups(metrics, selectedType)

    const handleMouseEnter: BarProps["onMouseEnter"] = (e) => {
        const row: string = e.payload.id
        setSelectedMetricRow(() => row)
    }

    const handleMouseLeave = () => setSelectedMetricRow(() => "")

    return (
        <Container>
            {
                data.map((values, valuesIdx) => {
                    const { percentageData, restData } = splitPercentageData(values)
                    return (
                        <ChartWrapper key={`chart-wrapper-${valuesIdx}`} $space={valuesIdx < data.length - 1}>
                            <ChartTitle>{values[0].category}</ChartTitle>
                            <ChartResponseContainer width="100%" height={150} $size={data.length}>
                                <BarChart data={[...restData, ...percentageData]}>
                                    <YAxis orientation='left' yAxisId={0} dataKey="total" style={{ fontSize: '14px' }} />
                                    {percentageData.length > 0 ?
                                        <YAxis orientation="right" yAxisId={1} domain={[0, 100]} dataKey="pct"
                                            tickFormatter={(value: number) => `${value}%`} style={{ fontSize: '14px' }} />
                                        : null}
                                    <Tooltip
                                        labelFormatter={(_, props) => props?.at(0)?.payload.label}
                                        formatter={(value, _, props) => [`${value} ${unitLabelConverter(props?.payload.type)}`]}
                                    />

                                    {data.length === 1 ? <XAxis dataKey="label" /> : null}
                                    {renderRestDataBar(restData, valuesIdx, handleMouseEnter, handleMouseLeave)}
                                    {renderPercentageBar(percentageData, valuesIdx, handleMouseEnter, handleMouseLeave)}
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