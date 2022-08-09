import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import UniSlider from "./Slider.js";
import Bird from "../../assets/bird-static.png";

const ModalMed = ({
  breathValue,
  lengthChange,
  breathChange,
  setStartMeditation,
  lengthValue,
  setLengthValue,
}) => {
  const [modalVisible, setModalVisible] = useState(false);


  const time = lengthValue / 60
  const displayTime = (time + "").substring(0, 5)

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Please select your meditation timings
            </Text>

            <Text style={styles.modalText}>Meditation session length</Text>
            <View style={styles.slider}>
              <Text>0 mins</Text>
              <UniSlider
                id={"length"}
                label={`Total meditation time is ${displayTime} minuites`}
                min={0}
                max={1800}
                lengthValue={lengthValue}
                onChange={lengthChange}
                setLengthValue={setLengthValue}
              />
              <Text>30 mins</Text>
            </View>

            <Text style={styles.modalText}>Breath in and out length</Text>
            <View style={styles.slider}>
              <Text>0 secs</Text>
              <UniSlider
                label={`Breath in for ${breathValue} seconds breath out for ${breathValue} seconds`}
                id={"in"}
                min={0}
                max={10}
                onChange={breathChange}
              />
              <Text>10 secs</Text>
            </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                setStartMeditation(true);
              }}
            >
              <Text style={styles.textStyle}>Click to Meditate</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        id={"timerTrigger"}
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Set times</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
    paddingTop: 15,
  },
  slider: {
    flexDirection: "row",
  },
  lastSlider: {
    flexDirection: "row",
    marginBottom: 30,
  },
});

export default ModalMed;
