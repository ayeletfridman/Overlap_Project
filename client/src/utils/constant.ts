import * as Yup from 'yup';

export const countryValidationSchema = Yup.object({
  name: Yup.string().required('שם המדינה הוא שדה חובה'),
  flag: Yup.string().url('חייב להיות URL תקין').required('קישור לדגל הוא חובה'),
  population: Yup.number().typeError('חייב להיות מספר').positive('חייב להיות חיובי').required('שדה חובה'),
  region: Yup.string().required('אזור הוא שדה חובה'),
});

export const MESSAGES = {
  DELETE_SUCCESS: 'המדינה נמחקה בהצלחה',
  DELETE_ERROR: 'שגיאה במחיקה',
  DELETE_CONFIRM: 'האם את/ה בטוח/ה שברצונך למחוק?',
  SEED_SUCCESS: 'הנתונים אותחלו בהצלחה!',
  SAVE_ERROR: 'שגיאה בשמירה',
  SAVE_SUCCESS: 'הנתונים נשמרו בהצלחה',
  UPDATE_SUCCESS: 'המדינה עודכנה בהצלחה',
  CREATE_SUCCESS: 'מדינה חדשה נוצרה בהצלחה',
} as const;