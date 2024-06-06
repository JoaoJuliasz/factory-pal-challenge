import { ResponsiveContainer } from "recharts";
import { styled } from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    justify-content: space-around;
`

export const ChartWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
    margin: 6px 0;
`

export const ChartTitle = styled.h3`
    text-transform: capitalize;
    font-weight: normal;
`

export const ChartResponseContainer = styled(ResponsiveContainer) <{ $size: number }>`
    ${({ $size }) => $size === 1 && 'margin: 0 auto;'}
    max-width: ${({ $size }) => 750 / $size}px 
`