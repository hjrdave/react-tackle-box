import React from 'react';

const useDebounce = (fn: any, delay: number) => {

    let debouncedFn = (fn: any, delay: number) => {
        let timeout: any;
        return function (...args: any) {
            const context = this;
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                timeout = null;
                fn.apply(context, args);
            }, delay);
        };
    };

    return React.useCallback(debouncedFn((...args: any) => fn(...args), delay), [delay]);;

}

export default useDebounce;