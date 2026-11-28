import { useEffect, useState } from "react";
import { Image, ImageSourcePropType, Pressable, Text, View } from "react-native";
import { useEvent } from "expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Bookmark, Heart, Pause, Play, X } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useVideoPlayer, VideoView } from "expo-video";

import {
    completeShortform,
    getTopicShortforms,
    toggleShortformLike,
    toggleShortformSave,
    type LearningShortform,
} from "@features/study/api";
import { goBackOr } from "@features/releaseSafety/goBackOr";
import { nextShortformIndex, routeParam, shortformMediaUrl, sortByOrder } from "@features/study/screenContracts";



    if (loading || !currentShortform) {
        return (
            <View className= "flex-1 items-center justify-center bg-[#0F172A] px-8" >
            <Text className="text-center text-[16px] font-pretendard-bold text-white" >
            { loading? "숏폼을 불러오는 중이에요.": error ?? "숏폼 영상은 곧 공개돼요." }
                </Text>
        {
            !loading && !error ? (
                <Text className= "mt-2 text-center text-[13px] font-pretendard text-white/70" >
                퀴즈로 먼저 학습해 보세요.
                    </Text>
                ) : null
        }
        <Pressable
                    accessibilityRole="button"
        onPress = {() => goBackOr(router, "/learn")
    }
    className = "mt-5 rounded-xl bg-white/15 px-5 py-3"
        >
        <Text className="font-pretendard-bold text-white" > 돌아가기 </Text>
            </Pressable>
            </View>
        );
}

return (
    <View className= "flex-1 bg-[#0F172A]" >
    {
        mediaUrl?(
                <VideoView
                    player = { player }
                    nativeControls
                    playsInline
                    contentFit = "contain"
                    surfaceType = "textureView"
                    style = {{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#0F172A",
            }}
    />
            ) : (
    <Image
                    source= { require("../../../assets/learn/study-short-placeholder.png") }
resizeMode = "contain"
style = {{ position: "absolute", top: 91, left: 0, right: 0, width: "100%", height: "100%" }}
                />
            )}

<View className="flex-1 px-4 pt-4 pb-[53px]" pointerEvents = "box-none" >
    <View className="flex-row items-center justify-between" >
        <Pressable
                        onPress={ () => goBackOr(router, "/learn") }
className = "h-[40px] w-[40px] items-center justify-center rounded-full bg-black/30"
    >
    <X size={ 20 } color = "#FFFFFF" />
        </Pressable>

        < View className = "rounded-full bg-white px-4 py-[6px]" >
            <Text className="text-[13px] font-pretendard-bold leading-[19px] text-[#155DFC]" >
                숏폼 { currentIndex + 1 }/{shortforms.length}
                    </Text>
                    </View>

                    < View className = "h-[44px] w-[44px]" />
                        </View>

                        < View className = "mt-[22px] p-[10px]" >
                            <View className="flex-row items-center" >
                                <MissionCircle
                            icon={ require("../../../assets/home/play.png") }
active
    />

    <MissionLine active completed = { false} />

        <MissionCircle
                            icon={ require("../../../assets/home/quiz.png") }
active = { false}
    />

    <MissionLine active={ false } completed = { false} />

        <MissionCircle
                            icon={ require("../../../assets/home/chart.png") }
active = { false}
    />
    </View>

    < View className = "mt-[5px] flex-row justify-between" >
        <MissionLabel label="숏폼 학습" active />
            <MissionLabel label="퀴즈" active = { false} />
                <MissionLabel label="모의투자" active = { false} />
                    </View>
                    </View>

                    < View className = "flex-1 items-center justify-center" pointerEvents = "box-none" >
                        {
                            mediaUrl?(
                        <Pressable
                            accessibilityRole = "button"
                            accessibilityLabel = { isPlaying? "영상 일시정지": "영상 재생" }
                            onPress = {() => {
                                    if (isPlaying) {
    player.pause();
} else {
    player.play();
}
                            }}
className = "h-14 w-14 items-center justify-center rounded-full bg-black/45"
style = {{
    shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
        shadowRadius: 10,
                            }}
                        >
    {
        isPlaying?(
                                <Pause size = { 24} color = "#FFFFFF" fill = "#FFFFFF" />
                            ): (
                <Play size = { 25 } color = "#FFFFFF" fill = "#FFFFFF" />
                            )}
</Pressable>
                    ) : null}
</View>

    < View >
    <View className="flex-row items-center" >
        <LinearGradient
                            colors={ ["#1573F5", "#429DFF"] }
start = {{ x: 0, y: 0 }}
end = {{ x: 0, y: 1 }}
className = "h-7 w-7 items-center justify-center rounded-full"
    >
    <Text className="text-[10px] font-pretendard-bold leading-[15px] text-white" >
        P
        </Text>
        </LinearGradient>

        < Text className = "ml-[10px] text-[13px] font-pretendard-bold leading-[19px] text-white" >
            Plain Edu
                </Text>
                </View>

                < Text className = "mt-[10px] text-[12px] font-pretendard text-white" >
                { currentShortform.description }
                    </Text>

                    < Text className = "mt-[5px] text-[17px] font-pretendard-extrabold leading-[22px] text-white" >
                    { currentShortform.title }
                        </Text>

{
    !mediaUrl ? (
        <Text className= "mt-4 text-[11px] font-pretendard text-[#FFB4B6]" > 재생 가능한 영상 주소가 없어요.</Text>
                    ) : null
}
{
    playbackStatus === "error" ? (
        <Text className= "mt-4 text-[11px] font-pretendard text-[#FFB4B6]" > 영상을 재생하지 못했어요.잠시 후 다시 시도해 주세요.</Text>
                    ) : null
}
</View>

    < View className = "absolute right-4 bottom-[158px] items-center" >
        <Pressable
                        disabled={ !currentShortform || mutationPending }
onPress = { async() => {
    if (!currentShortform) return;
    setMutationPending(true);
    try {
        const response = await toggleShortformLike(currentShortform.id);
        setLiked(response.isLiked);
    } catch (error) {
        console.warn("[learning] shortform like failed", error);
    } finally {
        setMutationPending(false);
    }
}}
className = "items-center"
hitSlop = { 10}
    >
    <Heart
                            size={ 31 }
color = "#FFFFFF"
fill = { liked? "#FFFFFF": "transparent" }
strokeWidth = { 2.2}
    />
    <Text className="mt-1 text-[11px] font-pretendard-bold leading-[16px] text-white" > 좋아요 </Text>
        </Pressable>

        < Pressable
disabled = {!currentShortform || mutationPending}
onPress = { async() => {
    if (!currentShortform) return;
    setMutationPending(true);
    try {
        const response = await toggleShortformSave(currentShortform.id);
        setSaved(response.isSaved);
    } catch (error) {
        console.warn("[learning] shortform save failed", error);
    } finally {
        setMutationPending(false);
    }
}}
className = "mt-5 items-center"
hitSlop = { 10}
    >
    <Bookmark
                            size={ 31 }
color = "#FFFFFF"
fill = { saved? "#FFFFFF": "transparent" }
strokeWidth = { 2.2}
    />
    <Text className="mt-1 text-[11px] font-pretendard-bold leading-[16px] text-white" > 저장 </Text>
        </Pressable>

{
    mediaUrl ? (
        <View className= "relative mt-5 items-center" >
        {
            showPlaybackRates?(
                                <View className = "absolute bottom-10 right-0 min-w-[64px] gap-1 rounded-2xl border border-white/20 bg-black/80 p-2" >
                {
                    playbackRates.map((rate) => (
                        <Pressable
                                            key= { rate }
                                            accessibilityRole = "button"
                                            accessibilityLabel = {`${rate}배속으로 재생`}
                                            onPress = {() => {
                    player.playbackRate = rate;
            setPlaybackRate(rate);
                                                setShowPlaybackRates(false);
        }}
className = {`items-center rounded-lg px-2 py-1 ${playbackRate === rate ? "bg-[#155DFC]" : ""
    }`}
                                        >
    <Text className="text-[12px] font-extrabold text-white" > { rate }x </Text>
        </Pressable>
                                    ))}
</View>
                            ) : null}
<Pressable
                                accessibilityRole="button"
accessibilityLabel = {`재생 속도 ${playbackRate}배`}
accessibilityState = {{ expanded: showPlaybackRates }}
onPress = {() => setShowPlaybackRates((visible) => !visible)}
className = "h-9 min-w-9 items-center justify-center rounded-full bg-black/45 px-2"
hitSlop = { 10}
    >
    <Text className="text-[13px] font-extrabold text-white" > { playbackRate }x </Text>
        </Pressable>
        </View>
                    ) : null}
</View>

    < View className = "absolute bottom-[42px] left-4 right-4" >
    { error?<Text className = "mb-2 text-center text-[12px] text-[#FF6467]">{ error }</Text> : null}
<Pressable
                        disabled={ !currentShortform || mutationPending }
onPress = { completeCurrentShortform }
className = "h-[52px] items-center justify-center rounded-[16px] bg-[#155DFC]"
    >
    <Text className="text-[16px] font-pretendard-extrabold text-white" >
        { currentIndex + 1 < shortforms.length ? "시청 완료 및 다음" : "시청 완료"}
</Text>
    </Pressable>
    </View>
    </View>
    </View>
    );
}

