import { Dispatch, SetStateAction } from "react";
import { Button } from './TypeButton.styles'

type Props = {
    title: string
    selectedType: string
    setSelectedMetricType: Dispatch<SetStateAction<string>>
}

const TypeButton = ({ title, selectedType, setSelectedMetricType }: Props) => {

    const handleClick = () => {
        if (selectedType !== title) {
            setSelectedMetricType(prev => title)
        }
    }

    const btnIsSelected = () => selectedType === title

    return (
        <Button onClick={handleClick} $selected={btnIsSelected()}>
            {title}
        </Button>
    );
};

export default TypeButton;