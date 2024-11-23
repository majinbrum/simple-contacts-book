// CSS
import "./InputSelect.css";
// Radix UI Component
import * as Select from "@radix-ui/react-select";
// Interfaces
import { InputSelectProps } from "../../../types/types";
// Assets
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "../../../assets/icons";

const InputSelect = (props: InputSelectProps) => {
	const { label, name, valuesObject, valuesGroups, value, setValue, disabled } = props;

	return (
		<Select.Root
			value={value}
			onValueChange={(newValue) => setValue(newValue)}
			disabled={disabled}>
			<Select.Trigger
				className={"select__trigger"}
				aria-label={`${name} Select`}>
				{valuesObject && <Select.Value />}
				{valuesGroups && <Select.Value placeholder='Select group tag...'>{value}</Select.Value>}
				<Select.Icon className={"select__icon"}>{ChevronDownIcon}</Select.Icon>
			</Select.Trigger>
			<Select.Portal>
				<Select.Content
					className={"select__content"}
					position={"popper"}>
					<Select.ScrollUpButton className={"select__button--scroll"}>{ChevronUpIcon}</Select.ScrollUpButton>
					<Select.Viewport className={"select__viewport"}>
						<Select.Group>
							{label && <Select.Label className={"select__label"}>{label}</Select.Label>}
							{valuesObject &&
								Object.entries(valuesObject).map(([key, item]) => (
									<Select.Item
										key={key}
										value={key}
										className={"select__item"}>
										<Select.ItemText>
											{item.icon} {item.label}
										</Select.ItemText>
										<Select.ItemIndicator className={"select__item__indicator"}>{CheckIcon}</Select.ItemIndicator>
									</Select.Item>
								))}
							{valuesGroups && (
								<>
									<Select.Item
										value='None'
										className={"select__item"}>
										<Select.ItemText>None</Select.ItemText>
										<Select.ItemIndicator className={"select__item__indicator"}>{CheckIcon}</Select.ItemIndicator>
									</Select.Item>

									{valuesGroups.map((group) => (
										<Select.Item
											key={group.id}
											value={group.tag}
											className={"select__item"}>
											<Select.ItemText>{group.tag}</Select.ItemText>
											<Select.ItemIndicator className={"select__item__indicator"}>{CheckIcon}</Select.ItemIndicator>
										</Select.Item>
									))}
								</>
							)}
						</Select.Group>
					</Select.Viewport>
					<Select.ScrollDownButton className={"select__button--scroll"}>{ChevronDownIcon}</Select.ScrollDownButton>
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	);
};

export default InputSelect;
