import React from "react";

export function useDebounce(value: string, delay: number = 300) {
    const [debounced, setDebounced] = React.useState(value)

    React.useEffect(()=> {
        const handler = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(handler)
    }, [value, delay])
    
    return debounced
}