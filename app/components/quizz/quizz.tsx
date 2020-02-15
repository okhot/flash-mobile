import * as React from "react"
import { useState, useEffect } from "react"
import { StyleSheet, View, SafeAreaView, Text, Alert } from "react-native"
import { palette } from "../../theme/palette"
import Modal from "react-native-modal"
import { Button } from "react-native-elements"
import { color } from "../../theme"
import { sleep } from "../../utils/sleep"


const styles = StyleSheet.create({
    modalText: {
        fontSize: 24,
        marginVertical: 12,
    },

    modalBackground: {
        justifyContent: 'flex-end',
        padding: 20,
        height: 400,
        backgroundColor: palette.white,
        alignItems: "center",
    },

    textButton: {
        backgroundColor: color.primary,
        marginVertical: 8,
    }
})

export const Quizz = ({quizzVisible, quizzClosing, quizzData }) => {

    const [ modalVisible, setModalVisible ] = useState(false)

    useEffect(() => {
        setModalVisible(quizzVisible)
    }, [quizzVisible]) 

    const successAnswer = async () => {
        await quizzData.action()
        quizzClosing()
        await sleep(500) // FIXME
        Alert.alert(quizzData.closingMsg)
    }

    console.tron.log(typeof quizzData.action)
    console.tron.log(quizzData.action)
    console.tron.log(quizzData)

    return (
        <Modal 
            style={{marginHorizontal: 0, marginBottom: 0}}
            isVisible={modalVisible} 
            swipeDirection={modalVisible ? ['down'] : ['up']}
            onSwipeComplete={() => quizzClosing()}
            swipeThreshold={50}
        >
            <View style={{flex: 1}}>
                {/* <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={{flex: 1}}></View>
                </TouchableWithoutFeedback> */}
            </View> 
            { quizzData.question !== undefined &&
                <View style={styles.modalBackground}>
                    <SafeAreaView style={{flex: 1}}> 
                        <Text style={styles.modalText}>{quizzData.question}</Text>
                        {quizzData.answers.map((l, i) => (
                            <Button title={l} buttonStyle={styles.textButton}
                                onPress={() => {
                                    quizzData.correct === i ? 
                                        successAnswer() :
                                        Alert.alert("Nope. Try again")
                                }}
                                key={i}
                            />
                        ))}
                    </SafeAreaView>
                </View>
            }
        </Modal>
    )
}