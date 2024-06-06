
import { Dispatch, SetStateAction } from 'react';
import { Bar, BarChart, Tooltip, XAxis, YAxis, Cell } from 'recharts';
import { useDataConvertion } from '../../hook/useDataConvertion/useDataConvertion';
import { ChartResponseContainer, ChartTitle, ChartWrapper, Container } from './MetricsChart.styles';

type Props = {
    metrics: IMetric[]
    selectedType: string
    setSelectedMetricRow: Dispatch<SetStateAction<string>>
}

const MetricsChart = ({ metrics, selectedType, setSelectedMetricRow }: Props) => {

    const { splitDataIntoGroups } = useDataConvertion()

    const data = splitDataIntoGroups(metrics, selectedType)

    const handleMouseOver = (e: any) => {
        const row: string = e.target.id
        setSelectedMetricRow(() => row)
    }

    return (
        <Container>
            {
                data.map((values) =>
                    <ChartWrapper>
                        <ChartTitle>{values[0].category}</ChartTitle>
                        <ChartResponseContainer width="100%" height={200} $size={data.length}>
                            <BarChart data={values}>
                                <YAxis />
                                <Tooltip label="label" />
                                {data.length === 1 ? <XAxis dataKey="label" /> : null}
                                <Bar dataKey="value" activeBar={false}
                                    unit={values[0].type === 'secs' ? " (s)" : ""}
                                    background={{ fill: '#fff' }} barSize={50}
                                >
                                    {values.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill="#8884d8" data-testid={`cell-${index}`} 
                                            onMouseEnter={handleMouseOver}
                                            onMouseLeave={() => setSelectedMetricRow(() => "")} />
                                    ))
                                    }
                                </Bar>
                            </BarChart>
                        </ChartResponseContainer>
                    </ChartWrapper>
                )
            }
        </Container>
    );
};

export default MetricsChart;