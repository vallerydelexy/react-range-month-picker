import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./MonthRangePicker.module.css";
import "../global.css";

export function MonthRangePicker(props) {
  const [fromMonth, setFromMonth] = useState(
    props.selected.fromMonth ? props.selected.fromMonth - 1 : new Date().getMonth()
  );
  const [fromYear, setFromYear] = useState(
    props.selected.fromYear ?? new Date().getFullYear()
  );

  const [toMonth, setToMonth] = useState(
    props.selected.toMonth ? props.selected.toMonth - 1 : new Date().getMonth()
  );
  const [toYear, setToYear] = useState(
    props.selected.toYear ?? new Date().getFullYear()
  );

  const setActiveMonthBgColor = (r, color) => {
    r.style.setProperty("--month-active-bg-color", color);
  };

  useEffect(() => {
    const r = document.querySelector(":root");
    if (props.bgColorMonthActive) {
      setActiveMonthBgColor(r, props.bgColorMonthActive);
    }
    if (props.bgColorMonthHover) {
      r.style.setProperty("--month-hover-bg-color", props.bgColorMonthHover);
    }
    if (props.borderRadiusMonth) {
      r.style.setProperty("--month-border-radius", props.borderRadiusMonth);
    }
    if (props.bgColorPicker) {
      r.style.setProperty("--picker-bg-color", props.bgColorPicker);
    }
    if (props.textColor) {
      r.style.setProperty("--text-color", props.textColor);
    }
    if (props.size === "small") {
      r.style.setProperty("--picker-padding", "1rem");
      r.style.setProperty("--year-display-margin-top", "0.5rem");
      r.style.setProperty("--year-display-margin-bottom", "0.5rem");
      r.style.setProperty("--month-select-padding", "0.5rem");
    }
  }, [props]);

  const changeFromYear = (year) => {
    setFromYear(year);
  };

  const changeToYear = (year) => {
    setToYear(year);
  };

  const getMonthNames = (locale = "en", format = "short") => {
    const formatter = new Intl.DateTimeFormat(locale, {
      month: format,
      timeZone: "UTC",
    });
    const months = Array.from({ length: 12 }, (_, i) => new Date(2023, i, 1));
    return months.map((date) => formatter.format(date));
  };

  const changeFromMonth = (month) => {
    setFromMonth(month);
    props.setIsOpen(false);
    handleChange(month, fromYear, toMonth, toYear);
  };

  const changeToMonth = (month) => {
    setToMonth(month);
    props.setIsOpen(false);
    handleChange(fromMonth, fromYear, month, toYear);
  };

  const handleChange = (fromMonth, fromYear, toMonth, toYear) => {
    const fromDate = new Date(fromYear, fromMonth);
    const toDate = new Date(toYear, toMonth);

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      console.error("Invalid date value");
      return;
    }

    props.onChange({
      fromMonth: fromMonth + 1,
      fromYear: fromYear,
      toMonth: toMonth + 1,
      toYear: toYear,
      fromMonthName: fromDate.toLocaleString(props.lang || "en", { month: "long" }),
      fromMonthShortName: fromDate.toLocaleString(props.lang || "en", { month: "short" }),
      toMonthName: toDate.toLocaleString(props.lang || "en", { month: "long" }),
      toMonthShortName: toDate.toLocaleString(props.lang || "en", { month: "short" }),
    });
  };

  return (
    <div className={styles.pickerContainer}>
      {/* FROM YEAR */}
      <div className={styles.yearContainer}>
        <button
          className={styles.button}
          aria-label="Previous Year"
          onClick={() => changeFromYear(fromYear - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={props.textColor || "#000"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-left"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <span aria-description="Year selected" className={styles.bold1}>
          {fromYear}
        </span>
        <button
          className={styles.button}
          aria-label="Next Year"
          onClick={() => changeFromYear(fromYear + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={props.textColor || "#000"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* FROM MONTH */}
      <div className={styles.monthsContainer}>
        {getMonthNames(props.lang).map((monthName, index) => (
          <button
            key={index}
            className={`${styles.month} ${styles.button} ${
              index === fromMonth && props.selected.fromYear === fromYear ? styles.active : null
            }`}
            onClick={() => changeFromMonth(index)}
          >
            {monthName}
          </button>
        ))}
      </div>

      {/* TO YEAR */}
      <div className={styles.yearContainer}>
        <button
          className={styles.button}
          aria-label="Previous Year"
          onClick={() => changeToYear(toYear - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={props.textColor || "#000"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-left"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <span aria-description="Year selected" className={styles.bold1}>
          {toYear}
        </span>
        <button
          className={styles.button}
          aria-label="Next Year"
          onClick={() => changeToYear(toYear + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={props.textColor || "#000"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* TO MONTH */}
      <div className={styles.monthsContainer}>
        {getMonthNames(props.lang).map((monthName, index) => (
          <button
            key={index}
            className={`${styles.month} ${styles.button} ${
              index === toMonth && props.selected.toYear === toYear ? styles.active : null
            }`}
            onClick={() => changeToMonth(index)}
          >
            {monthName}
          </button>
        ))}
      </div>
    </div>
  );
}
