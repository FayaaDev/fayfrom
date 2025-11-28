import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import FormRenderer from "../components/FormRenderer";
import { createSurveyFormComposer } from "../forms/SurveyForm";
import { getFormOptions } from "../forms/formUtils";

const SurveyFormPage = () => {
	const { currentLang } = useOutletContext();
	const [composer, setComposer] = useState(null);
	const [options, setOptions] = useState(null);

	useEffect(() => {
		// Create composer and options based on current language
		const newComposer = createSurveyFormComposer(currentLang);
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
			id="survey-form-container"
		/>
	);
};

export default SurveyFormPage;
