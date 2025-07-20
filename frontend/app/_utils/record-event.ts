export const recordEvent = (event: string, data: Record<string, unknown>) => {
    if (typeof window !== "undefined") {
        (window as unknown as { unami: { track: (event: string, data: Record<string, unknown>) => void } })
            ?.unami?.track?.(event, data);
    }
};