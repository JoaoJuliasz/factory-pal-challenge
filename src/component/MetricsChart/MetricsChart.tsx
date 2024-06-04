
import { Dispatch, SetStateAction } from 'react';
import { Bar, BarChart, Tooltip, ResponsiveContainer, XAxis, YAxis, Cell } from 'recharts';
import { ChartResponseContainer, ChartTitle, ChartWrapper, Container } from './MetricsChart.styles';

type Props = {
    metrics: IMetric[]
    selectedType: string
    setSelectedMetricRow: Dispatch<SetStateAction<string>>
}

const MetricsChart = ({ metrics, selectedType, setSelectedMetricRow }: Props) => {
    const splitDataIntoGroups = () => {
        const updtMetrics = convertHourIntoSeconds()
        if (selectedType === 'all') {
            const newData: { [key: string]: IMetric[] } = {}
            updtMetrics.forEach(item => {
                newData[item.category] = newData[item.category] ?
                    [...newData[item.category], item] : [item]
            })
            return Object.values(newData)
        }
        return [updtMetrics]
    }

    const convertHourIntoSeconds = () => metrics.map((item) => {
        //TODO: check this validation, because the convertion should happen both ways
        if (item.type === 'hours') {
            return { ...item, value: item.value * 3600, type: 'secs' }
        }
        return item
    })

    const data = splitDataIntoGroups()

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
                        <ChartResponseContainer width="100%" height={300} >
                            <BarChart data={values}>
                                <YAxis />
                                <Tooltip label="label"/>
                                {data.length === 1 ? <XAxis dataKey="label" /> : null}
                                <Bar dataKey="value" activeBar={false}
                                    unit={values[0].type === 'secs' ? " (s)" : ""}
                                    background={{ fill: '#fff' }} barSize={50} 
                                >
                                    {values.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill="#8884d8"
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