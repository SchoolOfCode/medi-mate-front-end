import { useEffect, useState } from "react";
import { StyleSheet, Text } from 'react-native';


function Timer({ sliderValue, startMeditation }) {

  const [timer, setTimer] = useState(sliderValue)


  useEffect(() => {
    setTimer(sliderValue)
  }, [sliderValue])


  // const breakTime = 6;
  let minutes = Math.floor(timer / 60);
  let seconds = timer % 60;
  useEffect(() => {
    setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);
  }, [startMeditation]);



  if (timer <= 0) {
    return (<Text id="timer">Timer finished!</Text>)
  }
  return (
    <Text style={styles.Timer} id="timer">
      Timer: {minutes.toString().padStart(1, "0")}:
      {seconds.toString().padStart(2, "0")}
    </Text>
  );
}

export default Timer;


const styles = StyleSheet.create({
  Timer: {
    paddingBottom: 15,
  },
});
