import { useEffect, useMemo, useState } from "react";
import MetricsChart from "../../component/MetricsChart/MetricsChart";
import MetricsTable from "../../component/MetricsTable/MetricsTable";
import TypeButton from "../../component/TypeButton/TypeButton";
import { data } from "../../data/data";
import { BtnsContainer } from "./Home.styles";

const Home = () => {
    const [metrics, setMetrics] = useState<IMetric[]>([])
    const [metricsTypes, setMetricsTypes] = useState<string[]>([])
    const [selectedMetricType, setSelectedMetricType] = useState<string>("")
    const [selectedMetricRow, setSelectedMetricRow] = useState<string>("")

    const filteredMetrics: IMetric[] = useMemo(() => {
        if (selectedMetricType === 'all') {
            return metrics
        }
        return metrics.filter(metric => metric.category === selectedMetricType)
    }, [metrics, selectedMetricType])

    useEffect(() => {
        const types = new Set(data.map(value => value.category))
        const typesArr = Array.from(types)
        setMetrics(data)
        setMetricsTypes([...typesArr, "all"])
        setSelectedMetricType(typesArr[0])
    }, [])

    if (metrics.length === 0) return <div>Loading...</div>

    return (
        <div>
            <BtnsContainer>
                {metricsTypes.map(type =>
                    <TypeButton key={type} title={type} selectedType={selectedMetricType}
                        setSelectedMetricType={setSelectedMetricType} />
                )}
            </BtnsContainer>
            <MetricsTable metrics={filteredMetrics} selectedMetricRow={selectedMetricRow} />
            <MetricsChart metrics={filteredMetrics} selectedType={selectedMetricType} setSelectedMetricRow={setSelectedMetricRow} />
        </div>
    );
};

export default Home;