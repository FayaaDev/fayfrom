import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import FormRenderer from "../components/FormRenderer";
import { createBurnoutSurveyComposer } from "../forms/BurnoutSurvey.js";
import { getFormOptions } from "../forms/formUtils.js";

const BurnoutSurveyPage = () => {
    const { currentLang } = useOutletContext();
    const [composer, setComposer] = useState(null);
    const [options, setOptions] = useState(null);

    useEffect(() => {
        const newComposer = createBurnoutSurveyComposer(currentLang);
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
            id="burnout-survey-container"
        />
    );
};

export default BurnoutSurveyPage;
