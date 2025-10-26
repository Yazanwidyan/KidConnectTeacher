import React, { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

const momentTypes = ["Meal", "Nap", "Activity", "Note"];

const AddMomentModal = ({ visible, onClose, onSave }) => {
  const [type, setType] = useState("Meal");
  const [note, setNote] = useState("");

  const handleSave = () => {
    onSave({ id: Date.now(), type, note });
    setType("Meal");
    setNote("");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-black/40 justify-end">
        <View className="bg-white rounded-t-3xl p-6">
          <Text className="text-xl font-bold text-blue-600 mb-4">Add Moment</Text>

          {/* Type Selector */}
          <Text className="text-gray-700 mb-1">Type</Text>
          <View className="flex-row flex-wrap gap-2 mb-3">
            {momentTypes.map((t) => (
              <TouchableOpacity
                key={t}
                onPress={() => setType(t)}
                className={`px-3 py-2 rounded-full ${type === t ? "bg-blue-600" : "bg-gray-200"}`}
              >
                <Text className={type === t ? "text-white" : "text-gray-700"}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Note Input */}
          <Text className="text-gray-700 mb-1">Note</Text>
          <TextInput
            placeholder="Write something..."
            value={note}
            onChangeText={setNote}
            className="border border-gray-300 rounded-xl px-3 py-2 mb-3"
            multiline
          />

          {/* Action Buttons */}
          <View className="flex-row justify-end gap-3 mt-3">
            <TouchableOpacity onPress={onClose}>
              <Text className="text-gray-500 font-semibold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <Text className="text-blue-600 font-semibold">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddMomentModal;
