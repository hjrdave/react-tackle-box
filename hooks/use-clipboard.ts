import React from 'react';

const useClipboard = (ref: React.Ref<any>) => {

    const copy = () => {
        let code = (ref) ? (ref as any).current.innerText : '';
        let newInput = document.createElement("textarea");
        newInput.value = code;
        document.body.appendChild(newInput);
        newInput.select();
        document.execCommand("copy");
        document.body.removeChild(newInput);
    };

    return {
        copy
    }
}

export default useClipboard;