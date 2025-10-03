import React from 'react';
import { View, Text, Image, Linking, Pressable } from 'react-native';
import { UnifiedEvent } from '../models/UnifiedEvent';
import { formatDate, formatPrice, truncate, formatUrl } from '../utils/formatData';

interface EventDetailsCardProps {
  event: UnifiedEvent;
}

const EventDetailsCard: React.FC<EventDetailsCardProps> = ({ event }) => {
  return (
    <View className="bg-white rounded-lg shadow-md overflow-hidden mb-4 p-4">
      {event.image && (
        <Image
          source={{ uri: event.image }}
          className="w-full h-64 rounded-lg mb-4"
          resizeMode="cover"
        />
      )}

      <Text className="text-2xl font-bold mb-1">{truncate(event.name, 100)}</Text>

      {event.category && (
        <Text className="text-gray-600 italic mb-2">{event.category}</Text>
      )}

      {event.startDate && (
        <Text className="text-gray-500 mb-2">
          Start: {formatDate(event.startDate)}
        </Text>
      )}

      {event.endDate && (
        <Text className="text-gray-500 mb-2">
          End: {formatDate(event.endDate)}
        </Text>
      )}

      {event.description && <Text className="text-gray-700 mb-2">{event.description}</Text>}

      {event.location && (
        <Text className="text-gray-700 mb-2">
          Location: {truncate(event.location, 100)}
        </Text>
      )}

      <Text className="text-gray-700 font-semibold mb-2">
        Cost: {formatPrice(event.cost, event.isFree)}
      </Text>

      {event.url && (
        <Pressable onPress={() => Linking.openURL(formatUrl(event.url))}>
          <Text className="text-blue-600 underline">View Event</Text>
        </Pressable>
      )}
    </View>
  );
};

export default EventDetailsCard;
