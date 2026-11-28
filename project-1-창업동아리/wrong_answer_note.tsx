import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { goBackOr } from "@features/releaseSafety/goBackOr";

return (
    <View className= "flex-1 bg-white" >
    <View className="h-[62px] flex-row items-center border-b border-[#E5E7EB] px-4" >
        <Pressable onPress={ () => goBackOr(router, "/learn") } accessibilityRole = "button" accessibilityLabel = "뒤로가기" className = "mr-3 h-10 w-10 items-center justify-center rounded-full bg-[#F3F4F6]" >
            <Text className="text-lg font-pretendard-bold text-[#4A5565]" >←</Text>
                </Pressable>
                < Text className = "text-[18px] font-pretendard-extrabold text-[#262626]" > 퀴즈 기록 </Text>
                    </View>
                    < ScrollView contentContainerClassName = "gap-3 p-4 pb-8" >
                    { loading?<Text className = "py-12 text-center text-[#6A7282]">퀴즈 기록을 불러오는 중이에요.</Text> : null }
{ error ? <Text accessibilityRole="alert" className = "py-12 text-center text-red-500" > { error } </Text> : null }
{ !loading && !error && items.length === 0 ? <Text className="py-12 text-center text-[#6A7282]" > 완료한 퀴즈가 없어요.</Text> : null }
{
    items.map((item) => (
        <View key= { item.attemptId } className = "rounded-[16px] border border-[#E5E7EB] bg-white p-5" >
        <View className="flex-row items-center justify-between" >
    <Text className="flex-1 text-[15px] font-pretendard-bold text-[#262626]" > { item.topicTitle } </Text>
    < Text className = "text-[18px] font-pretendard-extrabold text-[#155DFC]" > { item.score }점 </Text>
    </View>
    < Text className = "mt-2 text-[13px] text-[#6A7282]" > { item.totalCount }문제 중 { item.correctCount }문제 정답 </Text>
            { item.completedAt ? <Text className="mt-1 text-[12px] text-[#99A1AF]"> { new Date(item.completedAt).toLocaleDateString("ko-KR") } </Text> : null }
        </View>
    ))
}
</ScrollView>
    </View>
  );
}