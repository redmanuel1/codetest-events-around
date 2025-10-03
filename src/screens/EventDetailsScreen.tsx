import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { observer } from 'mobx-react-lite';
import { eventStore } from '../stores/EventStores';
import EventDetailsCard from '../components/EventDetailsCard';

const EventDetailsScreen: React.FC = observer(() => {
  const event = eventStore.selectedEvent;

  if (eventStore.loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-gray-500 text-lg">Loading event details...</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-gray-500 text-lg">Event not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="p-4 bg-gray-100">
      <EventDetailsCard event={event} />
    </ScrollView>
  );
});

export default EventDetailsScreen;
