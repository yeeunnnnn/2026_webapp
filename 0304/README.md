## 1. HTML

> **HyperText Markup Language** — 웹 페이지의 구조를 정의하는 마크업 언어

- 웹 문서의 뼈대를 구성하며, 텍스트·이미지·링크 등 콘텐츠의 구조를 표현한다.
- 태그(tag)를 이용해 요소(element)를 정의하는 방식으로 작성한다.

---

## 2. Markup Language & Metadata

### Markup Language
문서나 데이터를 구조화하고 서식을 지정하기 위한 언어로, 태그나 특정 문법을 사용해 문서의 구조와 표현 방식을 정의한다.

| 예시 | 용도 |
|------|------|
| HTML | 웹 페이지 구조 정의 |
| XML  | 데이터 구조 표현 |

### Metadata
데이터 자체가 아닌, **데이터를 설명하는 정보**다. 데이터의 속성·의미·관계 등을 설명하며 일반적으로 `key-value` 형태로 표현된다.

### 차이점

| 구분 | 역할 |
|------|------|
| Markup Language | 문서의 구조와 표현을 정의 |
| Metadata | 데이터에 대한 설명 정보를 제공 |

> Markup Language 내부에 Metadata가 포함될 수 있다.

---

## 3. HTML 표준

HTML 표준은 여러 기관에서 관리한다.

| 기관 | 역할 |
|------|------|
| **W3C** | 웹 표준을 제정하는 국제 기관. HTML 공식 명세(specification) 제공 |
| **MDN Web Docs** | HTML 태그 설명, 예제, 브라우저 지원 정보를 제공하는 개발자 문서 |
| **WHATWG** | HTML Living Standard를 유지하며 최신 HTML 표준을 관리 |

---

## 4. Emmet

> HTML과 CSS 코드를 빠르게 작성하기 위한 **코드 자동 완성 도구**

짧은 문법을 입력하면 자동으로 HTML 구조를 확장해 생성하며, 개발자의 코드 작성 속도를 크게 향상시킨다.

**지원 편집기**: VS Code, Sublime Text, Atom 등

---

## 5. MPA와 SPA

웹 애플리케이션은 페이지 구성 방식에 따라 두 가지로 나뉜다.

### MPA (Multi Page Application)
여러 개의 HTML 페이지로 구성되며, 페이지 이동 시마다 서버에 요청을 보내고 새로운 HTML을 로드한다.

| 장점 | 단점 |
|------|------|
| 구조가 단순하다 | 페이지 이동 시 로딩이 발생한다 |
| SEO에 유리하다 | — |

### SPA (Single Page Application)
하나의 HTML 페이지에서 동적으로 콘텐츠를 변경하며, AJAX 요청을 통해 필요한 데이터만 서버에서 받아온다.

| 장점 | 단점 |
|------|------|
| 사용자 경험이 부드럽다 | 초기 로딩이 상대적으로 크다 |
| — | JavaScript 의존도가 높다 |

---

## 6. CSS

> **Cascading Style Sheets** — 웹 페이지의 디자인과 레이아웃을 담당하는 스타일 시트 언어

HTML이 **구조**를 담당한다면, CSS는 **시각적 표현**을 담당한다.

**주요 역할**
- 글자 색상, 크기, 폰트 설정
- 레이아웃 구성
- 반응형 디자인 구현
- 페이지 전체 스타일 관리

---

## 7. Node.js

> JavaScript를 브라우저 외부 환경에서도 실행할 수 있도록 하는 **런타임 환경**

- V8 엔진 기반으로 동작한다.
- 서버 프로그램, CLI 도구 등 다양한 용도로 활용된다.
- OS가 아니며, 특정 아키텍처를 강제하지 않는 **실행 환경(environment)** 에 가깝다.

### Java JRE와 비교

| 구분 | 언어 | 위치 |
|------|------|------|
| JRE | Java | OS 위에서 동작하는 런타임 환경 |
| Node.js | JavaScript | OS 위에서 동작하는 런타임 환경 |

---

## 8. Platform / Environment / Framework / Runtime

소프트웨어 개발에서 자주 혼용되는 개념들이다.

| 개념 | 설명 | 예시 |
|------|------|------|
| **Platform** | 소프트웨어가 실행되는 기반 환경 | Windows, Linux, macOS |
| **Environment** | 프로그램이 실행될 수 있도록 구성된 환경 | 개발 환경, 테스트 환경, 운영 환경 |
| **Framework** | 소프트웨어 개발을 위한 구조와 기본 틀 | React, Angular, Vue.js |
| **Runtime** | 프로그램이 실제로 실행될 때 필요한 환경 | Node.js, Java JRE |

---

## 9. IDE

> **Integrated Development Environment** — 소프트웨어 개발을 위한 통합 개발 환경

**주요 기능**
- 코드 편집 및 디버깅
- 빌드 자동화
- 버전 관리 연동
- 프로젝트 및 패키지 관리
- 플러그인 확장

---

## 10. 대표적인 IDE 및 코드 편집기

### IDE
| 이름 | 주요 용도 |
|------|-----------|
| Visual Studio | .NET, C++ |
| IntelliJ IDEA | Java, Kotlin |
| PyCharm | Python |
| Eclipse | Java |
| Android Studio | Android |
| Xcode | iOS, macOS |
| NetBeans | Java, PHP |

### 코드 편집기
| 이름 | 특징 |
|------|------|
| VS Code | 가볍고 확장성 높음 |
| Sublime Text | 빠른 속도 |
| Notepad++ | 윈도우 경량 편집기 |
| Atom | 오픈소스 (현재 지원 종료) |

---

## 11. VS Code

> 가벼운 코드 편집기이면서 IDE 기능을 함께 제공하는 개발 도구

| 항목 | 내용 |
|------|------|
| 라이선스 | 무료 오픈소스 |
| 지원 OS | Windows, macOS, Linux |
| 특징 | 다양한 확장 기능 제공, 활발한 개발자 커뮤니티 |