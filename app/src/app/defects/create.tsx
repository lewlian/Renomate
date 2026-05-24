import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { ArrowLeft, Plus, X } from "lucide-react-native";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

interface SelectedImage {
  uri: string;
  id: string;
}

export default function CreateDefectScreen() {
  const { role: _role } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [photos, setPhotos] = useState<SelectedImage[]>([]);
  const [titleError, setTitleError] = useState("");

  const handlePickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets) {
      const newPhotos: SelectedImage[] = result.assets.map((asset) => ({
        uri: asset.uri,
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      }));
      setPhotos((prev) => [...prev, ...newPhotos]);
    }
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      setTitleError("Title is required");
      return;
    }
    setTitleError("");

    Alert.alert("Defect submitted", "Your defect report has been submitted.", [
      {
        text: "OK",
        onPress: () => router.back(),
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-paper" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-8"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable onPress={() => router.back()} className="min-w-[44px] min-h-[44px] items-start justify-center mt-4 mb-4">
          <ArrowLeft size={24} color="#161513" />
        </Pressable>

        <Text className="font-display text-2xl text-ink mb-6">
          Report a defect
        </Text>

        <View className="gap-4 mb-6">
          <Input
            label="Title"
            placeholder="e.g. Crack on bathroom tile"
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (text.trim()) setTitleError("");
            }}
            error={titleError}
          />

          <Input
            label="Description"
            placeholder="Describe the defect in detail..."
            value={description}
            onChangeText={setDescription}
            multiline
            optional
          />

          <Input
            label="Location"
            placeholder="e.g. Master bathroom, left wall behind door"
            value={location}
            onChangeText={setLocation}
            optional
          />
        </View>

        <View className="mb-6">
          <Text className="font-body text-sm font-medium text-charcoal mb-3">
            Photos{" "}
            <Text className="font-body text-sm font-normal text-slate">
              (optional)
            </Text>
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-3"
          >
            {photos.map((photo) => (
              <View key={photo.id} className="w-24 h-24 rounded relative">
                <Image
                  source={{ uri: photo.uri }}
                  className="w-24 h-24 rounded"
                  resizeMode="cover"
                />
                <Pressable
                  onPress={() => handleRemovePhoto(photo.id)}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-ink items-center justify-center"
                >
                  <X size={14} color="#FAF7F2" />
                </Pressable>
              </View>
            ))}

            <Pressable
              onPress={handlePickImages}
              className="w-24 h-24 rounded border-2 border-dashed border-mist items-center justify-center bg-white"
            >
              <Plus size={24} color="#A8A29B" />
              <Text className="font-body text-xs text-slate mt-1">
                Add photos
              </Text>
            </Pressable>
          </ScrollView>
        </View>

        <Button variant="accent" size="lg" onPress={handleSubmit}>
          Submit defect
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
