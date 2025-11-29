import { translate } from "../utils/translate.js";
import { getSharedFormConfig, GOOGLE_SCRIPT_URL } from "./formUtils.js";

export function createNeurologyHistoryFormComposer(localization = "en") {
	if (!window.Composer) {
		console.error("Composer not loaded yet");
		return null;
	}

	const composer = new window.Composer({
		id: "neurology-history-form",
		...getSharedFormConfig(localization),
		postUrl: GOOGLE_SCRIPT_URL,
	});

	// Header
	composer.h1(
		translate(localization, {
			en: "Neurology History-Taking Form",
			ar: "نموذج التاريخ العصبي",
		}),
	);

	composer.p(
		translate(localization, {
			en: "Epilepsy Template",
			ar: "نموذج مرض الصرع",
		}),
	);

	// 1. Onset
	composer.slide({ pageProgress: "1/37" });
	composer.textInput("first_happened", {
		question: translate(localization, {
			en: "When did it first happen?",
			ar: "متى حدث ذلك لأول مرة؟",
		}),
	});

	// 2. Frequency Total
	composer.slide({ pageProgress: "2/37" });
	composer.numberInput("times_total", {
		question: translate(localization, {
			en: "How many times thus far?",
			ar: "كم مرة حدث ذلك حتى الآن؟",
		}),
	});

	// 3. Frequency Monthly
	composer.slide({ pageProgress: "3/37" });
	composer.numberInput("times_per_month", {
		question: translate(localization, {
			en: "How many times is it happening per month?",
			ar: "كم مرة يحدث ذلك في الشهر؟",
		}),
	});

	// 4. Witnessed
	composer.slide({ pageProgress: "4/37" });
	composer.choiceInput("witnessed", {
		question: translate(localization, {
			en: "Witnessed by anyone?",
			ar: "هل شاهده أحد؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("witnessed_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	// 4b. Description
	composer.slide({ pageProgress: "4/37" });
	composer.textInput("event_description", {
		question: translate(localization, {
			en: "What happened exactly?",
			ar: "ماذا حدث بالضبط؟",
		}),
	});

	// 5. Aura
	composer.slide({ pageProgress: "5/37" });
	composer.choiceInput("aura", {
		question: translate(localization, {
			en: "Did you get any aura (warning) beforehand?",
			ar: "هل شعرت بأي هالة (تحذير) مسبقاً؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("aura_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	// 6. Abnormal movements
	composer.slide({ pageProgress: "6/37" });
	composer.choiceInput("abnormal_movements", {
		question: translate(localization, {
			en: "Was there any abnormal movements in one side of your body beforehand?",
			ar: "هل كانت هناك أي حركات غير طبيعية في جانب واحد من جسمك مسبقاً؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("abnormal_movements_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	// 7. Staring
	composer.slide({ pageProgress: "7/37" });
	composer.choiceInput("staring", {
		question: translate(localization, {
			en: "Were you staring for a while before it happened?",
			ar: "هل كنت تحدق لفترة قبل حدوثه؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("staring_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	// 8. Activity
	composer.slide({ pageProgress: "8/37" });
	composer.textInput("activity", {
		question: translate(localization, {
			en: "What were you doing when it happened?",
			ar: "ماذا كنت تفعل عندما حدث ذلك؟",
		}),
	});

	// 9. Duration
	composer.slide({ pageProgress: "9/37" });
	composer.textInput("duration", {
		question: translate(localization, {
			en: "For how long did you lose consciousness?",
			ar: "كم من الوقت فقدت الوعي؟",
		}),
	});

	// 10. Eyes
	composer.slide({ pageProgress: "10/37" });
	composer.choiceInput("eyes", {
		question: translate(localization, {
			en: "Eyes open or closed?",
			ar: "هل كانت العيون مفتوحة أم مغلقة؟",
		}),
		choices: [
			translate(localization, { en: "Open", ar: "مفتوحة" }),
			translate(localization, { en: "Closed", ar: "مغلقة" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["o", "l", "c"],
	});

	composer.textInput("eyes_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	// 11. Frothing
	composer.slide({ pageProgress: "11/37" });
	composer.choiceInput("frothing", {
		question: translate(localization, {
			en: "Any frothing from the mouth?",
			ar: "هل كان هناك رغوة من الفم؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("frothing_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	// 12. Abnormal sounds
	composer.slide({ pageProgress: "12/37" });
	composer.choiceInput("abnormal_sounds", {
		question: translate(localization, {
			en: "Any abnormal sounds?",
			ar: "هل كانت هناك أصوات غير طبيعية؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("abnormal_sounds_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	// 13. Shaking
	composer.slide({ pageProgress: "13/37" });
	composer.choiceInput("shaking", {
		question: translate(localization, {
			en: "Any shaking?",
			ar: "هل كان هناك اهتزاز؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("shaking_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	// 14. Confusion
	composer.slide({ pageProgress: "14/37" });
	composer.choiceInput("confusion", {
		question: translate(localization, {
			en: "When you woke up, were you confused?",
			ar: "عندما استيقظت، هل كنت مشوشاً؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("confusion_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	// 15. Incontinence
	composer.slide({ pageProgress: "15/37" });
	composer.choiceInput("incontinence", {
		question: translate(localization, {
			en: "Lost control over bladder or bowel?",
			ar: "هل فقدت السيطرة على المثانة أو الأمعاء؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("incontinence_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	// 16. Tongue bite
	composer.slide({ pageProgress: "16/37" });
	composer.choiceInput("tongue_bite", {
		question: translate(localization, {
			en: "Any tongue bite?",
			ar: "هل كان هناك عض لللسان؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("tongue_bite_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	// 17. Trauma
	composer.slide({ pageProgress: "17/37" });
	composer.choiceInput("trauma", {
		question: translate(localization, {
			en: "Any trauma?",
			ar: "هل حدثت أي إصابة؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("trauma_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	// 18. Triggers
	composer.slide({ pageProgress: "18/37" });
	composer.choiceInput("triggers", {
		question: translate(localization, {
			en: "Any triggers like sleep deprivation or flashing light exposure?",
			ar: "أي محفزات مثل الحرمان من النوم أو التعرض للضوء الوامض؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("triggers_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	// 19. Driving
	composer.slide({ pageProgress: "19/37" });
	composer.choiceInput("driving", {
		question: translate(localization, {
			en: "Are you currently driving?",
			ar: "هل تقود السيارة حالياً؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("driving_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	// 20. Swimming/Jacuzzi
	composer.slide({ pageProgress: "20/37" });
	composer.choiceInput("swimming", {
		question: translate(localization, {
			en: "Swimming or using Jacuzzi?",
			ar: "هل تسبح أو تستخدم الجاكوزي؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("swimming_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	// 21. Ladder
	composer.slide({ pageProgress: "21/37" });
	composer.choiceInput("ladder", {
		question: translate(localization, {
			en: "Using ladder for work or tasks at home?",
			ar: "هل تستخدم السلم للعمل أو المهام في المنزل؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("ladder_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	// 22. Family History Epilepsy
	composer.slide({ pageProgress: "22/37" });
	composer.choiceInput("fh_epilepsy", {
		question: translate(localization, {
			en: "Any family history of epilepsy?",
			ar: "هل يوجد تاريخ عائلي للصرع؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("fh_epilepsy_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	// 23. Family History Cardiac
	composer.slide({ pageProgress: "23/37" });
	composer.choiceInput("fh_cardiac", {
		question: translate(localization, {
			en: "Any family history of cardiac disease?",
			ar: "هل يوجد تاريخ عائلي لأمراض القلب؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("fh_cardiac_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	// 23b. Other Family History
	composer.slide({ pageProgress: "23/37" });
	composer.textInput("fh_other", {
		question: translate(localization, {
			en: "Family history of any other disease?",
			ar: "تاريخ عائلي لأي مرض آخر؟",
		}),
	});

	// 24. Full term
	composer.slide({ pageProgress: "24/37" });
	composer.choiceInput("full_term", {
		question: translate(localization, {
			en: "Were you born full term?",
			ar: "هل ولدت في موعدك (حمل كامل)؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("full_term_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	// 25. Childbirth complications
	composer.slide({ pageProgress: "25/37" });
	composer.choiceInput("childbirth_complications", {
		question: translate(localization, {
			en: "Any complications during your childbirth?",
			ar: "هل حدثت أي مضاعفات أثناء ولادتك؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("childbirth_complications_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	// 26. Head trauma
	composer.slide({ pageProgress: "26/37" });
	composer.choiceInput("head_trauma", {
		question: translate(localization, {
			en: "Any head trauma in the past?",
			ar: "هل تعرضت لإصابة في الرأس في الماضي؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("head_trauma_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	// 27. Stroke/Brain insult
	composer.slide({ pageProgress: "27/37" });
	composer.choiceInput("stroke_history", {
		question: translate(localization, {
			en: "Any personal history of stroke or brain insult?",
			ar: "هل لديك تاريخ شخصي للإصابة بسكتة دماغية أو إصابة دماغية؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("stroke_history_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	// 28. Medications
	composer.slide({ pageProgress: "28/37" });
	composer.textInput("medications", {
		question: translate(localization, {
			en: "Any medications you’re currently taking?",
			ar: "أي أدوية تتناولها حالياً؟",
		}),
	});

	// 29. Allergies
	composer.slide({ pageProgress: "29/37" });
	composer.textInput("allergies", {
		question: translate(localization, {
			en: "Allergies?",
			ar: "هل لديك حساسية؟",
		}),
	});

	// 30. Past History
	composer.slide({ pageProgress: "30/37" });
	composer.textInput("past_history", {
		question: translate(localization, {
			en: "Past Medical/Psychiatric/Surgical History",
			ar: "التاريخ الطبي/النفسي/الجراحي السابق",
		}),
	});

	// 31. Social Status
	composer.slide({ pageProgress: "31/37" });
	composer.textInput("social_history", {
		question: translate(localization, {
			en: "Social status? Smoker? Illicit drug/Alcohol use?",
			ar: "الحالة الاجتماعية؟ مدخن؟ تعاطي المخدرات/الكحول؟",
		}),
	});

	// Review of Systems
	composer.slide({ pageProgress: "32/37" });
	composer.h2(
		translate(localization, {
			en: "Review of Systems",
			ar: "مراجعة الأنظمة",
		}),
	);

	composer.choiceInput("ros_psych", {
		question: translate(localization, {
			en: "Psychiatric: abnormal fear? Low mood?",
			ar: "نفسي: خوف غير طبيعي؟ مزاج منخفض؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("ros_psych_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	composer.slide({ pageProgress: "33/37" });
	composer.choiceInput("ros_cns", {
		question: translate(localization, {
			en: "CNS: numbness? Weakness?",
			ar: "الجهاز العصبي المركزي: تنميل؟ ضعف؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("ros_cns_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	composer.slide({ pageProgress: "34/37" });
	composer.choiceInput("ros_resp", {
		question: translate(localization, {
			en: "Respiratory: cough? shortness of breath?",
			ar: "الجهاز التنفسي: سعال؟ ضيق في التنفس؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("ros_resp_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	composer.slide({ pageProgress: "35/37" });
	composer.choiceInput("ros_cvs", {
		question: translate(localization, {
			en: "Cardiovascular: palpitations?",
			ar: "القلب والأوعية الدموية: خفقان؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("ros_cvs_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	composer.slide({ pageProgress: "35/37" });
	composer.choiceInput("ros_gi", {
		question: translate(localization, {
			en: "GI: nausea/vomiting? diarrhea or constipations?",
			ar: "الجهاز الهضمي: غثيان/قيء؟ إسهال أو إمساك؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("ros_gi_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	composer.slide({ pageProgress: "36/37" });
	composer.choiceInput("ros_gu", {
		question: translate(localization, {
			en: "Urinary: difficulty urinating? Or incontinence?",
			ar: "البولي: صعوبة في التبول؟ أو سلس البول؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("ros_gu_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	composer.slide({ pageProgress: "37/37" });
	composer.choiceInput("ros_skin", {
		question: translate(localization, {
			en: "Skin: rash?",
			ar: "الجلد: طفح جلدي؟",
		}),
		choices: [
			translate(localization, { en: "Yes", ar: "نعم" }),
			translate(localization, { en: "No", ar: "لا" }),
			translate(localization, { en: "Maybe", ar: "ربما" }),
		],
		downkeys: ["y", "n", "c"],
	});

	composer.textInput("ros_skin_details", {
		question: translate(localization, {
			en: "Details (optional)",
			ar: "التفاصيل (اختياري)",
		}),
		required: false,
	});

	// 32. Generate Story
	composer.slide({ pageProgress: "37/37" });
	composer.h2(
		translate(localization, {
			en: "Patient Story",
			ar: "قصة المريض",
		}),
	);

	// We inject raw HTML for the button and result container
	// The event listener will be attached in the page component
	const buttonLabel = translate(localization, {
		en: "Generate Story",
		ar: "توليد القصة",
	});
	const loadingLabel = translate(localization, {
		en: "Generating...",
		ar: "جاري التوليد...",
	});

	composer.free(`
<div class="fmd-next-controls fmd-d-flex fmd-justify-content-center fmd-mb-4">
<button type="button" id="btn-generate-story" class="fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center" data-loading-text="${loadingLabel}">
${buttonLabel}
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
</button>
</div>
<div id="story-result" class="fmd-card fmd-p-4 fmd-mt-4" style="display: none; white-space: pre-wrap; text-align: start;"></div>
<div class="fmd-text-center fmd-mt-2">
<button type="button" id="btn-copy-story" class="fmd-btn fmd-btn-sm fmd-btn-accent" style="display: none;">
Copy
</button>
</div>
`);

	return composer;
}
