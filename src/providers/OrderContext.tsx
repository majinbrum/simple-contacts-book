import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react";

type IOrder = string;
type ISetOrder = Dispatch<SetStateAction<string>>;

export const OrderContext = createContext<IOrder>("ascending");
export const SetOrderContext = createContext<ISetOrder>(() => {});

function OrderProvider({ children }: PropsWithChildren) {
	const [order, setOrder] = useState<IOrder>("ascending");

	return (
		<OrderContext.Provider value={order}>
			<SetOrderContext.Provider value={setOrder}>{children}</SetOrderContext.Provider>
		</OrderContext.Provider>
	);
}

export const useOrderContext = () => useContext(OrderContext);
export const useSetOrderContext = () => useContext(SetOrderContext);

export default OrderProvider;
