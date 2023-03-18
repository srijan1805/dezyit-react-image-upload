import { useCallback } from "react";

function useDebounce(delay: number): (<T>(cb: T) => T)[];

function useDebounce(delay: number) {
	const debounce = useCallback(
		<T>(cb: T) => {
			let timeoutId: string | number | NodeJS.Timeout | undefined;
			return ((...args: any) => {
				clearTimeout(timeoutId);
				timeoutId = setTimeout(() => {
					if (typeof cb === "function") cb(...args);
					else
						throw new Error(
							"Expected a callback function, instead got " +
								typeof cb +
								" as a paramter."
						);
				}, delay);
			}) as typeof cb;
		},
		[delay]
	);

	return [debounce];
}

export { useDebounce };
