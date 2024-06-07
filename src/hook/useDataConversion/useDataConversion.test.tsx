import { renderHook } from "@testing-library/react";
import { useDataConversion } from './useDataConversion'


describe('useDataConversion', () => {
    let mockMetrics: IMetric[];

    beforeEach(() => {
        mockMetrics = [
            {
                "id": "1",
                "label": "mockLabel",
                "value": 150,
                "type": "number",
                "description": "This is a mock",
                "category": "mock"
            },
            {
                "id": "2",
                "label": "mockLabel2",
                "value": 150,
                "type": "number",
                "description": "This is a mock2",
                "category": "mock"
            },
            {
                "id": "3",
                "label": "mockLabel",
                "value": 150,
                "type": "number",
                "description": "This is a mock3",
                "category": "mock1"
            },
            {
                "id": "4",
                "label": "mockLabel2",
                "value": 150,
                "type": "number",
                "description": "This is a mock4",
                "category": "mock1"
            },
        ];
    });

    it('should split data into groups when selectedType is all', () => {
        const expectedGroups = [
            [
                {
                    "id": "1",
                    "label": "mockLabel",
                    "value": 150,
                    "type": "number",
                    "description": "This is a mock",
                    "category": "mock"
                },
                {
                    "id": "2",
                    "label": "mockLabel2",
                    "value": 150,
                    "type": "number",
                    "description": "This is a mock2",
                    "category": "mock"
                },
            ],
            [
                {
                    "id": "3",
                    "label": "mockLabel",
                    "value": 150,
                    "type": "number",
                    "description": "This is a mock3",
                    "category": "mock1"
                },
                {
                    "id": "4",
                    "label": "mockLabel2",
                    "value": 150,
                    "type": "number",
                    "description": "This is a mock4",
                    "category": "mock1"
                },
            ]
        ];

        const { result } = renderHook(() => useDataConversion());
        const groups = result.current.splitDataIntoGroups(mockMetrics, 'all');
        expect(groups).toEqual(expectedGroups);
    });

    it('should wrap the received metrics in an array when selectedType is mock', () => {
        const selectedType = 'mock';
        const filteredMetrics = mockMetrics.filter(metric => metric.category === selectedType)

        const { result } = renderHook(() => useDataConversion());
        const groups = result.current.splitDataIntoGroups(filteredMetrics, selectedType);

        expect(groups).toEqual([filteredMetrics]);
    });

    it('should return empty percentageData and filled restData', () => {
        const { result } = renderHook(() => useDataConversion());
        const { percentageData, restData } = result.current.splitPercentageData(mockMetrics)
        expect(percentageData).toEqual([])
        expect(restData.length).toEqual(mockMetrics.length)
    })

    it('should return filled percentageData and filled restData, with pct and total values', () => {
        const mock = [
            {
                "id": "1",
                "label": "mockLabel",
                "value": 150,
                "type": "number",
                "description": "This is a mock",
                "category": "mock"
            },
            {
                "id": "2",
                "label": "mockLabel2",
                "value": 0.55,
                "type": "percentage",
                "description": "This is a mock2",
                "category": "mock"
            },
        ]
        const { result } = renderHook(() => useDataConversion());
        const { percentageData, restData } = result.current.splitPercentageData(mock)
        expect(percentageData[0].pct).toEqual(0.55 * 100)
        expect(restData[0].total).toEqual(150)
    })

    it('should return "(s)", once type is secs', () => {
        const { result } = renderHook(() => useDataConversion());
        const value = result.current.unitLabelConverter('secs')
        expect(value).toEqual('(s)')
    })
    it('should return "", once type is not mapped', () => {
        const { result } = renderHook(() => useDataConversion());
        const value = result.current.unitLabelConverter('number')
        expect(value).toEqual('')
    })
});
