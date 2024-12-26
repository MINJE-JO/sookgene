# 카카오 로그인 및 데이터 수집 구현 TODO

## 1. 카카오 개발자 설정
- [x] 카카오 개발자 계정 생성
- [x] 애플리케이션 등록 및 설정
  - [x] OAuth 리다이렉트 URI 설정
  - [x] 카카오 로그인 활성화
  - [x] 필수 동의 항목 설정
    - [x] 닉네임 (profile_nickname)
    - [x] 프로필 사진 (profile_image)
    - [x] 이메일 (account_email)
- [x] 카카오 채널 생성
  - [x] 채널 관리자 설정
  - [x] 채널 공개 설정
  - [x] 친구추가 버튼 설정

## 2. Supabase 설정
- [x] Supabase 프로젝트 생성
- [x] 데이터베이스 스키마 설계
  ```sql
  -- Enable UUID extension
  create extension if not exists "uuid-ossp";

  -- users 테이블: 사용자 기본 정보
  create table users (
    id uuid references auth.users primary key,
    kakao_id text unique,
    email text unique,
    name text not null,
    avatar_url text,
    created_at timestamp with time zone default timezone('utc'::text, now())
  );

  -- survey_results 테이블: 설문 결과 저장
  create table survey_results (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references users(id) not null,
    answers jsonb not null, -- 각 질문별 답변 저장
    result_type text not null check (result_type in ('IMMEDIATE_REACTION', 'RAPID_INTOXICATION', 'DELAYED_DETOX')),
    created_at timestamp with time zone default timezone('utc'::text, now())
  );

  -- RLS 정책 설정
  alter table users enable row level security;
  alter table survey_results enable row level security;

  -- Users 테이블 정책
  create policy "Users can read own data" on users
    for select using (auth.uid() = id);

  create policy "Users can update own data" on users
    for update using (auth.uid() = id);

  -- Survey Results 테이블 정책
  create policy "Users can read own survey results" on survey_results
    for select using (auth.uid() = user_id);

  create policy "Users can insert own survey results" on survey_results
    for insert with check (auth.uid() = user_id);
  ```
- [ ] API 키 및 환경변수 설정
  - [ ] `NEXT_PUBLIC_SUPABASE_URL` 설정
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` 설정
- [ ] Supabase Auth 설정
  - [ ] 카카오 OAuth Provider 활성화
  - [ ] 카카오 Client ID/Secret 등록
  - [ ] 리다이렉트 URL 설정
  - [ ] Site URL 설정

## 3. 인증 기능 구현
- [ ] Supabase Client 설정
  ```bash
  npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
  ```
- [ ] 인증 관련 유틸리티 함수 구현
  - [ ] Supabase Auth 초기화
  - [ ] 카카오 로그인 함수 (Supabase signInWithOAuth)
  - [ ] 로그아웃 함수
  - [ ] 세션 관리 함수
- [ ] 서버 컴포넌트 미들웨어 구현
  - [ ] createMiddlewareClient 설정
  - [ ] 세션 새로고침 처리
- [ ] 클라이언트 상태 관리
  - [ ] useSession 훅 구현
  - [ ] 로그인 상태 컨텍스트 구현

## 4. 설문 페이지 수정
- [ ] PrivateRoute 컴포넌트 구현
- [ ] 설문 시작 전 로그인 체크
- [ ] 비로그인 사용자 리다이렉트
- [ ] 로그인 UI/UX 개선
  - [ ] 로그인 버튼 디자인
  - [ ] 로딩 상태 표시
  - [ ] 에러 처리

## 5. 결과 페이지 기능 추가
- [ ] 결과 데이터 Supabase 저장 구현
- [ ] 카카오 채널 친구추가 버튼 통합
  - [ ] 채널 친구추가 SDK 초기화
  - [ ] 친구추가 버튼 컴포넌트 구현
  - [ ] 친구추가 완료 처리
- [ ] 결과 공유하기 기능
  - [ ] 카카오 공유하기 버튼 추가
  - [ ] 공유 메시지 템플릿 설정

## 6. 데이터 분석 준비
- [ ] 데이터 수집 로직 구현
  - [ ] 사용자 기본 정보
  - [ ] 설문 응답 데이터
  - [ ] 결과 유형 통계
- [ ] 데이터 시각화 대시보드 구현
  - [ ] 유형별 분포도
  - [ ] 연령대별 통계
  - [ ] 성별 통계
  - [ ] 시계열 분석

## 7. 테스트 및 배포
- [ ] 인증 플로우 테스트
- [ ] 데이터 저장 테스트
- [ ] 채널 친구추가 테스트
- [ ] 에러 처리 테스트
- [ ] 성능 최적화
- [ ] 배포 환경 설정

## 8. 모니터링 및 개선
- [ ] 에러 로깅 구현
- [ ] 사용자 행동 분석 설정
- [ ] 성능 모니터링 설정
- [ ] 피드백 수집 시스템 구축
