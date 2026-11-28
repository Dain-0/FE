import React, { useState } from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { goBackOr } from '@features/releaseSafety/goBackOr';
import { LinearGradient } from 'expo-linear-gradient';
import { MessageCircle } from 'lucide-react-native';

//색상
const COLORS = {
    background: '#FFFFFF',      // 화면 전체 배경색
    headerBorder: '#F0F2F5',    // 헤더 아래 선 색
    textPrimary: '#111111',     // 헤더 제목, 문의 제목 글자색
    textSecondary: '#6B6B6B',   // 날짜/카테고리(작은 글씨) 글자색
    cardBorder: '#E6E6E6',      // 문의 카드 테두리색
    cardBackground: '#FFFFFF',  // 문의 카드 배경색
    answerText: '#333333',      // 답변 내용 글자색
    answerMeta: '#8A8A8A',      // 답변 작성자/시간 글자색
    badgeAnsweredBg: '#E9F9F0', // "답변 완료" 뱃지 배경색
    badgeAnsweredText: '#00A63E', // "답변 완료" 뱃지 글자색
    badgePendingBg: '#FFF4E0',  // "확인 중" 뱃지 배경색
    badgePendingText: '#B45309', // "확인 중" 뱃지 글자색
    emptyIconBg: '#F2F4F7',     // 빈 상태 아이콘 동그라미 배경색
    emptyIcon: '#9AA1AD',       // 빈 상태 아이콘 색
    buttonTop: '#1573F5',       // 하단 버튼 색 (그라데이션 시작)
    buttonBottom: '#429DFF',    // 하단 버튼 색 (그라데이션 끝)
    buttonText: '#FFFFFF',      // 하단 버튼 글자색
    buttonShadow: '#1573F5',    // 하단 버튼 그림자 색
    buttonDisabled: '#B9C9F5',  // 하단 버튼 비활성(준비 중) 색
};

{/* 상단 헤더 */ }
<View style = { styles.header } >
    <Pressable accessibilityLabel="뒤로 가기" onPress = {() => goBackOr(router, "/profile")
} hitSlop = { 10} >
    <Image
                        source={ require('../../../assets/back.png') }  // 파일 위치에 맞게 경로 조정
style = {{ width: 24, height: 24 }}
resizeMode = "contain"
    />
    </Pressable>
    < Text style = { styles.headerTitle } > 문의 내역 </Text>
        </View>

        < ScrollView
contentContainerStyle = { [styles.content, isEmpty && styles.contentEmpty]}
showsVerticalScrollIndicator = { false}
    >
{/* 문의가 없을 때: 빈 상태 아이콘 + 안내 문구 */ }
{
    isEmpty && (
        <View style={ styles.emptyBox }>
            <View style={ styles.emptyIconCircle }>
                <MessageCircle size={ 30 } color = { COLORS.emptyIcon } strokeWidth = { 1.8} />
                    </View>
                    < Text style = { styles.emptyTitle } > 아직 문의 내역이 없어요 </Text>
                        < Text style = { styles.emptyDesc } >
                            문의를 남기면 여기에서 답변을 확인할 수 있어요
                                </Text>
                                </View>
                )
}

{/* 문의 카드 목록 */ }
{
    inquiries.map((item) => {
        const status = STATUS_CONFIG[item.status];
        const meta = [item.date, ...(item.categories || [])].join(' · ');

        return (
            <View key= { item.id } style = { styles.card } >
            {/* 제목 + 상태 뱃지 */ }
                < View style = { styles.cardTop } >
                    <View style={ styles.cardTitleBox }>
                        <Text style={ styles.cardTitle }> { item.title } </Text>
                            < Text style = { styles.cardMeta } > { meta } </Text>
                                </View>
        {
            status && (
                <View style={ [styles.badge, { backgroundColor: status.bg }] }>
                    <Text style={ [styles.badgeText, { color: status.color }] }>
                    { status.label }
                        </Text>
                        </View>
                                )
}
</View>

{/* 답변 (답변이 있을 때만 카드 안에 표시) */ }
{
    item.answer && (
        <View style={ styles.answerBox }>
            <Text style={ styles.answerText }> { item.answer.content } </Text>
                < Text style = { styles.answerMeta } >
                { item.answer.author } · { item.answer.answeredAt }
    </Text>
        </View>
                            )
}
</View>
                    );
                })}
