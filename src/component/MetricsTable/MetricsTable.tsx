import { Container, Table, TableTd, TableTh, TBodyTr, Thead } from "./MetricsTable.styles";

type Props = {
    metrics: IMetric[]
    selectedMetricRow: string
}

const MetricsTable = ({ metrics, selectedMetricRow }: Props) => {
    return (
        <Container>
            <Table>
                <Thead>
                    <tr>
                        <TableTh>Label</TableTh>
                        <TableTh>Value</TableTh>
                        <TableTh>Category</TableTh>
                        <TableTh>Description</TableTh>
                    </tr>
                </Thead>
                <tbody>
                    {metrics.map((metric, index) => (
                        <TBodyTr key={metric.id} $mouseRow={selectedMetricRow === metric.id} id={`tr-${metric.id}`}>
                            <TableTd $lastItem={index < metrics.length - 1}>{metric.label}</TableTd>
                            <TableTd $lastItem={index < metrics.length - 1}>{metric.value}</TableTd>
                            <TableTd $lastItem={index < metrics.length - 1}>{metric.category}</TableTd>
                            <TableTd $lastItem={index < metrics.length - 1}> {metric.description}</TableTd>
                        </TBodyTr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default MetricsTable;