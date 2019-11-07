import React, { FunctionComponent, useRef, useEffect } from "react";
import { Text, View, Animated, Easing } from "react-native";

type Props = {
  children: string;
};

const AnimatedText: FunctionComponent<Props> = ({ children }) => {
  const text = children.split(" ");
  const animatedValues = useRef(text.map(() => new Animated.Value(0))).current;

  const start = () => {
    Animated.sequence(
      animatedValues.map(a =>
        Animated.timing(a, {
          toValue: 1,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true
        })
      )
    ).start();
  };

  useEffect(() => {
    start();
  }, []);

  const translates = animatedValues.map(a =>
    a.interpolate({
      inputRange: [0, 1],
      outputRange: [-2, 3]
    })
  );
  return (
    <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {text.map((t, i) => (
        <Animated.Text
          key={i}
          style={[
            { marginLeft: 4 },
            { opacity: animatedValues[i] },
            { transform: [{ translateX: translates[i] }] }
          ]}
        >
          {t}
        </Animated.Text>
      ))}
    </View>
  );
};

export default AnimatedText;
