import { ResponsiveContainer } from "recharts";
import { styled } from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    justify-content: space-around;
`

export const ChartWrapper = styled.div<{$space: boolean}>`
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
    ${({ $space }) => $space && 'margin-right: 6px;'}
    box-shadow: rgb(219, 210, 219) 0px 0px 10px 0px;
    border-radius: 4px;
`

export const ChartTitle = styled.h3`
    text-transform: capitalize;
    font-weight: normal;
    color: #212226ba;
`

export const ChartResponseContainer = styled(ResponsiveContainer) <{ $size: number }>`
    ${({ $size }) => $size === 1 && 'margin: 0 auto; max-width: 750px;'}
`