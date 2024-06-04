import { Table, TableTd, TableTh, TBodyTr } from "./MetricsTable.styles";

type Props = {
    metrics: IMetric[]
}

const MetricsTable = ({ metrics }: Props) => {
    return (
        <Table>
            <thead>
                <tr>
                    <TableTh>Label</TableTh>
                    <TableTh>Value</TableTh>
                    <TableTh>Category</TableTh>
                    <TableTh>Description</TableTh>
                </tr>
            </thead>
            <tbody>
                {metrics.map((metric, index) => (
                    <TBodyTr key={metric.id}>
                        <TableTd $lastItem={index < metrics.length - 1}>{metric.label}</TableTd>
                        <TableTd $lastItem={index < metrics.length - 1}>{metric.value}</TableTd>
                        <TableTd $lastItem={index < metrics.length - 1}>{metric.category}</TableTd>
                        <TableTd $lastItem={index < metrics.length - 1}> {metric.description}</TableTd>
                    </TBodyTr>
                ))}
            </tbody>
        </Table>
    );
};

export default MetricsTable;