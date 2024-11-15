import style from "./InputSelect.module.css";
import * as Select from "@radix-ui/react-select";
import { InputSelectProps } from "../../../types/types";

const ChevronDownIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 512 512'>
		{/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
		<path d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z' />
	</svg>
);

const ChevronUpIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 512 512'>
		{/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
		<path d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z' />
	</svg>
);

const CheckIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 448 512'>
		{/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
		<path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
	</svg>
);

const InputSelect = (props: InputSelectProps) => {
	const { label, name, valuesObject, value, setValue } = props;

	return (
		<Select.Root
			value={value}
			onValueChange={(newValue) => setValue(newValue)}>
			<Select.Trigger
				className={style.selectTrigger}
				aria-label={name}>
				<Select.Value>
					{valuesObject[value].icon}
					{valuesObject[value].label}
				</Select.Value>
				<Select.Icon className={style.selectIcon}>{ChevronDownIcon}</Select.Icon>
			</Select.Trigger>
			<Select.Portal>
				<Select.Content
					className={style.selectContent}
					position='popper'>
					<Select.ScrollUpButton className={style.selectScrollButton}>{ChevronUpIcon}</Select.ScrollUpButton>
					<Select.Viewport className={style.selectViewport}>
						<Select.Group>
							<Select.Label className={style.selectLabel}>{label}</Select.Label>
							{Object.entries(valuesObject).map(([key, item]) => (
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
						</Select.Group>
					</Select.Viewport>
					<Select.ScrollDownButton className={style.selectScrollButton}>{ChevronDownIcon}</Select.ScrollDownButton>
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	);
};

export default InputSelect;
