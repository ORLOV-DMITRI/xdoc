import {useEffect} from "react";

function useHidden() {
    useEffect(() => {
        const paddingOffset = `${window.innerWidth - document.body.offsetWidth}px`;

        document.body.setAttribute("style", `overflow: hidden; padding-right: ${paddingOffset}`);

        return () => {
            document.body.setAttribute("style", "overflow: visible; padding-right: 0");

        };
    }, []);
}

export default useHidden;