</ScrollView>

{/* 하단 새 문의 작성 버튼 */ }
<View style={ styles.footer }>
{/* 기능 연결 전 준비 중 안내 */ }
{
    !NEW_INQUIRY_ENABLED && (
        <Text style={ styles.preparingText }> 문의 작성 기능은 준비 중이에요 </Text>
                )
}
<Pressable
                    onPress={ handleNewInquiry }
disabled = {!NEW_INQUIRY_ENABLED}
accessibilityState = {{ disabled: !NEW_INQUIRY_ENABLED }}
style = { [styles.buttonShadow, !NEW_INQUIRY_ENABLED && styles.buttonShadowOff]}
    >
    <LinearGradient
                        colors={
    NEW_INQUIRY_ENABLED
        ? [COLORS.buttonTop, COLORS.buttonBottom]            // 위 → 아래 색
        : [COLORS.buttonDisabled, COLORS.buttonDisabled]     // 비활성(준비 중) 색
}
start = {{ x: 0, y: 0 }}   // 시작 위치 (왼쪽 위)
end = {{ x: 0, y: 1 }}     // 끝 위치 (아래). 
style = { styles.button }
    >
    <Text style={ styles.buttonText }> 새 문의 작성 </Text>
        </LinearGradient>
        </Pressable>
        </View>
        </SafeAreaView>
    );
}

//t스타일
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },

    header: {
        height: 59,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.headerBorder,
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    headerTitle: { marginLeft: 8, fontSize: 17, fontWeight: '700', color: COLORS.textPrimary },

    content: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24 },
    contentEmpty: { flexGrow: 1, justifyContent: 'center' },

    emptyBox: { alignItems: 'center', paddingHorizontal: 24 },
    emptyIconCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: COLORS.emptyIconBg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, marginTop: 16 },
    emptyDesc: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginTop: 6,
        textAlign: 'center',
        lineHeight: 19,
    },

    card: {
        borderWidth: 1,
        borderColor: COLORS.cardBorder,
        borderRadius: 24,
        backgroundColor: COLORS.cardBackground,
        paddingVertical: 18,
        paddingHorizontal: 18,
        marginBottom: 10,
    },
    cardTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardTitleBox: { flex: 1, marginRight: 10 },
    cardTitle: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary },
    cardMeta: { fontSize: 12, color: COLORS.textSecondary, marginTop: 4 },

    badge: {
        borderRadius: 12,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    badgeText: { fontSize: 12, fontWeight: '700' },

    answerBox: { marginTop: 18 },
    answerText: { fontSize: 14, lineHeight: 22, color: COLORS.answerText },
    answerMeta: { fontSize: 12, color: COLORS.answerMeta, marginTop: 10 },

    footer: { paddingHorizontal: 16, paddingBottom: 16 },
    preparingText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginBottom: 10,
    },
    buttonShadow: {
        borderRadius: 16,                       // 버튼 borderRadius와 동일하게
        backgroundColor: COLORS.buttonBottom,   
        // iOS 그림자
        shadowColor: COLORS.buttonShadow,
        shadowOffset: { width: 0, height: 4 },  // 아래로 얼마나 떨어질지
        shadowOpacity: 0.25,                    // 진하기 (0~1)
        shadowRadius: 8,                        // 퍼지는 정도
        // 안드로이드 그림자
        elevation: 6,
    },
    // 비활성(준비 중)일 때는 그림자를 없앴음
    buttonShadowOff: {
        backgroundColor: COLORS.buttonDisabled,
        shadowOpacity: 0,
        elevation: 0,
    },
    button: {
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: 'center',
    },
    buttonText: { color: COLORS.buttonText, fontSize: 16, fontWeight: '700' },
});
