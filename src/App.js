import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Settimer from "./Settimer";
import Timeleft from "./Timeleft";

function App() {
  //state
  const [breaklength, setbreaklength] = useState(300);
  const [sessionlength, setsessionlength] = useState(1500);
  const [curentses, setcurentses] = useState("session");
  const [timeleft, settimeleft] = useState(sessionlength);
  const [isplaying, setisplaying] = useState(true);
  const [intervaltime, setintervaltime] = useState(null);
  const timeref = useRef(null);

  const playAndpause = () => {
    setisplaying(!isplaying);
    if (isplaying) {
      const interval = setInterval(() => {
        settimeleft((prev) => {
          const newtime = prev - 1;
          if (newtime >= 0) {
            return newtime;
          }
          timeref.current.play();
          //if seesion then do break
          if (curentses === "session") {
            setcurentses("break");
            settimeleft(breaklength);
          } else if (curentses === "break") {
            setcurentses("session");
            settimeleft(sessionlength);
          }

          //break then session
        });
      }, 1000);
      setintervaltime(interval);
    } else {
      clearInterval(intervaltime);
    }
  };

  const reset = () => {
    clearInterval(intervaltime);
    setbreaklength(300);
    setsessionlength(1500);
    setcurentses("session");
    setisplaying(true);
    settimeleft(sessionlength);
  };

  useEffect(() => {
    settimeleft(sessionlength);
  }, [sessionlength]);

  //handleincrese
  const handlebreakincrease = () => {
    setbreaklength(breaklength + 60);
  };

  //handledecrease
  const handlebreakdecrese = () => {
    const newlength = breaklength - 60;
    if (newlength < 0) {
      setbreaklength(0);
    } else {
      setbreaklength(newlength);
    }
  };
  //handleincrese
  const handlesessionincrease = () => {
    setsessionlength(sessionlength + 60);
  };

  //handledecrease
  const handlesessiondecrese = () => {
    const newlength = sessionlength - 60;
    if (newlength < 0) {
      sessionlength(0);
    } else {
      setsessionlength(newlength);
    }
  };
  const breakprops = {
    title: "Break time",
    count: breaklength,
    handleincrease: handlebreakincrease,
    handledecrease: handlebreakdecrese,
  };
  const sessionprops = {
    title: "Session time",
    count: sessionlength,
    handleincrease: handlesessionincrease,
    handledecrease: handlesessiondecrese,
  };

  return (
    <div className="container">
      <div className="flex">
        <Settimer {...breakprops} />
        <Settimer {...sessionprops} />
      </div>
      <Timeleft
        timeleft={timeleft}
        sessionlength={sessionlength}
        breaklength={breaklength}
        isplaying={isplaying}
        playAndpause={playAndpause}
        curentses={curentses}
        reset={reset}
      />
      <audio ref={timeref}>
        <source
          src="https://onlineclock.net/audio/options/default.mp3?__cf_chl_captcha_tk__=b3e38e0e5c5c462885616b177ec5093595af0a16-1589558956-0-Ab-coxcqoLhiQgFkis3SUDkQeTgQDIQPBs7Qb9rV5PmRO5bxn0Wa-CT-2fWGVBA2R94S2oTgIL6oA0KDsjvosUbA0wDRcS1Lf3ZH8ON5Jq5PS_nWcRttPEHcaMLRmrv9G12lN5--_8S6hrWaVrG6tiMsmPAilVJSza-9RS7_S54OK4-lI-2PA3m6X2sY8VM4s1a2_LCfCptqB6hsI2thuuAlfJP6IgsCoa8l4DsD801tJhDIZExjU3aD0hkXwIxJiD7aSNXzG_03qeW0vj4fMkJIxd3JD7V-jMAP_997JWtLVlA9DaxkYywMvZX_V4qgskqNFnZutALZ2CsmFL3353XFOVYNB_XJDY6geX26sAZckZhESuLCscKpkedW4J_0fT9fVcjrGRjRrSXwEEbqmRte6E0lBgkOkVyyCD1tb6FqSY4Iko_7XEbZvJrw-LZ9mRkT625yUbpTd9pcs6IQoBql7s1pjGZLtCdshrGO8sFr_pHh-VjrmMrQ9ldIZcYDTKr6KyRyxtiN2b9vQ8Gw2Iw"
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
}

export default App;
