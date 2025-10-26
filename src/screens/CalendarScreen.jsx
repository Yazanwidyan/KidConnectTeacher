import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  const students = [
    { id: 1, name: "Ali Ahmad", moments: [{ type: "Meal", note: "Breakfast" }] },
    { id: 2, name: "Lina Hassan", moments: [{ type: "Nap", note: "Morning nap" }] },
  ];

  return (
    <View className="flex-1 bg-gray-50 p-4">
     

      <Text className="text-lg font-semibold mt-4 mb-2">Students - {selectedDate}</Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="bg-white p-3 rounded-xl mb-2 shadow">
            <Text className="font-semibold text-gray-800">{item.name}</Text>
            {item.moments.map((m, i) => (
              <Text key={i} className="text-gray-600 text-sm">{m.type}: {m.note}</Text>
            ))}
          </View>
        )}
      />
    </View>
  );
};

export default CalendarScreen;
