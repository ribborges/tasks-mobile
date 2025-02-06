import { View, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProfilePic from "./ProfilePic";

export default function UserButton({ src, onPress }: { src?: string, onPress?: () => void }) {
    return (
        <TouchableOpacity onPress={onPress} className="flex-1 items-end" activeOpacity={0.5}>
            <ProfilePic className="h-11 w-11" iconSize={16} src={src} />
        </TouchableOpacity>
    );
}