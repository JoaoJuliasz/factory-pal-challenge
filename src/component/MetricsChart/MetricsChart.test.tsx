import { fireEvent, render, screen } from '@testing-library/react'
import MetricsChart from './MetricsChart'

jest.mock('recharts', () => {
    const OriginalModule = jest.requireActual('recharts')
    return {
        ...OriginalModule,
        ResponsiveContainer: ({ children }: any) => (
            <OriginalModule.ResponsiveContainer width={800} height={800}>
                {children}
            </OriginalModule.ResponsiveContainer>
        ),
    }
})

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))

describe('MetricsChart', () => {
    it('should render chart title', () => {
        const mockMetrics = [
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
        ]
        render(<MetricsChart metrics={mockMetrics} selectedType="mock" setSelectedMetricRow={jest.fn()} />)
        const title = screen.getByText('mock')
        expect(title).toBeInTheDocument()
    })

    it('should render two chart titles', () => {
        const mockMetrics = [
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
                "category": "mock1"
            },
        ]
        render(<MetricsChart metrics={mockMetrics} selectedType="all" setSelectedMetricRow={jest.fn()} />)
        const mockTitle = screen.getByText('mock')
        const mock1Title = screen.getByText('mock1')
        expect(mockTitle).toBeInTheDocument()
        expect(mock1Title).toBeInTheDocument()
    })

    it('should trigger setSelectedMetricRow on bar hover', () => {
        const mockMetrics = [
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
        ]
        const mockFn = jest.fn()
        render(<MetricsChart metrics={mockMetrics} selectedType="mock" setSelectedMetricRow={mockFn} />)
        const bar = screen.queryByTestId('cell-0')
        if (bar) {
            fireEvent.mouseEnter(bar)
            expect(mockFn).toHaveBeenCalledTimes(1)
        }
    })
})