import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import AddMomentModal from "../components/AddMomentModal";

const typeColors = {
  Meal: "bg-green-100 text-green-700",
  Nap: "bg-yellow-100 text-yellow-700",
  Activity: "bg-blue-100 text-blue-700",
  Note: "bg-purple-100 text-purple-700",
};

const MomentsScreen = () => {
  const [moments, setMoments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddMoment = (moment) => {
    setMoments((prev) => [moment, ...prev]);
  };

  const renderItem = ({ item }) => (
    <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="font-semibold text-gray-900 text-lg">{item.type}</Text>
        <Text className={`px-3 py-1 rounded-full text-xs font-semibold ${typeColors[item.type]}`}>
          {item.type}
        </Text>
      </View>
      {item.note ? <Text className="text-gray-700 mb-1">{item.note}</Text> : null}
      <Text className="text-xs text-gray-400 mt-1">{new Date(item.id).toLocaleString()}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-bold text-blue-600 mb-4">Daily Moments</Text>

      <FlatList
        data={moments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-20">No moments yet. Add one below!</Text>
        }
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="absolute bottom-6 right-6 bg-blue-600 rounded-full w-14 h-14 items-center justify-center shadow-lg"
      >
        <Text className="text-white text-3xl leading-none">+</Text>
      </TouchableOpacity>

      <AddMomentModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddMoment}
      />
    </View>
  );
};

export default MomentsScreen;
