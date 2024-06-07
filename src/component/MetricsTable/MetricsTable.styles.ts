import { styled } from "styled-components";

export const Container = styled.div`
    max-height: 400px;
    overflow-y: auto;
    max-width: 950px;
    box-shadow: rgb(219, 210, 219) 0px 0px 10px 0px;
    border-radius: 4px;
    margin: 0 auto;
`

export const Table = styled.table`
    border-collapse: collapse;
    text-align: left;
    width: 100%;
`

export const Thead = styled.thead`
    position: sticky; 
    top: 0;
    background: #fff;
`

export const TBodyTr = styled.tr<{ $mouseRow: boolean }>`
    transition: 0.2s background;
    background: ${({ $mouseRow }) => $mouseRow ? '#f0f0f0' : ''};
    &:hover {
        background: #f0f0f0;
    }
`

export const TableTh = styled.th`
    border-bottom: 1px solid #d7d7d7;
    padding: 8px 12px;
    font-weight: normal;
    color: #7b7979a6;
    font-size: 14px;
`

export const TableTd = styled.td<{ $lastItem: boolean }>`
    color: #323232ba;
    margin: 8px;
    padding: 8px 12px;
    border-bottom: ${({ $lastItem }) => $lastItem ? '1px solid #d7d7d7' : 'unset'};
    font-size: 14px;
    min-width: 150px;
`