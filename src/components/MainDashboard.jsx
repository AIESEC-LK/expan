import { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Stack, Button } from "@mui/material";
import _, { set } from "lodash";
import dayJs from "dayjs";

import { useExpa } from "../hooks/useExpa";
import { igCountArray } from "../helpers/igCountArray";
import MainTable from "./MainTable";
import LoadingCircle from "./LoadingCircle";
import dayjs from "dayjs";

export const MainDasboard = () => {
  const [personCommitteeValues] = useState(
    import.meta.env.VITE_LC_VALUES.split(", ").map((value) => parseInt(value))
  );

  const [currentAplIndex, setCurrentAplIndex] = useState(0);
  const [currentApdIndex, setCurrentApdIndex] = useState(0);
  const [currentReIndex, setCurrentReIndex] = useState(0);

  const [isAplLoopFinished, setIsAplLoopFinished] = useState(false);
  const [isApdLoopFinished, setIsApdLoopFinished] = useState(false);
  const [isReLoopFinished, setIsReLoopFinished] = useState(false);

  //const [isRefetch, setIsRefetch] = useState(false);

  const [aplData, setAplData] = useState([]);
  const [apdData, setApdData] = useState([]);
  const [reData, setReData] = useState([]);

  const [currentAplPage, setCurrentAplPage] = useState(1);
  const [currentApdPage, setCurrentApdPage] = useState(1);
  const [currentRePage, setCurrentRePage] = useState(1);

  // eslint-disable-next-line no-unused-vars
  const [passedDateRange, setPassedDateRange] = useState({
    fromDate: "2024-05-01 00:00:00",
    toDate: "2024-05-31 23:59:59",
  });

  

  useEffect(() => {
    const DateNow = new Date().toISOString();
    const newDate = DateNow.slice(5, 10);
  if (newDate >= "02-01") {
    setPassedDateRange({
      fromDate: DateNow.slice(0,4) +"-02-01 00:00:00",
      toDate: DateNow.slice(0,13).replace("T", " ") + ":59",
    });
    
  } else {
    setPassedDateRange({
      fromDate: (parseInt(DateNow.slice(0,4)) - 1) +"-02-01 00:00:00",
      toDate: DateNow.slice(0,13).replace("T", " ") + ":59"
  })
  };
}
  , []);


  // const [dateRange, setDateRange] = useState(passedDateRange);
  const [triggerRefetch, setTriggerRefetch] = useState(false);

    let {
      error: errorApl,
      data: dataApl,
      loading: loadingApl,
    } = useExpa(
      isAplLoopFinished,
      personCommitteeValues,
      currentAplIndex,
      "APL",
      currentAplPage,
      passedDateRange.fromDate,
      passedDateRange.toDate
    );
  
    let {
      error: errorApd,
      data: dataApd,
      loading: loadingApd,
    } = useExpa(
      isApdLoopFinished,
      personCommitteeValues,
      currentApdIndex,
      "APD",
      currentApdPage,
      passedDateRange.fromDate,
      passedDateRange.toDate
    );
  
    let {
      error: errorRe,
      data: dataRe,
      loading: loadingRe,
    } = useExpa(
      isReLoopFinished,
      personCommitteeValues,
      currentReIndex,
      "RE",
      currentRePage,
      passedDateRange.fromDate,
      passedDateRange.toDate
    );
    useEffect(() => {
      if (triggerRefetch) {
        setAplData([]);
        setApdData([]);
        setReData([]);
        setCurrentAplPage(1);
        setCurrentApdPage(1);
        setCurrentRePage(1);
        setCurrentAplIndex(0);
        setCurrentApdIndex(0);
        setCurrentReIndex(0);
        setIsAplLoopFinished(false);
        setIsApdLoopFinished(false);
        setIsReLoopFinished(false);
        setTriggerRefetch(false);
      }
    }, [triggerRefetch]);


  useEffect(() => {
    if (dataApl) {
      setAplData([...aplData, ...dataApl.allOpportunityApplication.data]);      

      const { paging } = dataApl.allOpportunityApplication;

      if (paging?.current_page < paging?.total_pages) {
        setCurrentAplPage(currentAplPage + 1);
      } else if (currentAplIndex === personCommitteeValues.length - 1) {
        setIsAplLoopFinished(true);
      } else {
        const nextIndex = currentAplIndex + 1;
        setCurrentAplPage(1);
        setCurrentAplIndex(nextIndex);
      }
    } else if (errorApl) {
      console.error("Applications Error: ", errorApl.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dataApl,
    errorApl,
    currentAplIndex,
    currentAplPage,
    personCommitteeValues,
    isAplLoopFinished,
  ]);

  useEffect(() => {
    if (dataApd) {
      setApdData([...apdData, ...dataApd.allOpportunityApplication.data]);

      const { paging } = dataApd.allOpportunityApplication;

      if (paging?.current_page < paging?.total_pages) {
        setCurrentApdPage(currentApdPage + 1);
      } else if (currentApdIndex === personCommitteeValues.length - 1) {
        setIsApdLoopFinished(true);
      } else {
        const nextIndex = currentApdIndex + 1;
        setCurrentApdPage(1);
        setCurrentApdIndex(nextIndex);
      }
    } else if (errorApd) {
      console.error("Approvals Error: ", errorApd.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dataApd,
    errorApd,
    currentApdIndex,
    currentApdPage,
    personCommitteeValues,
    isApdLoopFinished,
  ]);

  useEffect(() => {
    if (dataRe) {
      setReData([...reData, ...dataRe.allOpportunityApplication.data]);
      const { paging } = dataRe.allOpportunityApplication;

      if (paging?.current_page < paging?.total_pages) {
        setCurrentRePage(currentRePage + 1);
      } else if (currentReIndex === personCommitteeValues.length - 1) {
        setIsReLoopFinished(true);
      } else {
        const nextIndex = currentReIndex + 1;
        setCurrentApdPage(1);
        setCurrentReIndex(nextIndex);
      }
    } else if (errorRe) {
      console.error("Approvals Error: ", errorRe.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dataRe,
    errorRe,
    currentReIndex,
    currentRePage,
    personCommitteeValues,
    isReLoopFinished,
  ]);

  // console.log(aplData);
  // console.log(apdData);
  // console.log(reData);

  let duplicatedIgCountArray = _.cloneDeep(igCountArray);

  //Total for the given time range.
  aplData.forEach((yObj) => {
    const xObj = duplicatedIgCountArray.find(
      (x) => x?.id == yObj?.person?.lc_alignment?.id
    );

    if (xObj) {
      if (yObj?.created_at) {
        switch (yObj.opportunity.programme.short_name_display) {
          case "GV":
            
            xObj.apl.GV++;
            xObj.apl.total++;
            break;
          case "GTa":
            xObj.apl.GTa++;
            xObj.apl.total++;
            break;
          case "GTe":
            xObj.apl.GTe++;
            xObj.apl.total++;
            break;
          default:
            break;
        }
      }

      if (yObj?.date_approved) {
        switch (yObj.opportunity.programme.short_name_display) {
          case "GV":
            xObj.apd.GV++;
            xObj.apd.total++;
            break;
          case "GTa":
            xObj.apd.GTa++;
            xObj.apd.total++;
            break;
          case "GTe":
            xObj.apd.GTe++;
            xObj.apd.total++;
            break;
          default:
            break;
        }
      }

      if (
        yObj?.date_realized &&
        yObj?.date_realized <= passedDateRange.toDate
      ) {
        switch (yObj.opportunity.programme.short_name_display) {
          case "GV":
            xObj.re.GV++;
            xObj.re.total++;
            break;
          case "GTa":
            xObj.re.GTa++;
            xObj.re.total++;
            break;
          case "GTe":
            xObj.re.GTe++;
            xObj.re.total++;
            // console.log(yObj);
            break;
          default:
            break;
        }
      }
    }
  });

  //Handles a scenario where the EP applied before the given date range but was approved within it. (Not Realized)
  apdData.forEach((yObj) => {
    const xObj = duplicatedIgCountArray.find(
      (x) =>
        x?.id == yObj?.person?.lc_alignment?.id &&
        yObj?.created_at < passedDateRange.fromDate &&
        yObj?.date_realized == null
    );

    if (xObj) {
      if (yObj?.date_approved) {
        switch (yObj.opportunity.programme.short_name_display) {
          case "GV":
            xObj.apd.GV++;
            xObj.apd.total++;
            break;
          case "GTa":
            xObj.apd.GTa++;
            xObj.apd.total++;
            break;
          case "GTe":
            xObj.apd.GTe++;
            xObj.apd.total++;
            break;
          default:
            break;
        }
      }
    }
  });



  //Handles a scenario where the EP applied before the given date range but was realized within it.
  reData.forEach((yObj) => {
    const xObj = duplicatedIgCountArray.find(
      (x) =>
        x?.id == yObj?.person?.lc_alignment?.id &&
        yObj?.created_at < passedDateRange.fromDate &&
        yObj?.date_realized != null &&
        yObj?.date_realized <= passedDateRange.toDate
    );

    if (xObj) {
      if (yObj?.date_realized) {
        switch (yObj.opportunity.programme.short_name_display) {
          case "GV":
            xObj.re.GV++;
            xObj.re.total++;
            break;
          case "GTa":
            xObj.re.GTa++;
            xObj.re.total++;
            break;
          case "GTe":
            xObj.re.GTe++;
            xObj.re.total++;
            break;
          default:
            break;
        }
      }
    }
  });

  // const handleFromDateChange = (value) => {
  //   const updatedDateRange = { ...dateRange };

  //   const selectedDate = dayJs(value);
  //   if (selectedDate.isAfter(dateRange.toDate)) {
  //     console.error("Selected date cannot be after toDate.");
  //     return;
  //   }

  //   updatedDateRange.fromDate = selectedDate;

  //   setDateRange(updatedDateRange);
  // };

  // const handleToDateChange = (value) => {
  //   const updatedDateRange = { ...dateRange };

  //   const selectedDate = dayJs(value);
  //   if (selectedDate.isBefore(dateRange.fromDate)) {
  //     console.error("Selected date cannot be before fromDate.");
  //     return;
  //   }

  //   updatedDateRange.toDate = selectedDate;

  //   setDateRange(updatedDateRange);
  // };

  //console.log(passedDateRange);

  const handleFetch = () => {

    if (passedDateRange.fromDate > passedDateRange.toDate) {
      alert("From date cannot be after To date.");
      // console.error("From date cannot be after To date.");
      return;
    }
    setTriggerRefetch(prev => !prev); 

  };

  //console.log(duplicatedIgCountArray);
  //console.log(passedDateRange);

  return (
    <div>
      {loadingApl || loadingApd || loadingRe ? (
        <LoadingCircle />
      ) : errorApl || errorApd || errorRe ? (
        <p>Error: {errorApl.message}</p>
      ) : (
        <div>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            <DatePicker
              label="Start Date"
              name="fromDate"
              slotProps={{ textField: { size: "small" } }}
              onChange={(v)=>{
                const formated = dayjs(v).format("YYYY-MM-DD 00:00:00");
                setPassedDateRange(
                  {
                    fromDate: formated,
                    toDate: passedDateRange.toDate
                  }
                )}              
              }
              
              //defaultValue={passedDateRange.fromDate}
              // onChange={(v) => handleFromDateChange(v)}
            />
            <div>-</div>
            <DatePicker
              label="End Date"
              name="toDate"
              slotProps={{ textField: { size: "small" } }}
              onChange={(v)=>{
                const formated = dayjs(v).format("YYYY-MM-DD 23:59:59");
                setPassedDateRange(
                  {
                    fromDate: passedDateRange.fromDate,
                    toDate: formated
                  }
                )}}
              //defaultValue={passedDateRange.toDate}
              // onChange={(v) => handleToDateChange(v)}
            />
            <Button
              variant="outlined"
              style={{
                maxWidth: "80px",
                maxHeight: "40px",
                minWidth: "80px",
                minHeight: "40px",
              }}
              onClick={handleFetch}
              disableElevation
            >
              Fetch
            </Button>
          </Stack>
          <MainTable
            tableContent={duplicatedIgCountArray ? duplicatedIgCountArray : []}
          />
        </div>
      )}
    </div>
  );
};
