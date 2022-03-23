import React from 'react';

const useCleanupEffect = (effect: React.EffectCallback) => {

    React.useEffect(() => {
        return () => {
            effect();
        }
    }, []);

};

export default useCleanupEffect;