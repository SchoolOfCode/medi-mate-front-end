import { StyleSheet, View } from "react-native";
import React, { useState } from "react";






const UniSlider = ({ title, min, max, id }) => {

    const [sliderValue, setSliderValue] = useState(1);
    function handleChange(e) {
        console.log(e.target.value)
        setSliderValue(e.target.value)
    }
    return (
        <View style={styles.parent}>
            <input
                type="range"
                min={min}
                max={max}
                value={sliderValue}
                className="slider"
                id={id}
                onChange={(e) => handleChange(e)} />
        </View>
    );
};

export default UniSlider;

const styles = StyleSheet.create({
    parent: {
        width: 250

    },
    Slider: {
        backgroundColor: "blue",
        color: "white",
    }
});

// this is slider functionality taken from another repo, needs to be looked at understood and then reconfigured




// const showGameSpeed = document.getElementById('showGameSpeed');
// showGameSpeed.innerHTML = gameSpeed;