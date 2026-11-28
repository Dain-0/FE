import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import {
    BookOpen,
    CheckCheck,
    ChevronDown,
    FileText,
    Flame,
    Heart,
    List,
    MessageSquareText,
    TrendingUp,
} from "lucide-react-native";

import { TopBar } from "@components/layout/TopBar";
import { type AppNotification, useNotifications } from "@features/home/useNotifications";
import { notificationFeedQueryKey, useNotificationFeed } from "@features/notifications/useNotificationFeed";
import { useAuthSession } from "@features/auth/hooks";
import { queryClient } from "@lib/query/client";

type Filter = "전체" | "투자" | "학습" | "커뮤니티" | "리그";

const FILTERS = [
    { label: "전체" as const, icon: List },
    { label: "투자" as const, icon: TrendingUp },
    { label: "학습" as const, icon: BookOpen },
    { label: "커뮤니티" as const, icon: MessageSquareText },
    { label: "리그" as const, icon: Flame },
];

function NoticeIcon({ type }: { type: string }) {
    if (type === "POST_LIKE" || type === "like") {
        return <Heart size={ 20 } color = "#155DFC" strokeWidth = { 2.2} />;
    }
    if (type === "approve") {
        return <CheckCheck size={ 20 } color = "#155DFC" strokeWidth = { 2.2} />;
    }
    return <FileText size={ 20 } color = "#155DFC" strokeWidth = { 2.2} />;
}

function NoticeRow({ notice, onPress }: { notice: AppNotification; onPress: () => void }) {
    return (
        <Pressable
      onPress= { onPress }
    className = {`flex-row px-4 py-[15px] ${notice.unread ? "bg-[#EFF6FF]" : "bg-white"}`
}
accessibilityLabel = {`${notice.title}${notice.unread ? ", 읽지 않음" : ""}`}
    >
    <View className="h-11 w-11 items-center justify-center rounded-[14px] bg-white" >
        <NoticeIcon type={ notice.type } />
            </View>
            < View className = "ml-3 flex-1" >
                <Text className="font-pretendard-bold text-[15px] leading-[20px] text-[#191F28]" >
                { notice.title }
                    </Text>
{
    notice.school || notice.group ? (
        <Text className= "mt-[3px] font-pretendard text-[12px] leading-[18px] text-[#8B95A1]" >
        { [notice.school, notice.group].filter(Boolean).join(" · ") }
        </Text>
        ) : null
}
{
    notice.content ? (
        <Text className= "mt-[3px] font-pretendard text-[13px] leading-[19px] text-[#8B95A1]" >
        { notice.content }
        </Text>
        ) : null
}
</View>
{
    notice.time ? (
        <Text className= "ml-1 font-pretendard text-[12px] leading-[18px] text-[#8B95A1]" >
        { notice.time }
        </Text>
      ) : null
}
</Pressable>
  );
}

return (
    <View className= "flex-1 bg-white" >
    <TopBar
        hasNotification={ unreadCount > 0 }
leftOfBell = {(
    <Pressable onPress={() => router.push("/home/point")} hitSlop = { 10} accessibilityLabel = "교환소" >
    <Image
              source={ require("../../assets/home/shop.png") }
              style = {{ width: 22, height: 22 }}
    resizeMode = "contain"
    />
    </Pressable>
)}
      />
    < View className = "flex-1 bg-white" >
        <View className="h-[101px] px-4 pt-[25px]" >
            <Text className="font-pretendard-bold text-[26px] leading-[39px] text-[#191F28]" > 알림 </Text>
                < View className = "mt-1 flex-row items-center justify-between" >
                    <Pressable onPress={ handleReadAll } accessibilityLabel = "모든 알림 읽음 처리" className = "flex-row items-center" >
                        <Text className="font-pretendard text-[14px] leading-[21px] text-[#8B95A1]" > 읽지 않은 알림 </Text>
                            < Text className = "font-pretendard-bold text-[14px] leading-[21px] text-[#1573F5]" > { unreadCount }개 </Text>
                                </Pressable>
                                < Pressable onPress = {() => setFilterOpen((value) => !value)} className = "flex-row items-center" accessibilityLabel = "알림 필터" >
                                    <Text className="font-pretendard text-[14px] leading-[21px] text-[#8B95A1]" > { filter } </Text>
                                        < ChevronDown size = { 14} color = "#8B95A1" style = {{ marginLeft: 4 }} />
                                            </Pressable>
                                            </View>
                                            </View>

                                            < ScrollView className = "flex-1" showsVerticalScrollIndicator = { false} >
                                                {
                                                    notifications.map((notice) => (
                                                        <NoticeRow key= { notice.id } notice = { notice } onPress = {() => handlePress(notice.id)} />
          ))}
{
    loading ? (
        <View className= "items-center py-20" >
        <Text className="font-pretendard text-[14px] text-[#8B95A1]" > 알림을 불러오는 중이에요 </Text>
            </View>
          ) : null
}
{
    !loading && error ? (
        <View className= "items-center px-6 py-20" >
        <Text className="text-center font-pretendard text-[14px] text-[#8B95A1]" > { error } </Text>
            </View>
          ) : null
}
{
    !loading && !error && notifications.length === 0 ? (
        <View className= "items-center py-20" >
        <Text className="font-pretendard text-[14px] text-[#8B95A1]" > 표시할 알림이 없어요 </Text>
            </View>
          ) : null
}
</ScrollView>

{
    filterOpen ? (
        <View
            className= "absolute right-5 top-[93px] z-10 w-[120px] gap-[5px] rounded-[14px] bg-white px-[10px] py-[5px]"
            style = {{ shadowColor: "#000", shadowOpacity: 0.12, shadowRadius: 12, shadowOffset: { width: 0, height: 4 } }
}
          >
{
    FILTERS.map((item) => {
        const Icon = item.icon;
        return (
            <Pressable
                  key= { item.label }
        onPress = {() => {
            setFilter(item.label);
            setFilterOpen(false);
        }
    }
                  className = "h-[31px] flex-row items-center px-[10px]"
        >
        <Icon size={ 20} color = "#155DFC" />
        <Text className="ml-2 font-pretendard text-[14px] leading-[21px] text-[#606060]" > { item.label } </Text>
    </Pressable>
    );
})}
</View>
        ) : null}
</View>
    </View>
  );
}