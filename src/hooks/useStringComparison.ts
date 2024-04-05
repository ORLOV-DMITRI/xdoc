import { useState } from 'react';

function useStringComparison() {

    const compareStrings = (str1:string, str2:string) => {
        const formattedStr1 = str1.replace(/\s+/g, '').toLowerCase();
        const formattedStr2 = str2.replace(/\s+/g, '').toLowerCase();

        return formattedStr1 === formattedStr2;
    };

    return { compareStrings };
}

export default useStringComparison;
