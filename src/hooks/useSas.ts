import { getSasUri } from "@/http/sasUri";
import { useEffect, useState } from "react";

export const useSas = () => {
    const [sasUrl, setSasUrl] = useState<string>("");

    useEffect(() => {
        const getSasUriFunc = async () => {
            try {
                const currentTime = new Date().getTime();
                const storedSas = localStorage.getItem('sasToken');
                const storedTime = localStorage.getItem('sasTimestamp');

                if (storedSas && storedTime) {
                    const elapsedTime = currentTime - Number(storedTime);
                    const fiftyMinutes = 50 * 60 * 1000;

                    if (elapsedTime < fiftyMinutes) {
                        // Use the stored SAS token if it's still valid
                        setSasUrl(storedSas);
                        return;
                    }
                }

                const sas: SasType = await getSasUri();
                console.log(sas);
                setSasUrl(sas.sasUrl);

                // Store the new token and current timestamp
                localStorage.setItem('sasToken', sas.sasUrl);
                localStorage.setItem('sasTimestamp', currentTime.toString());
            } catch (err) {
                console.log(err);
            }
        };

        getSasUriFunc();
    }, []);

    return sasUrl;
};