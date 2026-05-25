import React, { useState } from "react";
import { View, Text, TextInput, type TextInputProps } from "react-native";

interface InputProps extends Omit<TextInputProps, "placeholderTextColor"> {
  label: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
  helper?: string;
  optional?: boolean;
  multiline?: boolean;
}

export function Input({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  helper,
  optional = false,
  multiline = false,
  ...rest
}: InputProps) {
  const [focused, setFocused] = useState(false);

  const borderClass = error
    ? "border-red-500 border-2"
    : focused
      ? "border-blue border-2"
      : "border-ash border";

  const paddingClass = (focused || error) ? "p-[11px]" : "p-3";

  return (
    <View className="w-full">
      <Text className="font-body text-sm font-medium text-charcoal mb-1">
        {label}
        {optional && (
          <Text className="font-body text-sm font-normal text-smoke">
            {" "}(optional)
          </Text>
        )}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#b3b3b3"
        multiline={multiline}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`font-body text-base text-deep-charcoal bg-canvas rounded-sm min-h-[48px] ${borderClass} ${paddingClass} ${multiline ? "min-h-[100px] text-top" : ""}`}
        textAlignVertical={multiline ? "top" : "center"}
        {...rest}
      />
      {error && (
        <Text className="font-body text-sm text-red-500 mt-1">{error}</Text>
      )}
      {!error && helper && (
        <Text className="font-body text-sm text-smoke mt-1">{helper}</Text>
      )}
    </View>
  );
}
