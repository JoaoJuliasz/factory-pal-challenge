// import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import TypeButton from './TypeButton'

describe('TypeButton', () => {
    it('should render button', () => {
        render(<TypeButton title="test title" selectedType="all" setSelectedMetricType={jest.fn()} />)
        const title = screen.getByText('test title')
        expect(title).toBeInTheDocument()
    })

    it('should trigger setSelectedMetricType on button click', () => {
        const setSelectedMetricType = jest.fn()
        render(<TypeButton title="test title" selectedType="all" setSelectedMetricType={setSelectedMetricType} />)
        const title = screen.getByText('test title')
        fireEvent.click(title)
        expect(setSelectedMetricType).toHaveBeenCalledTimes(1)
    })
})