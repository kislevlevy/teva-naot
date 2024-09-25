import React from 'react';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <div
      dir="rtl"
      className="grid min-h-full place-items-center  px-6 py-24 sm:py-32 lg:px-8 bg-emerald-50 w-full h-full"
    >
      <p className="text-base font-semibold text-emerald-600">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        דף לא נמצא
      </h1>
      <p className="mt-6 text-base leading-7 text-gray-600">
        סליחה, לא הצלחנו למצוא את הדף שחיפשת.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          to="/"
          className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          חזור לדף הבית
        </Link>
        <Link
          to="/company/צור-קשר"
          className="text-sm font-semibold text-gray-900 hover:underline"
        >
          צור קשר עם התמיכה
          <span aria-hidden="true"> &larr;</span>
        </Link>
      </div>
    </div>
  );
}
