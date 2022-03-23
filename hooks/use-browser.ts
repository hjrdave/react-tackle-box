import { detect } from 'detect-browser';

const useBrowser = () => {

    const browser = detect();
    const name = browser?.name;
    const version = browser?.version;
    const OS = browser?.os;
    const type = browser?.type;

    return {
        name,
        version,
        OS,
        type
    }
}

export default useBrowser;