import React from 'react';
import { View, Text, Image } from 'react-native';

interface EventPreviewCardProps {
  event: {
    id: string;
    name: string;
    image: string | null;
    date: string;
  };
}

const EventPreviewCard: React.FC<EventPreviewCardProps> = ({ event }) => {
  return (
    <View className="bg-white rounded-lg overflow-hidden mb-4 shadow">
      {event.image && (
        <Image
          source={{ uri: event.image }}
          className="w-full h-48"
          resizeMode="cover"
        />
      )}
      <View className="p-4">
        <Text className="text-lg font-semibold mb-1">{event.name}</Text>
        <Text className="text-gray-500">{event.date}</Text>
      </View>
    </View>
  );
};

export default EventPreviewCard;
