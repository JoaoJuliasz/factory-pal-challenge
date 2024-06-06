import { useCallback } from "react"

export const useDataConvertion = () => {

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
            //TODO: check this validation, because the convertion should happen both ways
            if (item.type === 'hours') {
                return { ...item, value: item.value * 3600, type: 'secs' }
            }
            return item
        })
    }, [])

    return { splitDataIntoGroups }
};