import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import FormRenderer from "../components/FormRenderer";
import { createNeurologyHistoryFormComposer } from "../forms/NeurologyHistoryForm.js";
import { getFormOptions } from "../forms/formUtils.js";

const NeurologyHistoryFormPage = () => {
    const { currentLang } = useOutletContext();
    const [composer, setComposer] = useState(null);
    const [options, setOptions] = useState(null);

    useEffect(() => {
        const newComposer = createNeurologyHistoryFormComposer(currentLang);
        const newOptions = getFormOptions(currentLang);

        setComposer(newComposer);
        setOptions(newOptions);
    }, [currentLang]);

    if (!composer || !options) {
        return <div>Loading...</div>;
    }

    return (
        <FormRenderer
            composer={composer}
            options={options}
            id="neurology-history-form-container"
        />
    );
};

export default NeurologyHistoryFormPage;