function MissionCircle({
    icon,
    active = false,
}: {
    icon: ImageSourcePropType;
    active?: boolean;
}) {
    return (
        <View
            className= {`h-[35px] w-[35px] items-center justify-center rounded-full ${active ? "bg-[#155DFC]" : "bg-[#E5E7EB]"
            }`
}
style = {
    active
    ? {
    shadowColor: "#155DFC",
        shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
        shadowRadius: 12,
            elevation: 6,
                    }
                : undefined
            }
        >
    <Image
                source={ icon }
style = {{
    width: 15,
        height: 15,
            tintColor: active ? "#FFFFFF" : "#99A1AF",
                }}
resizeMode = "contain"
    />
    </View>
    );
}

function MissionLabel({
    label,
    active = false,
}: {
    label: string;
    active?: boolean;
}) {
    return (
        <Text
            className= {`text-center text-[10px] font-pretendard-bold leading-[15px] ${active ? "text-[#155DFC]" : "text-[#99A1AF]"
            }`
}
        >
{ label }
    </Text>
    );
}

function MissionLine({
    active,
    completed,
}: {
    active: boolean;
    completed: boolean;
}) {

    if (completed) {
        return <View className="h-2 flex-1 bg-[#155DFC]" />;
    }

    if (active) {
        return (
            <LinearGradient
                colors= { ["#155DFC", "#155DFC", "#E5E7EB", "#E5E7EB"]}
        locations = { [0, 0.15, 0.6, 1]}
        start = {{ x: 0, y: 0.5 }
    }
    end = {{ x: 1, y: 0.5 }
}
className = "h-2 flex-1"
    />
        );
    }

return <View className="h-2 flex-1 bg-[#E5E7EB]" />;
}
