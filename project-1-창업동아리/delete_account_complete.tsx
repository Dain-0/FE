import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { Check, ChevronLeft } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

return (
    <View className="flex-1 bg-[#FEFEFE]">
      <View className="h-[58px] flex-row items-center border-b border-[#E6E6E6] px-4 py-[9px]">
        <Pressable onPress={() => router.replace("/(auth)")} className="h-10 w-10 items-center justify-center rounded-full bg-[#F3F3F3]">
          <ChevronLeft size={20} color="#0D0D0D" />
        </Pressable>
        <View className="flex-1" />
        <View className="h-10 w-10" />
      </View>

      <View className="h-[662px] items-center gap-[22px] px-6 pb-7 pt-16">
        <View className="h-[72px] w-[72px] items-center justify-center rounded-full bg-[#F3F3F3]">
          <Check size={34} color="#0D0D0D" strokeWidth={2.2} />
        </View>
        <View className="w-full items-center gap-2">
          <Text className="font-pretendard-bold text-[24px] leading-8 tracking-[-0.24px] text-[#0D0D0D]">탈퇴가 끝났어요</Text>
          <Text className="font-pretendard text-[14px] leading-5 tracking-[-0.14px] text-[#5E5D5D]">그동안 Plain edu와 함께해 주셔서 고마워요</Text>
        </View>
        <View className="w-full rounded-[20px] border-[1.3px] border-[#E6E6E6] px-5 py-1">
          <ReceiptRow label="처리 일시" value={formatDateTime(processedAt)} />
          <View className="h-px bg-[#E6EAF0]" />
          <ReceiptRow label="개인정보" value="모두 삭제됨" />
          <View className="h-px bg-[#E6EAF0]" />
          <ReceiptRow label="다시 가입할 수 있는 날" value={formatDate(rejoinAt)} accent />
        </View>
      </View>

      <View className="px-5 pb-6 pt-3">
        <Pressable onPress={() => router.replace("/(auth)")}>
          <LinearGradient colors={["#1573F5", "#429DFF"]} className="h-14 items-center justify-center rounded-2xl" style={{ boxShadow: "0 10px 8px rgba(21,93,252,0.25)" }}>
            <Text className="font-pretendard-bold text-[17px] leading-[25px] text-[#FEFEFE]">처음 화면으로</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

function ReceiptRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return <View className="flex-row items-center py-[13px]"><Text className="flex-1 font-pretendard text-[14px] leading-5 text-[#5E5D5D]">{label}</Text><Text className={`font-pretendard-bold text-[15px] leading-[22px] ${accent ? "text-[#155DFC]" : "text-[#0D0D0D]"}`}>{value}</Text></View>;
}

function formatDate(value: Date) {
  return `${value.getFullYear()}. ${value.getMonth() + 1}. ${value.getDate()}`;
}

function formatDateTime(value: Date) {
  const hour = value.getHours();
  return `${formatDate(value)} ${hour < 12 ? "오전" : "오후"} ${hour % 12 || 12}:${String(value.getMinutes()).padStart(2, "0")}`;
}