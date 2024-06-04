import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import MetricsTable from './MetricsTable'

describe('TypeButton', () => {
    it('should render table', () => {
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

        render(<MetricsTable metrics={mockMetrics} selectedMetricRow={"1"} />)
        const table = screen.getByRole('table')
        expect(table).toBeInTheDocument()
    })
})