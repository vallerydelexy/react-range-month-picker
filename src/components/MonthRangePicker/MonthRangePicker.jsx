import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./MonthRangePicker.module.css";
import "../global.css";

export function MonthRangePicker(props) {
  const [fromMonth, setFromMonth] = useState(
    props.selected.fromMonth ? props.selected.fromMonth : new Date().getMonth()
  );
  const [fromYear, setFromYear] = useState(
    props.selected.fromYear ?? new Date().getFullYear()
  );

  const [toMonth, setToMonth] = useState(
    props.selected.toMonth ? props.selected.toMonth : new Date().getMonth()
  );
  const [toYear, setToYear] = useState(
    props.selected.toYear ?? new Date().getFullYear()
  );

  // New state variables for displayed years
  const [displayedFromYear, setDisplayedFromYear] = useState(fromYear);
  const [displayedToYear, setDisplayedToYear] = useState(toYear);

  const setActiveMonthBgColor = (r, color) => {
    r.style.setProperty("--month-active-bg-color", color);
  };

  function isWithinRange (currentlyDisplayedYear, currentlyDisplayedMonthIndex, fromMonth, toMonth, fromYear, toYear) {
    const currentDate = new Date(currentlyDisplayedYear, currentlyDisplayedMonthIndex, 1);
    const fromDate = new Date(fromYear, fromMonth, 1);
    const toDate = new Date(toYear, toMonth, 1);

    if (isNaN(currentDate.getTime()) || isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      console.error("Invalid date value");
      return false;
    }
    if(currentDate.getTime() < fromDate.getTime() || currentDate.getTime() > toDate.getTime()) {
      return false
    }
    return true
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

  // Updated change year functions to change the displayed year and reset selected month
  const changeDisplayedFromYear = (year) => {
    setDisplayedFromYear(year);
    // setFromMonth(-1); // Reset selected from month
  };

  const changeDisplayedToYear = (year) => {
    setDisplayedToYear(year);
    // setToMonth(-1); // Reset selected to month
  };

  const getMonthNames = (locale = "en", format = "short") => {
    const formatter = new Intl.DateTimeFormat(locale, {
      month: format,
      timeZone: "UTC",
    });
    const months = Array.from({ length: 12 }, (_, i) => new Date( new Date().getFullYear(), i+1, 1));
    return months.map((date) => formatter.format(date));
  };

  const changeFromMonth = (month) => {
    setFromMonth(month);
    setFromYear(displayedFromYear); // Set the selected year to the displayed year
    props.setIsOpen(false);
    handleChange(month, displayedFromYear, toMonth, toYear);
  };

  const changeToMonth = (month) => {
    setToMonth(month);
    setToYear(displayedToYear); // Set the selected year to the displayed year
    props.setIsOpen(false);
    handleChange(fromMonth, fromYear, month, displayedToYear);
  };

  const handleChange = (fromMonth, fromYear, toMonth, toYear) => {
    const fromDate = new Date(fromYear, fromMonth);
    const toDate = new Date(toYear, toMonth);

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      console.error("Invalid date value");
      return;
    }

    props.onChange({
      fromMonth: fromMonth,
      fromYear: fromYear,
      toMonth: toMonth,
      toYear: toYear,
      fromMonthName: fromDate.toLocaleString(props.lang || "en", {
        month: "long",
      }),
      fromMonthShortName: fromDate.toLocaleString(props.lang || "en", {
        month: "short",
      }),
      toMonthName: toDate.toLocaleString(props.lang || "en", { month: "long" }),
      toMonthShortName: toDate.toLocaleString(props.lang || "en", {
        month: "short",
      }),
    });
  };

  return (
    <div className={styles.pickerContainer}>
      {/* FROM YEAR */}
      <div className={styles.yearContainer}>
        <button
          className={styles.button}
          aria-label="Previous Year"
          onClick={() => changeDisplayedFromYear(displayedFromYear - 1)}
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
          {displayedFromYear}
        </span>
        <button
          className={styles.button}
          aria-label="Next Year"
          onClick={() => changeDisplayedFromYear(displayedFromYear+1)}
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
              index === fromMonth && fromYear === displayedFromYear
                ? styles.active
                : isWithinRange( displayedFromYear ,index, fromMonth, toMonth, fromYear, toYear)
                ? styles.range
                : null
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
          onClick={() => changeDisplayedToYear(displayedToYear - 1)}
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
          {displayedToYear}
        </span>
        <button
          className={styles.button}
          aria-label="Next Year"
          onClick={() => changeDisplayedToYear(displayedToYear + 1)}
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
              index === toMonth && toYear === displayedToYear
                ? styles.active
                : isWithinRange(displayedToYear, index, fromMonth, toMonth, fromYear, toYear)
                ? styles.range
                : null
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
