import React from 'react'
import {useLocation, useParams, useNavigate} from "react-router-dom"

const informationBank = {
  policy:{
    
  },
  company:{
    "אודות":`${<h3>אודות טבע נאות</h3>}
    NAOT – מותג ישראלי גלובלי, מהגליל העליון

חברת "טבע נאות" החלה את דרכה לפני 80 שנה בקיבוץ נאות מרדכי, כשבית המלאכה הקטן התפתח עם השנים למפעל המייצר נעליים והיה המותג הישראלי הראשון שפעל בקטגוריית נעלי הנוחות בארץ. בשנת 1986 נכנסה החברה לשוק נעלי הנוחות ומיצבה את עצמה כמותג נעליים איכותי, המשלב ייצור בעבודת יד בשילוב טכנולוגיות מתקדמות, ובשנת 1989 פרצה לשווקים הבינלאומיים תחת שם המותג NAOT .

מאז ועד היום משווקת החברה נעלי נוחות אופנתיות למאות יעדים בארה"ב, קנדה, אוסטרליה, יפן וסינגפור כשהיקף הייצוא השנתי עומד על עשרות מיליוני דולרים, וכחלק מהאסטרטגיה החדשה מתכוננת התרחבות גם לשווקים נוספים.

ב"NAOT" שמים את ערך ערך התרומה לקהילה כמוביל ומקדמים תוכנית תרומות עולמית,  #NaotGivesBack  והחברה תורמת אלפי נעליים וסנדלים לארגוני צדקה שונים מדי שנה. רק לאחרונה, נרתמה לטובת המפונים מעוטף עזה ותרמה אלפי זוגות נעליים.

הרשת בישראל מונה כ- 55 חנויות, ואת מוצריה ניתן להשיג בנוסף בכ-150 נקודות מכירה מורשות בישראל באונליין: tevanaot.co.il ובאתרי marketplace.

${<h3>חזון וערכים</h3>}
אנו בנעלי נאות מאמינים שעולם טוב יותר
הוא עולם בו אנשים מרגישים בנוח

הדרך שלנו

בנאות תמיד מכוונים גבוה.
אנו מספקים אושר בעולם באמצעות נוחות בלתי מתפשרת, בסגנונות עדכניים וקלאסיים.
המגע האנושי, החיבור האישי והיושרה שלנו גורמים לאנשים הפוגשים בנו להרגיש חלק ממשפחת נאות.
אנחנו מקשיבים בקשב רב ומקיימים את ההבטחות שלנו.
אנשים מתחברים לסיפור הייחודי שלנו ומעריכים את המחויבות המתמשכת שלנו להמשך הייצור בגליל.




העקרונות שלנו

כנות, יושרה וכבוד
טיפוח האווירה המשפחתית ועבודה כצוות
חדשנות והצתת היצירתיות
נחישות חדורת מטרה
ראש פתוח וקבלת השונה
יצירת מרחב שבו כולם מרגישים נוח להביע את עצמם
מחויבות מלאה לאיכות גבוהה
להרשים ולרגש כדי ליצור רגעי "WOW"`,

"נאות בעולם": `${<img src=""/>}

כ 70%- מתוצרת מפעל טבע נאות מיועדת לשווקים בינלאומיים, והיקף הייצוא השנתי של החברה עומד על עשרות מיליוני דולרים. החברה מפיצה נעלי נוחות אופנתיות למאות יעדים בארה“ב, קנדה, אוסטרליה, אירופה ואסיה, ובעשור האחרון נכנסה לשווקים חדשים ביפן, דרום קוריאה, סינגפור ואפילו פפואה וניו-גינאה. בשנת 2017 זכתה טבע נאות בפרס “מותג הנעליים המצטיין בארצות הברית“, מטעם ארגון הנעליים הגדול באמריקה, ה- NFRA.
`

  }
}

const Info = () => {
    const {slug} = useParams()
    const {pathname} = useLocation()
    const bankSection = pathname.split("/")[1] 
    console.log(bankSection);
    
  return (
    <div>
      <h2>{slug}</h2>
        <p>
            {informationBank[bankSection][slug]}
        </p>
    </div>
  )
}

export default Info