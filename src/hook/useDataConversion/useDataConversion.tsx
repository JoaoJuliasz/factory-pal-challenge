import { useCallback } from "react"

export const useDataConversion = () => {

    //When selectedType is all, should group values by type
    const splitDataIntoGroups = useCallback((metrics: IMetric[], selectedType: string) => {
        const updtMetrics = convertHourIntoSeconds(metrics)
        if (selectedType === 'all') {
            const newData: { [key: string]: IMetric[] } = {}
            updtMetrics.forEach(item => {
                newData[item.category] = newData[item.category] ?
                    [...newData[item.category], item] : [item]
            })
            return Object.values(newData)
        }
        return [updtMetrics]
    }, [])

    const convertHourIntoSeconds = useCallback((metrics: IMetric[]): IMetric[] => {
        return metrics.map((item) => {
            if (item.type === 'hours') {
                return { ...item, value: item.value * 3600, type: 'secs' }
            }
            return item
        })
    }, [])

    const splitPercentageData = useCallback((values: IMetric[]): { percentageData: IMetric[], restData: IMetric[] } => {
        const percentageData = values.filter(item => item.type === 'percentage').map(item => ({ ...item, pct: item.value * 100 }))
        const restData = values.filter(item => item.type !== 'percentage').map(item => ({ ...item, total: item.value }))
        return { percentageData, restData }
    }, [])

    const unitLabelConverter = useCallback((type: string) => {
        const types: { [key: string]: string } = {
            'secs': '(s)',
            'percentage': '%',
            'hours': '(h)'
        }
        return types[type] ?? ''
    }, [])

    return { splitDataIntoGroups, splitPercentageData, unitLabelConverter }
};