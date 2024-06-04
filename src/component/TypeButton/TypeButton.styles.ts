import { styled } from "styled-components";

export const Button = styled.a<{ $selected: boolean }> `
    border: 1px solid;
    padding: 4px;
    border-radius: 4px;
    transition: border-color 0.3s ease 0s;
    cursor: pointer;
    min-width: 50px;
    font-size: 14px;
    margin-right: 6px;
    border-color: ${({ $selected }) => $selected ? '#3d3d3d' : '#ccc'};
    text-transform: capitalize;

    &:hover {
        border-color: #3d3d3d;
    }
`