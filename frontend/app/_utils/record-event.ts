export const recordEvent = (event: string, data: Record<string, unknown>) => {
    const unami = typeof window !== "undefined" ? (window as unknown as { unami: { track: (event: string, data: Record<string, unknown>) => void } }) : undefined;
    if (unami) {
        unami.unami.track?.(event, data);
    } else {
        console.log("Unami not found");
    }
};