import styled from 'styled-components';

interface IDisabledSectionProps {
    disabled: boolean;
}
// @ts-ignore
export const DisabledSection = styled.div<IDisabledSectionProps>`
    ${({ disabled = true }: IDisabledSectionProps) =>
        disabled &&
        `
    cursor: no-drop;
    pointer-events: none;
`};
`;
