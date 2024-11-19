import style from "./InputSelect.module.css";
import * as Select from "@radix-ui/react-select";
import { InputSelectProps } from "../../../types/types";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "../../../assets/icons";

const InputSelect = (props: InputSelectProps) => {
	const { label, name, valuesObject, valuesGroups, value, setValue, disabled } = props;

	return (
		<Select.Root
			value={value}
			onValueChange={(newValue) => setValue(newValue)}
			disabled={disabled}>
			<Select.Trigger
				className={style.selectTrigger}
				aria-label={`${name} Select`}>
				{valuesObject && <Select.Value />}
				{valuesGroups && <Select.Value placeholder='Select group tag...'>{value}</Select.Value>}
				<Select.Icon className={style.selectIcon}>{ChevronDownIcon}</Select.Icon>
			</Select.Trigger>
			<Select.Portal>
				<Select.Content
					className={style.selectContent}
					position={"popper"}>
					<Select.ScrollUpButton className={style.selectScrollButton}>{ChevronUpIcon}</Select.ScrollUpButton>
					<Select.Viewport className={style.selectViewport}>
						<Select.Group>
							{label && <Select.Label className={style.selectLabel}>{label}</Select.Label>}
							{valuesObject &&
								Object.entries(valuesObject).map(([key, item]) => (
									<Select.Item
										key={key}
										value={key}
										className={style.selectItem}>
										<Select.ItemText>
											{item.icon} {item.label}
										</Select.ItemText>
										<Select.ItemIndicator className={style.selectItemIndicator}>{CheckIcon}</Select.ItemIndicator>
									</Select.Item>
								))}
							{valuesGroups && (
								<>
									<Select.Item
										value='None'
										className={style.selectItem}>
										<Select.ItemText>None</Select.ItemText>
										<Select.ItemIndicator className={style.selectItemIndicator}>{CheckIcon}</Select.ItemIndicator>
									</Select.Item>

									{valuesGroups.map((group) => (
										<Select.Item
											key={group.id}
											value={group.tag}
											className={style.selectItem}>
											<Select.ItemText>{group.tag}</Select.ItemText>
											<Select.ItemIndicator className={style.selectItemIndicator}>{CheckIcon}</Select.ItemIndicator>
										</Select.Item>
									))}
								</>
							)}
						</Select.Group>
					</Select.Viewport>
					<Select.ScrollDownButton className={style.selectScrollButton}>{ChevronDownIcon}</Select.ScrollDownButton>
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	);
};

export default InputSelect;
