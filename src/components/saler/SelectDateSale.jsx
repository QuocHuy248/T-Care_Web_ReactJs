import React, { useEffect, useState } from "react";
import "./selectDateSale.css";
import Button from "@mui/material/Button";

export function SelectDateSale({ paddingSpan, setValue, dayInWeek, billIndexUser }) {
  const dateInWeekList = [
    { id: 1, name: "CN", value: "SUNDAY" },
    { id: 2, name: "TH2", value: "MONDAY" },
    { id: 3, name: "TH3", value: "TUESDAY" },
    { id: 4, name: "TH4", value: "WEDNESDAY" },
    { id: 5, name: "TH5", value: "THURSDAY" },
    { id: 6, name: "TH6", value: "FRIDAY" },
    { id: 7, name: "TH7", value: "SATURDAY" },
  ];
  const sessionInDate = [
    { id: 1, name: "Buổi sáng", value: "MORNING" },
    { id: 2, name: "Buổi trưa", value: "AFTERNOON" },
    { id: 3, name: "Buổi tối", value: "EVENING" },
    { id: 4, name: "Trực đêm", value: "NIGHT" },
  ];

  const [valueDate, setValueDate] = useState("");
  const [nameDate, setNameDate] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [day, setDay] = useState([]);
  useEffect(() => {
    if (dayInWeek != null) {
      const filterDay = dateInWeekList.filter((e) =>
        dayInWeek.some((element) => element.toLowerCase() === e.value.toLowerCase())
      );
      setDay(filterDay);
    }
  }, [dayInWeek]);
  const toggleSession = (date, sessionId) => {
    const dateSessions = selectedSessions[date] || [];
    const updatedSessions = dateSessions.includes(sessionId)
      ? dateSessions.filter((session) => session !== sessionId)
      : [...dateSessions, sessionId];

    setSelectedSessions({
      ...selectedSessions,
      [date]: updatedSessions,
    });
  };

  useEffect(() => {
    setValue(selectedSessions);
  }, [selectedSessions]);

  return (
    <>
      <div className="d-flex date-in-week">
        <div className="d-flex date-in-week-header">
          {dayInWeek == null ? (
            <>
              {dateInWeekList.map((e) => (
                <div
                  key={e.id}
                  id={`${
                    selectedSessions[e.value] && Object.keys(selectedSessions[e.value]).length > 0
                      ? "idActive"
                      : ""
                  }`}
                  className={`d-flex date-in-week-header-render-${
                    e.value === selectedDate ? "selected" : ""
                  }`}
                  onClick={() => (
                    setValueDate(e.value), setSelectedDate(e.value), setNameDate(e.name)
                  )}
                >
                  <span className="w-100">{e.name}</span>
                </div>
              ))}
            </>
          ) : (
            <>
              {day.map((e) => (
                <div
                  key={e.id}
                  id={`${
                    selectedSessions[e.value] && Object.keys(selectedSessions[e.value]).length > 0
                      ? "idActive"
                      : ""
                  }`}
                  className={`d-flex date-in-week-header-render-${
                    e.value === selectedDate ? "selected" : ""
                  }`}
                  onClick={() => (
                    setValueDate(e.value), setSelectedDate(e.value), setNameDate(e.name)
                  )}
                >
                  <span className="w-100">{e.name}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center my-4">
        <h6>{nameDate} </h6>
      </div>
      <div className="my-4  d-flex justify-content-center">
        {!billIndexUser ? (
          <>
            <div className="d-flex  justify-content-center">
              {valueDate !== "" &&
                sessionInDate.map((e) => (
                  <Button
                    key={e.id}
                    className={`ms-3 session-render-${
                      (selectedSessions[valueDate] || []).includes(e.value) ? "selected" : ""
                    }`}
                    onClick={() => toggleSession(valueDate, e.value)}
                  >
                    {e.name}
                  </Button>
                ))}
            </div>
          </>
        ) : (
          <>
            <div className="d-flex-wrap">
              {valueDate !== "" &&
                sessionInDate.map((e) => (
                  <Button
                    key={e.id}
                    className={`ms-3 session-render-${
                      (selectedSessions[valueDate] || []).includes(e.value) ? "selected" : ""
                    }`}
                    onClick={() => toggleSession(valueDate, e.value)}
                  >
                    {e.name}
                  </Button>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
