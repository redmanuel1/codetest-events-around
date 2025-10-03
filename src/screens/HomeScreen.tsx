import React, { useEffect } from 'react';
import { View, Text, RefreshControl, TouchableOpacity, SectionList } from 'react-native';
import { observer } from 'mobx-react-lite';
import EventPreviewCard from '../components/EventPreviewCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { eventStore } from '../stores/EventStores';
import { formatDate } from '../utils/formatData';
import { groupEventsByCategory } from '../utils/groupByCategories';


type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = observer(({ navigation }) => {
  useEffect(() => {
    eventStore.fetchEvents();
  }, []);

  const onRefresh = async () => {
    await eventStore.fetchEvents();
  };

  if (eventStore.loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-gray-500 text-lg">Loading events...</Text>
      </View>
    );
  }

  if (eventStore.events.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-gray-500 text-lg">No events found.</Text>
      </View>
    );
  }

  const grouped = groupEventsByCategory(eventStore.events);
  const sections = Object.entries(grouped).map(([category, events]) => ({
    title: category,
    data: events,
  }));

  return (
    <SectionList
      className="bg-gray-100 p-4"
      sections={sections}
      keyExtractor={(item) => item.id}
      refreshControl={<RefreshControl refreshing={eventStore.loading} onRefresh={onRefresh} />}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            eventStore.selectEventById(item.id);
            navigation.navigate('EventDetails');
          }}
        >
          <EventPreviewCard
            event={{
              id: item.id,
              name: item.name,
              image: item.image,
              date: formatDate(item.startDate),
            }}
          />
        </TouchableOpacity>
      )}
      renderSectionHeader={({ section }) => (
        <View className="bg-blue-200 px-4 py-2 mb-1 card">
          <Text className="text-lg font-bold text-gray-700">{section.title}</Text>
        </View>
      )}
      stickySectionHeadersEnabled={false}
    />
  );
});

export default HomeScreen;
